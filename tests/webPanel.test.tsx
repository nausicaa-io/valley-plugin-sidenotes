import * as React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import type { ValleyPluginManifest, DataRecord } from '@valley/plugin-sdk/types'
import { createMockValleyApi, type MockValleyApi } from '@valley/plugin-testkit'
import { initRuntime } from '../src/runtime'
import { Panel } from '../src/Panel'
import { FlaggedPanel } from '../src/FlaggedPanel'
import { Settings } from '../src/Settings'
import {
  PLUGIN_SURFACE_V1,
  SEARCH_RESULT_ACTION_V1,
  WEB_ACTIVE_CONTEXT_V1,
  WEB_NAVIGATOR_V1,
  type DatasetRecord
} from '@valley/plugin-sdk'
import { registerSearchCard } from '../src/searchCard'
import config from '../config.json'
import { SideNoteEditModal } from '../src/fields'
import { deleteNote, loadNotes } from '../src/data'
import { registerSideNotesFence } from '../src/fence'
import { registerSideNoteSurfaces } from '../src/surfaces'

const now = '2026-06-01T12:00:00.000Z'
const sideNotesRecords = (mock: MockValleyApi): DataRecord[] =>
  (mock.datasets.get('sideNotes.notes') ?? []) as DataRecord[]

function webNote(patch: Partial<DataRecord> = {}): DataRecord {
  return {
    id: 'w1',
    path: '',
    url: 'https://example.com/docs',
    pathHistory: [],
    note: 'page note here',
    tags: [],
    anchor: { type: 'web-selection', snippet: 'set of marks' },
    createdAt: now,
    updatedAt: now,
    ...patch
  } as unknown as DataRecord
}

function fileNote(id: string, path: string, note: string): DataRecord {
  return {
    id,
    path,
    pathHistory: [],
    note,
    flagged: true,
    tags: [],
    anchor: { type: 'none' },
    createdAt: now,
    updatedAt: now
  } as unknown as DataRecord
}

describe('shared SideNote documents', () => {
  let mock: MockValleyApi
  beforeEach(() => {
    mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] },
      datasets: { 'sideNotes.notes': [fileNote('n1', 'Notes/Ferns.md', 'Original #wald') as DatasetRecord], 'sideNotes.note_tags': [{ noteId: 'n1', tag: 'explicit' }], 'sideNotes.path_history': [] }
    })
    initRuntime(mock.api)
    vi.spyOn(mock.api.documents.drafts, 'clear')
  })
  afterEach(cleanup)

  it('lets the reader retry a failed note-list load', async () => {
    const dataset = mock.api.data.dataset
    let fail = true
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        if (id === 'sideNotes.notes' && fail) { fail = false; throw new Error('Read unavailable') }
        return handle.query(query)
      } }
    }) as typeof dataset
    render(<FlaggedPanel />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load SideNotes')
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Retry' })) })
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
    expect(await loadNotes()).toHaveLength(1)
  })

  it('saves shared Markdown and explicit tags atomically without rewriting inline tags', async () => {
    const [note] = await loadNotes()
    const update = vi.spyOn(mock.api.documents, 'update')
    const close = vi.fn()
    render(<SideNoteEditModal note={note} onSaved={vi.fn()} onClose={close} />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled())
    fireEvent.change(screen.getByLabelText('Annotation'), { target: { value: '**Ferns** #wald' } })
    fireEvent.change(screen.getByRole('combobox', { name: 'Tags' }), { target: { value: '#Äste/jung' } })
    fireEvent.keyDown(screen.getByRole('combobox', { name: 'Tags' }), { key: 'Enter' })
    expect(update).not.toHaveBeenCalled()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
    expect(update).toHaveBeenCalledWith({ pluginId: 'sideNotes', sourceId: 'notes', itemId: 'n1' }, expect.objectContaining({ body: '**Ferns** #wald', explicitTags: expect.arrayContaining(['explicit', 'äste/jung']), expectedRevision: expect.any(Number) }))
    expect(close).toHaveBeenCalledTimes(1)
    expect(mock.api.documents.drafts.clear).toHaveBeenCalledWith({ pluginId: 'sideNotes', sourceId: 'notes', itemId: 'n1' })
  })

  it('preserves the dirty editor on revision conflict and clears recovery only on Cancel', async () => {
    const [note] = await loadNotes()
    const close = vi.fn()
    render(<SideNoteEditModal note={note} onSaved={vi.fn()} onClose={close} />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled())
    fireEvent.change(screen.getByLabelText('Annotation'), { target: { value: 'Unsaved local Markdown' } })
    await mock.api.data.dataset('sideNotes.note_tags').insert({ noteId: 'n1', tag: 'external' })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
    expect(screen.getByLabelText('Annotation')).toHaveValue('Unsaved local Markdown')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect((await loadNotes())[0].note).toBe('Original #wald')
    expect(close).not.toHaveBeenCalled()
    expect(mock.api.documents.drafts.clear).not.toHaveBeenCalled()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Cancel' })) })
    expect(close).toHaveBeenCalledTimes(1)
    expect(mock.api.documents.drafts.clear).toHaveBeenCalledWith({ pluginId: 'sideNotes', sourceId: 'notes', itemId: 'n1' })
  })
})

