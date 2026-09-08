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
  SEARCH_RESULT_CARD_V1,
  WEB_ACTIVE_CONTEXT_V1,
  WEB_NAVIGATOR_V1,
  type DatasetRecord
} from '@valley/plugin-sdk'
import { registerSearchCard } from '../src/searchCard'
import config from '../config.json'
import { SideNoteEditModal } from '../src/fields'
import { loadNotes } from '../src/data'

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

  it('saves shared Markdown and explicit tags atomically without rewriting inline tags', async () => {
    const [note] = await loadNotes()
    const update = vi.spyOn(mock.api.documents, 'update')
    const close = vi.fn()
    render(<SideNoteEditModal note={note} onSaved={vi.fn()} onClose={close} />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled())
    fireEvent.change(screen.getByLabelText('Note'), { target: { value: '**Ferns** #wald' } })
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
    fireEvent.change(screen.getByLabelText('Note'), { target: { value: 'Unsaved local Markdown' } })
    await mock.api.data.dataset('sideNotes.note_tags').insert({ noteId: 'n1', tag: 'external' })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Save' })) })
    expect(screen.getByLabelText('Note')).toHaveValue('Unsaved local Markdown')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect((await loadNotes())[0].note).toBe('Original #wald')
    expect(close).not.toHaveBeenCalled()
    expect(mock.api.documents.drafts.clear).not.toHaveBeenCalled()
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Cancel' })) })
    expect(close).toHaveBeenCalledTimes(1)
    expect(mock.api.documents.drafts.clear).toHaveBeenCalledWith({ pluginId: 'sideNotes', sourceId: 'notes', itemId: 'n1' })
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

  it('lists a flagged web note by host and opens it via the web:open command', async () => {
    const open = vi.fn(async () => {})
    mock.provideInterop(WEB_NAVIGATOR_V1, { open }, 'surfing')
    sideNotesRecords(mock).push(webNote({ flagged: true, url: 'https://other.test/x', note: 'open me' }))
    render(<FlaggedPanel />)
    const host = await screen.findByText('other.test')
    expect(screen.getByText('open me')).toBeTruthy()
    fireEvent.click(host)
    await waitFor(() => expect(open).toHaveBeenCalledWith({ url: 'https://other.test/x' }))
  })

  it('forwards modifier opening of a website search card to a new Surfing tab', async () => {
    const open = vi.fn(async () => {})
    mock.provideInterop(WEB_NAVIGATOR_V1, { open }, 'surfing')
    registerSearchCard(mock.api)
    const [provider] = mock.api.interop.extensions.providers(SEARCH_RESULT_CARD_V1)
    const record = webNote({ url: 'https://other.test/x', note: 'modifier note' })

    render(
      provider.extension.render(record, {
        title: 'modifier note',
        tags: [],
        compact: true,
        onOpen: (opts) => {
          void provider.extension.open(record, { newTab: opts?.newTab })
        }
      })
    )
    fireEvent.click(screen.getByText('modifier note'), { ctrlKey: true })

    await waitFor(() => {
      expect(open).toHaveBeenCalledWith({ url: 'https://other.test/x', newTab: true })
    })
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
      'All', '.flac'
    ])
  })
})
