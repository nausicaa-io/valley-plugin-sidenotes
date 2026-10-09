import { type PluginCommand, type ValleyPluginApi } from '@valley/plugin-sdk'
import { appendNoteOrThrow, beforeEffect, captureNoteMutation, copyNote, deleteNoteOrThrow, makeNote, makeWebNote, updateNoteOrThrow, type DocumentRevision, type NoteMutationSession } from './data'
import { anchorOptions, anchorOptionsForWeb, enrichTextAnchor } from './anchors'
import { normalizeUrl } from './web'
import type { SideNoteAnchor, SideNoteRecord } from './types'
import { sideNoteEditStore } from './runtime'
import { AnchorReads } from './anchorReads'

const text = { type: 'string', maxLength: 1048576 }
const tags = { type: 'array', items: text, maxItems: 10000 }
const object = (properties: Record<string, unknown>, required: string[] = []) => ({ type: 'object', properties, required, additionalProperties: false })
const variant = (type: string, properties: Record<string, unknown> = {}, required: string[] = []) => object({ type: { const: type }, ...properties }, ['type', ...required])
export const anchorSchema = { oneOf: [
  variant('none'), variant('pdf-page', { page: { type: 'integer', minimum: 1 }, snippet: text }, ['page']),
  variant('media-time', { seconds: { type: 'number', minimum: 0 } }, ['seconds']),
  variant('markdown-line', { line: { type: 'integer', minimum: 1 }, snippet: text }, ['line']),
  variant('markdown-heading', { heading: text, line: { type: 'integer', minimum: 1 } }, ['heading']),
  variant('markdown-snippet', { snippet: text, line: { type: 'integer', minimum: 1 } }, ['snippet']),
  variant('web-selection', { snippet: text }, ['snippet'])
] }
export const noteResultSchema = object({ id: text, path: text, url: text, pathHistory: tags, note: text, flagged: { type: 'boolean' }, tags, anchor: anchorSchema, fileKey: object({ dev: { type: 'number' }, ino: { type: 'number' } }, ['dev', 'ino']), createdAt: text, updatedAt: text }, ['id', 'path', 'pathHistory', 'note', 'tags', 'anchor', 'createdAt', 'updatedAt'])
export const noteValuesSchema = object({ note: { type: 'string', minLength: 1 }, tags, flagged: { type: 'boolean' }, anchor: anchorSchema })

function refused(code: string, message: string): never {
  throw Object.assign(new Error(message), { code, outcome: 'not-applied' as const, retryable: false })
}

async function committedSideNote(id: string, session: NoteMutationSession): Promise<SideNoteRecord> {
  try { return await requireSideNote(id, session) } catch (error) {
    throw Object.assign(error instanceof Error ? error : new Error(String(error)), { outcome: 'unknown' as const, retryable: false })
  }
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected an object.')
  return value as Record<string, unknown>
}