describe('scoped SideNotes fences', () => {
  afterEach(cleanup)

  it('normalizes the web fence URL before both its query and final filter', async () => {
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      datasets: { 'sideNotes.notes': [webNote()] as DatasetRecord[], 'sideNotes.note_tags': [], 'sideNotes.path_history': [] }
    })
    initRuntime(mock.api)
    mock.api.ui.renderReact = (element, node) => {
      const mounted = render(node as React.ReactElement, { container: element })
      return () => mounted.unmount()
    }
    const off = registerSideNotesFence()
    const element = document.createElement('div')
    document.body.appendChild(element)
    const dispose = mock.codeBlockRenderers.get('sidenotes')!('url: https://EXAMPLE.COM:443/docs#section', element, { path: null, meta: null })
    try { expect(await screen.findByText('page note here')).toBeInTheDocument() }
    finally { if (typeof dispose === 'function') dispose(); off(); element.remove() }
  })

  it('keeps file-fence matching semantics while reading only that subject and allows retry after failure', async () => {
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      datasets: {
        'sideNotes.notes': [fileNote('file', 'Notes/A.md', 'File annotation'), webNote({ id: 'mixed', path: 'Notes/A.md', note: 'Mixed subject annotation' }), fileNote('other', 'Notes/B.md', 'Unrelated annotation')] as DatasetRecord[],
        'sideNotes.note_tags': [], 'sideNotes.path_history': []
      }
    })
    initRuntime(mock.api)
    const dataset = mock.api.data.dataset
    const bodyIds: string[][] = []
    let fail = true
    mock.api.data.dataset = ((id: string) => {
      const handle = dataset(id)
      return { ...handle, query: async (query) => {
        if (id === 'sideNotes.note_tags' && fail) { fail = false; throw new Error('Relations unavailable') }
        if (id === 'sideNotes.notes' && !query?.select) {
          const condition = query?.where?.id
          if (!condition || typeof condition !== 'object' || !('in' in condition)) throw new Error('Unscoped fence body query')
          bodyIds.push(condition.in as string[])
        }
        return handle.query(query)
      } }
    }) as typeof dataset
    mock.api.ui.renderReact = (element, node) => {
      const mounted = render(node as React.ReactElement, { container: element })
      return () => mounted.unmount()
    }
    const off = registerSideNotesFence()
    const element = document.createElement('div')
    document.body.appendChild(element)
    const dispose = mock.codeBlockRenderers.get('sidenotes')!('', element, { path: 'Notes/A.md', meta: null })
    try {
      expect(await screen.findByRole('alert')).toHaveTextContent('Could not load SideNotes')
      fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
      expect(await screen.findByText('File annotation')).toBeInTheDocument()
      expect(screen.getByText('Mixed subject annotation')).toBeInTheDocument()
      expect(screen.queryByText('Unrelated annotation')).not.toBeInTheDocument()
      expect(bodyIds).toEqual([['file', 'mixed'], ['file', 'mixed']])
    } finally {
      if (typeof dispose === 'function') dispose()
      off()
      element.remove()
    }
  })
})

