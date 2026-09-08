import { React, api } from './runtime'
import type { ReactElement } from 'react'
import { classifyFilePath } from '@valley/plugin-sdk/fileTypes'
import {
  anchorInContext,
  anchorLabel,
  anchorOrder,
  anchorValidationMsg,
  comparePosition,
  defaultAnchor,
  enrichTextAnchor,
  liveDefaultAnchor,
  resolvePositionKeys,
  validateAnchor,
  type ActiveContext,
  type AnchorStatus
} from './anchors'
import { appendNote, deleteNote, makeNote, makeWebNote, updateNote } from './data'
import { AnchorEditor, NoteMenu, SideNoteEditModal, SideNotesSortPopover } from './fields'
import { Crosshair, Flag, Globe, Plus, Search, SortAscending, SortDescending, StickyNote, TriangleAlert, X } from './icons'
import { useActivePath, useActiveWebContext, useNotes, usePending } from './hooks'
import { normalizeUrl, webHostLabel } from './web'
import { matchesSearch } from './search'
import type { SideNoteAnchor, SideNoteRecord } from './types'
import { uiText } from './localization'
import { WEB_NAVIGATOR_V1 } from '@valley/plugin-sdk'
import { selectionDraftStore, sideNoteEditStore } from './runtime'
import { selectSideNote, useSideNoteSubject, useSideNoteViewField } from './surfaces'

/** Open a note's subject: a web note navigates the browser; a file note opens
 *  in the workspace at its anchor. A web note already on screen is a no-op. */
function openNote(note: SideNoteRecord, activeUrl: string): void {
  if (note.url) {
    if (note.url !== activeUrl) {
      void api.interop.services.providers(WEB_NAVIGATOR_V1)[0]?.invoke('open', [{ url: note.url }])
    }
    return
  }
  api.workspace.openFile(note.path, note.anchor.type === 'web-selection' ? undefined : note.anchor)
}

type SortField = 'position' | 'created' | 'updated'
type SortDir = 'asc' | 'desc'
const SORT_LABELS: Record<SortField, string> = { position: 'Position', created: 'Created', updated: 'Updated' }
const DEFAULT_DIR: Record<SortField, SortDir> = { position: 'asc', created: 'desc', updated: 'desc' }

