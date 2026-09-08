import { uiText } from './localization'
import { classifyFilePath } from '@valley/plugin-sdk/fileTypes'
import { api } from './runtime'
import type { AnchorType, SideNoteAnchor, SideNoteRecord } from './types'

export type AnchorStatus = 'ok' | 'missing' | 'ambiguous'

export const ANCHOR_LABEL_KEYS: Record<AnchorType, string> = {
  none: 'sidenotes.anchor.path',
  'pdf-page': 'sidenotes.anchor.pdfPage',
  'pdf-region': 'sidenotes.anchor.pdfRegion',
  'media-time': 'sidenotes.anchor.timestamp',
  'markdown-line': 'sidenotes.anchor.lineName',
  'markdown-heading': 'sidenotes.anchor.heading',
  'markdown-snippet': 'sidenotes.anchor.snippet',
  'jsonl-record': 'sidenotes.anchor.jsonlRecord',
  'image-region': 'sidenotes.anchor.imageRegion',
  'web-selection': 'sidenotes.anchor.selection'
}

/** Anchor types offered for a web note (URL subject) — the whole page or a
 *  highlighted text selection on it. */
export function anchorOptionsForWeb(): AnchorType[] {
  return ['none', 'web-selection']
}

export function defaultAnchor(path: string): SideNoteAnchor {
  const kind = classifyFilePath(path)
  if (kind === 'pdf') return { type: 'pdf-page', page: 1 }
  if (kind === 'video' || kind === 'audio') return { type: 'media-time', seconds: 0 }
  if (kind === 'text') return { type: 'markdown-line', line: 1 }
  return { type: 'none' }
}

/** Live "where you are" in the active viewer, for Aware mode and `+` auto-anchor. */
export interface ActiveContext {
  pdfPages?: number[] | null
  mediaSeconds?: number | null
  lineRange?: { from: number; to: number } | null
}

/** Whether a note's anchor falls within the current viewer context (Aware mode). */
export function anchorInContext(
  anchor: SideNoteAnchor,
  ctx: ActiveContext,
  mediaRange: number
): boolean {
  if (anchor.type === 'pdf-page' || anchor.type === 'pdf-region') {
    return !!ctx.pdfPages?.includes(anchor.page)
  }
  if (anchor.type === 'media-time') {
    return ctx.mediaSeconds != null && Math.abs(anchor.seconds - ctx.mediaSeconds) <= mediaRange
  }
  if (
    anchor.type === 'markdown-line' ||
    anchor.type === 'markdown-heading' ||
    anchor.type === 'markdown-snippet'
  ) {
    const line = anchor.line ?? 0
    return !!ctx.lineRange && line >= 1 && line >= ctx.lineRange.from && line <= ctx.lineRange.to
  }
  // 'none' / image-region: no positional context — hidden in Aware mode.
  return false
}

/** Default anchor for a new note, pre-filled with the current viewer position. */
export function liveDefaultAnchor(path: string, ctx: ActiveContext): SideNoteAnchor {
  const kind = classifyFilePath(path)
  if (kind === 'pdf') return { type: 'pdf-page', page: ctx.pdfPages?.[0] ?? 1 }
  if (kind === 'video' || kind === 'audio')
    return { type: 'media-time', seconds: ctx.mediaSeconds != null ? Math.max(0, Math.round(ctx.mediaSeconds)) : 0 }
  if (kind === 'text') return { type: 'markdown-line', line: ctx.lineRange?.from ?? 1 }
  return { type: 'none' }
}

export function anchorOptions(path: string): AnchorType[] {
  const kind = classifyFilePath(path)
  if (kind === 'pdf') return ['none', 'pdf-page']
  if (kind === 'video' || kind === 'audio') return ['none', 'media-time']
  if (kind === 'text') return ['none', 'markdown-line', 'markdown-heading', 'markdown-snippet']
  return ['none']
}

