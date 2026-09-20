import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PLUGIN_SURFACE_V1, SEARCH_RESULT_CARD_V1, TEXT_SELECTION_ACTION_V1, type DatasetRecord } from '@valley/plugin-sdk'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { DataRecord } from '@valley/plugin-sdk/types'
import { createMockValleyApi, type MockValleyApi } from '@valley/plugin-testkit'
import { initRuntime, selectionDraftStore } from '../src/runtime'
import {
  appendNote,
  deleteNote,
  loadNotes,
  makeNote,
  makeWebNote,
  noteRepository,
  retargetNotes,
  shiftLines,
  updateNote
} from '../src/data'
import {
  anchorInContext,
  anchorLabel,
  anchorOptionsForWeb,
  anchorWithType,
  comparePosition,
  liveDefaultAnchor,
  normalizeWhitespace,
  positionKey,
  resolvePositionKeys,
  validateAnchor
} from '../src/anchors'
import type { SideNoteAnchor, SideNoteRecord } from '../src/types'
import { normalizeUrl, webHostLabel } from '../src/web'
import { matchesSearch } from '../src/search'
import { registerSideNoteCommands } from '../src/commands'
import { registerSearchCard } from '../src/searchCard'
import { register } from '../src/index'
import { registerSideNoteSurfaces, selectSideNote, useSideNoteViewField } from '../src/surfaces'
import config from '../config.json'
import { useNotes } from '../src/hooks'
import type { NoteScope } from '../src/noteRepository'

const now = '2026-06-01T12:00:00.000Z'

it('releases mounted and provider subscriptions without accessing a revoked session', () => {
  const mock = createMockValleyApi({ manifest: { id: 'sideNotes' } })
  initRuntime(mock.api)
  const dispose = registerSideNoteSurfaces(mock.api)
  const mounted = renderHook(() => useSideNoteViewField('left_sidebar', 'search', ''))
  const surface = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1)[0].extension
  const unsubscribe = surface.subscribe(vi.fn())
  const state = mock.api.runtime.getOrCreate('sideNotes.surfaces', () => ({ listeners: new Set() }))
  expect(state.listeners.size).toBe(2)
  dispose()
  const runtime = vi.spyOn(mock.api.runtime, 'getOrCreate').mockImplementation(() => { throw new Error('Plugin session is no longer active') })
  try {
    unsubscribe()
    mounted.unmount()
    expect(state.listeners.size).toBe(0)
    expect(runtime).not.toHaveBeenCalled()
  } finally { runtime.mockRestore(); mounted.unmount() }
})
const sideNotesRecords = (mock: MockValleyApi): DataRecord[] =>
  (mock.datasets.get('sideNotes.notes') ?? []) as DataRecord[]

describe('SideNotes settings', () => {
  it('declares the File-Sorter-style filter editor with visible defaults', () => {
    expect(config.settingsView).toBe('sideNotes.settings')
    expect(config.settingsSchema.fields.find((field) => field.key === 'filterTypes')).toMatchObject({
      type: 'chips',
      default: ['.md', '.mp3', '.mp4', '.pdf']
    })
  })

  it('registers the custom settings view declared by the config', () => {
    const { api } = createMockValleyApi({ manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments } })
    const dispose = register(api)
    const keys = (api.registerView as unknown as { mock: { calls: [string][] } }).mock.calls.map(([key]) => key)
    expect(keys).toContain('sideNotes.settings')
    dispose()
  })

  it('retires registered file callbacks and pending selections with their originating session', async () => {
    const first = createMockValleyApi({ manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments } })
    const renamed = vi.spyOn(first.api.files, 'onRenamed')
    const shifted = vi.spyOn(first.api.files, 'onLineShift')
    let finish!: (value: string) => void
    vi.spyOn(first.api.workspace, 'getPdfPageText').mockImplementation(() => new Promise<string>((resolve) => { finish = resolve }))
    const reveal = vi.spyOn(first.api.workspace, 'revealOwnPanel')
    const dispose = register(first.api)
    const drafts = selectionDraftStore()
    const selection = first.api.interop.extensions.providers(TEXT_SELECTION_ACTION_V1)[0].extension
    const pending = selection.run({ surface: 'pdf', path: 'A.pdf', page: 1, text: 'Selected text' })
    const second = createMockValleyApi({ manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments } })
    initRuntime(second.api)
    const foreign = vi.spyOn(second.api.data, 'dataset')
    renamed.mock.calls[0][0]({ oldPath: 'A.pdf', newPath: 'B.pdf' })
    shifted.mock.calls[0][0]({ path: 'A.md', fromLine: 1, delta: 2 })
    initRuntime(first.api)
    finish('Selected text on page')
    await pending
    expect(drafts.get()).toBeNull()
    expect(reveal).not.toHaveBeenCalled()
    expect(foreign).not.toHaveBeenCalled()
    dispose()
    const dataset = vi.spyOn(first.api.data, 'dataset')
    renamed.mock.calls[0][0]({ oldPath: 'A.pdf', newPath: 'B.pdf' })
    shifted.mock.calls[0][0]({ path: 'A.md', fromLine: 1, delta: 2 })
    expect(dataset).not.toHaveBeenCalled()
  })
})

function seed(patch: Partial<Record<keyof SideNoteRecord, unknown>> = {}): DatasetRecord {
  return {
    id: 'sidenote_test',
    path: 'Notes/A.md',
    pathHistory: [],
    note: 'Check this derivation',
    anchor: { type: 'markdown-line', line: 4, snippet: 'derivation' },
    createdAt: now,
    updatedAt: now,
    ...patch
  } as unknown as DatasetRecord
}

