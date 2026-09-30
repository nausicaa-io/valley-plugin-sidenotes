import { describe, expect, it, vi } from 'vitest'
import { createMockValleyApi, type MockValleyApi } from '@valley/plugin-testkit'
import { appendNote, captureNoteMutation, makeNote, makeWebNote, noteRepository, retargetNotes, shiftLines, updateNote, type DocumentRevision } from '../src/data'
import { openSideNoteSubject, registerSideNoteCommands, saveNoteValues } from '../src/commands'
import { initRuntime, sideNoteEditStore } from '../src/runtime'
import type { SideNoteRecord } from '../src/types'
import config from '../config.json'

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

function runtime() {
  const mock = createMockValleyApi({
    manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
    datasets: { 'sideNotes.notes': [], 'sideNotes.note_tags': [], 'sideNotes.path_history': [] }
  })
  initRuntime(mock.api)
  vi.spyOn(mock.api.commands, 'register')
  return mock
}

async function seeded(mock: MockValleyApi) {
  const note = makeNote('Notes/A.md', 'Original body', { type: 'markdown-line', line: 2 }, ['original'])
  note.pathHistory = ['Old/A.md']
  expect(await appendNote(note)).toBe(true)
  expect(mock.datasets.get('sideNotes.notes')).toHaveLength(1)
  return note
}

interface CommandResult {
  value: SideNoteRecord
  revert: { run(): Promise<void>; reapply(): Promise<void> }
}

function command(mock: MockValleyApi, id: string) {
  return vi.mocked(mock.api.commands.register).mock.calls.find(([definition]) => definition.id === id)![0] as unknown as {
    run(input: unknown): Promise<CommandResult>
    revision(input: unknown): Promise<unknown>
    preview(input: unknown): unknown
  }
}

async function turns() { for (let index = 0; index < 15; index++) await Promise.resolve() }

