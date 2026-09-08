import type { PdfExtractDetail } from '@valley/plugin-sdk'

/** Case-preserving whitespace collapse — selections spanning lines carry `\n`s
 *  that would never match the space-joined PDF page text. */
function collapseWhitespace(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

const SNIPPET_MAX = 200

/**
 * Resolve the anchor snippet for a selection: locate it in the page text
 * ignoring all whitespace (the DOM text layer concatenates spans with no
 * separators while `getPdfPageText` joins items with spaces — the two never
 * agree on spacing) and return the *exact page-text substring*, so the plain
 * `includes` checks in anchor validation and the viewer's jump search always
 * hit. Falls back to the collapsed selection when the page text is unavailable
 * or doesn't contain it (e.g. a selection spanning two pages).
 */
export function resolvePdfSnippet(selection: string, pageText: string | null): string {
  const collapsed = collapseWhitespace(selection)
  const fallback = collapsed.slice(0, SNIPPET_MAX)
  if (!pageText) return fallback
  const tightSel = collapsed.replace(/ /g, '').slice(0, SNIPPET_MAX).toLowerCase()
  if (!tightSel) return fallback
  const map: number[] = []
  let tightPage = ''
  for (let i = 0; i < pageText.length; i++) {
    if (/\s/.test(pageText[i])) continue
    map.push(i)
    tightPage += pageText[i].toLowerCase()
  }
  const idx = tightPage.indexOf(tightSel)
  if (idx < 0) return fallback
  return pageText.slice(map[idx], map[idx + tightSel.length - 1] + 1).trim()
}

/** A pre-filled SideNote draft from a PDF selection: the selected text becomes
 *  the `pdf-page` anchor snippet (resolved against the page text), never the note
 *  body — the user writes their own annotation in the empty editor that opens. */
export interface SelectionPrefill {
  kind: 'file'
  path: string
  page: number
  snippet: string
}

export function buildSelectionPrefill(
  detail: PdfExtractDetail,
  pageText: string | null
): SelectionPrefill | null {
  const text = detail.text.trim()
  const page = Math.floor(detail.page)
  if (!text || !detail.path || !Number.isFinite(page) || page < 1) return null
  return { kind: 'file', path: detail.path, page, snippet: resolvePdfSnippet(text, pageText) }
}

/** Read the current DOM selection if it sits in a PDF text layer (hotkey path). */
export function extractFromSelection(path: string): PdfExtractDetail | null {
  const sel = window.getSelection()
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null
  const text = sel.toString().trim()
  if (!text) return null
  const start = sel.getRangeAt(0).startContainer
  const el = start instanceof Element ? start : start.parentElement
  const layer = el?.closest('.textLayer')
  if (!layer) return null
  const page = Number((layer.closest('.pdf-page') as HTMLElement | null)?.dataset.page)
  if (!Number.isFinite(page) || page < 1) return null
  return { path, page, text }
}
