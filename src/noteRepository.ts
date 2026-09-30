import type { DatasetChangeEvent, DatasetQuery, DatasetRecord, ValleyPluginApi } from '@valley/plugin-sdk'
import type { SideNoteRecord } from './types'
import { normalizeUrl } from './web'

export type NoteScope = { kind: 'file'; path: string; includeWeb?: boolean } | { kind: 'web'; url: string } | { kind: 'none' }
export type NoteReadScope = NoteScope | { kind: 'ids'; ids: string[] }

const NOTES = 'sideNotes.notes'
const TAGS = 'sideNotes.note_tags'
const HISTORY = 'sideNotes.path_history'
const BATCH_SIZE = 100
const MAX_PENDING_SCOPES = 32
const MAX_RETAINED_SUBJECTS = 4096
const MAX_RETAINED_SUBJECT_STRING_BYTES = 4 * 1024 * 1024

export function noteScopeKey(scope?: NoteReadScope): string {
  if (!scope) return 'all'
  if (scope.kind === 'none') return 'none'
  if (scope.kind === 'ids') return JSON.stringify(['ids', [...new Set(scope.ids)].sort()])
  return JSON.stringify(scope.kind === 'file' ? ['file', scope.path, scope.includeWeb === true] : ['web', normalizeUrl(scope.url)])
}

async function settled<T extends unknown[]>(tasks: { [K in keyof T]: Promise<T[K]> }): Promise<T> {
  const results = await Promise.allSettled(tasks)
  const failure = results.find((result) => result.status === 'rejected')
  if (failure?.status === 'rejected') throw failure.reason
  return results.map((result) => (result as PromiseFulfilledResult<unknown>).value) as T
}

export class NoteRepository {
  private revision = 0
  private catalogRevision = 0
  private catalog: DatasetRecord[] | null = null
  private catalogKeys = new Set<string>()
  private dirtyKeys = new Set<string>()
  private sourceRevision: number | null = null
  private vaultGeneration: number | null = null
  private catalogPending: Promise<DatasetRecord[]> | null = null
  private pending = new Map<string, Promise<SideNoteRecord[]>>()
  private disposed = false
  private disposers: Array<() => void>
  private listeners = new Set<() => void>()

  constructor(
    private readonly api: ValleyPluginApi,
    private readonly isCurrent: () => boolean,
    private readonly normalize: (row: DatasetRecord) => SideNoteRecord | null
  ) {
    this.disposers = [NOTES, TAGS, HISTORY].map((dataset) => api.data.dataset(dataset).subscribe((event) => {
      if (!this.isActive()) return
      this.revision++
      const generationChanged = this.vaultGeneration !== null && this.vaultGeneration !== event.vaultGeneration
      this.vaultGeneration = event.vaultGeneration
      if (generationChanged) {
        this.catalogRevision++
        this.sourceRevision = null
        this.resetCatalog()
      }
      if (dataset === NOTES) {
        this.catalogRevision++
        this.changeSubjects(event)
      }
      if (this.isActive()) for (const listener of this.listeners) listener()
    }))
    this.disposers.push(api.subscribe(() => {
      if (!this.isCurrent()) this.dispose()
    }))
  }

  isActive(): boolean {
    return !this.disposed && this.isCurrent()
  }

