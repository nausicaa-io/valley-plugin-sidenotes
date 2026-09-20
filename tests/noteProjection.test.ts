import { afterEach, describe, expect, it, vi } from 'vitest'
import { createMockValleyApi } from '@valley/plugin-testkit'
import type { DatasetChangeEvent, DatasetPage, DatasetQuery, DatasetRecord } from '@valley/plugin-sdk'
import { NoteRepository } from '../src/noteRepository'
import type { SideNoteRecord } from '../src/types'
import { normalizeUrl } from '../src/web'

const NOTES = 'sideNotes.notes'
const TAGS = 'sideNotes.note_tags'
const HISTORY = 'sideNotes.path_history'
const scope = { kind: 'file' as const, path: 'Ferns.md' }
const owners: NoteRepository[] = []
afterEach(() => { for (const owner of owners.splice(0)) owner.dispose() })

function note(id: string, path = 'Ferns.md'): DatasetRecord {
  return { id, path, url: null, note: `Body ${id}`, anchor: { type: 'none' }, flagged: false, createdAt: '2026-06-01', updatedAt: '2026-06-01' }
}

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason: unknown) => void
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

function fixture(rows: DatasetRecord[]) {
  const mock = createMockValleyApi({ manifest: { id: 'sideNotes' }, datasets: { [NOTES]: rows, [TAGS]: [], [HISTORY]: [] } })
  const dataset = mock.api.data.dataset
  const listeners = new Map<string, Set<(event: DatasetChangeEvent) => void>>()
  const queries: Array<{ dataset: string; query: DatasetQuery }> = []
  let revision = 0
  let generation = 1
  const vault = mock.api.getState().vault
  const intercept = vi.fn<(dataset: string, query: DatasetQuery, page: DatasetPage) => Promise<DatasetPage>>(async (_id, _query, page) => page)
  mock.api.data.dataset = ((id: string) => {
    const handle = dataset(id)
    return {
      ...handle,
      subscribe: (listener: (event: DatasetChangeEvent) => void) => {
        const current = listeners.get(id) ?? new Set()
        listeners.set(id, current)
        current.add(listener)
        return () => { current.delete(listener) }
      },
      query: async (query: DatasetQuery = {}) => {
        queries.push({ dataset: id, query })
        const capturedRevision = revision
        const page = await handle.query(query)
        return intercept(id, query, { ...page, revision: capturedRevision, rows: query.select ? page.rows.map(row => Object.fromEntries(query.select!.map(field => [field, row[field]]))) : page.rows })
      }
    }
  }) as typeof dataset
  const owner = new NoteRepository(mock.api, () => mock.api.getState().vault?.path === vault?.path, row => ({ ...row, id: String(row.id).trim(), path: String(row.path).trim(), url: normalizeUrl(String(row.url ?? '')) }) as unknown as SideNoteRecord)
  owners.push(owner)
  const emit = (keys: DatasetChangeEvent['keys'], options: Partial<DatasetChangeEvent> = {}) => {
    revision = options.revision ?? revision + 1
    generation = options.vaultGeneration ?? generation
    const event: DatasetChangeEvent = { dataset: NOTES, reason: 'update', revision, vaultGeneration: generation, keys, ...options }
    for (const listener of listeners.get(event.dataset) ?? []) listener(event)
  }
  const update = async (id: string, values: DatasetRecord) => {
    await dataset(NOTES).update({ id }, values)
    emit([{ id }])
  }
  return { mock, owner, dataset, queries, intercept, emit, update,
    projected: () => queries.filter(({ dataset, query }) => dataset === NOTES && query.select),
    switchVault: () => {
      mock.emitState({ vault: { path: '/fixture/b', name: 'Moss', displayName: 'Moss' } })
      mock.emitState({ vault })
    },
    silentUpdate: async (id: string, values: DatasetRecord) => { await dataset(NOTES).update({ id }, values); revision++ },
    listeners
  }
}

