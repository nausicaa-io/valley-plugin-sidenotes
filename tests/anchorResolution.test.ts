import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMockValleyApi } from '@valley/plugin-testkit'
import type { ValleyPluginManifest } from '@valley/plugin-sdk/types'
import { AnchorReadCancelled, AnchorReads } from '../src/anchorReads'
import { positionKey, resolveAnchorProjection, resolvePositionKeys, validateAnchor } from '../src/anchors'
import { initRuntime } from '../src/runtime'
import type { SideNoteAnchor, SideNoteRecord } from '../src/types'
import { Panel } from '../src/Panel'
import { FlaggedPanel } from '../src/FlaggedPanel'
import config from '../config.json'

afterEach(cleanup)

function note(id: string, anchor: SideNoteAnchor, path = 'Ferns.md'): SideNoteRecord {
  return { id, path, anchor, note: id, flagged: true, tags: [], pathHistory: [], createdAt: '2026-06-01T12:00:00Z', updatedAt: '2026-06-01T12:00:00Z' }
}

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

describe('owned anchor reads', () => {
  it('shares one full file across validation and position for 500 notes', async () => {
    const text = '# Ferns\nneedle\nneedle\nlast'
    const mock = createMockValleyApi({ files: { 'Ferns.md': text } })
    initRuntime(mock.api)
    const read = vi.spyOn(mock.api.vault, 'readFile')
    const notes = Array.from({ length: 500 }, (_, index) => note(`n${index}`, index % 2
      ? { type: 'markdown-snippet', snippet: 'needle', line: 99 }
      : { type: 'markdown-line', line: 4, snippet: 'last' }))
    const reads = new AnchorReads()
    try {
      const result = await resolveAnchorProjection(notes, reads, { path: 'Ferns.md', positions: true })
      expect(read).toHaveBeenCalledTimes(1)
      expect(result.statuses.size).toBe(250)
      expect(result.statuses.get('n1')).toBe('ambiguous')
      expect(result.keys.get('n1')).toBe(positionKey(notes[1].anchor, text))
      expect(result.keys.get('n0')).toBe(positionKey(notes[0].anchor, text))
      expect(await validateAnchor('Ferns.md', { type: 'markdown-heading', heading: 'Absent' }, reads)).toBe('missing')
      expect(read).toHaveBeenCalledTimes(1)
    } finally { reads.dispose() }
  })

  it('reads each interleaved PDF page once and preserves duplicate-id map ordering across groups', async () => {
    const pages = Array.from({ length: 65 }, (_, index) => `page ${index + 1} first second`)
    const mock = createMockValleyApi({ pdfPages: { 'Ferns.pdf': pages } })
    initRuntime(mock.api)
    const read = vi.spyOn(mock.api.workspace, 'getPdfPageText')
    const notes = Array.from({ length: 130 }, (_, index) => note(`n${index}`, { type: 'pdf-page', page: index % 65 + 1, snippet: index < 65 ? 'first' : 'second' }, 'Ferns.pdf'))
    notes.push(note('n0', { type: 'pdf-page', page: 2, snippet: 'second' }, 'Ferns.pdf'))
    const reads = new AnchorReads()
    try {
      const keys = await resolvePositionKeys('Ferns.pdf', notes, reads)
      expect(read).toHaveBeenCalledTimes(65)
      expect([...keys]).toEqual([...new Map(notes.map(item => [item.id, positionKey(item.anchor, pages[(item.anchor as { page: number }).page - 1])]))])
      await reads.page('Ferns.pdf', 65)
      expect(read).toHaveBeenCalledTimes(65)
      await reads.page('Ferns.pdf', 1)
      expect(read).toHaveBeenCalledTimes(66)
    } finally { reads.dispose() }
  })

  it('evicts by bytes and processes oversized values completely once per projection', async () => {
    const large = `${'x'.repeat(5 * 1024 * 1024)}\nlate marker`
    const mock = createMockValleyApi({ files: { 'Ferns.md': large, 'A.md': 'a'.repeat(3 * 1024 * 1024), 'B.md': 'b'.repeat(3 * 1024 * 1024) } })
    initRuntime(mock.api)
    const read = vi.spyOn(mock.api.vault, 'readFile')
    const reads = new AnchorReads()
    try {
      const notes = [note('a', { type: 'markdown-snippet', snippet: 'late marker' }), note('b', { type: 'markdown-line', line: 2 })]
      const result = await resolveAnchorProjection(notes, reads, { path: 'Ferns.md', positions: true })
      expect(result.statuses.size).toBe(0)
      expect(result.keys.get('a')).toBe(2e6)
      expect(read).toHaveBeenCalledTimes(1)
      expect(await reads.file('Ferns.md')).toBe(large)
      expect(read).toHaveBeenCalledTimes(2)
      await reads.file('A.md')
      await reads.file('B.md')
      await reads.file('A.md')
      expect(read.mock.calls.map(([path]) => path)).toEqual(['Ferns.md', 'Ferns.md', 'A.md', 'B.md', 'A.md'])
    } finally { reads.dispose() }
  })

  it('shares pending work, retains null as unavailable, and retries a true read failure', async () => {
    const mock = createMockValleyApi()
    initRuntime(mock.api)
    const held = deferred<string | null>()
    const read = vi.spyOn(mock.api.workspace, 'getPdfPageText').mockReturnValueOnce(held.promise).mockRejectedValueOnce(new Error('Page unavailable')).mockResolvedValue('recovered')
    const reads = new AnchorReads()
    try {
      const first = reads.page('Ferns.pdf', 1)
      expect(reads.page('Ferns.pdf', 1)).toBe(first)
      held.resolve(null)
      expect(await first).toBeNull()
      expect(await validateAnchor('Ferns.pdf', { type: 'pdf-page', page: 1, snippet: 'unknown' }, reads)).toBe('ok')
      expect(read).toHaveBeenCalledTimes(1)
      await expect(reads.page('Ferns.pdf', 2)).rejects.toThrow('Page unavailable')
      expect(await reads.page('Ferns.pdf', 2)).toBe('recovered')
      expect(read).toHaveBeenCalledTimes(3)
    } finally { reads.dispose() }
  })

  it('bounds native work across replaced projection owners and releases queued demands on disposal', async () => {
    const mock = createMockValleyApi()
    initRuntime(mock.api)
    const held = deferred<string>()
    const read = vi.spyOn(mock.api.vault, 'readFile').mockReturnValue(held.promise)
    const first = new AnchorReads()
    const old = Promise.allSettled(Array.from({ length: 36 }, (_, index) => first.file(`Old${index}.md`)))
    await expect(first.file('Overflow.md')).rejects.toThrow('Too many SideNotes anchor reads')
    expect(read).toHaveBeenCalledTimes(4)
    first.dispose()
    const next = new AnchorReads()
    const accepted = next.file('Current.md')
    expect(read).toHaveBeenCalledTimes(4)
    held.resolve('content')
    expect((await old).every(result => result.status === 'rejected' && result.reason instanceof AnchorReadCancelled)).toBe(true)
    expect(await accepted).toBe('content')
    expect(read.mock.calls.map(([path]) => path)).toEqual(['Old0.md', 'Old1.md', 'Old2.md', 'Old3.md', 'Current.md'])
    next.dispose()
  })

  it.each(['dispose', 'replace', 'roundtrip'] as const)('prevents the next page and publication after %s', async action => {
    const mock = createMockValleyApi({ vault: { path: '/fixture/a', name: 'Ferns', displayName: 'Ferns' } })
    initRuntime(mock.api)
    const held = deferred<string | null>()
    const read = vi.spyOn(mock.api.workspace, 'getPdfPageText').mockReturnValue(held.promise)
    const reads = new AnchorReads()
    const pending = resolvePositionKeys('Ferns.pdf', [note('a', { type: 'pdf-page', page: 1, snippet: 'first' }), note('b', { type: 'pdf-page', page: 2, snippet: 'next' })], reads)
    const rejected = expect(pending).rejects.toBeInstanceOf(AnchorReadCancelled)
    await waitFor(() => expect(read).toHaveBeenCalledTimes(1))
    if (action === 'dispose') reads.dispose()
    else if (action === 'replace') initRuntime(createMockValleyApi().api)
    else {
      mock.emitState({ vault: { path: '/fixture/b', name: 'Moss', displayName: 'Moss' } })
      mock.emitState({ vault: { path: '/fixture/a', name: 'Ferns', displayName: 'Ferns' } })
    }
    held.resolve('first')
    await rejected
    expect(read).toHaveBeenCalledTimes(1)
    expect(reads.isActive()).toBe(false)
    reads.dispose()
  })

  it('keeps PDF/media bounds and positionless anchors unchanged', async () => {
    const mock = createMockValleyApi({ pdfPages: { 'Ferns.pdf': ['hello'] }, overrides: { workspace: { getMediaDuration: () => 5, getPdfPageCount: () => 1 } } })
    initRuntime(mock.api)
    const reads = new AnchorReads()
    try {
      const result = await resolveAnchorProjection([
        note('page', { type: 'pdf-page', page: 2 }, 'Ferns.pdf'),
        note('snippet', { type: 'pdf-page', page: 1, snippet: 'missing' }, 'Ferns.pdf'),
        note('media', { type: 'media-time', seconds: 6 }, 'Ferns.mp3'),
        note('web', { type: 'web-selection', snippet: 'anything' }, ''),
        note('image', { type: 'image-region', x: 0, y: 0, width: 1, height: 1 }, 'Ferns.png')
      ], reads)
      expect([...result.statuses]).toEqual([['page', 'missing'], ['snippet', 'missing'], ['media', 'missing']])
    } finally { reads.dispose() }
  })
})

