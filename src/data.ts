import type { DataRecord } from '@valley/plugin-sdk/types'
import type { DatasetRecord, DatasetTransactionOperation, DatasetWhere, NoteInputProps, ValleyPluginApi } from '@valley/plugin-sdk'
import { api, runtimeGeneration } from './runtime'
import type { SideNoteAnchor, SideNoteFileKey, SideNoteRecord } from './types'
import { normalizeUrl } from './web'
import { NoteRepository, type NoteReadScope } from './noteRepository'

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
  // A note needs a body and a subject — either a realm file (`path`) or a web
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

export interface NoteMutationSession {
  readonly api: ValleyPluginApi
  readonly reader: NoteRepository
  isActive(): boolean
  assertActive(): void
}

export function captureNoteMutation(owner: ValleyPluginApi = api, assertAllowed?: () => void): NoteMutationSession {
  const generation = runtimeGeneration
  const assertCurrent = (): void => {
    assertAllowed?.()
    if (owner !== api || generation !== runtimeGeneration) throw new Error('SideNotes mutation session is no longer active')
  }
  assertCurrent()
  const reader = noteRepository()
  return {
    api: owner,
    reader,
    isActive: () => {
      try { assertCurrent(); return reader.isActive() } catch { return false }
    },
    assertActive: () => {
      assertCurrent()
      if (!reader.isActive()) throw new Error('SideNotes mutation session is no longer active')
    }
  }
}

export function copyNote(record: SideNoteRecord): SideNoteRecord {
  return {
    ...record,
    tags: [...record.tags],
    pathHistory: [...record.pathHistory],
    anchor: { ...record.anchor },
    ...(record.fileKey ? { fileKey: { ...record.fileKey } } : {})
  }
}