describe('retained SideNotes subject projection', () => {
  it('refreshes one known raw key after a body edit without another full subject payload', async () => {
    const f = fixture(Array.from({ length: 1001 }, (_, index) => note(index === 0 ? ' raw ' : `n${index}`, index === 0 ? ' Ferns.md ' : 'Other.md')))
    f.mock.datasets.get(TAGS)!.push({ noteId: ' raw ', tag: 'fern' })
    expect(await f.owner.load(scope)).toMatchObject([{ id: 'raw', tags: ['fern'] }])
    f.queries.length = 0
    await f.update(' raw ', { note: 'Changed body' })
    expect(await f.owner.load({ kind: 'ids', ids: ['raw'] })).toMatchObject([{ id: 'raw', note: 'Changed body', tags: ['fern'] }])
    expect(f.projected().map(({ query }) => query)).toEqual([{ select: ['id', 'path', 'url'], where: { id: { in: [' raw '] } }, limit: 1000, cursor: undefined }])
    await f.owner.load(scope)
    expect(f.projected()).toHaveLength(1)
  })

  it('moves a known note into a selected subject and removes deleted keys without full queries', async () => {
    const f = fixture([note('a'), note('b', 'Other.md'), note('c')])
    await f.owner.load(scope)
    f.queries.length = 0
    await f.update('b', { path: ' Ferns.md ' })
    expect((await f.owner.load(scope)).map(row => row.id)).toEqual(['a', 'b', 'c'])
    await f.dataset(NOTES).delete({ id: 'a' })
    f.emit([{ id: 'a' }], { reason: 'delete' })
    expect((await f.owner.load(scope)).map(row => row.id)).toEqual(['b', 'c'])
    await f.update('b', { url: ' HTTPS://EXAMPLE.COM:443/a/../docs#fragment ' })
    expect((await f.owner.load(scope)).map(row => row.id)).toEqual(['c'])
    expect((await f.owner.load({ kind: 'web', url: 'https://example.com/docs#other' })).map(row => row.id)).toEqual(['b'])
    expect(f.projected().every(({ query }) => !!query.where)).toBe(true)
  })

  it.each(['missing keys', 'empty keys', 'revision gap', 'generation', 'key overflow', 'unknown key'])('resynchronizes completely on %s', async reason => {
    const f = fixture([note('a'), note('b', 'Other.md')])
    await f.owner.load(scope)
    await f.update('a', { note: 'First' })
    await f.owner.load(scope)
    f.queries.length = 0
    await f.dataset(NOTES).update({ id: 'b' }, { path: 'Ferns.md' })
    if (reason === 'missing keys') f.emit(undefined)
    else if (reason === 'empty keys') f.emit([])
    else if (reason === 'revision gap') f.emit([{ id: 'b' }], { revision: 8 })
    else if (reason === 'generation') f.emit([{ id: 'b' }], { vaultGeneration: 2 })
    else if (reason === 'key overflow') f.emit(Array.from({ length: 4097 }, () => ({ id: 'b' })))
    else f.emit([{ id: 'unseen' }])
    expect((await f.owner.load(scope)).map(row => row.id)).toEqual(['a', 'b'])
    expect(f.projected()).toHaveLength(1)
    expect(f.projected()[0].query.where).toBeUndefined()
  })

  it('settles held work, then coalesces every changed key into one current rerun', async () => {
    const f = fixture([note('a'), note('b', 'Other.md')])
    await f.owner.load(scope)
    f.queries.length = 0
    await f.update('a', { note: 'First' })
    const held = deferred<DatasetPage>()
    let captured!: DatasetPage
    f.intercept.mockImplementationOnce(async (_id, _query, page) => { captured = page; return held.promise })
    const pending = f.owner.load(scope)
    await vi.waitFor(() => expect(captured).toBeDefined())
    await f.update('b', { path: 'Ferns.md' })
    await f.update('a', { note: 'Latest' })
    expect(f.owner.load(scope)).toBe(pending)
    expect(f.projected()).toHaveLength(1)
    held.resolve(captured)
    expect(await pending).toMatchObject([{ id: 'a', note: 'Latest' }, { id: 'b' }])
    expect(f.projected().map(({ query }) => query.where)).toEqual([{ id: { in: ['a'] } }, { id: { in: ['a', 'b'] } }])
  })

  it('keeps key batches at 100 and retains the server order across updates and insert/rename resyncs', async () => {
    const ids = [' z ', 'A', 'a', 'ä', ...Array.from({ length: 199 }, (_, index) => `n${index}`)]
    const f = fixture(ids.map(id => note(id)))
    await f.owner.load(scope)
    f.queries.length = 0
    await f.dataset(NOTES).update({ id: 'a' }, { path: ' Ferns.md ' })
    f.emit(ids.map(id => ({ id })), { reason: 'transaction' })
    expect((await f.owner.load(scope)).map(row => row.id)).toEqual(ids.map(id => id.trim()))
    expect(f.projected().map(({ query }) => (query.where!.id as { in: string[] }).in.length)).toEqual([100, 100, 3])
    f.queries.length = 0
    await f.dataset(NOTES).delete({ id: 'a' })
    await f.dataset(NOTES).insert(note('renamed'))
    f.emit([{ id: 'a' }, { id: 'renamed' }], { reason: 'transaction' })
    expect((await f.owner.load(scope)).map(row => row.id)).toEqual((await f.owner.load()).map(row => row.id))
    expect(f.projected()).toHaveLength(1)
    expect(f.projected()[0].query.where).toBeUndefined()
  })

  it('rejects an old owner after accepted work settles and dispatches no reads in the new vault', async () => {
    const f = fixture([note('a')])
    await f.owner.load(scope)
    await f.update('a', { note: 'Changed' })
    const held = deferred<DatasetPage>()
    let captured!: DatasetPage
    f.intercept.mockImplementationOnce(async (_id, _query, page) => { captured = page; return held.promise })
    const pending = f.owner.load(scope)
    const rejected = expect(pending).rejects.toThrow('no longer active')
    await vi.waitFor(() => expect(captured).toBeDefined())
    f.switchVault()
    expect(f.owner.isActive()).toBe(false)
    const reads = f.queries.length
    held.resolve(captured)
    await rejected
    expect(f.queries).toHaveLength(reads)
    expect([...f.listeners.values()].every(listeners => listeners.size === 0)).toBe(true)
  })

  it.each(['rows', 'bytes'])('returns complete oversized catalogs but does not retain them (%s)', async bound => {
    const f = fixture(bound === 'rows' ? Array.from({ length: 4097 }, (_, index) => note(`n${index}`, index === 4096 ? 'Ferns.md' : 'Other.md')) : [note('a'), note('b', 'x'.repeat(2 * 1024 * 1024))])
    expect(await f.owner.load(scope)).toHaveLength(1)
    f.queries.length = 0
    await f.update(bound === 'rows' ? 'n4096' : 'a', { note: 'Updated' })
    expect(await f.owner.load(scope)).toMatchObject([{ note: 'Updated' }])
    expect(f.projected().every(({ query }) => query.where === undefined)).toBe(true)
    expect(f.projected()).toHaveLength(bound === 'rows' ? 5 : 1)
  })

  it('resynchronizes when a keyed response reveals a revision whose event was missed', async () => {
    const f = fixture([note('a'), note('b', 'Other.md')])
    await f.owner.load(scope)
    await f.update('a', { note: 'Known update' })
    await f.silentUpdate('b', { path: 'Ferns.md' })
    f.queries.length = 0
    expect((await f.owner.load(scope)).map(row => row.id)).toEqual(['a', 'b'])
    expect(f.projected().map(({ query }) => query.where)).toEqual([{ id: { in: ['a'] } }, undefined])
  })

  it('rejects mixed catalog pages without retaining a partial snapshot and allows an explicit retry', async () => {
    const f = fixture(Array.from({ length: 1001 }, (_, index) => note(`n${index}`, index === 1000 ? 'Ferns.md' : 'Other.md')))
    f.intercept.mockImplementation(async (_id, query, page) => query.cursor ? { ...page, revision: page.revision + 1 } : page)
    await expect(f.owner.load(scope)).rejects.toThrow('catalog changed during read')
    expect(f.queries).toHaveLength(2)
    f.intercept.mockImplementation(async (_id, _query, page) => page)
    expect(await f.owner.load(scope)).toMatchObject([{ id: 'n1000' }])
    expect(f.projected()).toHaveLength(4)
  })

  it('drops retention when a keyed update crosses the byte limit without truncating the selected result', async () => {
    const f = fixture([note('a'), note('b', 'Other.md')])
    await f.owner.load(scope)
    f.queries.length = 0
    await f.update('b', { path: 'x'.repeat(2 * 1024 * 1024) })
    expect(await f.owner.load(scope)).toHaveLength(1)
    expect(f.projected()[0].query.where).toEqual({ id: { in: ['b'] } })
    await f.owner.load(scope)
    expect(f.projected()[1].query.where).toBeUndefined()
  })

  it('propagates stable failures and retries changed failures only after every accepted relation read settles', async () => {
    const f = fixture([note('a')])
    await f.owner.load(scope)
    const held = deferred<DatasetPage>()
    const failed = new Error('Tag read failed')
    let history!: DatasetPage
    let fail = true
    f.intercept.mockImplementation(async (id, _query, page) => {
      if (id === TAGS && fail) throw failed
      if (id === HISTORY && fail) { history = page; return held.promise }
      return page
    })
    const pending = f.owner.load(scope)
    await vi.waitFor(() => expect(history).toBeDefined())
    await f.update('a', { note: 'Current' })
    const count = f.queries.length
    await Promise.resolve()
    expect(f.queries).toHaveLength(count)
    fail = false
    held.resolve(history)
    expect(await pending).toMatchObject([{ note: 'Current' }])
    f.intercept.mockImplementation(async (id, _query, page) => { if (id === TAGS) throw failed; return page })
    f.queries.length = 0
    await expect(f.owner.load(scope)).rejects.toBe(failed)
    expect(f.queries.filter(({ dataset }) => dataset === TAGS)).toHaveLength(1)
    f.intercept.mockImplementation(async (_id, _query, page) => page)
    expect(await f.owner.load(scope)).toHaveLength(1)
  })

  it('retries a failed projected read only when a newer revision arrived during that read', async () => {
    const f = fixture([note('a')])
    await f.owner.load(scope)
    await f.update('a', { note: 'First' })
    const held = deferred<DatasetPage>()
    f.intercept.mockImplementationOnce(() => held.promise)
    const pending = f.owner.load(scope)
    await vi.waitFor(() => expect(f.intercept).toHaveBeenCalledTimes(5))
    await f.update('a', { note: 'Current' })
    held.reject(new Error('Obsolete read'))
    expect(await pending).toMatchObject([{ note: 'Current' }])
    await f.update('a', { note: 'Stable' })
    f.intercept.mockRejectedValueOnce(new Error('Stable failure'))
    await expect(f.owner.load(scope)).rejects.toThrow('Stable failure')
    expect(await f.owner.load(scope)).toMatchObject([{ note: 'Stable' }])
  })
})