export function anchorOrder(anchor: SideNoteAnchor): number {
  if (anchor.type === 'pdf-page' || anchor.type === 'pdf-region') return anchor.page
  if (anchor.type === 'media-time') return anchor.seconds
  if (
    anchor.type === 'markdown-line' ||
    anchor.type === 'markdown-heading' ||
    anchor.type === 'markdown-snippet'
  )
    return anchor.line ?? 0
  if (anchor.type === 'image-region') return anchor.y * 1000 + anchor.x
  return 0
}

/**
 * Document-order sort keys. Each anchor maps to a single monotonic number so the
 * "Position" sort lists notes in the order they appear in the file: PDFs by page
 * then by where the snippet sits in the page text, markdown by line then column,
 * media by timestamp. Comparisons are only ever within one file (one anchor
 * family), so the cross-family scale gaps below don't need to be globally exact.
 */
const PDF_PAGE_SCALE = 1e7
const MD_LINE_SCALE = 1e6
/** Within a page, snippet-not-found sorts after every found snippet. */
const PDF_SNIPPET_NOT_FOUND = PDF_PAGE_SCALE - 1
const PDF_SNIPPET_MAX = PDF_PAGE_SCALE - 2

/** Collapse runs of whitespace, trim, and lowercase — so a stored snippet matches the space-joined PDF page text regardless of layout/case. */
export function normalizeWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase()
}

/**
 * Pure document-order key for one anchor. `haystack` is the PDF page text (for
 * `pdf-page`) or the full file text (for markdown), or null when unavailable —
 * in which case the note sorts to its page/line level without intra refinement.
 */
export function positionKey(anchor: SideNoteAnchor, haystack: string | null): number {
  if (anchor.type === 'pdf-page') {
    const base = anchor.page * PDF_PAGE_SCALE
    const snippet = anchor.snippet ? normalizeWhitespace(anchor.snippet) : ''
    if (!snippet || haystack == null) return base
    const idx = normalizeWhitespace(haystack).indexOf(snippet)
    return base + (idx >= 0 ? Math.min(idx, PDF_SNIPPET_MAX) : PDF_SNIPPET_NOT_FOUND)
  }
  if (anchor.type === 'pdf-region') {
    return anchor.page * PDF_PAGE_SCALE + Math.max(0, Math.min(anchor.y, PDF_SNIPPET_MAX))
  }
  if (anchor.type === 'media-time') return anchor.seconds
  if (anchor.type === 'markdown-snippet') {
    // A snippet anchor means "wherever this text is" — locate its current
    // position in the document so the order stays chronological even when the
    // stored `line` is missing or stale. Fall back to the stored line otherwise.
    const snippet = anchor.snippet ? normalizeWhitespace(anchor.snippet) : ''
    if (snippet && haystack != null) {
      const lines = haystack.replace(/\r\n?/g, '\n').split('\n')
      for (let i = 0; i < lines.length; i++) {
        const col = normalizeWhitespace(lines[i]).indexOf(snippet)
        if (col >= 0) return (i + 1) * MD_LINE_SCALE + Math.min(col, MD_LINE_SCALE - 1)
      }
    }
    return (anchor.line ?? 0) * MD_LINE_SCALE
  }
  if (anchor.type === 'markdown-line' || anchor.type === 'markdown-heading') {
    const line = anchor.line ?? 0
    const base = line * MD_LINE_SCALE
    const snippet =
      anchor.type === 'markdown-heading' ? '' : anchor.snippet ? normalizeWhitespace(anchor.snippet) : ''
    if (!snippet || haystack == null || line < 1) return base
    const lineText = haystack.replace(/\r\n?/g, '\n').split('\n')[line - 1]
    if (lineText == null) return base
    const idx = normalizeWhitespace(lineText).indexOf(snippet)
    return base + (idx >= 0 ? Math.min(idx, MD_LINE_SCALE - 1) : 0)
  }
  if (anchor.type === 'image-region') return anchor.y * 1000 + anchor.x
  return Number.POSITIVE_INFINITY
}

/**
 * Resolve a document-order key per note by reading the live document: PDF page
 * text (cached per page) for `pdf-page` snippets, the file text (read once) for
 * markdown snippets. Re-resolving live also corrects stale persisted `line`s.
 */