describe('sideNotes plugin data layer', () => {
  let mock: MockValleyApi

  beforeEach(() => {
    mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      datasets: { 'sideNotes.notes': [], 'sideNotes.note_tags': [], 'sideNotes.path_history': [] }
    })
    initRuntime(mock.api)
  })

  it('merges mutations during a pending read into one complete follow-up', async () => {
    sideNotesRecords(mock).push(seed())
    const dataset = mock.api.data.dataset
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    let reads = 0
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        const result = await handle.query(query)
        if (id === 'sideNotes.notes' && ++reads === 1) await held
        return result
      } }
    }) as typeof dataset
    const first = loadNotes()
    await waitFor(() => expect(reads).toBe(1))
    for (let index = 0; index < 20; index++) await dataset('sideNotes.notes').upsert(seed({ note: `Update ${index}` }))
    const peers = Array.from({ length: 20 }, () => loadNotes())
    release()
    const results = await Promise.all([first, ...peers])
    expect(results.every((notes) => notes[0].note === 'Update 19')).toBe(true)
    expect(reads).toBe(2)
  })

  it('exposes a retryable read error and ignores a read completed after unmount', async () => {
    sideNotesRecords(mock).push(seed())
    const dataset = mock.api.data.dataset
    let fail = true
    let release: (() => void) | undefined
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        if (id === 'sideNotes.notes' && fail) { fail = false; throw new Error('Unavailable') }
        const result = await handle.query(query)
        if (id === 'sideNotes.notes' && release) await new Promise<void>((resolve) => { release = resolve })
        return result
      } }
    }) as typeof dataset
    const mounted = renderHook(useNotes)
    await waitFor(() => expect(mounted.result.current).toMatchObject({ loading: false, error: 'Could not load SideNotes. Try again.' }))
    act(() => mounted.result.current.reload())
    await waitFor(() => expect(mounted.result.current.notes).toHaveLength(1))
    expect(mounted.result.current.error).toBeNull()
    release = () => undefined
    const previous = mounted.result.current
    act(() => mounted.result.current.reload())
    await act(async () => {})
    mounted.unmount()
    await act(async () => { release?.() })
    expect(mounted.result.current).toBe(previous)
  })

  it('appends, updates, and deletes through isolated datasets', async () => {
    await appendNote(makeNote('Notes/A.md', 'Check this derivation', { type: 'markdown-line', line: 4 }))
    let notes = await loadNotes()
    expect(notes).toHaveLength(1)

    await updateNote(notes[0].id, { ...notes[0], note: 'Done' })
    notes = await loadNotes()
    expect(notes[0]).toMatchObject({ note: 'Done' })

    await deleteNote(notes[0].id)
    expect(await loadNotes()).toEqual([])
  })

  it('retargets file and folder paths, preserving history', async () => {
    sideNotesRecords(mock).push(seed())
    await retargetNotes('Notes', 'Archive')
    const notes = await loadNotes()
    expect(notes[0].path).toBe('Archive/A.md')
    expect(notes[0].pathHistory).toContain('Notes/A.md')
  })

  it('shifts markdown line anchors at/after the edit point', async () => {
    sideNotesRecords(mock).push(seed())
    await shiftLines('Notes/A.md', 2, 3)
    const notes = await loadNotes()
    expect(notes[0].anchor).toMatchObject({ type: 'markdown-line', line: 7 })
  })

  it('ignores malformed records (missing path or note)', async () => {
    sideNotesRecords(mock).push(seed({ note: '' }), seed({ id: 'ok', path: 'Notes/B.md' }))
    const notes = await loadNotes()
    expect(notes).toHaveLength(1)
    expect(notes[0].path).toBe('Notes/B.md')
  })

  it('shares concurrent reads without probing files or mutating legacy rows', async () => {
    sideNotesRecords(mock).push(seed(), seed({ id: 'sidenote_second', path: 'Notes/B.md' }))
    mock.datasets.get('sideNotes.note_tags')!.push(
      { noteId: 'sidenote_test', tag: 'proof' },
      { noteId: 'sidenote_second', tag: 'review' }
    )
    mock.datasets.get('sideNotes.path_history')!.push(
      { noteId: 'sidenote_test', position: 1, path: 'Old/A-2.md' },
      { noteId: 'sidenote_test', position: 0, path: 'Old/A-1.md' }
    )
    const dataset = mock.api.data.dataset
    const queryCounts = new Map<string, number>()
    mock.api.data.dataset = ((globalId: string) => {
      const value = dataset(globalId)
      return {
        ...value,
        query: async (...args: Parameters<typeof value.query>) => {
          queryCounts.set(globalId, (queryCounts.get(globalId) ?? 0) + 1)
          await Promise.resolve()
          return value.query(...args)
        }
      }
    }) as typeof mock.api.data.dataset
    const stat = vi.spyOn(mock.api.vault, 'stat')
    const transaction = vi.spyOn(mock.api.data, 'transaction')

    const [first, second, third] = await Promise.all([loadNotes(), loadNotes(), loadNotes()])

    expect(second).toBe(first)
    expect(third).toBe(first)
    expect(first[0]).toMatchObject({ tags: ['proof'], pathHistory: ['Old/A-1.md', 'Old/A-2.md'] })
    expect(first[1]).toMatchObject({ tags: ['review'], pathHistory: [] })
    expect(queryCounts).toEqual(new Map([
      ['sideNotes.notes', 1],
      ['sideNotes.note_tags', 1],
      ['sideNotes.path_history', 1]
    ]))
    expect(stat).not.toHaveBeenCalled()
    expect(transaction).not.toHaveBeenCalled()
    expect(sideNotesRecords(mock).every((row) => row.fileKey === undefined)).toBe(true)
  })

  it('forwards new-tab intent when its search card opens a file note', async () => {
    registerSearchCard(mock.api)
    const [provider] = mock.api.interop.extensions.providers(SEARCH_RESULT_CARD_V1)

    expect(await provider.extension.open(seed(), { newTab: true })).toBe(true)
    expect(mock.api.workspace.openFile).toHaveBeenCalledWith(
      'Notes/A.md',
      { type: 'markdown-line', line: 4, snippet: 'derivation' },
      { newTab: true }
    )
    expect(mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('right_sidebar')
  })

  it('opens its owning editor through a stable document reference', async () => {
    registerSearchCard(mock.api)
    const [provider] = mock.api.interop.extensions.providers(SEARCH_RESULT_CARD_V1)
    expect(await provider.extension.open(seed(), {})).toBe(true)
    expect(mock.api.documents.open).toHaveBeenCalledWith({ pluginId: 'sideNotes', sourceId: 'notes', itemId: seed().id })
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()
  })

  it('never treats its internal database as an unlinked note target', async () => {
    registerSearchCard(mock.api)
    const [provider] = mock.api.interop.extensions.providers(SEARCH_RESULT_CARD_V1)

    expect(
      await provider.extension.open(
        { id: 'orphan', note: 'Orphan note' },
        { path: '.valley/plugins/data/sideNotes/data.sqlite', newTab: true }
      )
    ).toBe(false)
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()
  })
})

