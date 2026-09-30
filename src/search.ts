export interface ParsedSearch {
  tags: string[]
  text: string
}

/** Split a query into `#tag` tokens and the leftover free text. */
export function parseSearch(query: string): ParsedSearch {
  const tags: string[] = []
  const text = query
    .replace(/#(\S+)/g, (_, tag: string) => {
      tags.push(tag.toLowerCase())
      return ' '
    })
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
  return { tags, text }
}

/**
 * Match a note against a search query.
 * Every `#tag` token must prefix-match one of the note's tags (AND), and any
 * remaining free text must be a substring of one of `textFields`.
 */
export function matchesSearch(query: string, tags: string[], ...textFields: string[]): boolean {
  const parsed = parseSearch(query)
  if (!parsed.tags.length && !parsed.text) return true
  const recordTags = tags.map((t) => t.toLowerCase())
  for (const tag of parsed.tags) {
    if (!recordTags.some((t) => t.startsWith(tag))) return false
  }
  if (parsed.text) {
    const haystack = textFields.map((f) => f.toLowerCase())
    if (!haystack.some((f) => f.includes(parsed.text))) return false
  }
  return true
}