export async function resolvePositionKeys(
  path: string,
  notes: SideNoteRecord[]
): Promise<Map<string, number>> {
  const keys = new Map<string, number>()
  const needsFile = notes.some(
    (n) =>
      (n.anchor.type === 'markdown-snippet' || n.anchor.type === 'markdown-line') &&
      !!(n.anchor as { snippet?: string }).snippet
  )
  const fileText = needsFile && path ? (await api.vault.readFile(path)) ?? '' : null

  const pageCache = new Map<number, string | null>()
  for (const note of notes) {
    const anchor = note.anchor
    if (anchor.type === 'pdf-page' && anchor.snippet) {
      let pageText = pageCache.get(anchor.page)
      if (pageText === undefined) {
        pageText = path ? await api.workspace.getPdfPageText(path, anchor.page) : null
        pageCache.set(anchor.page, pageText)
      }
      keys.set(note.id, positionKey(anchor, pageText))
    } else if (
      (anchor.type === 'markdown-snippet' || anchor.type === 'markdown-line') &&
      anchor.snippet
    ) {
      keys.set(note.id, positionKey(anchor, fileText))
    } else {
      keys.set(note.id, positionKey(anchor, null))
    }
  }
  return keys
}

/**
 * Strict document-order comparator for the Position sort. Sorts by resolved key
 * (falling back to the sync `anchorOrder` while keys are still loading); ties
 * break by newest first. Flagging does NOT affect order.
 */
export function comparePosition(
  a: SideNoteRecord,
  b: SideNoteRecord,
  keys: Map<string, number>
): number {
  const ka = keys.get(a.id) ?? anchorOrder(a.anchor)
  const kb = keys.get(b.id) ?? anchorOrder(b.anchor)
  if (ka !== kb) return ka - kb
  return b.createdAt.localeCompare(a.createdAt)
}

export function formatSeconds(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds))
  const h = Math.floor(whole / 3600)
  const m = Math.floor((whole % 3600) / 60)
  const s = whole % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export function anchorLabel(anchor: SideNoteAnchor): string {
  if (anchor.type === 'pdf-page') return uiText('sidenotes.anchor.page', { page: anchor.page })
  if (anchor.type === 'pdf-region') return uiText('sidenotes.anchor.pageRegion', { page: anchor.page })
  if (anchor.type === 'media-time') return formatSeconds(anchor.seconds)
  if (anchor.type === 'markdown-line') return uiText('sidenotes.anchor.line', { line: anchor.line })
  if (anchor.type === 'markdown-heading') return anchor.heading
  if (anchor.type === 'markdown-snippet') return anchor.snippet
  if (anchor.type === 'jsonl-record') return anchor.recordId
  if (anchor.type === 'image-region') return uiText(ANCHOR_LABEL_KEYS['image-region'])
  if (anchor.type === 'web-selection') return anchor.snippet || uiText(ANCHOR_LABEL_KEYS['web-selection'])
  return uiText(ANCHOR_LABEL_KEYS.none)
}

export function anchorWithType(type: AnchorType, previous: SideNoteAnchor): SideNoteAnchor {
  if (type === previous.type) return previous
  if (type === 'pdf-page') return { type, page: 1 }
  if (type === 'media-time') return { type, seconds: 0 }
  if (type === 'markdown-line') return { type, line: 1 }
  if (type === 'markdown-heading') return { type, heading: '' }
  if (type === 'markdown-snippet') return { type, snippet: '' }
  if (type === 'jsonl-record') return { type, recordId: '' }
  if (type === 'web-selection') return { type, snippet: '' }
  return { type: 'none' }
}

/** Parse "h:mm:ss" / "m:ss" / plain seconds into seconds, or null if unparseable. */
export function parseTime(text: string): number | null {
  const trimmed = text.trim()
  if (!trimmed) return null
  if (trimmed.includes(':')) {
    const parts = trimmed.split(':').map((p) => Number(p))
    if (parts.some((p) => !Number.isFinite(p) || p < 0)) return null
    const seconds = parts.reduce((acc, p) => acc * 60 + p, 0)
    return Number.isFinite(seconds) ? seconds : null
  }
  const seconds = Number(trimmed)
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : null
}