describe('SideNotes scoped repository', () => {
  function fixture(rows: DatasetRecord[]) {
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      datasets: { 'sideNotes.notes': rows, 'sideNotes.note_tags': [], 'sideNotes.path_history': [] }
    })
    initRuntime(mock.api)
    return mock
  }

  it('loads only matching bodies and relations while preserving noncanonical subjects and raw relation ids', async () => {
    const mock = fixture([
      seed({ id: ' raw-id ', path: '  Notes/A.md  ' }),
      seed({ id: 'web', path: 'Notes/A.md', url: ' HTTPS://EXAMPLE.COM:443/a/../docs#part ', note: 'Web body' }),
      seed({ id: 'other', path: 'Notes/B.md', note: 'Unrelated body' })
    ])
    mock.datasets.get('sideNotes.note_tags')!.push({ noteId: ' raw-id ', tag: 'proof' }, { noteId: 'web', tag: 'web' }, { noteId: 'other', tag: 'unrelated' })
    mock.datasets.get('sideNotes.path_history')!.push({ noteId: ' raw-id ', position: 0, path: 'Old/A.md' })
    const transaction = vi.spyOn(mock.api.data, 'transaction')
    const dataset = mock.api.data.dataset
    const reads: Array<{ id: string; query: Parameters<ReturnType<typeof dataset>['query']>[0] }> = []
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => { reads.push({ id, query }); return handle.query(query) } }
    }) as typeof dataset
    const file = await loadNotes({ kind: 'file', path: 'Notes/A.md' })
    expect(file).toMatchObject([{ id: 'raw-id', path: 'Notes/A.md', tags: ['proof'], pathHistory: ['Old/A.md'] }])
    const web = await loadNotes({ kind: 'web', url: 'https://example.com/docs#new' })
    expect(web).toMatchObject([{ id: 'web', url: 'https://example.com/docs', tags: ['web'] }])
    expect(reads.filter(({ query }) => query?.select)).toHaveLength(1)
    expect(reads.filter(({ id, query }) => id === 'sideNotes.notes' && !query?.select).map(({ query }) => query?.where)).toEqual([
      { id: { in: [' raw-id '] } }, { id: { in: ['web'] } }
    ])
    expect(reads.filter(({ id }) => id !== 'sideNotes.notes').every(({ query }) => !!query?.where?.noteId)).toBe(true)
    expect(transaction).not.toHaveBeenCalled()
  })

  it.each([999, 1000, 1001])('reads all %i related tags without loading other subjects', async (count) => {
    const mock = fixture([seed(), seed({ id: 'other', path: 'Notes/B.md' })])
    mock.datasets.get('sideNotes.note_tags')!.push(...Array.from({ length: count }, (_, index) => ({ noteId: 'sidenote_test', tag: `tag-${index}` })), { noteId: 'other', tag: 'unrelated' })
    const [note] = await loadNotes({ kind: 'file', path: 'Notes/A.md' })
    expect(note.tags).toHaveLength(count)
    expect(note.tags).not.toContain('unrelated')
  })

  it('pages the subject catalog and keeps every body/relation key batch within the host limit', async () => {
    const mock = fixture(Array.from({ length: 1001 }, (_, index) => seed({ id: `note-${String(index).padStart(4, '0')}` })))
    const dataset = mock.api.data.dataset
    const batches: number[] = []
    let catalogPages = 0
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        if (query?.select) catalogPages++
        const condition = query?.where?.[id === 'sideNotes.notes' ? 'id' : 'noteId']
        if (condition && typeof condition === 'object' && 'in' in condition && Array.isArray(condition.in)) {
          batches.push(condition.in.length)
          if (condition.in.length > 100) throw new Error('Host key limit exceeded')
        }
        return handle.query(query)
      } }
    }) as typeof dataset
    expect(await loadNotes({ kind: 'file', path: 'Notes/A.md' })).toHaveLength(1001)
    expect(catalogPages).toBe(2)
    expect(batches).toHaveLength(33)
    expect(Math.max(...batches)).toBe(100)
  })

  it('keeps scoped ordering equal to the full read with shuffled and normalized-colliding ids', async () => {
    const rows = Array.from({ length: 205 }, (_, index) => seed({ id: `note-${String(index).padStart(3, '0')}`, path: index % 4 === 0 ? 'Notes/B.md' : 'Notes/A.md' }))
    rows.push(seed({ id: ' note-100 ', path: ' Notes/A.md ' }), seed({ id: 'NOTE-100' }))
    const mock = fixture(rows.reverse())
    mock.datasets.get('sideNotes.note_tags')!.push({ noteId: ' note-100 ', tag: 'spaced' }, { noteId: 'note-100', tag: 'canonical' })
    const all = await loadNotes()
    expect(await loadNotes({ kind: 'file', path: 'Notes/A.md' })).toEqual(all.filter((note) => note.path === 'Notes/A.md' && !note.url))
  })

  it.each(['rows', 'bytes'])('does not retain an oversized subject catalog (%s) or truncate its result', async (bound) => {
    const rows = bound === 'rows'
      ? Array.from({ length: 4097 }, (_, index) => seed({ id: `note-${index}`, path: index === 4096 ? 'Notes/A.md' : 'Notes/B.md' }))
      : [seed(), seed({ id: 'large', path: 'Notes/B.md', url: `https://example.com/${'a'.repeat(2 * 1024 * 1024)}` })]
    const mock = fixture(rows)
    const dataset = mock.api.data.dataset
    let catalogPages = 0
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => { if (query?.select) catalogPages++; return handle.query(query) } }
    }) as typeof dataset
    expect(await loadNotes({ kind: 'file', path: 'Notes/A.md' })).toHaveLength(1)
    const previousPages = catalogPages
    expect(await loadNotes({ kind: 'file', path: 'Notes/A.md' })).toHaveLength(1)
    expect(catalogPages).toBe(previousPages * 2)
  })

  it('shares identical scopes, captures their values, and reruns one changed catalog after a burst', async () => {
    const mock = fixture([seed()])
    const dataset = mock.api.data.dataset
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    let bodyReads = 0
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        const result = await handle.query(query)
        if (id === 'sideNotes.notes' && !query?.select && ++bodyReads === 1) await held
        return result
      } }
    }) as typeof dataset
    const scope: NoteScope = { kind: 'file', path: 'Notes/A.md' }
    const first = loadNotes(scope)
    scope.path = 'Notes/B.md'
    await waitFor(() => expect(bodyReads).toBe(1))
    for (let index = 0; index < 20; index++) await dataset('sideNotes.notes').upsert(seed({ note: `Latest ${index}` }))
    const peers = Array.from({ length: 20 }, () => loadNotes({ kind: 'file', path: 'Notes/A.md' }))
    expect(peers.every((promise) => promise === first)).toBe(true)
    release()
    const results = await Promise.all([first, ...peers])
    expect(results.every((notes) => notes === results[0] && notes[0].note === 'Latest 19')).toBe(true)
    expect(bodyReads).toBe(2)
  })

  it('settles every accepted relation read before releasing a failed shared request', async () => {
    const mock = fixture([seed()])
    const dataset = mock.api.data.dataset
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    let fail = true
    let historyReads = 0
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        if (id === 'sideNotes.note_tags' && fail) throw new Error('Tags unavailable')
        if (id === 'sideNotes.path_history' && ++historyReads === 1) await held
        return handle.query(query)
      } }
    }) as typeof dataset
    const scope = { kind: 'file' as const, path: 'Notes/A.md' }
    const pending = loadNotes(scope)
    const rejected = expect(pending).rejects.toThrow('Tags unavailable')
    await waitFor(() => expect(historyReads).toBe(1))
    expect(loadNotes(scope)).toBe(pending)
    release()
    await rejected
    fail = false
    expect(await loadNotes(scope)).toHaveLength(1)
    expect(historyReads).toBe(2)
  })

  it('bounds distinct pending scopes and releases capacity after settlement', async () => {
    const mock = fixture([seed()])
    const dataset = mock.api.data.dataset
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => { if (query?.select) await held; return handle.query(query) } }
    }) as typeof dataset
    const accepted = Array.from({ length: 32 }, (_, index) => loadNotes({ kind: 'file', path: `Notes/${index}.md` }))
    await expect(loadNotes({ kind: 'file', path: 'Notes/overflow.md' })).rejects.toThrow('Too many SideNotes reads')
    release()
    await Promise.all(accepted)
    expect(await loadNotes({ kind: 'file', path: 'Notes/A.md' })).toHaveLength(1)
  })

  it('prevents a replaced reader from dispatching the next page or returning after A→B→A', async () => {
    const mock = fixture(Array.from({ length: 1001 }, (_, index) => seed({ id: `note-${index}` })))
    const dataset = mock.api.data.dataset
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    let reads = 0
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => { reads++; const page = await handle.query(query); await held; return page } }
    }) as typeof dataset
    const pending = loadNotes({ kind: 'file', path: 'Notes/A.md' })
    const rejected = expect(pending).rejects.toThrow('no longer active')
    await waitFor(() => expect(reads).toBe(1))
    fixture([])
    initRuntime(mock.api)
    release()
    await rejected
    expect(reads).toBe(1)
    mock.api.data.dataset = dataset
    expect(await loadNotes({ kind: 'file', path: 'Notes/A.md' })).toHaveLength(1001)
  })

  it('keeps registration idle with no selection and refreshes only captured selected items', async () => {
    const mock = fixture([seed({ id: ' raw-id ' }), seed({ id: 'other', path: 'Notes/B.md' })])
    const dispose = register(mock.api)
    const dataset = mock.api.data.dataset
    const bodyIds: string[][] = []
    let reads = 0
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        reads++
        if (id === 'sideNotes.notes' && !query?.select) {
          const condition = query?.where?.id
          if (!condition || typeof condition !== 'object' || !('in' in condition)) throw new Error('Unscoped body refresh')
          bodyIds.push(condition.in as string[])
        }
        return handle.query(query)
      } }
    }) as typeof dataset
    await dataset('sideNotes.notes').upsert(seed({ id: 'other', path: 'Notes/B.md', note: 'Unselected edit' }))
    expect(reads).toBe(0)
    const [selected] = await loadNotes({ kind: 'ids', ids: ['raw-id'] })
    selectSideNote(selected, 'right_sidebar')
    bodyIds.length = 0
    await dataset('sideNotes.notes').upsert(seed({ id: ' raw-id ', note: 'Selected edit' }))
    const provider = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'right_sidebar')!
    await waitFor(() => expect(provider.extension.getSnapshot().item?.title).toBe('Selected edit'))
    expect(bodyIds).toEqual([[' raw-id ']])
    dispose()
  })

  it('does not replace a newer selection when an older selected read settles', async () => {
    const mock = fixture([seed(), seed({ id: 'new', path: 'Notes/B.md', note: 'New selection' })])
    const dispose = registerSideNoteSurfaces(mock.api)
    const [old, next] = await loadNotes()
    selectSideNote(old, 'right_sidebar')
    const dataset = mock.api.data.dataset
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    let reading = false
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        const page = await handle.query(query)
        if (id === 'sideNotes.notes' && !query?.select) { reading = true; await held }
        return page
      } }
    }) as typeof dataset
    await dataset('sideNotes.notes').upsert(seed({ note: 'Older updated selection' }))
    await waitFor(() => expect(reading).toBe(true))
    selectSideNote(next, 'right_sidebar')
    release()
    await act(async () => {})
    const provider = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'right_sidebar')!
    expect(provider.extension.getSnapshot().item?.title).toBe('New selection')
    dispose()
  })

  it('disposes a captured reader without querying a revoked runtime and skips an empty subject', async () => {
    const mock = fixture([seed()])
    const repository = noteRepository()
    const dataset = vi.spyOn(mock.api.data, 'dataset')
    expect(await repository.load({ kind: 'none' })).toEqual([])
    expect(dataset).not.toHaveBeenCalled()
    const runtime = vi.spyOn(mock.api.runtime, 'getOrCreate').mockImplementation(() => { throw new Error('Revoked') })
    repository.dispose()
    repository.dispose()
    await expect(repository.load()).rejects.toThrow('no longer active')
    expect(runtime).not.toHaveBeenCalled()
  })

  it('keeps an old mounted reader from querying a replacement runtime after its dataset notification', async () => {
    const first = fixture([seed({ note: 'First vault' })])
    const mounted = renderHook(() => useNotes({ kind: 'file', path: 'Notes/A.md' }))
    await waitFor(() => expect(mounted.result.current.notes[0]?.note).toBe('First vault'))
    const second = fixture([seed({ note: 'Second vault' })])
    const foreignReads = vi.spyOn(second.api.data, 'dataset')
    await act(async () => { await first.api.data.dataset('sideNotes.notes').upsert(seed({ note: 'Late first vault edit' })) })
    act(() => mounted.result.current.reload())
    expect(foreignReads).not.toHaveBeenCalled()
    expect(mounted.result.current.notes[0].note).toBe('First vault')
    mounted.unmount()
  })

  it('keeps suspended surface restores and snapshot subscriptions bound to their original owner', async () => {
    const first = fixture([seed({ note: 'First selection' })])
    const offFirst = registerSideNoteSurfaces(first.api)
    const old = first.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'right_sidebar')!.extension
    selectSideNote((await loadNotes())[0], 'right_sidebar')
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    const fileInfo = vi.spyOn(first.api.vault, 'fileInfo').mockImplementation(async () => { await held; return null })
    const restoring = old.restore({ v: 1, path: 'Notes/A.md', search: 'Old restore' }, undefined, { background: true })
    const rejected = expect(restoring).rejects.toThrow('no longer active')
    await waitFor(() => expect(fileInfo).toHaveBeenCalledOnce())
    const second = fixture([seed({ note: 'Second selection' })])
    const offSecond = registerSideNoteSurfaces(second.api)
    const current = second.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'right_sidebar')!.extension
    const oldListener = vi.fn()
    const offListener = old.subscribe!(oldListener)
    selectSideNote((await loadNotes())[0], 'right_sidebar')
    expect(oldListener).not.toHaveBeenCalled()
    release()
    await rejected
    expect(old.getSnapshot().item?.title).toBe('First selection')
    expect(current.getSnapshot()).toMatchObject({ item: { title: 'Second selection' }, view: { search: '' } })
    expect(first.api.workspace.openFile).not.toHaveBeenCalled()
    expect(second.api.workspace.openFile).not.toHaveBeenCalled()
    offListener()
    offFirst()
    offSecond()
  })

  it('captures bookmark inputs and prevents an older restore from replacing a later completed one', async () => {
    const mock = fixture([])
    const off = registerSideNoteSurfaces(mock.api)
    const surface = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'right_sidebar')!.extension
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    const info = vi.spyOn(mock.api.vault, 'fileInfo').mockImplementation(async () => { await held; return { relPath: 'Notes/A.md' } as never })
    const raw = { v: 1 as const, path: 'Notes/A.md', search: 'Captured' }
    const options = { background: true }
    const first = surface.restore(raw, undefined, options)
    await waitFor(() => expect(info).toHaveBeenCalledOnce())
    raw.path = 'Notes/B.md'
    raw.search = 'Mutated'
    options.background = false
    release()
    await first
    expect(surface.getSnapshot().view).toMatchObject({ path: 'Notes/A.md', search: 'Captured' })
    expect(mock.api.workspace.openFile).not.toHaveBeenCalled()

    let finish!: () => void
    const delayed = new Promise<void>((resolve) => { finish = resolve })
    info.mockImplementation(async () => { await delayed; return { relPath: 'Notes/A.md' } as never })
    const older = surface.restore({ v: 1, path: 'Notes/A.md', search: 'Older' }, undefined, { background: true })
    const rejected = expect(older).rejects.toThrow('restore was replaced')
    await waitFor(() => expect(info).toHaveBeenCalledTimes(2))
    await surface.restore({ v: 1, search: 'Newer' }, undefined, { background: true })
    finish()
    await rejected
    expect(surface.getSnapshot().view.search).toBe('Newer')
    off()
  })

  it('does not publish a selected refresh when its owner changes after read resolution', async () => {
    const mock = fixture([seed()])
    const off = registerSideNoteSurfaces(mock.api)
    const surface = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'right_sidebar')!.extension
    const [original] = await loadNotes()
    selectSideNote(original, 'right_sidebar')
    const listener = vi.fn()
    const unsubscribe = surface.subscribe!(listener)
    let resolve!: (notes: SideNoteRecord[]) => void
    const settled = new Promise<SideNoteRecord[]>((accept) => { resolve = accept })
    void settled.then(() => { fixture([]) })
    vi.spyOn(noteRepository(), 'load').mockReturnValue(settled)
    await mock.api.data.dataset('sideNotes.notes').upsert(seed({ note: 'Updated' }))
    resolve([{ ...original, note: 'Updated' }])
    await settled
    expect(surface.getSnapshot().item?.title).toBe(original.note)
    expect(listener).not.toHaveBeenCalled()
    unsubscribe()
    off()
  })

  it('rejects old panel results when the subject changes and exposes the new loading state', async () => {
    const mock = fixture([seed(), seed({ id: 'b', path: 'Notes/B.md', note: 'Second subject' })])
    const dataset = mock.api.data.dataset
    let release!: () => void
    const held = new Promise<void>((resolve) => { release = resolve })
    let first = true
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        const result = await handle.query(query)
        if (id === 'sideNotes.notes' && !query?.select && first) { first = false; await held }
        return result
      } }
    }) as typeof dataset
    const mounted = renderHook(({ path }) => useNotes({ kind: 'file', path }), { initialProps: { path: 'Notes/A.md' } })
    await waitFor(() => expect(first).toBe(false))
    mounted.rerender({ path: 'Notes/B.md' })
    await waitFor(() => expect(mounted.result.current.notes[0]?.id).toBe('b'))
    await act(async () => { release() })
    expect(mounted.result.current.notes[0].id).toBe('b')
    expect(mounted.result.current).toMatchObject({ loading: false, error: null })
    mounted.unmount()
  })
})

