import { describe, expect, it } from 'vitest'
import { buildSelectionPrefill, extractFromSelection, resolvePdfSnippet } from '../src/highlights'

it('uses the host selection snapshot only for the matching PDF document', () => {
  const selection = { surface: 'pdf' as const, path: 'paper.pdf', page: 3, text: 'A selected passage' }
  expect(extractFromSelection('paper.pdf', selection)).toEqual({ path: 'paper.pdf', page: 3, text: 'A selected passage' })
  expect(extractFromSelection('other.pdf', selection)).toBeNull()
  expect(extractFromSelection('paper.pdf', { ...selection, surface: 'web' })).toBeNull()
  expect(extractFromSelection('paper.pdf', null)).toBeNull()
})

describe('resolvePdfSnippet', () => {
  it('returns the exact page-text substring, ignoring whitespace differences', () => {
    // DOM selection splits at line breaks; getPdfPageText joins items with
    // spaces (even mid-word, e.g. a combining diaeresis as its own item).
    const pageText = 'Fungal field guide Farnbl ¨ ute survey 16.08.2026'
    const selection = 'Fungal field guide\nFarnbl¨ute survey\n16.08.2026'
    expect(resolvePdfSnippet(selection, pageText)).toBe(pageText)
  })

  it('matches case-insensitively but preserves the page text casing', () => {
    expect(resolvePdfSnippet('FUCHS-SPUR', 'Eine Fuchs-Spur bleibt sichtbar')).toBe('Fuchs-Spur')
  })

  it('falls back to the collapsed selection when unmatched or page text missing', () => {
    expect(resolvePdfSnippet('not  on\nthis page', 'something else')).toBe('not on this page')
    expect(resolvePdfSnippet('a  b', null)).toBe('a b')
  })

  it('caps the matched length', () => {
    const long = 'x'.repeat(500)
    expect(resolvePdfSnippet(long, long)).toHaveLength(200)
    expect(resolvePdfSnippet(long, null)).toHaveLength(200)
  })
})

describe('buildSelectionPrefill', () => {
  it('puts the selected text in the pdf-page anchor snippet, not a note body', () => {
    const prefill = buildSelectionPrefill(
      {
        path: 'FieldGuides/Fungi.pdf',
        page: 12,
        text: 'Der  Pfifferling\nwächst   am Waldrand'
      },
      'Beobachtung Der Pfifferling wächst am  Waldrand Ende'
    )
    expect(prefill).toEqual({
      kind: 'file',
      path: 'FieldGuides/Fungi.pdf',
      page: 12,
      snippet: 'Der Pfifferling wächst am  Waldrand'
    })
  })

  it('rejects empty text, missing path, or invalid page', () => {
    expect(buildSelectionPrefill({ path: 'a.pdf', page: 1, text: '   ' }, null)).toBeNull()
    expect(buildSelectionPrefill({ path: '', page: 1, text: 'x' }, null)).toBeNull()
    expect(buildSelectionPrefill({ path: 'a.pdf', page: 0, text: 'x' }, null)).toBeNull()
    expect(buildSelectionPrefill({ path: 'a.pdf', page: NaN, text: 'x' }, null)).toBeNull()
  })
})