describe('SideNotes Settings', () => {
  let mock: MockValleyApi

  beforeEach(() => {
    mock = createMockValleyApi({ manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] } })
    initRuntime(mock.api)
  })

  afterEach(cleanup)

  it('shows the default extensions as chips and saves normalized additions', async () => {
    render(<Settings />)

    expect(screen.getByText('.md')).toBeTruthy()
    expect(screen.getByText('.mp3')).toBeTruthy()
    expect(screen.getByText('.mp4')).toBeTruthy()
    expect(screen.getByText('.pdf')).toBeTruthy()

    const input = screen.getByRole('textbox', { name: 'Filter types' })
    expect(input.getAttribute('placeholder')).toBe('.png')
    fireEvent.change(input, { target: { value: ' WAV ' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    await waitFor(() => {
      expect(mock.api.settings.get().filterTypes).toEqual(['.md', '.mp3', '.mp4', '.pdf', '.wav'])
    })
  })
})

describe('SideNotes whole-file panel', () => {
  afterEach(cleanup)

  it.each(['Canopy.docx', 'Canopy.canvas', 'Canopy.glb', 'Canopy.ts', 'README'])('keeps %s at file level and sorts newest first', async (path) => {
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] },
      datasets: { 'sideNotes.notes': [fileNote('old', path, 'Older canopy note'), { ...fileNote('new', path, 'Newer canopy note'), updatedAt: '2026-06-02T12:00:00.000Z' }] },
      activePath: path
    })
    initRuntime(mock.api)
    const read = vi.spyOn(mock.api.vault, 'readFile')
    await act(async () => { render(<Panel />) })
    await screen.findByText('Newer canopy note')
    expect(screen.queryByRole('button', { name: 'Aware mode' })).not.toBeInTheDocument()
    const sort = screen.getByRole('button', { name: 'Sort notes by' })
    expect(sort).toHaveAttribute('title', 'Desc · Updated')
    expect(screen.getAllByText(/(?:Older|Newer) canopy note/).map((item) => item.textContent)).toEqual(['Newer canopy note', 'Older canopy note'])
    await act(async () => { fireEvent.click(sort) })
    const menu = render(mock.popovers[0].node)
    expect(within(menu.container).queryByRole('button', { name: 'Position' })).not.toBeInTheDocument()
    expect(within(menu.container).getByRole('button', { name: 'Updated' })).toBeInTheDocument()
    menu.unmount()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Create sidenote' })) })
    expect(screen.queryByLabelText('SideNote anchor type')).not.toBeInTheDocument()
    expect(read).not.toHaveBeenCalled()
  })

  it('restores positional controls on Markdown and leaves whole-file notes visible after Aware was enabled', async () => {
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments },
      datasets: { 'sideNotes.notes': [fileNote('model', 'Canopy.glb', 'Model note')] },
      activePath: 'Canopy.md'
    })
    initRuntime(mock.api)
    await act(async () => { render(<Panel />) })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Aware mode' })) })
    await act(async () => { mock.emitState({ activePath: 'Canopy.glb' }) })
    expect(await screen.findByText('Model note')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Aware mode' })).not.toBeInTheDocument()
    await act(async () => { mock.emitState({ activePath: 'Canopy.md' }) })
    expect(screen.getByRole('button', { name: 'Aware mode' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sort notes by' })).toHaveAttribute('title', 'Asc · Position')
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Create sidenote' })) })
    expect(screen.getByLabelText('SideNote anchor type')).toBeInTheDocument()
  })
})

/** Publish an active website the way the Web plugin's bridge does. */
let offActiveWeb = (): void => {}
function setActiveWeb(mock: MockValleyApi, ctx: { instanceId: string; url: string; title: string } | null): void {
  offActiveWeb()
  offActiveWeb = ctx ? mock.provideInterop(WEB_ACTIVE_CONTEXT_V1, ctx, 'surfing') : () => {}
}