describe('sideNotes web subjects — data layer', () => {
  let mock: MockValleyApi

  beforeEach(() => {
    mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      datasets: { 'sideNotes.notes': [], 'sideNotes.note_tags': [], 'sideNotes.path_history': [] }
    })
    initRuntime(mock.api)
  })

  it('round-trips a web note (url kept, empty path, no fileKey)', async () => {
    await appendNote(
      makeWebNote('https://example.com/docs', 'Read later', { type: 'web-selection', snippet: 'set of marks' }, ['web'])
    )
    const notes = await loadNotes()
    expect(notes).toHaveLength(1)
    expect(notes[0]).toMatchObject({
      url: 'https://example.com/docs',
      path: '',
      note: 'Read later',
      anchor: { type: 'web-selection', snippet: 'set of marks' },
      tags: ['web']
    })
    expect(notes[0].fileKey).toBeUndefined()
  })

  it('normalizes the url on the way in (hash stripped, host lowercased)', async () => {
    await appendNote(makeWebNote(normalizeUrl('HTTPS://Example.com/A?q=1#frag'), 'x', { type: 'none' }))
    const notes = await loadNotes()
    expect(notes[0].url).toBe('https://example.com/A?q=1')
  })

  it('accepts a url-only record and drops a record with neither path nor url', async () => {
    sideNotesRecords(mock).push(
      { id: 'web1', url: 'https://a.test/', note: 'kept', anchor: { type: 'none' }, createdAt: now, updatedAt: now } as unknown as DataRecord,
      { id: 'bad', note: 'no subject', anchor: { type: 'none' }, createdAt: now, updatedAt: now } as unknown as DataRecord
    )
    const notes = await loadNotes()
    expect(notes).toHaveLength(1)
    expect(notes[0].id).toBe('web1')
    expect(notes[0].url).toBe('https://a.test')
  })

  it('loads mixed file + web notes without mangling the web ones', async () => {
    await appendNote(makeNote('Notes/A.md', 'file note', { type: 'markdown-line', line: 1 }))
    await appendNote(makeWebNote('https://x.test/p', 'web note', { type: 'none' }))
    const notes = await loadNotes()
    expect(notes).toHaveLength(2)
    const web = notes.find((n) => n.url)
    expect(web).toMatchObject({ url: 'https://x.test/p', path: '', note: 'web note' })
  })

  it('leaves web notes untouched on file rename and line shift', async () => {
    await appendNote(makeWebNote('https://x.test/p', 'web note', { type: 'web-selection', snippet: 's' }))
    await retargetNotes('Notes', 'Archive')
    await shiftLines('', 1, 5)
    const notes = await loadNotes()
    expect(notes[0]).toMatchObject({ url: 'https://x.test/p', path: '', anchor: { type: 'web-selection', snippet: 's' } })
  })
})