describe('anchor projection effects', () => {
  function setup() {
    const row = note('fern', { type: 'markdown-heading', heading: 'Ferns' })
    const mock = createMockValleyApi({
      manifest: { id: 'sideNotes', noteDocuments: config.noteDocuments, datasets: config.datasets as unknown as ValleyPluginManifest['datasets'] },
      activePath: 'Ferns.md', files: { 'Ferns.md': '# Ferns' },
      datasets: { 'sideNotes.notes': [{ ...row, url: null }], 'sideNotes.note_tags': [], 'sideNotes.path_history': [] }
    })
    initRuntime(mock.api)
    return mock
  }

  it.each([['Panel', Panel], ['FlaggedPanel', FlaggedPanel]] as const)('%s reports actual anchor read failures and retries without inventing a warning status', async (_name, View) => {
    const mock = setup()
    vi.spyOn(mock.api.vault, 'readFile').mockRejectedValueOnce(new Error('Fixture read unavailable'))
    render(React.createElement(View))
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load SideNotes')
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
    expect(screen.queryByTitle('Heading not found')).not.toBeInTheDocument()
  })

  it.each([['Panel', Panel], ['FlaggedPanel', FlaggedPanel]] as const)('%s retains its complete warning projection when a later read fails', async (_name, View) => {
    const mock = setup()
    let invalidate = (): void => {}
    vi.spyOn(mock.api.files, 'onAnchorInfoChanged').mockImplementation(listener => { invalidate = listener; return () => {} })
    const read = vi.spyOn(mock.api.vault, 'readFile').mockResolvedValue('# Moss')
    render(React.createElement(View))
    expect(await screen.findByTitle('Heading not found')).toBeInTheDocument()
    read.mockRejectedValueOnce(new Error('Fixture read unavailable'))
    act(() => invalidate())
    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load SideNotes')
    expect(screen.getByTitle('Heading not found')).toBeInTheDocument()
    read.mockResolvedValue('# Ferns')
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.queryByTitle('Heading not found')).not.toBeInTheDocument())
  })

  it('does not publish an old subject failure after the next panel subject succeeds', async () => {
    const mock = setup()
    mock.datasets.get('sideNotes.notes')!.push({ ...note('moss', { type: 'markdown-heading', heading: 'Moss' }, 'Moss.md'), fileKey: null, url: null })
    const held = deferred<string>()
    const read = vi.spyOn(mock.api.vault, 'readFile').mockImplementation(path => path === 'Ferns.md' ? held.promise : Promise.resolve('# Moss'))
    render(React.createElement(Panel))
    await waitFor(() => expect(read).toHaveBeenCalledWith('Ferns.md'))
    act(() => mock.emitState({ activePath: 'Moss.md' }))
    await waitFor(() => expect(read).toHaveBeenCalledWith('Moss.md'))
    await act(async () => { held.reject(new Error('Old subject unavailable')) })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Heading not found')).not.toBeInTheDocument()
  })

  it('unmounts a pending panel projection before it can dispatch the next page', async () => {
    const mock = setup()
    mock.emitState({ activePath: 'Ferns.pdf' })
    mock.datasets.set('sideNotes.notes', [1, 2].map(page => ({ ...note(`page${page}`, { type: 'pdf-page', page, snippet: 'fern' }, 'Ferns.pdf'), fileKey: null, url: null })))
    const held = deferred<string | null>()
    const read = vi.spyOn(mock.api.workspace, 'getPdfPageText').mockReturnValue(held.promise)
    const mounted = render(React.createElement(Panel))
    await waitFor(() => expect(read).toHaveBeenCalledTimes(1))
    mounted.unmount()
    await act(async () => { held.resolve('fern') })
    expect(read).toHaveBeenCalledTimes(1)
  })
})