describe('SideNotes Panel — website subject', () => {
  let mock: MockValleyApi

  beforeEach(() => {
    mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] },
      datasets: { 'sideNotes.notes': [], 'sideNotes.note_tags': [], 'sideNotes.path_history': [] },
      activePath: null
    })
    initRuntime(mock.api)
  })
  afterEach(() => {
    cleanup()
    setActiveWeb(mock, null)
  })

  it.each([['right', Panel], ['left', FlaggedPanel]] as const)('keeps the %s search on the shared frame through typing and clearing', async (_surface, View) => {
    sideNotesRecords(mock).push(webNote({ flagged: true }))
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    await act(async () => render(<View />))
    expect(await screen.findByText('page note here')).toBeTruthy()
    const frame = document.querySelector('.sidenote-search-bar') as HTMLElement
    const input = within(frame).getByRole('textbox')
    expect(frame).toHaveClass('search-field')
    expect(input).toHaveClass('search-field-input')
    expect(frame.querySelector('.search-field-icon')).not.toBeNull()
    expect(within(frame).queryByRole('button')).toBeNull()
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'missing annotation' } })
    await waitFor(() => expect(screen.queryByText('page note here')).toBeNull())
    const clear = within(frame).getByRole('button')
    expect(clear).toHaveClass('search-field-action')
    expect(clear).not.toHaveClass('sidenote-icon-btn')
    expect(input.parentElement).toBe(frame)
    fireEvent.click(clear)
    expect(input).toHaveValue('')
    expect(await screen.findByText('page note here')).toBeTruthy()
    expect(within(frame).queryByRole('button')).toBeNull()
  })

  it('shows the page host + its notes when a website is active and no file is open', async () => {
    sideNotesRecords(mock).push(webNote())
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    await act(async () => render(<Panel />))
    // Header shows the website host as the subject.
    expect(await screen.findByText('example.com')).toBeTruthy()
    // The page's note renders (not the empty state).
    expect(await screen.findByText('page note here')).toBeTruthy()
    expect(screen.queryByText('Open a file, folder, or website')).toBeNull()
    // The selection snippet surfaces as the anchor badge.
    expect(screen.getByText('set of marks')).toBeTruthy()
  })

  it('only shows notes for the exact active page (not other pages)', async () => {
    sideNotesRecords(mock).push(
      webNote(),
      webNote({ id: 'w2', note: 'second page note' }),
      webNote({ id: 'w3', url: 'https://example.com/other', note: 'other page note' })
    )
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    await act(async () => render(<Panel />))
    expect(await screen.findByText('page note here')).toBeTruthy()
    expect(screen.getByText('second page note')).toBeTruthy()
    expect(document.querySelectorAll('.sidenote-card')).toHaveLength(2)
    expect(screen.queryByText('other page note')).toBeNull()
  })

  it('opens the host delete modal before removing a note', async () => {
    sideNotesRecords(mock).push(webNote())
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    vi.mocked(mock.api.ui.confirm).mockResolvedValue('delete')
    await act(async () => render(<Panel />))
    await screen.findByText('page note here')

    fireEvent.click(screen.getByRole('button', { name: 'Note options' }))
    const deleteItem = mock.menus[0].find((item) => item.label === 'Delete')
    await act(async () => { await deleteItem?.onSelect?.() })

    expect(vi.mocked(mock.api.ui.confirm).mock.calls[0][0]).toMatchObject({
      title: 'Delete?',
      actions: [
        { label: 'Cancel', value: 'cancel', variant: 'ghost' },
        { label: 'Delete', value: 'delete', variant: 'danger' }
      ]
    })
    await waitFor(() => expect(screen.queryByText('page note here')).toBeNull())
  })

  it('edits in a SideNotes modal without opening Properties', async () => {
    sideNotesRecords(mock).push(webNote())
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    await act(async () => render(<Panel />))
    await screen.findByText('page note here')

    fireEvent.click(screen.getByRole('button', { name: 'Note options' }))
    const editItem = mock.menus[0].find((item) => item.label === 'Edit')
    await act(async () => { await editItem?.onSelect?.() })

    expect(mock.api.workspace.showProperties).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog', { name: 'SideNotes: Edit annotation' })).toBeTruthy()
  })

  it('opens a panel row in a new tab on Cmd-click and middle click, even for the page on screen', async () => {
    sideNotesRecords(mock).push(webNote())
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    await act(async () => render(<Panel />))
    const card = (await screen.findByText('page note here')).closest('.sidenote-card')!
    fireEvent.click(card)
    expect(mock.api.links.open).not.toHaveBeenCalled()
    fireEvent.click(card, { metaKey: true, ctrlKey: true })
    expect(mock.api.links.open).toHaveBeenLastCalledWith('https://example.com/docs', { newTab: true })
    vi.mocked(mock.api.links.open).mockClear()
    fireEvent(card, new MouseEvent('auxclick', { bubbles: true, button: 1 }))
    expect(mock.api.links.open).toHaveBeenLastCalledWith('https://example.com/docs', { newTab: true })
  })

  it('edits the annotation in a plain textarea that saves on Mod-Enter', async () => {
    sideNotesRecords(mock).push(webNote())
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    await act(async () => render(<Panel />))
    await screen.findByText('page note here')
    fireEvent.click(screen.getByRole('button', { name: 'Note options' }))
    await act(async () => { await mock.menus[0].find((item) => item.label === 'Edit')?.onSelect?.() })
    const field = screen.getByLabelText('Annotation')
    expect(field.tagName).toBe('TEXTAREA')
    expect(screen.getByRole('dialog', { name: 'SideNotes: Edit annotation' }).querySelector('.cm-lineNumbers, .cm-editor')).toBeNull()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled())
    fireEvent.change(field, { target: { value: 'edited **page** note' } })
    await act(async () => { fireEvent.keyDown(field, { key: 'Enter', metaKey: true, ctrlKey: true }) })
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'SideNotes: Edit annotation' })).toBeNull())
    expect((await loadNotes())[0].note).toBe('edited **page** note')
  })

  it('opens the annotation from sideNotes:open without the edit dialog', async () => {
    sideNotesRecords(mock).push(webNote())
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    const { registerSideNoteCommands } = await import('../src/commands')
    const off = registerSideNoteCommands(mock.api)
    await act(async () => render(<Panel />))
    await screen.findByText('page note here')
    await act(async () => { expect((await mock.api.commands.execute('sideNotes:open', { id: 'w1' })).ok).toBe(true) })
    expect(mock.api.workspace.revealOwnPanel).toHaveBeenCalledWith('right_sidebar')
    expect(screen.queryByRole('dialog')).toBeNull()
    off()
  })

  it('prompts to open something when neither a file nor a website is active', async () => {
    render(<Panel />)
    // findBy* flushes the async note load so the assertion settles inside act().
    expect(await screen.findByText('Open a file, folder, or website')).toBeTruthy()
  })

  it('opens sorting from the compact header and updates field and direction', async () => {
    sideNotesRecords(mock).push(webNote())
    setActiveWeb(mock, { instanceId: 'web-1', url: 'https://example.com/docs', title: 'Docs' })
    await act(async () => render(<Panel />))
    await screen.findByText('page note here')

    const actions = document.querySelector('.sidenotes-header-actions') as HTMLElement
    expect(within(actions).getAllByRole('button').map((button) => button.getAttribute('aria-label'))).toEqual([
      'Sort notes by',
      'Create sidenote'
    ])
    const trigger = screen.getByRole('button', { name: 'Sort notes by' })
    await act(async () => fireEvent.click(trigger))
    expect(mock.popovers).toHaveLength(1)
    const popover = await act(async () => render(mock.popovers[0].node))
    expect(popover.queryByRole('button', { name: 'Position' })).toBeNull()
    await act(async () => fireEvent.click(popover.getByRole('button', { name: 'Updated' })))
    await waitFor(() => expect(trigger.getAttribute('title')).toBe('Desc · Updated'))
    await act(async () => fireEvent.click(popover.getByRole('button', { name: 'Asc' })))
    await waitFor(() => expect(trigger.getAttribute('title')).toBe('Asc · Updated'))
  })
})