  subscribe(listener: () => void): () => void {
    if (!this.isActive()) return () => {}
    this.listeners.add(listener)
    return () => { this.listeners.delete(listener) }
  }

  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    this.resetCatalog()
    this.listeners.clear()
    for (const dispose of this.disposers) dispose()
    this.disposers = []
  }

  private assertActive(): void {
    if (!this.isActive()) throw new Error('SideNotes reader is no longer active')
  }

  private resetCatalog(): void {
    this.catalog = null
    this.catalogKeys.clear()
    this.dirtyKeys.clear()
  }

  private changeSubjects(event: DatasetChangeEvent): void {
    const previous = this.sourceRevision
    this.sourceRevision = Number.isSafeInteger(event.revision) && event.revision >= 0 ? event.revision : null
    if (!this.catalog || previous === null || this.sourceRevision !== previous + 1 ||
      !event.keys?.length || event.keys.length > MAX_RETAINED_SUBJECTS) {
      this.resetCatalog()
      return
    }
    for (const key of event.keys) {
      if (!key || typeof key !== 'object' || Array.isArray(key) || Object.keys(key).length !== 1 ||
        typeof key.id !== 'string' || !this.catalogKeys.has(key.id)) {
        this.resetCatalog()
        return
      }
      this.dirtyKeys.add(key.id)
    }
  }

  private retainSubjects(rows: DatasetRecord[]): void {
    this.resetCatalog()
    if (rows.length > MAX_RETAINED_SUBJECTS) return
    let bytes = 0
    for (const row of rows) {
      if (typeof row.id !== 'string' || this.catalogKeys.has(row.id)) {
        this.resetCatalog()
        return
      }
      this.catalogKeys.add(row.id)
      for (const field of ['id', 'path', 'url']) {
        if (typeof row[field] === 'string') bytes += row[field].length * 2
      }
      if (bytes > MAX_RETAINED_SUBJECT_STRING_BYTES) {
        this.resetCatalog()
        return
      }
    }
    this.catalog = rows
  }

  private async rows(dataset: string, query: DatasetQuery = {}, observeRevision?: (revision: number) => void): Promise<DatasetRecord[]> {
    const rows: DatasetRecord[] = []
    let cursor: string | undefined
    do {
      this.assertActive()
      const page = await this.api.data.dataset(dataset).query({ ...query, limit: 1000, cursor })
      this.assertActive()
      observeRevision?.(page.revision)
      rows.push(...page.rows)
      cursor = page.cursor
    } while (cursor)
    return rows
  }

  private subjects(): Promise<DatasetRecord[]> {
    if (this.catalogPending) return this.catalogPending
    if (this.catalog && !this.dirtyKeys.size) return Promise.resolve(this.catalog)
    const pending = (async () => {
      for (;;) {
        const revision = this.catalogRevision
        const catalog = this.catalog
        const keys = [...this.dirtyKeys]
        const expectedRevision = this.sourceRevision
        let readRevision: number | undefined
        const observeRevision = (value: number): void => {
          if (!Number.isSafeInteger(value) || value < 0 || readRevision !== undefined && value !== readRevision) {
            throw new Error('SideNotes catalog changed during read')
          }
          readRevision = value
        }
        try {
          let rows: DatasetRecord[]
          if (catalog) {
            const replacements = new Map<string, DatasetRecord>()
            for (let offset = 0; offset < keys.length; offset += BATCH_SIZE) {
              const batch = keys.slice(offset, offset + BATCH_SIZE)
              const page = await this.rows(NOTES, { select: ['id', 'path', 'url'], where: { id: { in: batch } } }, observeRevision)
              for (const row of page) {
                if (typeof row.id !== 'string' || !batch.includes(row.id)) throw new Error('Invalid SideNotes catalog key')
                replacements.set(row.id, row)
              }
              if (revision !== this.catalogRevision) break
            }
            if (revision !== this.catalogRevision) continue
            if (readRevision !== expectedRevision) {
              this.resetCatalog()
              continue
            }
            const changed = new Set(keys)
            rows = catalog.flatMap((row) => {
              if (!changed.has(String(row.id))) return [row]
              const replacement = replacements.get(String(row.id))
              return replacement ? [replacement] : []
            })
          } else {
            rows = await this.rows(NOTES, { select: ['id', 'path', 'url'] }, observeRevision)
          }
          this.assertActive()
          if (revision !== this.catalogRevision) continue
          if (readRevision === undefined || expectedRevision !== null && readRevision < expectedRevision) {
            throw new Error('SideNotes catalog revision is unavailable')
          }
          this.sourceRevision = readRevision
          this.retainSubjects(rows)
          return rows
        } catch (error) {
          this.assertActive()
          if (revision !== this.catalogRevision) continue
          this.resetCatalog()
          throw error
        }
      }
    })()
    this.catalogPending = pending
    const clear = (): void => { if (this.catalogPending === pending) this.catalogPending = null }
    void pending.then(clear, clear)
    return pending
  }

  private async read(scope?: NoteReadScope): Promise<SideNoteRecord[]> {
    let raw: DatasetRecord[] = []
    let tags: DatasetRecord[] = []
    let history: DatasetRecord[] = []
    if (!scope) {
      [raw, tags, history] = await settled([this.rows(NOTES), this.rows(TAGS), this.rows(HISTORY)])
    } else {
      const subject = scope.kind === 'web' ? normalizeUrl(scope.url) : scope.kind === 'file' ? scope.path : ''
      const selectedIds = scope.kind === 'ids' ? new Set(scope.ids) : null
      if (!subject && !selectedIds?.size) return []
      const ids = (await this.subjects()).filter((row) => {
        if (selectedIds) return typeof row.id === 'string' && selectedIds.has(row.id.trim())
        if (scope.kind === 'file' && (typeof row.path !== 'string' || row.path.trim() !== subject)) return false
        const url = normalizeUrl(typeof row.url === 'string' ? row.url : '')
        return scope.kind === 'web' ? url === subject : scope.kind === 'file' && scope.includeWeb === true || !url
      }).map((row) => row.id).filter((id): id is string => typeof id === 'string' && !!id.trim())
      for (let offset = 0; offset < ids.length; offset += BATCH_SIZE) {
        const batch = ids.slice(offset, offset + BATCH_SIZE)
        const [notesPage, tagsPage, historyPage] = await settled([
          this.rows(NOTES, { where: { id: { in: batch } } }),
          this.rows(TAGS, { where: { noteId: { in: batch } } }),
          this.rows(HISTORY, { where: { noteId: { in: batch } } })
        ])
        raw.push(...notesPage)
        tags.push(...tagsPage)
        history.push(...historyPage)
      }
    }
    const tagsByNote = new Map<string, unknown[]>()
    for (const entry of tags) {
      if (typeof entry.noteId !== 'string') continue
      const values = tagsByNote.get(entry.noteId)
      if (values) values.push(entry.tag)
      else tagsByNote.set(entry.noteId, [entry.tag])
    }
    const historyByNote = new Map<string, DatasetRecord[]>()
    for (const entry of history) {
      if (typeof entry.noteId !== 'string') continue
      const values = historyByNote.get(entry.noteId)
      if (values) values.push(entry)
      else historyByNote.set(entry.noteId, [entry])
    }
    for (const values of historyByNote.values()) values.sort((a, b) => Number(a.position) - Number(b.position))
    return raw.map((row) => this.normalize({
      ...row,
      tags: tagsByNote.get(String(row.id)) ?? [],
      pathHistory: (historyByNote.get(String(row.id)) ?? []).map((entry) => entry.path)
    } as DatasetRecord)).filter((note): note is SideNoteRecord => note !== null)
  }

  load(scope?: NoteReadScope): Promise<SideNoteRecord[]> {
    if (!this.isActive()) return Promise.reject(new Error('SideNotes reader is no longer active'))
    const key = noteScopeKey(scope)
    const shared = this.pending.get(key)
    if (shared) return shared
    if (this.pending.size >= MAX_PENDING_SCOPES) return Promise.reject(new Error('Too many SideNotes reads'))
    const capturedScope = scope?.kind === 'ids' ? { kind: scope.kind, ids: [...scope.ids] } : scope ? { ...scope } : undefined
    const pending = (async () => {
      for (;;) {
        this.assertActive()
        const revision = this.revision
        try {
          const notes = await this.read(capturedScope)
          this.assertActive()
          if (revision === this.revision) return notes
        } catch (error) {
          this.assertActive()
          if (revision === this.revision) throw error
        }
      }
    })()
    this.pending.set(key, pending)
    const clear = (): void => { if (this.pending.get(key) === pending) this.pending.delete(key) }
    void pending.then(clear, clear)
    return pending
  }
}