describe('sideNotes web subjects — anchors & url helpers', () => {
  it('offers whole-page + selection anchors for a web subject', () => {
    expect(anchorOptionsForWeb()).toEqual(['none', 'web-selection'])
  })

  it('labels a web-selection anchor with its snippet, falling back to "Selection"', () => {
    expect(anchorLabel({ type: 'web-selection', snippet: 'hello' })).toBe('hello')
    expect(anchorLabel({ type: 'web-selection', snippet: '' })).toBe('Selection')
  })

  it('builds a web-selection anchor via anchorWithType', () => {
    expect(anchorWithType('web-selection', { type: 'none' })).toEqual({ type: 'web-selection', snippet: '' })
  })

  it('treats a web-selection anchor as always valid (no file to check)', async () => {
    expect(await validateAnchor('', { type: 'web-selection', snippet: 'anything' })).toBe('ok')
  })

  it('normalizeUrl strips the fragment, lowercases the host, keeps the query', () => {
    expect(normalizeUrl('https://Example.COM/Path?x=1#section')).toBe('https://example.com/Path?x=1')
    expect(normalizeUrl('https://example.com/')).toBe('https://example.com')
    expect(normalizeUrl('  not a url  ')).toBe('not a url')
    expect(normalizeUrl('')).toBe('')
  })

  it('webHostLabel returns the bare hostname', () => {
    expect(webHostLabel('https://www.example.com/a/b')).toBe('example.com')
    expect(webHostLabel('garbage')).toBe('garbage')
  })
})

