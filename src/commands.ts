import { WEB_NAVIGATOR_V1, type ValleyPluginApi } from '@valley/plugin-sdk'
import { appendNote, deleteNote, loadNotes, makeNote, makeWebNote, updateNote, type DocumentRevision } from './data'
import { anchorOptions, anchorOptionsForWeb, enrichTextAnchor } from './anchors'
import { normalizeUrl } from './web'
import type { SideNoteAnchor, SideNoteRecord } from './types'
import { sideNoteEditStore } from './runtime'

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

export async function requireSideNote(id: string): Promise<SideNoteRecord> {
  const note = (await loadNotes()).find((entry) => entry.id === id)
  if (!note) throw new Error('The SideNote no longer exists.')
  return note
}

export async function saveNoteValues(id: string, values: ReturnType<typeof parseNoteValues>, expectedUpdatedAt?: string, documentRevision?: DocumentRevision) {
  const previous = await requireSideNote(id)
  if (expectedUpdatedAt !== undefined && previous.updatedAt !== expectedUpdatedAt) throw new Error('This SideNote changed elsewhere. Your draft has been preserved; reload it before saving.')
  let anchor = values.anchor ?? previous.anchor
  if (values.anchor) {
    const allowed = previous.url ? anchorOptionsForWeb() : anchorOptions(previous.path)
    if (!allowed.includes(anchor.type)) throw new Error('This anchor does not apply to the SideNote subject.')
    anchor = await enrichTextAnchor(previous.path, anchor)
  }
  const next = { ...previous, ...values, anchor, updatedAt: new Date().toISOString() }
  if (!(await updateNote(id, next, previous.updatedAt, documentRevision))) throw new Error('Could not save the SideNote.')
  return { value: next, revert: { label: 'Edit SideNote', run: async () => { if (!(await updateNote(id, previous))) throw new Error('Could not restore the SideNote.') }, reapply: async () => { if (!(await updateNote(id, next))) throw new Error('Could not reapply the SideNote edit.') } } }
}

export async function openSideNoteSubject(api: ValleyPluginApi, note: Pick<SideNoteRecord, 'path' | 'url' | 'anchor'>): Promise<void> {
  if (note.url) {
    const provider = api.interop.services.providers(WEB_NAVIGATOR_V1)[0]
    if (!provider) throw new Error('A browser provider is unavailable.')
    const result = await provider.invoke('open', [{ url: note.url }])
    if (!result.ok) throw new Error(result.error.message)
  } else {
    if (!(await api.vault.fileInfo(note.path))) throw new Error('The annotation file no longer exists.')
    api.workspace.openFile(note.path, note.anchor.type === 'web-selection' ? undefined : note.anchor)
  }
}

export function registerSideNoteCommands(api: ValleyPluginApi): () => void {
  const revision = async (raw: unknown): Promise<unknown> => {
    const input = raw as { id?: string; path?: string; url?: string }
    if (input.id) return requireSideNote(input.id)
    return input.path ? api.vault.fileInfo(input.path) : { url: input.url }
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
    }, run: async (input) => (await loadNotes()).filter((note) => (!input.path || note.path === input.path) && (!input.url || note.url === normalizeUrl(input.url)) && (input.flagged === undefined || !!note.flagged === input.flagged) && (!input.query || `${note.note} ${note.tags.join(' ')}`.toLowerCase().includes(input.query.toLowerCase()))) }),
    api.commands.register({ id: 'get', label: 'SideNotes: Get annotation', labelKey: 'sideNotes.command.get', paletteSafe: false, sideEffect: 'read', input: idInput, run: ({ id }) => requireSideNote(id) }),
    api.commands.register({ id: 'open', label: 'SideNotes: Open annotation', labelKey: 'sideNotes.command.open', paletteSafe: false, sideEffect: 'read', input: idInput, run: async ({ id }) => {
      const note = await requireSideNote(id)
      await openSideNoteSubject(api, note)
      await api.workspace.revealOwnPanel('right_sidebar')
      sideNoteEditStore().publish(note)
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
      if (input.path && !(await api.vault.fileInfo(input.path))) throw new Error('The annotation file does not exist.')
      const anchor = input.anchor ?? { type: 'none' as const }
      if (!(input.url ? anchorOptionsForWeb() : anchorOptions(input.path)).includes(anchor.type)) throw new Error('This anchor does not apply to the annotation subject.')
      const note = input.url ? makeWebNote(normalizeUrl(input.url), input.note!, anchor, input.tags) : makeNote(input.path, input.note!, await enrichTextAnchor(input.path, anchor), input.tags)
      if (!(await appendNote(note))) throw new Error('Could not create the SideNote.')
      return { value: note, revert: { label: 'Create SideNote', run: async () => { await deleteNote(note.id) }, reapply: async () => { await appendNote(note) } } }
    },
      revision: (input) => revision(input),
      preview: (input) => ({ changes: input })
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
      run: ({ id, values, expectedUpdatedAt }) => saveNoteValues(id, values, expectedUpdatedAt),
      revision: (input) => revision(input),
      preview: (input) => ({ changes: input })
    }),
    api.commands.register({
      id: 'delete',
      label: 'SideNotes: Delete annotation',
      labelKey: 'sideNotes.command.delete',
      paletteSafe: false,
      sideEffect: 'write',
      input: idInput,
      run: async ({ id }) => {
      const note = await requireSideNote(id)
      if (!(await deleteNote(id))) throw new Error('Could not delete the SideNote.')
      return { value: note, revert: { label: 'Delete SideNote', run: async () => { await appendNote(note) }, reapply: async () => { await deleteNote(id) } } }
    },
      revision: (input) => revision(input),
      preview: (input) => ({ changes: input })
    })
  ]
  return () => offs.forEach((off) => off())
}