describe('SideNotes mutation session lifetime', () => {
  it('rejects a deferred stat after A → B → A without dispatching a transaction', async () => {
    const first = runtime()
    const held = deferred<Awaited<ReturnType<typeof first.api.vault.stat>>>()
    vi.spyOn(first.api.vault, 'stat').mockReturnValue(held.promise)
    const transaction = vi.spyOn(first.api.data, 'transaction')
    const result = appendNote(makeNote('Notes/A.md', 'Accepted', { type: 'none' }))
    const rejected = expect(result).rejects.toThrow('no longer active')
    const second = runtime()
    const otherTransaction = vi.spyOn(second.api.data, 'transaction')
    initRuntime(first.api)
    held.resolve({ dev: 1, ino: 2 })
    await rejected
    expect(transaction).not.toHaveBeenCalled()
    expect(otherTransaction).not.toHaveBeenCalled()
  })

  it('copies admitted record arrays, anchor, and document revision before a delayed stat', async () => {
    const mock = runtime()
    const note = await seeded(mock)
    const held = deferred<Awaited<ReturnType<typeof mock.api.vault.stat>>>()
    vi.spyOn(mock.api.vault, 'stat').mockReturnValue(held.promise)
    const write = vi.spyOn(mock.api.documents, 'update').mockResolvedValue({} as never)
    const revision: DocumentRevision = { expectedRevision: 3, vaultGeneration: 7 }
    const next = { ...note, note: 'Accepted edit', tags: ['accepted'], anchor: { type: 'markdown-line' as const, line: 5 }, pathHistory: ['Accepted/old.md'] }
    const result = updateNote(note.id, next, note.updatedAt, revision)
    next.note = 'Late edit'; next.tags[0] = 'late'; next.anchor.line = 99; next.pathHistory[0] = 'Late.md'
    revision.expectedRevision = 99; revision.vaultGeneration = 99
    held.resolve({ dev: 1, ino: 2 })
    expect(await result).toBe(true)
    expect(write).toHaveBeenCalledOnce()
    expect(write.mock.calls[0][1]).toMatchObject({
      expectedRevision: 3, vaultGeneration: 7, body: 'Accepted edit', explicitTags: ['accepted'],
      operations: [
        { dataset: 'sideNotes.notes', operation: 'update', key: { id: note.id }, values: { anchor: { type: 'markdown-line', line: 5 } } },
        { dataset: 'sideNotes.path_history', operation: 'delete', key: { noteId: note.id, position: 0 } },
        { dataset: 'sideNotes.path_history', operation: 'insert', values: { noteId: note.id, position: 0, path: 'Accepted/old.md' } }
      ]
    })
    const metadata = write.mock.calls[0][1].operations![0]
    expect(metadata.operation === 'update' && metadata.values).not.toHaveProperty('note')
    expect(write.mock.calls[0][1].operations!.some((operation) => operation.dataset === 'sideNotes.note_tags')).toBe(false)
  })

  it('stops after a document read resolves in a revoked repository lifetime', async () => {
    const mock = runtime()
    const note = await seeded(mock)
    const baseline = await mock.api.documents.read({ pluginId: 'sideNotes', sourceId: 'notes', itemId: note.id })
    const held = deferred<typeof baseline>()
    const entered = deferred<void>()
    vi.spyOn(mock.api.documents, 'read').mockImplementation(() => { entered.resolve(); return held.promise })
    const write = vi.spyOn(mock.api.documents, 'update')
    const result = updateNote(note.id, { ...note, note: 'Pending' })
    await entered.promise
    noteRepository().dispose()
    held.resolve(baseline)
    expect(await result).toBe(false)
    expect(write).not.toHaveBeenCalled()
  })

  it('joins accepted relation reads and refuses a later page after rebinding', async () => {
    const mock = runtime()
    const note = await seeded(mock)
    const original = mock.api.data.dataset
    const tags = deferred<{ rows: []; cursor: string }>()
    const history = deferred<{ rows: [] }>()
    const bothStarted = deferred<void>()
    let calls = 0
    mock.api.data.dataset = ((id) => {
      const handle = original(id)
      if (!['sideNotes.note_tags', 'sideNotes.path_history'].includes(id)) return handle
      return { ...handle, query: () => {
        if (++calls === 2) bothStarted.resolve()
        return id === 'sideNotes.note_tags' ? tags.promise : history.promise
      } }
    }) as typeof original
    const write = vi.spyOn(mock.api.documents, 'update')
    let settled = false
    const result = updateNote(note.id, { ...note, note: 'Pending' }).finally(() => { settled = true })
    await bothStarted.promise
    tags.reject(new Error('Tags unavailable'))
    await turns()
    expect(settled).toBe(false)
    runtime()
    history.resolve({ rows: [] })
    expect(await result).toBe(false)
    expect(calls).toBe(2)
    expect(write).not.toHaveBeenCalled()
  })

  it('does not dispatch a queued relation page once its first page becomes stale', async () => {
    const mock = runtime()
    const note = await seeded(mock)
    const original = mock.api.data.dataset
    const held = deferred<{ rows: []; cursor: string }>()
    const entered = deferred<void>()
    let queries = 0
    mock.api.data.dataset = ((id) => {
      const handle = original(id)
      if (id !== 'sideNotes.path_history') return handle
      return { ...handle, query: () => { queries++; entered.resolve(); return held.promise } }
    }) as typeof original
    const result = updateNote(note.id, { ...note, note: 'Pending' })
    await entered.promise
    runtime()
    held.resolve({ rows: [], cursor: 'page-2' })
    expect(await result).toBe(false)
    expect(queries).toBe(1)
  })

  it('returns the actual completion of an already dispatched originating write without replay', async () => {
    const first = runtime()
    const held = deferred<Awaited<ReturnType<typeof first.api.data.transaction>>>()
    const entered = deferred<void>()
    const transaction = vi.spyOn(first.api.data, 'transaction').mockImplementation(() => { entered.resolve(); return held.promise })
    const result = appendNote(makeWebNote('https://example.test/', 'Accepted', { type: 'none' }))
    await entered.promise
    const second = runtime()
    const otherTransaction = vi.spyOn(second.api.data, 'transaction')
    held.resolve([] as never)
    expect(await result).toBe(true)
    expect(transaction).toHaveBeenCalledOnce()
    expect(otherTransaction).not.toHaveBeenCalled()
  })

  it.each(['rename', 'shift'] as const)('settles %s cancellation without continuing its remaining updates', async (kind) => {
    const mock = runtime()
    const first = await seeded(mock)
    await appendNote({ ...first, id: 'second' })
    const entered = deferred<void>()
    const held = deferred<Awaited<ReturnType<typeof mock.api.documents.update>>>()
    const update = vi.spyOn(mock.api.documents, 'update').mockImplementation(() => { entered.resolve(); return held.promise })
    const session = captureNoteMutation(mock.api)
    const result = kind === 'rename' ? retargetNotes('Notes', 'Archive', session) : shiftLines('Notes/A.md', 1, 2, session)
    await entered.promise
    runtime()
    held.resolve({} as never)
    await result
    expect(update).toHaveBeenCalledOnce()
  })
})