/** Resolve a text anchor's snippet/line against the current file contents. */
export async function enrichTextAnchor(path: string, anchor: SideNoteAnchor): Promise<SideNoteAnchor> {
  if (
    anchor.type !== 'markdown-line' &&
    anchor.type !== 'markdown-heading' &&
    anchor.type !== 'markdown-snippet'
  )
    return anchor
  const text = await api.vault.readFile(path)
  if (!text) return anchor
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  if (anchor.type === 'markdown-line') {
    const snippet = lines[anchor.line - 1]?.trim().slice(0, 160)
    return snippet ? { ...anchor, snippet } : anchor
  }
  if (anchor.type === 'markdown-heading') {
    const wanted = anchor.heading.trim().toLowerCase()
    const index = lines.findIndex((line) => line.replace(/^#+\s*/, '').trim().toLowerCase() === wanted)
    return index >= 0 ? { ...anchor, line: index + 1 } : anchor
  }
  const wanted = anchor.snippet.trim()
  const index = wanted ? lines.findIndex((line) => line.includes(wanted)) : -1
  return index >= 0 ? { ...anchor, line: index + 1 } : anchor
}

export async function validateAnchor(path: string, anchor: SideNoteAnchor): Promise<AnchorStatus> {
  if (anchor.type === 'pdf-page') {
    const numPages = api.workspace.getPdfPageCount(path)
    if (typeof numPages === 'number' && anchor.page > numPages) return 'missing'
    if (anchor.snippet) {
      const pageText = await api.workspace.getPdfPageText(path, anchor.page)
      // Whitespace-normalized: a highlight snippet is collapsed to single spaces,
      // while the page text may carry layout whitespace between items.
      if (pageText !== null && !normalizeWhitespace(pageText).includes(normalizeWhitespace(anchor.snippet)))
        return 'missing'
    }
    return 'ok'
  }
  if (anchor.type === 'media-time') {
    const duration = api.workspace.getMediaDuration()
    if (typeof duration === 'number' && anchor.seconds > duration) return 'missing'
    return 'ok'
  }
  if (
    anchor.type !== 'markdown-line' &&
    anchor.type !== 'markdown-heading' &&
    anchor.type !== 'markdown-snippet'
  )
    return 'ok'
  const text = await api.vault.readFile(path)
  if (!text) return 'ok'
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  if (anchor.type === 'markdown-line') return anchor.line <= lines.length ? 'ok' : 'missing'
  if (anchor.type === 'markdown-heading') {
    const wanted = anchor.heading.trim().toLowerCase()
    return lines.some((l) => l.replace(/^#+\s*/, '').trim().toLowerCase() === wanted) ? 'ok' : 'missing'
  }
  const wanted = anchor.snippet.trim()
  if (!wanted) return 'ok'
  const matches = lines.filter((l) => l.includes(wanted)).length
  if (matches === 0) return 'missing'
  if (matches > 1) return 'ambiguous'
  return 'ok'
}

export function anchorValidationMsg(anchor: SideNoteAnchor, status: AnchorStatus): string {
  if (status === 'ambiguous') return 'Multiple matches found'
  if (anchor.type === 'pdf-page') return anchor.snippet ? 'Text not found on this page' : 'Page out of range'
  if (anchor.type === 'media-time') return 'Timestamp out of range'
  if (anchor.type === 'markdown-line') return 'Line does not exist'
  if (anchor.type === 'markdown-heading') return 'Heading not found'
  if (anchor.type === 'markdown-snippet') return 'Snippet not found'
  return 'Invalid anchor'
}

/** Read all heading texts from a file (for the heading anchor datalist). */
export async function readHeadings(path: string): Promise<string[]> {
  const text = await api.vault.readFile(path)
  if (!text) return []
  return text
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .filter((l) => /^#+\s/.test(l))
    .map((l) => l.replace(/^#+\s*/, '').trim())
}