function requiredText(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Expected ${label}.`)
  return value.trim()
}

function parseAnchor(value: unknown): SideNoteAnchor {
  const input = record(value)
  const positive = (key: string): number => {
    const number = input[key]
    if (typeof number !== 'number' || !Number.isInteger(number) || number < 1) throw new Error(`Invalid anchor ${key}.`)
    return number
  }
  const optionalSnippet = typeof input.snippet === 'string' ? { snippet: input.snippet } : {}
  switch (input.type) {
    case 'none': return { type: 'none' }
    case 'pdf-page': return { type: 'pdf-page', page: positive('page'), ...optionalSnippet }
    case 'media-time': {
      if (typeof input.seconds !== 'number' || !Number.isFinite(input.seconds) || input.seconds < 0) throw new Error('Invalid anchor time.')
      return { type: 'media-time', seconds: input.seconds }
    }
    case 'markdown-line': return { type: 'markdown-line', line: positive('line'), ...optionalSnippet }
    case 'markdown-heading': return { type: 'markdown-heading', heading: requiredText(input.heading, 'heading'), ...(input.line === undefined ? {} : { line: positive('line') }) }
    case 'markdown-snippet': return { type: 'markdown-snippet', snippet: requiredText(input.snippet, 'snippet'), ...(input.line === undefined ? {} : { line: positive('line') }) }
    case 'web-selection': return { type: 'web-selection', snippet: requiredText(input.snippet, 'snippet') }
    default: throw new Error('Unsupported editable anchor.')
  }
}

export function parseNoteValues(raw: unknown): Partial<Pick<SideNoteRecord, 'note' | 'tags' | 'flagged' | 'anchor'>> {
  const input = record(raw)
  if (Object.keys(input).some((key) => !['note', 'tags', 'flagged', 'anchor'].includes(key))) throw new Error('Unsupported SideNote property.')
  const result: Partial<Pick<SideNoteRecord, 'note' | 'tags' | 'flagged' | 'anchor'>> = {}
  if (input.note !== undefined) result.note = requiredText(input.note, 'note text')
  if (input.tags !== undefined) {
    if (!Array.isArray(input.tags) || !input.tags.every((tag) => typeof tag === 'string')) throw new Error('Expected a list of tags.')
    result.tags = [...new Set(input.tags.map((tag: string) => tag.trim().replace(/^#+/, '')).filter(Boolean))]
  }
  if (input.flagged !== undefined) {
    if (typeof input.flagged !== 'boolean') throw new Error('Expected a boolean flag.')
    result.flagged = input.flagged
  }
  if (input.anchor !== undefined) result.anchor = parseAnchor(input.anchor)
  return result
}

function copyValues<T extends ReturnType<typeof parseNoteValues>>(values: T): T {
  return { ...values, ...(values.tags ? { tags: [...values.tags] } : {}), ...(values.anchor ? { anchor: { ...values.anchor } } : {}) }
}

async function enrichAnchor(path: string, anchor: SideNoteAnchor, session: NoteMutationSession): Promise<SideNoteAnchor> {
  session.assertActive()
  const reader = new AnchorReads(session.api)
  try {
    const enriched = await enrichTextAnchor(path, anchor, reader)
    session.assertActive()
    return enriched
  } finally { reader.dispose() }
}

export async function requireSideNote(id: string, session = captureNoteMutation()): Promise<SideNoteRecord> {
  session.assertActive()
  const notes = await session.reader.load({ kind: 'ids', ids: [id] })
  session.assertActive()
  const note = notes.find((entry) => entry.id === id)
  if (!note) refused('TARGET_NOT_FOUND', 'The SideNote no longer exists.')
  return note
}

async function settleTracked(write: () => Promise<void>, forget: () => void): Promise<void> {
  try { await write() } catch (error) {
    if ((error as { outcome?: unknown } | null)?.outcome !== 'not-applied') forget()
    throw error
  }
  forget()
}

async function unchangedSideNote(id: string, expected: SideNoteRecord | undefined, session: NoteMutationSession): Promise<void> {
  await beforeEffect(async () => {
    session.assertActive()
    if (!expected) refused('REVISION_CONFLICT', 'The SideNote state after this operation is unknown. Newer work was preserved.')
    const current = await requireSideNote(id, session)
    if (JSON.stringify(current) !== JSON.stringify(expected)) refused('REVISION_CONFLICT', 'The SideNote changed after this operation. Newer work was preserved.')
  })
}

export async function saveNoteValues(id: string, values: ReturnType<typeof parseNoteValues>, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, session = captureNoteMutation()) {
  const admitted = copyValues(values)
  const revision = documentRevision ? { ...documentRevision } : undefined
  const { previous, next } = await beforeEffect(async () => {
    session.assertActive()
    const previous = copyNote(await requireSideNote(id, session))
    session.assertActive()
    if (expectedUpdatedAt !== undefined && previous.updatedAt !== expectedUpdatedAt) refused('REVISION_CONFLICT', 'This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.')
    let anchor = admitted.anchor ?? previous.anchor
    if (admitted.anchor) {
      const allowed = previous.url ? anchorOptionsForWeb() : anchorOptions(previous.path)
      if (!allowed.includes(anchor.type)) refused('INVALID_INPUT', 'This anchor does not apply to the SideNote subject.')
      anchor = await enrichAnchor(previous.path, anchor, session)
      session.assertActive()
    }
    return { previous, next: copyNote({ ...previous, ...admitted, anchor, updatedAt: new Date().toISOString() }) }
  })
  await updateNoteOrThrow(id, next, previous.updatedAt, revision, session)
  const committed = copyNote(await committedSideNote(id, session))
  let expected = committed
  const restore = async (value: SideNoteRecord): Promise<void> => {
    const current = await beforeEffect(async () => {
      session.assertActive()
      const current = await requireSideNote(id, session)
      if (JSON.stringify(current) !== JSON.stringify(expected)) refused('REVISION_CONFLICT', 'The SideNote changed after this operation. Newer work was preserved.')
      return current
    })
    await updateNoteOrThrow(id, value, current.updatedAt, undefined, session)
    expected = copyNote(await committedSideNote(id, session))
  }
  return { value: copyNote(committed), revert: { label: 'Edit SideNote', run: () => restore(previous), reapply: () => restore(next) } }
}

export async function openSideNoteSubject(api: ValleyPluginApi, note: Pick<SideNoteRecord, 'path' | 'url' | 'anchor'>, assertActive?: () => void): Promise<void> {
  const session = captureNoteMutation(api, assertActive)
  session.assertActive()
  const subject = { path: note.path, url: note.url, anchor: { ...note.anchor } }
  if (subject.url) {
    const result = await api.links.open(subject.url)
    session.assertActive()
    if (result.status === 'failed' || result.status === 'unavailable') refused('TARGET_UNAVAILABLE', result.message ?? 'Destination unavailable')
  } else {
    const file = await api.vault.fileInfo(subject.path)
    session.assertActive()
    if (!file) refused('TARGET_NOT_FOUND', 'The annotation file no longer exists.')
    api.workspace.openFile(subject.path, subject.anchor.type === 'web-selection' ? undefined : subject.anchor)
  }
}

export function registerSideNoteCommands(api: ValleyPluginApi): () => void {
  let disposed = false
  const session = captureNoteMutation(api, () => { if (disposed) throw new Error('SideNotes commands are no longer active') })
  const edits = sideNoteEditStore()
  const revision = async (raw: unknown): Promise<unknown> => {
    session.assertActive()
    const input = { ...(raw as { id?: string; path?: string; url?: string }) }
    if (input.id) return requireSideNote(input.id, session)
    const value = input.path ? await api.vault.fileInfo(input.path) : { url: input.url }
    session.assertActive()
    return value
  }
  const idInput = { schema: object({ id: text }, ['id']), parse: (raw: unknown) => ({ id: requiredText(record(raw).id, 'SideNote id') }), fromCli: (args: string[]) => ({ id: args[0] }) }
  const register = <I, O, E extends 'read' | 'write' | 'execute'>(command: PluginCommand<I, O, E>): (() => void) => {
    const registration: PluginCommand<I, O, E> & { outputSchema: Record<string, unknown> } = { ...command, outputSchema: command.id === 'list' ? { type: 'array', items: noteResultSchema, maxItems: 10000 } : noteResultSchema }
    return api.commands.register(registration)
  }
  const offs = [
    register({ id: 'list', label: 'SideNotes: List annotations', labelKey: 'sideNotes.command.list', paletteSafe: false, sideEffect: 'read', input: {
      schema: object({ path: text, url: text, query: text, flagged: { type: 'boolean' } }),
      parse: (raw) => {
        const input = raw == null ? {} : record(raw)
        for (const key of ['path', 'url', 'query']) if (input[key] !== undefined && typeof input[key] !== 'string') throw new Error(`Expected ${key} text.`)
        if (input.flagged !== undefined && typeof input.flagged !== 'boolean') throw new Error('Expected a boolean flag.')
        return { path: input.path as string | undefined, url: input.url as string | undefined, query: input.query as string | undefined, flagged: input.flagged as boolean | undefined }
      }
    }, run: async (input) => {
      session.assertActive()
      const accepted = { ...input }
      const notes = await session.reader.load()
      session.assertActive()
      return notes.filter((note) => (!accepted.path || note.path === accepted.path) && (!accepted.url || note.url === normalizeUrl(accepted.url)) && (accepted.flagged === undefined || !!note.flagged === accepted.flagged) && (!accepted.query || `${note.note} ${note.tags.join(' ')}`.toLowerCase().includes(accepted.query.toLowerCase())))
    } }),
    register({ id: 'get', label: 'SideNotes: Get annotation', labelKey: 'sideNotes.command.get', paletteSafe: false, sideEffect: 'read', input: idInput, run: ({ id }) => requireSideNote(id, session) }),
    register({ id: 'open', label: 'SideNotes: Open annotation', labelKey: 'sideNotes.command.open', paletteSafe: false, sideEffect: 'execute', input: idInput, run: async ({ id }) => {
      const note = await requireSideNote(id, session)
      await openSideNoteSubject(api, note, session.assertActive)
      session.assertActive()
      await api.workspace.revealOwnPanel('right_sidebar')
      session.assertActive()
      edits.publish(note)
      return note
    } }),
    register({
      id: 'create',
      label: 'SideNotes: Create annotation',
      labelKey: 'sideNotes.command.create',
      paletteSafe: false,
      sideEffect: 'write',
      input: {
      schema: object({ path: text, url: text, note: { type: 'string', minLength: 1 }, tags, anchor: anchorSchema }, ['note']),
      parse: (raw) => {
        const input = record(raw)
        const path = typeof input.path === 'string' ? input.path.trim() : ''
        const url = typeof input.url === 'string' ? input.url.trim() : ''
        if (!!path === !!url) throw new Error('Provide exactly one file path or URL.')
        if (url && !/^https?:\/\//i.test(url)) throw new Error('Expected an HTTP or HTTPS URL.')
        return { path, url, ...parseNoteValues({ note: requiredText(input.note, 'note text'), tags: input.tags, anchor: input.anchor }) }
      }
    },
      run: async (input) => {
      const accepted = copyValues(input)
      const note = await beforeEffect(async () => {
        session.assertActive()
        if (accepted.path) {
          const file = await api.vault.fileInfo(accepted.path)
          session.assertActive()
          if (!file) refused('TARGET_NOT_FOUND', 'The annotation file does not exist.')
        }
        const anchor = accepted.anchor ?? { type: 'none' as const }
        if (!(accepted.url ? anchorOptionsForWeb() : anchorOptions(accepted.path)).includes(anchor.type)) refused('INVALID_INPUT', 'This anchor does not apply to the annotation subject.')
        const note = accepted.url ? makeWebNote(normalizeUrl(accepted.url), accepted.note!, anchor, accepted.tags) : makeNote(accepted.path, accepted.note!, await enrichAnchor(accepted.path, anchor, session), accepted.tags)
        session.assertActive()
        return note
      })
      await appendNoteOrThrow(note, session)
      let expected: SideNoteRecord | undefined = copyNote(await committedSideNote(note.id, session))
      return { value: copyNote(note), revert: { label: 'Create SideNote', run: async () => {
        await unchangedSideNote(note.id, expected, session)
        await settleTracked(() => deleteNoteOrThrow(note.id, session), () => { expected = undefined })
      }, reapply: async () => {
        session.assertActive()
        await appendNoteOrThrow(note, session)
        expected = copyNote(await committedSideNote(note.id, session))
      } } }
    },
      revision: (input) => revision(input),
      preview: (input) => { session.assertActive(); return { changes: input } }
    }),
    register({
      id: 'update',
      label: 'SideNotes: Edit annotation',
      labelKey: 'sideNotes.command.update',
      paletteSafe: false,
      sideEffect: 'write',
      input: {
      schema: object({ id: text, values: noteValuesSchema, expectedUpdatedAt: text }, ['id', 'values']),
      parse: (raw) => { const input = record(raw); return { id: requiredText(input.id, 'SideNote id'), values: parseNoteValues(input.values), expectedUpdatedAt: input.expectedUpdatedAt === undefined ? undefined : requiredText(input.expectedUpdatedAt, 'revision') } }
    },
      run: ({ id, values, expectedUpdatedAt }) => saveNoteValues(id, values, expectedUpdatedAt, undefined, session),
      revision: (input) => revision(input),
      preview: (input) => { session.assertActive(); return { changes: input } }
    }),
    register({
      id: 'delete',
      label: 'SideNotes: Delete annotation',
      labelKey: 'sideNotes.command.delete',
      paletteSafe: false,
      sideEffect: 'write',
      input: idInput,
      run: async ({ id }) => {
      const note = await beforeEffect(async () => {
        const note = copyNote(await requireSideNote(id, session))
        session.assertActive()
        return note
      })
      await deleteNoteOrThrow(id, session)
      let expected: SideNoteRecord | undefined
      return { value: copyNote(note), revert: { label: 'Delete SideNote', run: async () => {
        session.assertActive()
        await appendNoteOrThrow(note, session)
        expected = copyNote(await committedSideNote(id, session))
      }, reapply: async () => {
        await unchangedSideNote(id, expected, session)
        await settleTracked(() => deleteNoteOrThrow(id, session), () => { expected = undefined })
      } } }
    },
      revision: (input) => revision(input),
      preview: (input) => { session.assertActive(); return { changes: input } }
    })
  ]
  return () => { disposed = true; offs.forEach((off) => off()) }
}
