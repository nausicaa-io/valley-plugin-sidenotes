import { WEB_NAVIGATOR_V1, type ValleyPluginApi } from '@valley/plugin-sdk'
import { appendNote, captureNoteMutation, copyNote, deleteNote, makeNote, makeWebNote, updateNote, type DocumentRevision, type NoteMutationSession } from './data'
import { anchorOptions, anchorOptionsForWeb, enrichTextAnchor } from './anchors'
import { normalizeUrl } from './web'
import type { SideNoteAnchor, SideNoteRecord } from './types'
import { sideNoteEditStore } from './runtime'
import { AnchorReads } from './anchorReads'

const text = { type: 'string' }
const tags = { type: 'array', items: text }
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
export const noteValuesSchema = object({ note: { type: 'string', minLength: 1 }, tags, flagged: { type: 'boolean' }, anchor: anchorSchema })

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
  if (!note) throw new Error('The SideNote no longer exists.')
  return note
}

export async function saveNoteValues(id: string, values: ReturnType<typeof parseNoteValues>, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, session = captureNoteMutation()) {
  session.assertActive()
  const admitted = copyValues(values)
  const revision = documentRevision ? { ...documentRevision } : undefined
  const previous = copyNote(await requireSideNote(id, session))
  session.assertActive()
  if (expectedUpdatedAt !== undefined && previous.updatedAt !== expectedUpdatedAt) throw new Error('This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.')
  let anchor = admitted.anchor ?? previous.anchor
  if (admitted.anchor) {
    const allowed = previous.url ? anchorOptionsForWeb() : anchorOptions(previous.path)
    if (!allowed.includes(anchor.type)) throw new Error('This anchor does not apply to the SideNote subject.')
    anchor = await enrichAnchor(previous.path, anchor, session)
    session.assertActive()
  }
  const next = copyNote({ ...previous, ...admitted, anchor, updatedAt: new Date().toISOString() })
  if (!(await updateNote(id, next, previous.updatedAt, revision, session))) throw new Error('Could not save the SideNote.')
  return { value: copyNote(next), revert: { label: 'Edit SideNote', run: async () => {
    session.assertActive()
    if (!(await updateNote(id, previous, undefined, undefined, session))) throw new Error('Could not restore the SideNote.')
  }, reapply: async () => {
    session.assertActive()
    if (!(await updateNote(id, next, undefined, undefined, session))) throw new Error('Could not reapply the SideNote edit.')
  } } }
}

export async function openSideNoteSubject(api: ValleyPluginApi, note: Pick<SideNoteRecord, 'path' | 'url' | 'anchor'>, assertActive?: () => void): Promise<void> {
  const session = captureNoteMutation(api, assertActive)
  session.assertActive()
  const subject = { path: note.path, url: note.url, anchor: { ...note.anchor } }
  if (subject.url) {
    const provider = api.interop.services.providers(WEB_NAVIGATOR_V1)[0]
    if (!provider) throw new Error('A browser provider is unavailable.')
    const result = await provider.invoke('open', [{ url: subject.url }])
    session.assertActive()
    if (!result.ok) throw new Error(result.error.message)
  } else {
    const file = await api.vault.fileInfo(subject.path)
    session.assertActive()
    if (!file) throw new Error('The annotation file no longer exists.')
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
  const offs = [
    api.commands.register({ id: 'list', label: 'SideNotes: List annotations', labelKey: 'sideNotes.command.list', paletteSafe: false, sideEffect: 'read', input: {
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
    api.commands.register({ id: 'get', label: 'SideNotes: Get annotation', labelKey: 'sideNotes.command.get', paletteSafe: false, sideEffect: 'read', input: idInput, run: ({ id }) => requireSideNote(id, session) }),
    api.commands.register({ id: 'open', label: 'SideNotes: Open annotation', labelKey: 'sideNotes.command.open', paletteSafe: false, sideEffect: 'read', input: idInput, run: async ({ id }) => {
      const note = await requireSideNote(id, session)
      await openSideNoteSubject(api, note, session.assertActive)
      session.assertActive()
      await api.workspace.revealOwnPanel('right_sidebar')
      session.assertActive()
      edits.publish(note)
      return note
    } }),
    api.commands.register({
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
      session.assertActive()
      const accepted = copyValues(input)
      if (accepted.path) {
        const file = await api.vault.fileInfo(accepted.path)
        session.assertActive()
        if (!file) throw new Error('The annotation file does not exist.')
      }
      const anchor = accepted.anchor ?? { type: 'none' as const }
      if (!(accepted.url ? anchorOptionsForWeb() : anchorOptions(accepted.path)).includes(anchor.type)) throw new Error('This anchor does not apply to the annotation subject.')
      const note = accepted.url ? makeWebNote(normalizeUrl(accepted.url), accepted.note!, anchor, accepted.tags) : makeNote(accepted.path, accepted.note!, await enrichAnchor(accepted.path, anchor, session), accepted.tags)
      session.assertActive()
      if (!(await appendNote(note, session))) throw new Error('Could not create the SideNote.')
      return { value: copyNote(note), revert: { label: 'Create SideNote', run: async () => {
        session.assertActive()
        await deleteNote(note.id, session)
      }, reapply: async () => {
        session.assertActive()
        await appendNote(note, session)
      } } }
    },
      revision: (input) => revision(input),
      preview: (input) => { session.assertActive(); return { changes: input } }
    }),
    api.commands.register({
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
    api.commands.register({
      id: 'delete',
      label: 'SideNotes: Delete annotation',
      labelKey: 'sideNotes.command.delete',
      paletteSafe: false,
      sideEffect: 'write',
      input: idInput,
      run: async ({ id }) => {
      const note = copyNote(await requireSideNote(id, session))
      session.assertActive()
      if (!(await deleteNote(id, session))) throw new Error('Could not delete the SideNote.')
      return { value: copyNote(note), revert: { label: 'Delete SideNote', run: async () => {
        session.assertActive()
        await appendNote(note, session)
      }, reapply: async () => {
        session.assertActive()
        await deleteNote(id, session)
      } } }
    },
      revision: (input) => revision(input),
      preview: (input) => { session.assertActive(); return { changes: input } }
    })
  ]
  return () => { disposed = true; offs.forEach((off) => off()) }
}
