/**
 * ```sidenotes``` code block — the side notes attached to a file, inline.
 *
 *   ```sidenotes
 *   ```                     → notes for the current note
 *   ```sidenotes
 *   file: Habitats/Mycology.md   → notes for another file
 *   flagged: true           → only flagged
 *   tag: #idea
 *   limit: 10
 *   ```
 *
 * Clicking a note reveals the SideNotes panel.
 */
import codeBlockExamples from './codeBlockExamples.json'
import { React, api } from './runtime'
import type { FC } from 'react'
import { fenceInt, parseFenceParams } from '@valley/plugin-sdk/fenceParams'
import { loadNotes, onChanged } from './data'
import type { SideNoteRecord } from './types'
import { uiText } from './localization'

const STYLE_ID = 'notes-sidenotes-fence-styles'

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
.sidenotes-fence { margin: 0.75em 0; border: 1px solid var(--border-light); border-radius: var(--radius); background: var(--container-color); overflow: hidden; }
.sidenotes-fence-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--border-light); cursor: pointer; }
.sidenotes-fence-head .t { font-weight: 600; color: var(--title-color); }
.sidenotes-fence-head .c { font-size: var(--small-font-size); color: var(--text-secondary); }
.sidenotes-fence-note { padding: 8px 12px; border-bottom: 1px solid var(--border-light); cursor: pointer; }
.sidenotes-fence-note:last-child { border-bottom: none; }
.sidenotes-fence-note:hover { background: var(--hover-bg); }
.sidenotes-fence-note .body { color: var(--text-color); font-size: var(--small-font-size); }
.sidenotes-fence-note .body p { margin: 0 0 0.35em; }
.sidenotes-fence-note .meta { margin-top: 2px; font-size:0.6875rem; color: var(--text-secondary); display: flex; gap: 8px; }
.sidenotes-fence-note .meta .flag { color: var(--accent-color); }
.sidenotes-fence-empty { padding: 10px 12px; color: var(--text-secondary); font-size: var(--small-font-size); }
`
  document.head.appendChild(style)
}

const anchorLabel = (note: SideNoteRecord): string => {
  const anchor = note.anchor as { type?: string; line?: number; page?: number } | undefined
  if (!anchor?.type) return ''
  if (anchor.type === 'line' && anchor.line != null) return uiText('auto.6d821dbb4d9c', { p0: anchor.line })
  if (typeof anchor.page === 'number') return `p. ${anchor.page}`
  return anchor.type
}

const SideNotesFence: FC<{ code: string; path: string | null }> = ({ code, path }) => {
  const [notes, setNotes] = React.useState<SideNoteRecord[] | null>(null)
  React.useEffect(() => {
    let alive = true
    const reload = (): void => {
      void loadNotes().then((records) => {
        if (alive) setNotes(records)
      })
    }
    reload()
    const off = onChanged(reload)
    return () => {
      alive = false
      off()
    }
  }, [])

  const params = parseFenceParams(code)
  const file = params.values.file ?? params.bare ?? path
  const url = params.values.url ?? null
  const flaggedOnly = (params.values.flagged ?? '').toLowerCase() === 'true'
  const tag = params.values.tag ? params.values.tag.replace(/^#/, '').toLowerCase() : null
  const limit = fenceInt(params, 'limit', 100) ?? 20

  if (!notes) return <div className="sidenotes-fence-empty">{uiText('auto.33ce417454bf')}</div>
  const shown = notes
    .filter((note) => {
      if (url) return note.url === url
      if (!file) return flaggedOnly ? note.flagged === true : false
      if (note.path !== file) return false
      if (flaggedOnly && note.flagged !== true) return false
      if (tag && !note.tags.some((t) => t.replace(/^#/, '').toLowerCase() === tag)) return false
      return true
    })
    .slice(0, limit)

  const reveal = (): void => {
    void api.workspace.revealOwnPanel('right_sidebar')
  }
  const targetLabel = url ?? (file ? file.split('/').pop() : flaggedOnly ? 'flagged' : null)

  return (
    <>
      <div className="sidenotes-fence-head" onClick={reveal} title={uiText('auto.954a9a37711e')}>
        <span className="t">{uiText('auto.746eb1a86a79')}{' '}{targetLabel ? ` · ${targetLabel}` : ''}</span>
        <span className="c">{shown.length}</span>
      </div>
      {shown.length === 0 && <div className="sidenotes-fence-empty">{uiText('auto.f545c86bbd6e')}</div>}
      {shown.map((note) => (
        <div key={note.id} className="sidenotes-fence-note" onClick={reveal}>
          <api.ui.MarkdownView
            className="body"
            value={note.note}
            context={{ ref: { pluginId: 'sideNotes', sourceId: 'notes', itemId: note.id }, sourcePath: note.path || undefined }}
          />
          <div className="meta">
            {note.flagged && <span className="flag">⚑</span>}
            {anchorLabel(note) && <span>{anchorLabel(note)}</span>}
            {note.tags.slice(0, 3).map((t) => (
              <span key={t}>#{t.replace(/^#/, '')}</span>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

/** Register the ```sidenotes``` fence; returns the unregister fn. */
export function registerSideNotesFence(): () => void {
  const off = api.markdown.registerCodeBlockRenderer('sidenotes', (code, el, ctx) => {
    ensureStyles()
    el.classList.add('sidenotes-fence')
    return api.ui.renderReact(el, <SideNotesFence code={code} path={ctx.path} />)
  }, { examples: codeBlockExamples.sidenotes })
  return () => {
    off()
    document.getElementById(STYLE_ID)?.remove()
  }
}