function rec(id: string, anchor: SideNoteAnchor, patch: Partial<SideNoteRecord> = {}): SideNoteRecord {
  return {
    id,
    path: 'doc',
    pathHistory: [],
    note: id,
    tags: [],
    anchor,
    createdAt: now,
    updatedAt: now,
    ...patch
  }
}

/** Stable document-order ids using a resolved keys map (mirrors Panel's `scoped`). */
function order(notes: SideNoteRecord[], keys = new Map<string, number>()): string[] {
  return [...notes].sort((a, b) => comparePosition(a, b, keys)).map((n) => n.id)
}

describe('positionKey — pure document order', () => {
  it('orders PDF notes on the same page by where the snippet appears in the page text', () => {
    const page = 'zzz first second third'
    const notes = [
      rec('third', { type: 'pdf-page', page: 1, snippet: 'third' }),
      rec('first', { type: 'pdf-page', page: 1, snippet: 'first' }),
      rec('second', { type: 'pdf-page', page: 1, snippet: 'second' })
    ]
    const keys = new Map(notes.map((n) => [n.id, positionKey(n.anchor, page)]))
    expect(order(notes, keys)).toEqual(['first', 'second', 'third'])
  })

  it('sorts a page-level (snippet-less) note before snippet notes on the same page', () => {
    const page = 'intro alpha beta'
    const level = positionKey({ type: 'pdf-page', page: 2 }, page)
    const snip = positionKey({ type: 'pdf-page', page: 2, snippet: 'alpha' }, page)
    expect(level).toBeLessThan(snip)
  })

  it('sorts a snippet-not-found note to the end of its page but before the next page', () => {
    const page = 'alpha beta'
    const found = positionKey({ type: 'pdf-page', page: 1, snippet: 'beta' }, page)
    const missing = positionKey({ type: 'pdf-page', page: 1, snippet: 'gamma' }, page)
    const nextPage = positionKey({ type: 'pdf-page', page: 2 }, 'whatever')
    expect(found).toBeLessThan(missing)
    expect(missing).toBeLessThan(nextPage)
  })

  it('matches snippets across whitespace and case differences', () => {
    const idx = positionKey({ type: 'pdf-page', page: 1, snippet: 'hello world' }, 'Hello   World')
    expect(idx).toBe(1 * 1e7 + 0)
  })

  it('orders markdown by line, then by column within a line', () => {
    const file = 'line one\nalpha here\nx foo bar baz'
    const notes = [
      rec('baz', { type: 'markdown-snippet', snippet: 'baz', line: 3 }),
      rec('foo', { type: 'markdown-snippet', snippet: 'foo', line: 3 }),
      rec('l2', { type: 'markdown-line', line: 2, snippet: 'alpha here' })
    ]
    const keys = new Map(notes.map((n) => [n.id, positionKey(n.anchor, file)]))
    expect(order(notes, keys)).toEqual(['l2', 'foo', 'baz'])
  })

  it('locates a snippet in the document even when it has no resolved line', () => {
    // 'x' is on line 1 col 0 → chronological position, not a 0 fallback.
    expect(positionKey({ type: 'markdown-snippet', snippet: 'x' }, 'x y z')).toBe(1 * 1e6)
    expect(positionKey({ type: 'markdown-snippet', snippet: 'beta' }, 'alpha\nbeta gamma')).toBe(2 * 1e6)
  })

  it('falls back to the stored line when the snippet is not found in the document', () => {
    expect(positionKey({ type: 'markdown-snippet', snippet: 'missing', line: 3 }, 'a\nb\nc')).toBe(3 * 1e6)
    expect(positionKey({ type: 'markdown-snippet', snippet: 'missing' }, 'a b c')).toBe(0)
  })

  it('orders media notes by timestamp', () => {
    const notes = [
      rec('late', { type: 'media-time', seconds: 90 }),
      rec('early', { type: 'media-time', seconds: 12 })
    ]
    const keys = new Map(notes.map((n) => [n.id, positionKey(n.anchor, null)]))
    expect(order(notes, keys)).toEqual(['early', 'late'])
  })

  it('sorts type:"none" anchors to the very end', () => {
    const notes = [
      rec('none', { type: 'none' }),
      rec('page', { type: 'pdf-page', page: 9 })
    ]
    const keys = new Map(notes.map((n) => [n.id, positionKey(n.anchor, null)]))
    expect(order(notes, keys)).toEqual(['page', 'none'])
  })

  it('does not hoist flagged notes — Position is strict document order', () => {
    const notes = [
      rec('flaggedLate', { type: 'pdf-page', page: 5 }, { flagged: true }),
      rec('plainEarly', { type: 'pdf-page', page: 1 })
    ]
    const keys = new Map(notes.map((n) => [n.id, positionKey(n.anchor, null)]))
    expect(order(notes, keys)).toEqual(['plainEarly', 'flaggedLate'])
  })

  it('falls back to anchorOrder (page/line) while keys are still loading', () => {
    const notes = [
      rec('p2', { type: 'pdf-page', page: 2 }),
      rec('p1', { type: 'pdf-page', page: 1 })
    ]
    expect(order(notes)).toEqual(['p1', 'p2'])
  })
})