/** Per-file SideNotes — the plugin's `right_sidebar` view. */
export const Panel = (): ReactElement => {
  const filePath = useActivePath() ?? ''
  const web = useActiveWebContext()
  // A web tab has no vault file, so `filePath` is empty while a site is focused.
  // Subject = the file (when one is open) else the active website else nothing.
  const isWeb = !filePath && !!web?.url
  const subjectUrl = isWeb && web ? normalizeUrl(web.url) : ''
  const path = isWeb ? '' : filePath
  const hasSubject = !!path || isWeb
  const subjectKey = isWeb ? `web:${subjectUrl}` : path
  useSideNoteSubject(path, subjectUrl)
  const { notes, setNotes, loading } = useNotes()
  const { isPending, setPending, pending } = usePending()

  const [draft, setDraft] = React.useState('')
  const [draftTags, setDraftTags] = React.useState<string[]>([])
  const [anchorDraft, setAnchorDraft] = React.useState<SideNoteAnchor>(() => defaultAnchor(path))
  const [showCreate, setShowCreate] = React.useState(false)
  const [menuId, setMenuId] = React.useState<string | null>(null)
  const [editing, setEditing] = React.useState<SideNoteRecord | null>(null)
  const [search, setSearch] = useSideNoteViewField<string>('right_sidebar', 'search', '')
  const [filterWarning, setFilterWarning] = useSideNoteViewField<boolean>('right_sidebar', 'filterWarning', false)
  const [sortField, setSortField] = useSideNoteViewField<SortField>('right_sidebar', 'sortField', 'position')
  const [sortDir, setSortDir] = useSideNoteViewField<SortDir>('right_sidebar', 'sortDir', 'asc')
  const [anchorStatus, setAnchorStatus] = React.useState<Map<string, AnchorStatus>>(new Map())
  const [draftAnchorStatus, setDraftAnchorStatus] = React.useState<AnchorStatus>('ok')
  const [creating, setCreating] = React.useState(false)
  const creatingRef = React.useRef(false)
  const [anchorInfoNonce, setAnchorInfoNonce] = React.useState(0)
  const [posKeys, setPosKeys] = React.useState<Map<string, number>>(new Map())
  const [aware, setAware] = useSideNoteViewField<boolean>('right_sidebar', 'aware', false)
  const [ctx, setCtx] = React.useState<ActiveContext>({})
  const [settingsNonce, setSettingsNonce] = React.useState(0)
  const [pendingCreateNonce, setPendingCreateNonce] = React.useState(0)
  const selectionDrafts = selectionDraftStore()

  React.useEffect(() => api.files.onAnchorInfoChanged(() => setAnchorInfoNonce((n) => n + 1)), [])

  React.useEffect(() => {
    return selectionDrafts.subscribe(() => setPendingCreateNonce((nonce) => nonce + 1))
  }, [selectionDrafts])

  // Files whose anchors carry a position — Aware mode and `+` auto-anchor apply.
  const fileKind = React.useMemo(() => classifyFilePath(path), [path])
  const positional =
    fileKind === 'pdf' || fileKind === 'video' || fileKind === 'audio' || fileKind === 'text'

  // ± window (seconds) for media notes in Aware mode, from this plugin's settings.
  const mediaRange = React.useMemo(() => {
    const v = Number(api.settings.get().mediaRangeSeconds)
    return Number.isFinite(v) && v >= 0 ? v : 10
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsNonce])
  React.useEffect(() => {
    return api.settings.subscribe(() => setSettingsNonce((nonce) => nonce + 1))
  }, [])

  // Read the live viewer position (visible PDF page(s) / playback time / line range).
  const readActiveContext = React.useCallback(
    (): ActiveContext => ({
      pdfPages: path ? api.workspace.getPdfVisiblePages(path) : null,
      mediaSeconds: api.workspace.getMediaTime(),
      lineRange: path ? api.workspace.getVisibleLineRange(path) : null
    }),
    [path]
  )

  // While Aware is on, keep `ctx` synced to the active viewer. PDF page + markdown
  // scroll fire `onActivePositionChanged`; media time has no event, so poll it.
  React.useEffect(() => {
    if (!aware || !path) {
      setCtx({})
      return
    }
    const read = (): void => setCtx(readActiveContext())
    read()
    const off = api.files.onActivePositionChanged(read)
    const isMedia = fileKind === 'video' || fileKind === 'audio'
    const timer = isMedia ? window.setInterval(read, 1000) : undefined
    return () => {
      off()
      if (timer) window.clearInterval(timer)
    }
  }, [aware, path, fileKind, readActiveContext])

  const forSubject = React.useMemo(
    () => (isWeb ? notes.filter((n) => n.url === subjectUrl) : path ? notes.filter((n) => n.path === path && !n.url) : []),
    [notes, path, subjectUrl, isWeb]
  )

  const scoped = React.useMemo(() => {
    if (sortField === 'position') {
      const ordered = [...forSubject].sort((a, b) => comparePosition(a, b, posKeys))
      return sortDir === 'desc' ? ordered.reverse() : ordered
    }
    const key = sortField === 'created' ? 'createdAt' : 'updatedAt'
    return [...forSubject].sort((a, b) => {
      const r = a[key].localeCompare(b[key]) || anchorOrder(a.anchor) - anchorOrder(b.anchor)
      return sortDir === 'asc' ? r : -r
    })
  }, [forSubject, sortField, sortDir, posKeys])

  const filtered = React.useMemo(() => {
    let result = search.trim()
      ? scoped.filter((n) => matchesSearch(search, n.tags ?? [], n.note))
      : scoped
    if (aware && positional) result = result.filter((n) => anchorInContext(n.anchor, ctx, mediaRange))
    if (filterWarning) result = result.filter((n) => anchorStatus.has(n.id))
    return result
  }, [scoped, search, filterWarning, anchorStatus, aware, positional, ctx, mediaRange])

  // Stable display order: re-sort only when a sort/filter control changes (below),
  // never on an in-place edit. Toggling a task checkbox bumps `updatedAt` but the
  // card must stay put while sorting by Updated.
  const displayOrderRef = React.useRef<string[]>([])
  const [orderNonce, setOrderNonce] = React.useState(0)

  React.useEffect(() => {
    displayOrderRef.current = filtered.map((n) => n.id)
    setOrderNonce((n) => n + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, sortField, sortDir, search, filterWarning, aware, ctx])

  const display = React.useMemo(() => {
    const map = new Map(filtered.map((n) => [n.id, n]))
    const out: SideNoteRecord[] = []
    for (const id of displayOrderRef.current) {
      const n = map.get(id)
      if (n) out.push(n)
    }
    for (const n of filtered) {
      if (!displayOrderRef.current.includes(n.id)) out.push(n)
    }
    displayOrderRef.current = out.map((n) => n.id)
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, orderNonce])

  React.useEffect(() => {
    setAnchorDraft(isWeb ? { type: 'none' } : defaultAnchor(path))
    setDraft('')
    setDraftTags([])
    setShowCreate(false)
    // Web notes have no document order — default to most-recent.
    setSortField(isWeb ? 'updated' : 'position')
    setSortDir(isWeb ? 'desc' : 'asc')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectKey])

  React.useEffect(() => {
    let cancelled = false
    void (async () => {
      const next = new Map<string, AnchorStatus>()
      for (const note of forSubject) {
        const status = await validateAnchor(note.path, note.anchor)
        if (cancelled) return
        if (status !== 'ok') next.set(note.id, status)
      }
      if (!cancelled) setAnchorStatus(next)
    })()
    return () => { cancelled = true }
  }, [forSubject, anchorInfoNonce])

  // Resolve document-order keys for the Position sort. PDF intra-page order needs
  // the page text (async), so it can't run inside the sync `scoped` memo — we
  // precompute keys here, then bump `orderNonce` so the stable display order
  // re-snaps to the refined ordering. Only runs while sorting by position.
  React.useEffect(() => {
    if (sortField !== 'position') return
    let cancelled = false
    void (async () => {
      const keys = await resolvePositionKeys(path, forSubject)
      if (cancelled) return
      setPosKeys(keys)
      setOrderNonce((n) => n + 1)
    })()
    return () => { cancelled = true }
  }, [forSubject, path, sortField, anchorInfoNonce])

  React.useEffect(() => {
    if (!showCreate || !path) return
    let cancelled = false
    void validateAnchor(path, anchorDraft).then((status) => { if (!cancelled) setDraftAnchorStatus(status) })
    return () => { cancelled = true }
  }, [anchorDraft, showCreate, path, anchorInfoNonce])

  const create = async (): Promise<void> => {
    if (creatingRef.current) return
    const text = draft.trim()
    if (!text || !hasSubject) return
    creatingRef.current = true
    setCreating(true)
    try {
      // Web anchors carry only a (manually entered) selection snippet — nothing to
      // resolve against a file. File anchors are enriched against the file text.
      const record = isWeb
        ? makeWebNote(subjectUrl, text, anchorDraft, draftTags)
        : makeNote(path, text, await enrichTextAnchor(path, anchorDraft), draftTags)
      setNotes((prev) => [...prev, record])
      setDraft('')
      setDraftTags([])
      setShowCreate(false)
      const ok = await appendNote(record)
      if (!ok) {
        setNotes((prev) => prev.filter((n) => n.id !== record.id))
        setDraft(text)
        setShowCreate(true)
      }
    } finally {
      creatingRef.current = false
      setCreating(false)
    }
  }

  const patch = async (id: string, changes: Partial<SideNoteRecord>): Promise<boolean> => {
    if (isPending(id)) return false
    const current = notes.find((n) => n.id === id)
    if (!current) return false
    const next = { ...current, ...changes, updatedAt: new Date().toISOString() }
    setPending(id, true)
    setNotes((prev) => prev.map((n) => (n.id === id ? next : n)))
    try {
      const ok = await updateNote(id, next, current.updatedAt)
      if (!ok) setNotes((prev) => prev.map((n) => (n.id === id ? current : n)))
      return ok
    } finally {
      setPending(id, false)
    }
  }

  const remove = async (id: string): Promise<void> => {
    if (isPending(id)) return
    const current = notes.find((n) => n.id === id)
    if (!current) return
    setPending(id, true)
    setNotes((prev) => prev.filter((n) => n.id !== id))
    try {
      const ok = await deleteNote(id)
      if (!ok) setNotes((prev) => (prev.some((n) => n.id === id) ? prev : [...prev, current]))
    } finally {
      setPending(id, false)
    }
  }
  const confirmRemove = async (id: string): Promise<void> => {
    const choice = await api.ui.confirm({
      title: uiText('auto.042dc9b751ed'),
      message: uiText('sideNotes.delete.message'),
      actions: [
        { label: uiText('auto.77dfd2135f4d'), value: 'cancel', variant: 'ghost' },
        { label: uiText('auto.f6fdbe48dc54'), value: 'delete', variant: 'danger' }
      ]
    })
    if (choice === 'delete') await remove(id)
  }

  const beginEdit = (note: SideNoteRecord): void => setEditing(note)

  React.useEffect(() => {
    const requests = sideNoteEditStore()
    const answer = (): void => {
      const note = requests.get()
      if (!note) return
      setEditing(note)
      requests.publish(null)
    }
    answer()
    return requests.subscribe(answer)
  }, [])

  React.useEffect(() => {
    const prefill = selectionDrafts.get()
    if (!prefill) return
    const seed = (anchor: SideNoteAnchor): void => {
      selectionDrafts.consume(prefill)
        setDraft('')
      setDraftTags([])
      setAnchorDraft(anchor)
      setShowCreate(true)
    }
    if (prefill.kind === 'web') {
      if (isWeb && normalizeUrl(prefill.url ?? '') === subjectUrl) seed({ type: 'web-selection', snippet: prefill.snippet })
      return
    }
    if (prefill.kind === 'file' && prefill.path === path && !isWeb) {
      seed({ type: 'pdf-page', page: prefill.page ?? 1, snippet: prefill.snippet })
    }
  }, [path, subjectUrl, isWeb, pendingCreateNonce, selectionDrafts])
  const sortOptions = (isWeb
    ? (['updated', 'created'] as SortField[])
    : (['position', 'created', 'updated'] as SortField[])
  ).map((value) => ({ value, label: SORT_LABELS[value] }))

  const openSortMenu = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      () => (
        <SideNotesSortPopover
          field={sortField}
          direction={sortDir}
          options={sortOptions}
          onFieldChange={(value) => {
            const field = value as SortField
            setSortField(field)
          }}
          onDirectionChange={setSortDir}
          directionForField={(value) => DEFAULT_DIR[value as SortField]}
        />
      ),
      { anchor, align: 'end' },
      { className: 'sidenote-sort-popover', ariaLabel: uiText('auto.90fd0e9a6276') }
    )
  }

  return (
    <div className="sidenotes-panel">
      <header className="panel-header sidenotes-header">
        <div className="panel-header-label sidenotes-title">
          {isWeb ? <Globe /> : <StickyNote />}
          <span className="panel-title" title={isWeb ? subjectUrl : undefined}>{isWeb ? webHostLabel(subjectUrl) : uiText('auto.7d660ae8b46e')}</span>
        </div>
        <div className="sidenotes-header-actions">
          {positional && (
            <button className={`sidenote-icon-btn${aware ? ' active' : ''}`}
              aria-label={uiText('auto.580535153931')}
              title={aware ? uiText('auto.df4a8bd943cc') : uiText('auto.7b9b8574c69b')}
              onClick={() => setAware((v) => !v)}>
              <Crosshair />
            </button>
          )}
          {anchorStatus.size > 0 && (
            <button className={`sidenote-icon-btn${filterWarning ? ' active' : ''}`}
              aria-label={uiText('auto.f61b9fcd0854')} title={uiText('auto.74a3a904b38b')}
              onClick={() => setFilterWarning((v) => !v)}>
              <TriangleAlert />
            </button>
          )}
          <button className="sidenote-icon-btn sidenote-sort-menu-btn"
            aria-label={uiText('auto.90fd0e9a6276')}
            title={`${sortDir === 'asc' ? uiText('auto.4fee0a06b6e4') : uiText('auto.01e635f27ec2')} · ${SORT_LABELS[sortField]}`}
            aria-haspopup="dialog" onClick={(event) => openSortMenu(event.currentTarget)}>
            {sortDir === 'asc' ? <SortAscending /> : <SortDescending />}
          </button>
          <button className="sidenote-icon-btn" aria-label={uiText('auto.7a7e81b96c3a')} title={uiText('auto.d48a73614c7f')}
          onClick={() => {
            const opening = !showCreate
            setShowCreate(opening)
            if (opening) setAnchorDraft(isWeb ? { type: 'none' } : liveDefaultAnchor(path, readActiveContext()))
            else setDraft('')
          }}
          disabled={!hasSubject}>
            <Plus />
          </button>
        </div>
      </header>
      {hasSubject ? (
        <>
          <div className="sidenote-search-bar">
            <Search className="sidenote-search-icon" />
            <input className="sidenote-search-input" value={search}
              onChange={(e) => setSearch(e.target.value)} placeholder={uiText('auto.49cd864445a9')} aria-label={uiText('auto.f1b5671b118f')} />
            {search && (
              <button className="sidenote-icon-btn sidenote-search-clear" onClick={() => setSearch('')} aria-label={uiText('auto.b667d6f9f635')}>
                <X />
              </button>
            )}
          </div>
          {showCreate && (
            <div className="sidenote-create">
              <api.ui.NoteInput value={draft} onChange={setDraft} context={{ sourcePath: path || undefined }}
                onSave={() => void create()}
                onCancel={() => { setShowCreate(false); setDraft(''); setDraftTags([]) }}
                autoFocus />
              <api.ui.TagInput value={draftTags} onChange={setDraftTags} />
              <AnchorEditor path={path} web={isWeb} anchor={anchorDraft} onChange={setAnchorDraft}
                invalid={!isWeb && draftAnchorStatus !== 'ok'}
                validationMsg={!isWeb && draftAnchorStatus !== 'ok' ? anchorValidationMsg(anchorDraft, draftAnchorStatus) : undefined} />
              <div className="sidenote-create-actions">
                <button className="sidenote-save-btn" onClick={() => void create()} disabled={!draft.trim() || creating}>
                  {uiText('auto.757092db3c4b')}</button>
                {scoped.length > 0 && (
                  <button className="sidenote-cancel-btn" onClick={() => { setShowCreate(false); setDraft(''); setDraftTags([]) }}>{uiText('auto.77dfd2135f4d')}</button>
                )}
              </div>
            </div>
          )}
          <div className="sidenote-list">
            {loading ? (
              <div className="right-sidebar-empty"><p>{uiText('auto.33ce417454bf')}</p></div>
            ) : display.length ? (
              display.map((note) => {
                const status = anchorStatus.get(note.id)
                const invalid = status !== undefined
                const busy = pending.has(note.id)
                return (
                  <article key={note.id}
                    className={`sidenote-card${note.flagged ? ' flagged' : ''}${invalid ? ' invalid' : ''}`}
                    onClick={() => { selectSideNote(note, 'right_sidebar'); openNote(note, subjectUrl) }}>
                    <div className="sidenote-card-meta" onClick={(e) => e.stopPropagation()}>
                      {note.anchor.type !== 'none' && (
                        <button className="sidenote-anchor-badge"
                          onClick={() => openNote(note, subjectUrl)} title={note.url ? uiText('auto.9ee309dcedc9') : `${note.path} · ${anchorLabel(note.anchor)}`}>
                          {!note.url && note.anchor.type === 'markdown-heading' ? note.path.split('/').pop() : anchorLabel(note.anchor)}
                        </button>
                      )}
                      <div className="sidenote-card-btns">
                        {invalid && status && (
                          <TriangleAlert className="sidenote-warning-icon" title={anchorValidationMsg(note.anchor, status)} />
                        )}
                        <button
                          className={`sidenote-icon-btn sidenote-flag-btn${note.flagged ? ' active' : ''}`}
                          aria-label={note.flagged ? uiText('auto.b855c604e861') : uiText('auto.a774409a00c2')} title={note.flagged ? uiText('auto.b855c604e861') : uiText('auto.a774409a00c2')}
                          disabled={busy} onClick={() => void patch(note.id, { flagged: !note.flagged })}>
                          <Flag />
                        </button>
                        <NoteMenu noteId={note.id} openId={menuId} setOpenId={setMenuId}
                          onEdit={() => beginEdit(note)}
                          onDelete={() => { void confirmRemove(note.id) }}
                          disabled={busy} />
                      </div>
                    </div>

                    {(
                      <>
                        <api.ui.MarkdownView className="sidenote-markdown" value={note.note}
                          context={{ ref: { pluginId: 'sideNotes', sourceId: 'notes', itemId: note.id }, sourcePath: note.path || undefined }}
                          onChange={(value) => { void patch(note.id, { note: value }) }} />
                        {note.tags && note.tags.length > 0 && (
                          <div className="sidenote-tags-view" onClick={(e) => e.stopPropagation()}>
                            {note.tags.map((tag) => (
                              <span key={tag} className="sidenote-tag-view-pill">#{tag}</span>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </article>
                )
              })
            ) : (
              <div className="right-sidebar-empty"><p>{search ? uiText('auto.b690846c83ff') : aware && positional ? uiText('auto.8f4043581269') : isWeb ? uiText('auto.8c8077ac2313') : uiText('auto.31b291dd535e')}</p></div>
            )}
          </div>
        </>
      ) : (
        <div className="right-sidebar-empty"><p>{uiText('auto.34f6835f5ddf')}</p></div>
      )}
      {editing && <SideNoteEditModal
        key={editing.id}
        note={editing}
        onSaved={(saved) => {
          setNotes((current) => current.map((note) => note.id === saved.id ? saved : note))
          selectSideNote(saved, 'right_sidebar')
        }}
        onClose={() => setEditing(null)}
      />}
    </div>
  )
}
