/**
 * Web-subject helpers for SideNotes. A web note is keyed by its page URL, matched
 * **exactly** (one note set per page) after normalization: the fragment is
 * dropped (an in-page `#hash` is the same page), the host is lowercased (hosts are
 * case-insensitive), and a bare-root path collapses to `/`. The query string is
 * kept — `?id=1` and `?id=2` are different pages.
 */

/** Normalize a page URL for keying/matching. Falls back to the trimmed input when
 *  it isn't a parseable absolute URL (so notes still key off *something* stable). */
export function normalizeUrl(raw: string): string {
  const trimmed = (raw ?? '').trim()
  if (!trimmed) return ''
  try {
    const u = new URL(trimmed)
    u.hash = ''
    u.protocol = u.protocol.toLowerCase()
    u.hostname = u.hostname.toLowerCase()
    // Collapse the bare-root path so `https://x.com` and `https://x.com/` match.
    if (u.pathname === '/') u.pathname = ''
    const out = u.toString()
    // URL.toString() re-appends a trailing '/' for an empty path on some hosts;
    // strip a lone trailing slash that carries no query so keys stay canonical.
    return u.search ? out : out.replace(/\/$/, '')
  } catch {
    return trimmed
  }
}

/** Short, human label for a web note (the hostname, `www.` stripped). */
export function webHostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '') || url
  } catch {
    return url
  }
}