describe('SideNotes registered command lifetime', () => {
  it.each(['dispose', 'A → B → A'] as const)('rejects saved registered callbacks after %s without new API dispatch', async (mode) => {
    const mock = runtime()
    const off = registerSideNoteCommands(mock.api)
    const commands = ['list', 'get', 'open', 'create', 'update', 'delete'].map((id) => command(mock, id))
    if (mode === 'dispose') off()
    else { runtime(); initRuntime(mock.api) }
    const dataset = vi.spyOn(mock.api.data, 'dataset')
    const file = vi.spyOn(mock.api.vault, 'fileInfo')
    const inputs = [{}, { id: 'id' }, { id: 'id' }, { path: 'A.md', note: 'Text' }, { id: 'id', values: { note: 'Text' } }, { id: 'id' }]
    for (let index = 0; index < commands.length; index++) await expect(commands[index].run(inputs[index])).rejects.toThrow('no longer active')
    await expect(commands[3].revision({ path: 'A.md' })).rejects.toThrow('no longer active')
    expect(() => commands[3].preview({ note: 'Text' })).toThrow('no longer active')
    expect(dataset).not.toHaveBeenCalled()
    expect(file).not.toHaveBeenCalled()
  })

  it('does not begin anchor enrichment or a mutation after delayed fileInfo and disposal', async () => {
    const mock = runtime()
    const off = registerSideNoteCommands(mock.api)
    const held = deferred<Awaited<ReturnType<typeof mock.api.vault.fileInfo>>>()
    vi.spyOn(mock.api.vault, 'fileInfo').mockReturnValue(held.promise)
    const read = vi.spyOn(mock.api.vault, 'readFile')
    const stat = vi.spyOn(mock.api.vault, 'stat')
    const result = command(mock, 'create').run({ path: 'A.md', note: 'Text', anchor: { type: 'markdown-line', line: 1 } })
    const rejected = expect(result).rejects.toThrow('no longer active')
    off()
    held.resolve({ relPath: 'A.md' } as never)
    await rejected
    expect(read).not.toHaveBeenCalled()
    expect(stat).not.toHaveBeenCalled()
  })

  it('rejects a captured anchor read after runtime rebinding without a new stat or write', async () => {
    const mock = runtime()
    registerSideNoteCommands(mock.api)
    vi.spyOn(mock.api.vault, 'fileInfo').mockResolvedValue({ relPath: 'A.md' } as never)
    const held = deferred<string>()
    const entered = deferred<void>()
    vi.spyOn(mock.api.vault, 'readFile').mockImplementation(() => { entered.resolve(); return held.promise })
    const stat = vi.spyOn(mock.api.vault, 'stat')
    const result = command(mock, 'create').run({ path: 'A.md', note: 'Text', anchor: { type: 'markdown-line', line: 1 } })
    const rejected = expect(result).rejects.toThrow('no longer active')
    await entered.promise
    const other = runtime()
    const otherRead = vi.spyOn(other.api.vault, 'readFile')
    held.resolve('First line')
    await rejected
    expect(stat).not.toHaveBeenCalled()
    expect(otherRead).not.toHaveBeenCalled()
  })

  it('copies edit values before the note lookup settles', async () => {
    const mock = runtime()
    const note = await seeded(mock)
    const reader = noteRepository()
    const read = reader.load.bind(reader)
    const held = deferred<void>()
    vi.spyOn(reader, 'load').mockImplementation(async (scope) => {
      const value = await read(scope)
      await held.promise
      return value
    })
    const values = { note: 'Accepted', tags: ['accepted'], anchor: { type: 'markdown-line' as const, line: 2 } }
    const pending = saveNoteValues(note.id, values)
    values.note = 'Alias'; values.tags[0] = 'alias'; values.anchor.line = 99
    held.resolve()
    const saved = await pending
    expect(saved.value).toMatchObject({ note: 'Accepted', tags: ['accepted'], anchor: { type: 'markdown-line', line: 2 } })
    expect(mock.datasets.get('sideNotes.notes')![0].note).toBe('Accepted')
  })

  it('keeps undo and reapply records private from a caller-mutated command result', async () => {
    const mock = runtime()
    const note = await seeded(mock)
    const saved = await saveNoteValues(note.id, { note: 'Accepted edit', tags: ['accepted'] })
    saved.value.note = 'Alias edit'; saved.value.tags[0] = 'alias'; saved.value.pathHistory[0] = 'Alias.md'
    await saved.revert.run()
    expect(mock.datasets.get('sideNotes.notes')![0].note).toBe('Original body')
    await saved.revert.reapply()
    expect(mock.datasets.get('sideNotes.notes')![0].note).toBe('Accepted edit')
    expect(mock.datasets.get('sideNotes.note_tags')).toEqual([{ noteId: note.id, tag: 'accepted' }])
    expect(mock.datasets.get('sideNotes.path_history')).toEqual([{ noteId: note.id, position: 0, path: 'Old/A.md' }])
    const read = vi.spyOn(mock.api.documents, 'read')
    runtime(); initRuntime(mock.api)
    await expect(saved.revert.run()).rejects.toThrow('no longer active')
    await expect(saved.revert.reapply()).rejects.toThrow('no longer active')
    expect(read).not.toHaveBeenCalled()
  })

  it('copies create inputs before fileInfo and binds its undo to registration disposal', async () => {
    const mock = runtime()
    const off = registerSideNoteCommands(mock.api)
    const held = deferred<Awaited<ReturnType<typeof mock.api.vault.fileInfo>>>()
    vi.spyOn(mock.api.vault, 'fileInfo').mockReturnValue(held.promise)
    const input = { path: 'A.md', note: 'Accepted', tags: ['accepted'], anchor: { type: 'markdown-line' as const, line: 1 } }
    const result = command(mock, 'create').run(input)
    input.path = 'B.md'; input.note = 'Alias'; input.tags[0] = 'alias'; input.anchor.line = 9
    held.resolve({ relPath: 'A.md' } as never)
    const created = await result
    expect(created.value).toMatchObject({ path: 'A.md', note: 'Accepted', tags: ['accepted'], anchor: { type: 'markdown-line', line: 1 } })
    created.value.note = 'Alias undo'
    await created.revert.run()
    await created.revert.reapply()
    expect(mock.datasets.get('sideNotes.notes')![0].note).toBe('Accepted')
    off()
    await expect(created.revert.run()).rejects.toThrow('no longer active')
  })

  it('preserves the admitted open subject and prevents publication after a delayed panel reveal', async () => {
    const mock = runtime()
    const held = deferred<Awaited<ReturnType<typeof mock.api.vault.fileInfo>>>()
    vi.spyOn(mock.api.vault, 'fileInfo').mockReturnValue(held.promise)
    const subject = { path: 'A.md', anchor: { type: 'markdown-line' as const, line: 2 } }
    const opened = openSideNoteSubject(mock.api, subject)
    subject.path = 'B.md'; subject.anchor.line = 99
    held.resolve({ relPath: 'A.md' } as never)
    await opened
    expect(mock.api.workspace.openFile).toHaveBeenCalledWith('A.md', { type: 'markdown-line', line: 2 })
    const note = await seeded(mock)
    registerSideNoteCommands(mock.api)
    const edits = sideNoteEditStore()
    const reveal = deferred<void>()
    const entered = deferred<void>()
    vi.spyOn(mock.api.workspace, 'revealOwnPanel').mockImplementation(() => { entered.resolve(); return reveal.promise })
    const result = command(mock, 'open').run({ id: note.id })
    const rejected = expect(result).rejects.toThrow('no longer active')
    await entered.promise
    runtime()
    reveal.resolve()
    await rejected
    expect(edits.get()).toBeNull()
    expect(sideNoteEditStore().get()).toBeNull()
  })
})