async function withFileKey(record: SideNoteRecord, session: NoteMutationSession): Promise<SideNoteRecord> {
  session.assertActive()
  if (!record.path) return record
  const key = await session.api.realm.stat(record.path)
  session.assertActive()
  return key ? { ...record, fileKey: { dev: key.dev, ino: key.ino } } : record
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

async function allRows(session: NoteMutationSession, dataset: string, where?: DatasetWhere): Promise<DatasetRecord[]> {
  const rows: DatasetRecord[] = []
  let cursor: string | undefined
  do {
    session.assertActive()
    const page = await session.api.data.dataset(dataset).query({ where, limit: 1000, cursor })
    session.assertActive()
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

async function relationDeletes(session: NoteMutationSession, noteId: string): Promise<DatasetTransactionOperation[]> {
  const results = await Promise.allSettled([
    allRows(session, TAGS_DATASET, { noteId }),
    allRows(session, PATH_HISTORY_DATASET, { noteId })
  ])
  const failure = results.find((result) => result.status === 'rejected')
  if (failure?.status === 'rejected') throw failure.reason
  session.assertActive()
  const [tags, history] = results.map((result) => (result as PromiseFulfilledResult<DatasetRecord[]>).value)
  return [
    ...tags.map((row) => ({ dataset: TAGS_DATASET, operation: 'delete' as const, key: { noteId, tag: String(row.tag) } })),
    ...history.map((row) => ({ dataset: PATH_HISTORY_DATASET, operation: 'delete' as const, key: { noteId, position: Number(row.position) } }))
  ]
}

export function noteRepository(): NoteRepository {
  const owner = api
  const generation = runtimeGeneration
  const root = owner.getState().realm?.path ?? null
  const slot = owner.runtime.getOrCreate('sideNotes.noteRepository', () => ({ current: null as NoteRepository | null }))
  if (slot.current?.isActive()) return slot.current
  slot.current?.dispose()
  slot.current = new NoteRepository(owner, () => {
    if (owner !== api || generation !== runtimeGeneration) return false
    try { return (owner.getState().realm?.path ?? null) === root } catch { return false }
  }, (row) => normalize(row as DataRecord))
  return slot.current
}

export function loadNotes(scope?: NoteReadScope): Promise<SideNoteRecord[]> {
  return noteRepository().load(scope)
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

type NoteWriteOutcome = 'not-applied' | 'unknown'
const STORE_REFUSAL_CODES: Record<string, string> = { conflict: 'REVISION_CONFLICT', 'document-not-found': 'TARGET_NOT_FOUND' }

function failure(error: unknown): Error & { code?: unknown; outcome?: unknown; outcomeUnknown?: unknown; retryable?: unknown } {
  return error instanceof Error ? error : new Error(String(error))
}

function settled(error: unknown, outcome: NoteWriteOutcome, code: string): Error {
  const problem = failure(error)
  const retryable = outcome === 'not-applied' && problem.retryable === true
  return Object.assign(problem, { code: typeof problem.code === 'string' ? STORE_REFUSAL_CODES[problem.code] ?? problem.code : code, outcome, retryable })
}

function isUnknown(error: unknown): boolean {
  const problem = failure(error)
  return problem.outcome === 'unknown' || problem.outcomeUnknown === true
}

function refusedBeforeEffect(error: unknown, code = 'TARGET_UNAVAILABLE'): Error {
  return isUnknown(error) ? failure(error) : settled(error, 'not-applied', code)
}

/** Classifies a rejected host write: a coded store refusal is not applied; anything else may have committed. */
function rejectedWrite(error: unknown): Error {
  if (isUnknown(error)) return settled(error, 'unknown', 'OUTCOME_UNKNOWN')
  const problem = failure(error)
  return typeof problem.code === 'string' ? settled(problem, 'not-applied', problem.code) : problem
}

function refusal(code: string, message: string): Error {
  return Object.assign(new Error(message), { code, outcome: 'not-applied' as const, retryable: false })
}

/** Runs a step that happens before any write is dispatched; its failures become known no-effect refusals. */
export async function beforeEffect<T>(step: () => Promise<T>): Promise<T> {
  try { return await step() } catch (error) { throw refusedBeforeEffect(error) }
}

async function dispatchWrite<T>(write: () => Promise<T>): Promise<T> {
  try { return await write() } catch (error) { throw rejectedWrite(error) }
}

async function insertNote(next: SideNoteRecord, session: NoteMutationSession): Promise<void> {
  await beforeEffect(async () => session.assertActive())
  await dispatchWrite(() => session.api.data.transaction([
    { dataset: NOTES_DATASET, operation: 'insert', values: noteRow(next) },
    ...relationWrites(next)
  ]))
}

export async function appendNote(record: SideNoteRecord, session = captureNoteMutation()): Promise<boolean> {
  const next = await withFileKey(copyNote(record), session)
  try {
    await insertNote(next, session)
    return true
  } catch {
    return false
  }
}

/** Like appendNote, but rejects with a coded outcome ('not-applied' or 'unknown') instead of returning false. */
export async function appendNoteOrThrow(record: SideNoteRecord, session = captureNoteMutation()): Promise<void> {
  const next = await beforeEffect(() => withFileKey(copyNote(record), session))
  await insertNote(next, session)
}

export type DocumentRevision = Parameters<NonNullable<NoteInputProps['onRevisionChange']>>[0]

async function writeNoteUpdate(id: string, next: SideNoteRecord, expectedUpdatedAt: string | undefined, revision: DocumentRevision | undefined, session: NoteMutationSession): Promise<void> {
  const ref = { pluginId: session.api.pluginId, sourceId: 'notes', itemId: id }
  const { baseline, deletes } = await beforeEffect(async () => {
    session.assertActive()
    const baseline = await session.api.documents.read(ref)
    session.assertActive()
    if (!baseline) throw refusal('TARGET_NOT_FOUND', 'The SideNote no longer exists.')
    if (expectedUpdatedAt !== undefined) {
      const current = await session.api.data.dataset(NOTES_DATASET).get({ id })
      session.assertActive()
      if (!current) throw refusal('TARGET_NOT_FOUND', 'The SideNote no longer exists.')
      if (current.updatedAt !== expectedUpdatedAt) throw refusal('REVISION_CONFLICT', 'This SideNote changed elsewhere. Newer work was preserved.')
    }
    const deletes = await relationDeletes(session, id)
    session.assertActive()
    return { baseline, deletes }
  })
  const row = noteRow(next)
  delete row.id
  delete row.note
  await dispatchWrite(() => session.api.documents.update(ref, {
    expectedRevision: revision?.expectedRevision ?? baseline.revision,
    realmGeneration: revision?.realmGeneration ?? baseline.realmGeneration,
    body: next.note,
    explicitTags: next.tags,
    operations: [
      { dataset: NOTES_DATASET, operation: 'update', key: { id }, values: row },
      ...deletes.filter((operation) => operation.dataset !== TAGS_DATASET),
      ...relationWrites(next).filter((operation) => operation.dataset !== TAGS_DATASET)
    ]
  }))
}

export async function updateNote(id: string, record: SideNoteRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, session = captureNoteMutation()): Promise<boolean> {
  const revision = documentRevision ? { ...documentRevision } : undefined
  const next = await withFileKey({ ...copyNote(record), id }, session)
  try {
    await writeNoteUpdate(id, next, expectedUpdatedAt, revision, session)
    return true
  } catch {
    return false
  }
}

/** Like updateNote, but rejects with a coded outcome ('not-applied' or 'unknown') instead of returning false. */
export async function updateNoteOrThrow(id: string, record: SideNoteRecord, expectedUpdatedAt?: string, documentRevision?: DocumentRevision, session = captureNoteMutation()): Promise<void> {
  const revision = documentRevision ? { ...documentRevision } : undefined
  const next = await beforeEffect(() => withFileKey({ ...copyNote(record), id }, session))
  await writeNoteUpdate(id, next, expectedUpdatedAt, revision, session)
}

async function removeNote(id: string, session: NoteMutationSession): Promise<void> {
  await beforeEffect(async () => session.assertActive())
  const { affected } = await dispatchWrite(() => session.api.data.dataset(NOTES_DATASET).delete({ id }))
  if (affected <= 0) throw refusal('TARGET_NOT_FOUND', 'The SideNote no longer exists.')
}

export async function deleteNote(id: string, session = captureNoteMutation()): Promise<boolean> {
  try {
    await removeNote(id, session)
    return true
  } catch {
    return false
  }
}

/** Like deleteNote, but rejects with a coded outcome ('not-applied' or 'unknown') instead of returning false. */
export async function deleteNoteOrThrow(id: string, session = captureNoteMutation()): Promise<void> {
  await removeNote(id, session)
}

/** Retarget notes after an in-app rename/move (mirrors core retargetSideNotePaths). */
export async function retargetNotes(oldPath: string, newPath: string, session = captureNoteMutation()): Promise<void> {
  try {
    if (!oldPath || !newPath || oldPath === newPath) return
    session.assertActive()
    const notes = await session.reader.load()
    session.assertActive()
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
      session.assertActive()
      await updateNote(note.id, next, undefined, undefined, session)
      session.assertActive()
    }
  } catch (error) {
    if (session.isActive()) throw error
  }
}

/** Shift markdown-line anchors after a line insert/delete (mirrors core shiftSideNoteLines). */
export async function shiftLines(path: string, fromLine: number, delta: number, session = captureNoteMutation()): Promise<void> {
  try {
    if (!Number.isFinite(delta) || delta === 0 || !path) return
    const start = Math.max(1, Math.floor(fromLine))
    session.assertActive()
    const notes = await session.reader.load()
    session.assertActive()
    for (const note of notes) {
      if (note.path !== path || note.anchor.type !== 'markdown-line' || note.anchor.line < start) continue
      const next: SideNoteRecord = {
        ...note,
        anchor: { ...note.anchor, line: Math.max(1, note.anchor.line + delta) },
        updatedAt: nowIso()
      }
      session.assertActive()
      await updateNote(note.id, next, undefined, undefined, session)
      session.assertActive()
    }
  } catch (error) {
    if (session.isActive()) throw error
  }
}
