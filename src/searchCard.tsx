/**
 * SideNotes → `search.resultCard`.
 *
 * The plugin owns how its notes appear in vault-wide search and what a click
 * does — including the web-note branch, which opens the page through the Web
 * plugin's command instead of a file. Core previously hard-coded all of it
 * (field names, anchor labels, host formatting, the `web:open` dispatch).
 */
import type { DataRecord } from '@valley/plugin-sdk/types'
import type { ValleyPluginApi, SearchResultCard, SearchResultCardContext } from '@valley/plugin-sdk'
import { SEARCH_RESULT_CARD_V1, WEB_NAVIGATOR_V1 } from '@valley/plugin-sdk'
import { React, api } from './runtime'
import { Flag, Globe } from './icons'
import { anchorLabel } from './anchors'
import { webHostLabel } from './web'
import type { SideNoteAnchor } from './types'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const bool = (v: unknown): boolean => v === true
const strArr = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []

function navigablePath(value: unknown): string {
  const path = str(value).replace(/\\/g, '/').replace(/^\.\//, '')
  return path === '.valley' || path.startsWith('.valley/') ? '' : path
}

function baseName(path: string): string {
  const name = path.split('/').pop() ?? path
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(0, dot) : name
}

function SideNoteSearchCard({
  record,
  ctx
}: {
  record: DataRecord
  ctx: SearchResultCardContext
}): React.ReactElement {
  const { compact } = ctx
  const note = str(record.note)
  const tags = [...new Set([...strArr(record.tags), ...ctx.tags])]
  const flagged = bool(record.flagged)
  const url = str(record.url)
  const path = str(record.path) || ctx.path || ''
  const anchor = (
    record.anchor && typeof record.anchor === 'object' ? record.anchor : { type: 'none' }
  ) as SideNoteAnchor
  // A web note carries a `web-selection` anchor the shared shape doesn't model;
  // read its snippet directly for the badge.
  const anchorText = url
    ? str((record.anchor as { snippet?: unknown } | undefined)?.snippet)
    : anchor.type !== 'none'
      ? anchorLabel(anchor)
      : ''
  const firstLine = note
    .split('\n')
    .find((l) => l.trim())
    ?.replace(/^#+\s*/, '')
    .trim()
  return (
    <div
      className={`flagged-note-card search-card${flagged ? ' flagged' : ''}${compact ? ' compact' : ''}`}
      onClick={(event) => ctx.onOpen({ newTab: api.ui.hasModKey(event) })}
      title={url || path}
    >
      <div className="flagged-note-header">
        <div className="flagged-note-meta-row">
          <div className="flagged-note-meta-left">
            {anchorText && <span className="flagged-note-anchor">{anchorText}</span>}
          </div>
          <div className="flagged-note-meta-right">
            {flagged && <Flag className="sidenote-flag-btn active" aria-hidden />}
          </div>
        </div>
        <span className="flagged-note-file">
          {url && <Globe className="flagged-note-web-icon" aria-hidden />}
          {url ? webHostLabel(url) : baseName(path)}
        </span>
      </div>
      {compact ? (
        firstLine && <p className="flagged-note-preview">{firstLine}</p>
      ) : (
        <>
          {note.trim() && (
            <api.ui.MarkdownView
              className="sidenote-markdown sidenote-markdown--compact"
              value={note}
              context={{ ref: { pluginId: 'sideNotes', sourceId: 'notes', itemId: str(record.id) }, sourcePath: path || undefined }}
            />
          )}
          {tags.length > 0 && (
            <div className="sidenote-tags-view">
              {tags.map((tag) => (
                <span key={tag} className="sidenote-tag-view-pill">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export function registerSearchCard(pluginApi: ValleyPluginApi): () => void {
  const card: SearchResultCard = {
    cardKind: 'sidenote',
    render: (record, ctx) => <SideNoteSearchCard record={record} ctx={ctx} />,
    open: async (record, ctx) => {
      if (str(record.id) && !ctx.newTab) {
        await pluginApi.documents.open({ pluginId: pluginApi.pluginId, sourceId: 'notes', itemId: str(record.id) })
        return true
      }
      // A web note opens through the optional navigation service; a file note
      // opens at its anchor and reveals our own notes panel.
      const url = str(record.url)
      if (url) {
        void pluginApi.interop.services.providers(WEB_NAVIGATOR_V1)[0]?.invoke('open', [
          { url, newTab: ctx.newTab }
        ])
        return true
      }
      const path = navigablePath(record.path) || navigablePath(ctx.path)
      if (path) {
        const anchor = (
          record.anchor && typeof record.anchor === 'object' ? record.anchor : undefined
        ) as SideNoteAnchor | undefined
        pluginApi.workspace.openFile(
          path,
          anchor?.type === 'web-selection' ? undefined : anchor,
          { newTab: ctx.newTab }
        )
        pluginApi.workspace.revealOwnPanel('right_sidebar')
        return true
      }
      return false
    }
  }
  return pluginApi.interop.extensions.provide(SEARCH_RESULT_CARD_V1, card)
}