describe('normalizeWhitespace', () => {
  it('collapses whitespace runs, trims, and lowercases', () => {
    expect(normalizeWhitespace('  Hello\n\t World  ')).toBe('hello world')
  })
})

describe('anchorInContext — Aware mode matching', () => {
  it('matches a PDF page only when it is one of the visible pages', () => {
    const ctx = { pdfPages: [5, 6] }
    expect(anchorInContext({ type: 'pdf-page', page: 5 }, ctx, 10)).toBe(true)
    expect(anchorInContext({ type: 'pdf-page', page: 6 }, ctx, 10)).toBe(true)
    expect(anchorInContext({ type: 'pdf-page', page: 7 }, ctx, 10)).toBe(false)
    expect(anchorInContext({ type: 'pdf-page', page: 5 }, { pdfPages: null }, 10)).toBe(false)
  })

  it('matches a media timestamp within ± the range', () => {
    const ctx = { mediaSeconds: 100 }
    expect(anchorInContext({ type: 'media-time', seconds: 105 }, ctx, 10)).toBe(true)
    expect(anchorInContext({ type: 'media-time', seconds: 90 }, ctx, 10)).toBe(true)
    expect(anchorInContext({ type: 'media-time', seconds: 120 }, ctx, 10)).toBe(false)
    expect(anchorInContext({ type: 'media-time', seconds: 100 }, { mediaSeconds: null }, 10)).toBe(false)
  })

  it('matches a markdown anchor whose line is in the visible range', () => {
    const ctx = { lineRange: { from: 10, to: 20 } }
    expect(anchorInContext({ type: 'markdown-line', line: 15 }, ctx, 10)).toBe(true)
    expect(anchorInContext({ type: 'markdown-snippet', snippet: 'x', line: 10 }, ctx, 10)).toBe(true)
    expect(anchorInContext({ type: 'markdown-line', line: 21 }, ctx, 10)).toBe(false)
    expect(anchorInContext({ type: 'markdown-heading', heading: 'H', line: 5 }, ctx, 10)).toBe(false)
  })

  it('never matches positionless anchors', () => {
    expect(anchorInContext({ type: 'none' }, { pdfPages: [1] }, 10)).toBe(false)
  })
})

describe('liveDefaultAnchor — + auto-anchor', () => {
  it('uses the current PDF page, falling back to 1', () => {
    expect(liveDefaultAnchor('a.pdf', { pdfPages: [5, 6] })).toEqual({ type: 'pdf-page', page: 5 })
    expect(liveDefaultAnchor('a.pdf', {})).toEqual({ type: 'pdf-page', page: 1 })
  })

  it('uses the current rounded timestamp, falling back to 0', () => {
    expect(liveDefaultAnchor('a.mp4', { mediaSeconds: 42.7 })).toEqual({ type: 'media-time', seconds: 43 })
    expect(liveDefaultAnchor('a.mp3', {})).toEqual({ type: 'media-time', seconds: 0 })
  })

  it('uses the top visible markdown line, falling back to 1', () => {
    expect(liveDefaultAnchor('a.md', { lineRange: { from: 12, to: 30 } })).toEqual({ type: 'markdown-line', line: 12 })
    expect(liveDefaultAnchor('a.md', {})).toEqual({ type: 'markdown-line', line: 1 })
  })
})

