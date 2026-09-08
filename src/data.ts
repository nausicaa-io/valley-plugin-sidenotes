import type { DataRecord } from '@valley/plugin-sdk/types'
import type { DatasetRecord, DatasetTransactionOperation, DatasetWhere, NoteInputProps } from '@valley/plugin-sdk'
import { api } from './runtime'
import type { SideNoteAnchor, SideNoteFileKey, SideNoteRecord } from './types'
import { normalizeUrl } from './web'

const NOTES_DATASET = 'sideNotes.notes'
const TAGS_DATASET = 'sideNotes.note_tags'
const PATH_HISTORY_DATASET = 'sideNotes.path_history'

export function onChanged(cb: () => void): () => void {
  const disposers = [NOTES_DATASET, TAGS_DATASET, PATH_HISTORY_DATASET]
    .map((dataset) => api.data.dataset(dataset).subscribe(cb))
  return () => disposers.forEach((dispose) => dispose())
}

export function sideNoteId(): string {
  return `sidenote_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
function nowIso(): string {
  return new Date().toISOString()
}

function num(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}
function str(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function normalizeAnchor(value: unknown): SideNoteAnchor {
  if (!value || typeof value !== 'object') return { type: 'none' }
  const raw = value as Record<string, unknown>
  const type = str(raw.type)
  if (type === 'pdf-page') {
    const snippet = str(raw.snippet).trim()
    return { type, page: Math.max(1, Math.floor(num(raw.page, 1))), ...(snippet ? { snippet } : {}) }
  }
  if (type === 'pdf-region')
    return {
      type,
      page: Math.max(1, Math.floor(num(raw.page, 1))),
      x: num(raw.x, 0), y: num(raw.y, 0), width: num(raw.width, 0.2), height: num(raw.height, 0.2)
    }
  if (type === 'media-time') return { type, seconds: Math.max(0, num(raw.seconds, 0)) }
  if (type === 'markdown-line') {
    const snippet = str(raw.snippet).trim()
    return { type, line: Math.max(1, Math.floor(num(raw.line, 1))), ...(snippet ? { snippet } : {}) }
  }
  if (type === 'markdown-heading') {
    const heading = str(raw.heading).trim()
    return heading ? { type, heading, line: raw.line === undefined ? undefined : Math.max(1, Math.floor(num(raw.line, 1))) } : { type: 'none' }
  }
  if (type === 'markdown-snippet') {
    const snippet = str(raw.snippet).trim()
    return snippet ? { type, snippet, line: raw.line === undefined ? undefined : Math.max(1, Math.floor(num(raw.line, 1))) } : { type: 'none' }
  }
  if (type === 'image-region')
    return { type, x: num(raw.x, 0), y: num(raw.y, 0), width: num(raw.width, 0.25), height: num(raw.height, 0.25) }
  if (type === 'web-selection') {
    const snippet = str(raw.snippet).trim()
    return snippet ? { type, snippet } : { type: 'none' }
  }
  return { type: 'none' }
}

function normalizeFileKey(value: unknown): SideNoteFileKey | undefined {
  if (!value || typeof value !== 'object') return undefined
  const raw = value as Partial<SideNoteFileKey>
  if (typeof raw.dev !== 'number' || typeof raw.ino !== 'number') return undefined
  return { dev: raw.dev, ino: raw.ino }
}

function normalize(raw: DataRecord): SideNoteRecord | null {
  const id = str(raw.id).trim()
  const path = str(raw.path).trim()
  const url = normalizeUrl(str(raw.url))
  const note = str(raw.note).trim()
  // A note needs a body and a subject — either a vault file (`path`) or a web
  // page (`url`). A web note carries `url` and an empty `path`.
  if (!id || !note || (!path && !url)) return null
  const createdAt = str(raw.createdAt) || nowIso()
  const history = Array.isArray(raw.pathHistory)
    ? raw.pathHistory.filter((p): p is string => typeof p === 'string' && p !== path)
    : []
  return {
    id, path, note,
    ...(url ? { url } : {}),
    pathHistory: [...new Set(history)],
    flagged: raw.flagged === true,
    tags: Array.isArray(raw.tags)
      ? raw.tags.filter((t): t is string => typeof t === 'string' && !!t.trim()).map((t) => (t as string).trim())
      : [],
    anchor: normalizeAnchor(raw.anchor),
    fileKey: normalizeFileKey(raw.fileKey),
    createdAt,
    updatedAt: str(raw.updatedAt) || createdAt
  }
}

async function withFileKey(record: SideNoteRecord): Promise<SideNoteRecord> {
  // Web notes have no vault file to stat — leave them untouched.
  if (!record.path) return record
  const key = await api.vault.stat(record.path)
  return key ? { ...record, fileKey: key } : record
}

function noteRow(record: SideNoteRecord): DatasetRecord {
  return {
    id: record.id,
    path: record.path,
    url: record.url ?? null,
    note: record.note,
    flagged: record.flagged === true,
    anchor: record.anchor,
    fileKey: record.fileKey ? { dev: record.fileKey.dev, ino: record.fileKey.ino } : null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  }
}

async function allRows(dataset: string, where?: DatasetWhere): Promise<DatasetRecord[]> {
  const rows: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    const page = await api.data.dataset(dataset).query({ where, limit: 1000, cursor })
    rows.push(...page.rows)
    cursor = page.cursor
  } while (cursor)
  return rows
}

function relationWrites(record: SideNoteRecord): DatasetTransactionOperation[] {
  return [
    ...record.tags.map((tag) => ({
      dataset: TAGS_DATASET,
      operation: 'insert' as const,
      values: { noteId: record.id, tag }
    })),
    ...record.pathHistory.map((path, position) => ({
      dataset: PATH_HISTORY_DATASET,
      operation: 'insert' as const,
      values: { noteId: record.id, position, path }
    }))
  ]
}

async function relationDeletes(noteId: string): Promise<DatasetTransactionOperation[]> {
  const [tags, history] = await Promise.all([
    allRows(TAGS_DATASET, { noteId }),
    allRows(PATH_HISTORY_DATASET, { noteId })
  ])
  return [
    ...tags.map((row) => ({ dataset: TAGS_DATASET, operation: 'delete' as const, key: { noteId, tag: String(row.tag) } })),
    ...history.map((row) => ({ dataset: PATH_HISTORY_DATASET, operation: 'delete' as const, key: { noteId, position: Number(row.position) } }))
  ]
}

interface NoteLoadState {
  pending: Promise<SideNoteRecord[]> | null
}

function noteLoadState(): NoteLoadState {
  return api.runtime.getOrCreate('sideNotes.noteLoad', () => ({ pending: null }))
}

async function readNotes(): Promise<SideNoteRecord[]> {
  const [raw, tags, history] = await Promise.all([
    allRows(NOTES_DATASET),
    allRows(TAGS_DATASET),
    allRows(PATH_HISTORY_DATASET)
  ])
  const tagsByNote = new Map<string, unknown[]>()
  for (const entry of tags) {
    const noteId = str(entry.noteId)
    if (!noteId) continue
    const values = tagsByNote.get(noteId)
    if (values) values.push(entry.tag)
    else tagsByNote.set(noteId, [entry.tag])
  }
  const historyByNote = new Map<string, DatasetRecord[]>()
  for (const entry of history) {
    const noteId = str(entry.noteId)
    if (!noteId) continue
    const values = historyByNote.get(noteId)
    if (values) values.push(entry)
    else historyByNote.set(noteId, [entry])
  }
  for (const values of historyByNote.values()) {
    values.sort((a, b) => Number(a.position) - Number(b.position))
  }
  return raw
    .map((row) => normalize({
      ...row,
      tags: tagsByNote.get(str(row.id)) ?? [],
      pathHistory: (historyByNote.get(str(row.id)) ?? []).map((entry) => entry.path)
    } as DataRecord))
    .filter((note): note is SideNoteRecord => note !== null)
}

export function loadNotes(): Promise<SideNoteRecord[]> {
  const state = noteLoadState()
  if (state.pending) return state.pending
  const pending = readNotes()
  const clear = (): void => {
    if (state.pending === pending) state.pending = null
  }
  state.pending = pending
  void pending.then(clear, clear)
  return pending
}

export function makeNote(path: string, text: string, anchor: SideNoteAnchor, tags: string[] = []): SideNoteRecord {
  const now = nowIso()
  return {
    id: sideNoteId(),
    path,
    pathHistory: [],
    note: text.trim(),
    flagged: false,
    tags,
    anchor,
    createdAt: now,
    updatedAt: now
  }
}

/** A web note: keyed by the (already normalized) page URL, with an empty `path`. */
export function makeWebNote(url: string, text: string, anchor: SideNoteAnchor, tags: string[] = []): SideNoteRecord {
  const now = nowIso()
  return {
    id: sideNoteId(),
    path: '',
    url,
    pathHistory: [],
    note: text.trim(),
    flagged: false,
    tags,
    anchor,
    createdAt: now,
    updatedAt: now
  }
}

export async function appendNote(record: SideNoteRecord): Promise<boolean> {
  const next = await withFileKey(record)
  try {
    await api.data.transaction([
      { dataset: NOTES_DATASET, operation: 'insert', values: noteRow(next) },
      ...relationWrites(next)
    ])
    return true
  } catch {
    return false
  }
}

export type DocumentRevision = Parameters<NonNullable<NoteInputProps['onRevisionChange']>>[0]

export async function updateNote(id: string, record: SideNoteRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision): Promise<boolean> {
  const next = await withFileKey({ ...record, id })
  try {
    const ref = { pluginId: api.pluginId, sourceId: 'notes', itemId: id }
    const baseline = await api.documents.read(ref)
    if (!baseline) return false
    if (expectedUpdatedAt !== undefined && (await api.data.dataset(NOTES_DATASET).get({ id }))?.updatedAt !== expectedUpdatedAt) return false
    const row = noteRow(next)
    delete row.id
    delete row.note
    await api.documents.update(ref, {
      expectedRevision: documentRevision?.expectedRevision ?? baseline.revision,
      vaultGeneration: documentRevision?.vaultGeneration ?? baseline.vaultGeneration,
      body: next.note,
      explicitTags: next.tags,
      operations: [
        { dataset: NOTES_DATASET, operation: 'update', key: { id }, values: row },
        ...(await relationDeletes(id)).filter((operation) => operation.dataset !== TAGS_DATASET),
        ...relationWrites(next).filter((operation) => operation.dataset !== TAGS_DATASET)
      ]
    })
    return true
  } catch {
    return false
  }
}

export async function deleteNote(id: string): Promise<boolean> {
  try {
    return (await api.data.dataset(NOTES_DATASET).delete({ id })).affected > 0
  } catch {
    return false
  }
}

/** Retarget notes after an in-app rename/move (mirrors core retargetSideNotePaths). */
export async function retargetNotes(oldPath: string, newPath: string): Promise<void> {
  if (!oldPath || !newPath || oldPath === newPath) return
  const notes = await loadNotes()
  const prefix = `${oldPath}/`
  for (const note of notes) {
    if (note.path !== oldPath && !note.path.startsWith(prefix)) continue
    const path = note.path === oldPath ? newPath : `${newPath}/${note.path.slice(prefix.length)}`
    const next: SideNoteRecord = {
      ...note,
      path,
      pathHistory: [note.path, ...note.pathHistory.filter((p) => p !== note.path)],
      updatedAt: nowIso()
    }
    await updateNote(note.id, next)
  }
}

/** Shift markdown-line anchors after a line insert/delete (mirrors core shiftSideNoteLines). */
export async function shiftLines(path: string, fromLine: number, delta: number): Promise<void> {
  if (!Number.isFinite(delta) || delta === 0 || !path) return
  const start = Math.max(1, Math.floor(fromLine))
  const notes = await loadNotes()
  for (const note of notes) {
    if (note.path !== path || note.anchor.type !== 'markdown-line' || note.anchor.line < start) continue
    const next: SideNoteRecord = {
      ...note,
      anchor: { ...note.anchor, line: Math.max(1, note.anchor.line + delta) },
      updatedAt: nowIso()
    }
    await updateNote(note.id, next)
  }
}