describe('SideNotes flagged browser — website notes', () => {
  let mock: MockValleyApi

  beforeEach(() => {
    mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] },
      datasets: { 'sideNotes.notes': [], 'sideNotes.note_tags': [], 'sideNotes.path_history': [] },
      activePath: null
    })
    initRuntime(mock.api)
  })

  it('lists a flagged web note by host and routes it through Links & actions', async () => {
    const open = vi.fn(async () => {})
    mock.provideInterop(WEB_NAVIGATOR_V1, { open }, 'surfing')
    sideNotesRecords(mock).push(webNote({ flagged: true, url: 'https://other.test/x', note: 'open me' }))
    render(<FlaggedPanel />)
    const host = await screen.findByText('other.test')
    expect(screen.getByText('open me')).toBeTruthy()
    fireEvent.click(host)
    await waitFor(() => expect(mock.api.links.open).toHaveBeenCalledWith('https://other.test/x'))
  })

  it('routes website search cards through the configured destination', async () => {
    const open = vi.fn(async () => {})
    mock.provideInterop(WEB_NAVIGATOR_V1, { open }, 'surfing')
    registerSearchCard(mock.api)
    const [provider] = mock.api.interop.extensions.providers(SEARCH_RESULT_ACTION_V1)
    const record = webNote({ url: 'https://other.test/x', note: 'modifier note' })

    expect(provider.extension).not.toHaveProperty('render')
    await provider.extension.open(record, { newTab: true })

    await waitFor(() => {
      expect(mock.api.links.open).toHaveBeenCalledWith('https://other.test/x', { newTab: true })
    })
    vi.mocked(mock.api.links.open).mockClear()
    await provider.extension.open({ ...record, id: '' }, { newTab: false })
    expect(mock.api.links.open).toHaveBeenCalledWith('https://other.test/x')
  })

  it('opens flagged rows in a new tab on Cmd-click and middle click, in place on a plain click', async () => {
    sideNotesRecords(mock).push(webNote({ flagged: true, url: 'https://other.test/x', note: 'web row' }), fileNote('f1', 'Notes/Ferns.md', 'file row'))
    render(<FlaggedPanel />)
    const web = (await screen.findByText('web row')).closest('.flagged-note-card')!
    const file = screen.getByText('file row').closest('.flagged-note-card')!
    fireEvent.click(web, { metaKey: true, ctrlKey: true })
    expect(mock.api.links.open).toHaveBeenLastCalledWith('https://other.test/x', { newTab: true })
    fireEvent(file, new MouseEvent('auxclick', { bubbles: true, button: 1 }))
    expect(mock.api.workspace.openFile).toHaveBeenLastCalledWith('Notes/Ferns.md', { type: 'none' }, { newTab: true })
    fireEvent.click(file)
    expect(mock.api.workspace.openFile).toHaveBeenLastCalledWith('Notes/Ferns.md', { type: 'none' })
  })

  it('toggles Flagged and All directly and sorts from the compact header popover', async () => {
    sideNotesRecords(mock).push(
      webNote({ id: 'flagged', flagged: true, url: 'https://beta.test', note: 'beta note' }),
      webNote({ id: 'plain', flagged: false, url: 'https://alpha.test', note: 'alpha note' })
    )
    render(<FlaggedPanel />)
    await screen.findByText('beta note')
    expect(screen.queryByText('alpha note')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Flagged' }))
    await screen.findByText('alpha note')
    expect(screen.getByRole('button', { name: 'All' })).toBeTruthy()
    expect(mock.popovers).toHaveLength(0)

    fireEvent.click(screen.getByRole('button', { name: 'Sort notes by' }))
    const sortPopover = render(mock.popovers[0].node)
    fireEvent.click(sortPopover.getByRole('button', { name: 'Name' }))
    fireEvent.click(sortPopover.getByRole('button', { name: 'Asc' }))
    await waitFor(() => {
      const rows = [...document.querySelectorAll('.flagged-note-card')]
      expect(rows.map((row) => within(row as HTMLElement).getByText(/alpha note|beta note/).textContent)).toEqual(['alpha note', 'beta note'])
    })
  })

  it('shows the default file-type filters and filters the cross-file browser', async () => {
    sideNotesRecords(mock).push(
      fileNote('audio', 'Media/track.MP3', 'audio note'),
      fileNote('video', 'Media/clip.mp4', 'video note'),
      fileNote('document', 'Reading/paper.pdf', 'pdf note'),
      fileNote('markdown', 'Notes/topic.md', 'markdown note'),
      webNote({ id: 'web', flagged: true, note: 'web note' })
    )
    render(<FlaggedPanel />)
    await screen.findByText('audio note')

    const trigger = screen.getByRole('button', { name: 'SideNotes filter' })
    expect(trigger.getAttribute('title')).toBe('SideNotes filter · All')
    fireEvent.click(trigger)
    const filterPopover = render(mock.popovers[0].node)
    const filterMenu = within(filterPopover.container)
    expect(filterMenu.getAllByRole('button').map((button) => button.textContent)).toEqual([
      'All', '.md', '.mp3', '.mp4', '.pdf', 'Web'
    ])

    fireEvent.click(filterMenu.getByRole('button', { name: '.mp3' }))
    await waitFor(() => {
      expect(screen.getByText('audio note')).toBeTruthy()
      expect(screen.queryByText('video note')).toBeNull()
      expect(screen.queryByText('pdf note')).toBeNull()
      expect(screen.queryByText('markdown note')).toBeNull()
      expect(screen.queryByText('web note')).toBeNull()
    })
    expect(trigger.classList.contains('active')).toBe(true)
    expect(trigger.getAttribute('title')).toBe('SideNotes filter · .mp3')
  })

  it('uses normalized file types from plugin settings in their configured order', async () => {
    mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] },
      datasets: { 'sideNotes.notes': [], 'sideNotes.note_tags': [], 'sideNotes.path_history': [] },
      settings: { filterTypes: [' WAV ', '.MP3', '.ogg', 'bad/type'] },
      activePath: null
    })
    initRuntime(mock.api)
    sideNotesRecords(mock).push(fileNote('audio', 'Media/voice.wav', 'voice note'))
    render(<FlaggedPanel />)
    await screen.findByText('voice note')

    const trigger = screen.getByRole('button', { name: 'SideNotes filter' })
    fireEvent.click(trigger)
    const filterMenu = within(render(mock.popovers[0].node).container)
    expect(filterMenu.getAllByRole('button').map((button) => button.textContent)).toEqual([
      'All', '.wav', '.mp3', '.ogg'
    ])

    await act(async () => { await mock.api.settings.set('filterTypes', [' FLAC ']) })
    fireEvent.click(trigger)
    const updatedMenu = within(render(mock.popovers[1].node).container)
    expect(updatedMenu.getAllByRole('button').map((button) => button.textContent)).toEqual([
      'All', '.flac', '.wav'
    ])
  })

  it('discovers extensions without changing preferences and separates extensionless files from websites', async () => {
    await mock.api.settings.set('filterTypes', [' PDF ', '.pdf', '.GLB'])
    sideNotesRecords(mock).push(
      fileNote('code', 'Canopy.TS', 'Code note'), fileNote('doc', 'Canopy.docx', 'Document note'),
      fileNote('model', 'Canopy.glb', 'Model note'), fileNote('plain', 'Forest.v1/README', 'Extensionless note'),
      fileNote('hidden', '.env', 'Hidden file note'), fileNote('unknown', 'Canopy.ZETA', 'Unknown note'),
      { ...fileNote('unflagged', 'Canopy.epub', 'Unflagged note'), flagged: false },
      webNote({ flagged: true })
    )
    render(<FlaggedPanel />)
    await screen.findByText('Code note')
    const trigger = screen.getByRole('button', { name: 'SideNotes filter' })
    await act(async () => { fireEvent.click(trigger) })
    const menu = render(mock.popovers[0].node)
    expect(within(menu.container).getAllByRole('button').map((button) => button.textContent)).toEqual([
      'All', '.pdf', '.glb', '.docx', '.epub', '.ts', '.zeta', 'No extension', 'Web'
    ])
    await act(async () => { fireEvent.click(within(menu.container).getByRole('button', { name: 'No extension' })) })
    expect(trigger).toHaveAttribute('title', 'SideNotes filter · No extension')
    expect(screen.getByText('Extensionless note')).toBeInTheDocument()
    expect(screen.getByText('Hidden file note')).toBeInTheDocument()
    expect(screen.queryByText('Code note')).not.toBeInTheDocument()
    expect(screen.queryByText('page note here')).not.toBeInTheDocument()
    await act(async () => { fireEvent.click(within(menu.container).getByRole('button', { name: 'Web' })) })
    expect(screen.getByText('page note here')).toBeInTheDocument()
    expect(screen.queryByText('Extensionless note')).not.toBeInTheDocument()
    expect(mock.api.settings.get().filterTypes).toEqual([' PDF ', '.pdf', '.GLB'])
  })

  it('discovers with an empty custom list and resets a removed selected type to All', async () => {
    await mock.api.settings.set('filterTypes', [])
    sideNotesRecords(mock).push(fileNote('model', 'Canopy.glb', 'Model note'), fileNote('book', 'Canopy.epub', 'Book note'))
    render(<FlaggedPanel />)
    await screen.findByText('Model note')
    const trigger = screen.getByRole('button', { name: 'SideNotes filter' })
    fireEvent.click(trigger)
    const menu = render(mock.popovers[0].node)
    expect(within(menu.container).getAllByRole('button').map((button) => button.textContent)).toEqual(['All', '.epub', '.glb'])
    fireEvent.click(within(menu.container).getByRole('button', { name: '.glb' }))
    menu.unmount()
    await act(async () => { await deleteNote('model') })
    await waitFor(() => expect(trigger).toHaveAttribute('title', 'SideNotes filter · All'))
    expect(await screen.findByText('Book note')).toBeInTheDocument()
    fireEvent.click(trigger)
    expect(within(render(mock.popovers[1].node).container).getAllByRole('button').map((button) => button.textContent)).toEqual(['All', '.epub'])
    expect(mock.api.settings.get().filterTypes).toEqual([])
  })

  it('keeps a restored discovered filter while the initial notes load', async () => {
    await mock.api.settings.set('filterTypes', [])
    sideNotesRecords(mock).push(fileNote('book', 'Canopy.epub', 'Book note'), fileNote('model', 'Canopy.glb', 'Model note'))
    const dispose = registerSideNoteSurfaces(mock.api)
    const surface = mock.api.interop.extensions.providers(PLUGIN_SURFACE_V1).find((entry) => entry.extension.surface === 'left_sidebar')!.extension
    await surface.restore({ v: 1, sourceType: '.epub' }, undefined, { background: true })
    const mounted = render(<FlaggedPanel />)
    try {
      expect(await screen.findByText('Book note')).toBeInTheDocument()
      expect(screen.queryByText('Model note')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'SideNotes filter' })).toHaveAttribute('title', 'SideNotes filter · .epub')
    } finally { mounted.unmount(); dispose() }
  })
})