describe('resolvePositionKeys — live document resolution', () => {
  it('resolves PDF page+snippet keys via getPdfPageText (page cached, one read per page)', async () => {
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      pdfPages: { 'survey.pdf': ['cover', 'page two', 'zzz first second third'] }
    })
    initRuntime(mock.api)
    const notes = [
      rec('third', { type: 'pdf-page', page: 3, snippet: 'third' }),
      rec('first', { type: 'pdf-page', page: 3, snippet: 'first' }),
      rec('second', { type: 'pdf-page', page: 3, snippet: 'second' }),
      rec('pageLevel', { type: 'pdf-page', page: 3 }),
      rec('p1', { type: 'pdf-page', page: 1 })
    ]
    const keys = await resolvePositionKeys('survey.pdf', notes)
    expect(order(notes, keys)).toEqual(['p1', 'pageLevel', 'first', 'second', 'third'])
  })

  it('resolves markdown snippet/line keys against the file text', async () => {
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      files: { 'note.md': 'line one\nalpha here\nx foo bar baz' }
    })
    initRuntime(mock.api)
    const notes = [
      rec('baz', { type: 'markdown-snippet', snippet: 'baz', line: 3 }),
      rec('foo', { type: 'markdown-snippet', snippet: 'foo', line: 3 }),
      rec('l2', { type: 'markdown-line', line: 2, snippet: 'alpha here' })
    ]
    const keys = await resolvePositionKeys('note.md', notes)
    expect(order(notes, keys)).toEqual(['l2', 'foo', 'baz'])
  })
})

describe('validateAnchor — PDF snippet matching', () => {
  it('matches snippets whitespace-normalized (highlight selections collapse newlines)', async () => {
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      pdfPages: { 'survey.pdf': ['Die  Wärmeleitung folgt\tdem Fourier-Gesetz'] }
    })
    initRuntime(mock.api)
    expect(
      await validateAnchor('survey.pdf', {
        type: 'pdf-page',
        page: 1,
        snippet: 'Wärmeleitung folgt dem Fourier-Gesetz'
      })
    ).toBe('ok')
    expect(
      await validateAnchor('survey.pdf', { type: 'pdf-page', page: 1, snippet: 'not on this page' })
    ).toBe('missing')
  })
})

describe('sideNotes search — #tag filtering', () => {
  it('matches a single #tag and narrows with multiple hashtags (AND)', () => {
    expect(matchesSearch('#fungi', ['fungi', 'survey'], 'note', 'path')).toBe(true)
    expect(matchesSearch('#fungi #survey', ['fungi'], 'note', 'path')).toBe(false)
    expect(matchesSearch('#fungi #survey', ['fungi', 'survey'], 'note', 'path')).toBe(true)
  })
  it('prefix-matches tags and combines with free text', () => {
    expect(matchesSearch('#fu', ['fungi'], 'note', 'path')).toBe(true)
    expect(matchesSearch('habitat #fungi', ['fungi'], 'weekly habitat observation', 'p')).toBe(true)
    expect(matchesSearch('habitat #fungi', ['fungi'], 'other', 'p')).toBe(false)
  })
  it('falls back to plain-text search and empty query matches all', () => {
    expect(matchesSearch('alpha', [], 'has alpha', 'p')).toBe(true)
    expect(matchesSearch('alpha', [], 'beta', 'p')).toBe(false)
    expect(matchesSearch('  ', ['x'], 'a', 'b')).toBe(true)
  })
})

describe('sideNotes styles — anchor pill', () => {
  it('clips both anchor pills instead of letting them spill over the card buttons', async () => {
    const { injectStyles } = await import('../src/styles')
    const dispose = injectStyles()
    const css = document.getElementById('notes-sidenotes-styles')?.textContent ?? ''
    dispose()
    for (const selector of ['.flagged-note-anchor', '.sidenote-anchor-badge']) {
      const rule = new RegExp(`\\${selector} \\{([^}]*)\\}`).exec(css)?.[1] ?? ''
      expect(rule, selector).toContain('overflow: hidden')
      expect(rule, selector).toContain('text-overflow: ellipsis')
      expect(rule, selector).toContain('min-width: 0')
    }
  })
})

describe('SideNotes explicit automation', () => {
  it('edits a selected annotation and rejects stale or unsupported values', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments }, datasets: { 'sideNotes.notes': [seed()] } })
    initRuntime(mock.api)
    registerSideNoteCommands(mock.api)
    expect((await mock.api.commands.execute('sideNotes:update', { id: 'sidenote_test', values: { note: 'Stale' }, expectedUpdatedAt: 'older' })).ok).toBe(false)
    expect((await mock.api.commands.execute('sideNotes:update', { id: 'missing', values: { note: 'Missing' } })).ok).toBe(false)
    expect((await mock.api.commands.execute('sideNotes:update', { id: 'sidenote_test', values: { path: 'Elsewhere.md' } })).ok).toBe(false)
    const saved = await mock.api.commands.execute('sideNotes:update', { id: 'sidenote_test', values: { note: 'Checked derivation', flagged: true, tags: ['review'] }, expectedUpdatedAt: now })
    expect(saved.ok).toBe(true)
    expect((await loadNotes())[0]).toMatchObject({ note: 'Checked derivation', flagged: true, tags: ['review'], path: 'Notes/A.md' })
    expect(mock.busUndo).toHaveLength(1)
  })

  it('refuses creation without text or with an anchor that does not fit its subject', async () => {
    const mock = createMockValleyApi({ manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments }, files: { 'Notes/A.md': 'Text' } })
    initRuntime(mock.api)
    registerSideNoteCommands(mock.api)
    expect((await mock.api.commands.execute('sideNotes:create', { path: 'Notes/A.md' })).ok).toBe(false)
    expect((await mock.api.commands.execute('sideNotes:create', { path: 'Notes/A.md', note: 'Text', anchor: { type: 'media-time', seconds: 20 } })).ok).toBe(false)
    expect(await loadNotes()).toHaveLength(0)
  })
})