it.each([Panel, FlaggedPanel])('bounds large SideNotes surfaces without losing filtered results', async (Surface) => {
  expect(config.indexState).toBe('scoped')
  const mock = createMockValleyApi({
    manifest: { id: 'sideNotes', indexState: config.indexState as 'scoped', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] },
    activePath: 'Notes/Ferns.md',
    indexEntries: [{ relPath: 'Notes/Ferns.md', title: 'Ferns', kind: 'note', mtimeMs: 1 }],
    datasets: { 'sideNotes.notes': Array.from({ length: 500 }, (_, index) => fileNote(`large-${index}`, 'Notes/Ferns.md', `Annotation ${String(index).padStart(3, '0')}`) as DatasetRecord) }
  })
  const state = mock.api.getState()
  expect(state.indexEntries).toEqual([])
  const scoped = new Proxy(state, { get: (target, key) => {
    if (key === 'indexEntries') throw new Error('SideNotes must not read the whole vault index')
    return Reflect.get(target, key)
  } })
  vi.spyOn(mock.api, 'getState').mockReturnValue(scoped)
  const observe = vi.spyOn(mock.api.index, 'observe')
  initRuntime(mock.api)
  const view = render(<Surface />)
  await waitFor(() => expect(view.container.querySelectorAll('[data-visible-key]').length).toBeGreaterThan(0))
  expect(view.container.querySelectorAll('[data-visible-key]').length).toBeLessThan(40)
  const search = view.container.querySelector<HTMLInputElement>('.search-field-input')!
  fireEvent.change(search, { target: { value: 'Annotation 499' } })
  await waitFor(() => expect(view.container.querySelectorAll('[data-visible-key]')).toHaveLength(1))
  expect(view.container.querySelector('[data-visible-key]')).toHaveAttribute('data-visible-key', 'large-499')
  fireEvent.click(view.container.querySelector('[data-visible-key]')!)
  expect(mock.api.workspace.openFile).toHaveBeenCalledWith('Notes/Ferns.md', { type: 'none' })
  expect(observe).not.toHaveBeenCalled()
  view.unmount()
})
