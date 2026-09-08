import { React, api } from './runtime'
import type { ReactElement } from 'react'
import { anchorLabel, anchorValidationMsg, validateAnchor, type AnchorStatus } from './anchors'
import { deleteNote, updateNote } from './data'
import { NoteMenu, SideNoteEditModal, SideNotesFilterPopover, SideNotesSortPopover } from './fields'
import { Filter, Flag, Globe, Rows3, Search, SortAscending, SortDescending, TriangleAlert, X } from './icons'
import { useNotes } from './hooks'
import { webHostLabel } from './web'
import { matchesSearch } from './search'
import type { SideNoteRecord } from './types'
import { uiText } from './localization'
import { WEB_NAVIGATOR_V1 } from '@valley/plugin-sdk'
import { selectSideNote, useSideNoteViewField } from './surfaces'
import { filterTypesSetting } from './Settings'

type SortField = 'updated' | 'created' | 'name'
type SortDir = 'desc' | 'asc'
const SORT_LABELS: Record<SortField, string> = { updated: 'Updated', created: 'Created', name: 'Name' }
const ALL_SOURCE_TYPES = 'all'
const WEB_SOURCE_TYPE = 'web'

/** Display name: hostname for a web note, file basename for a file note. */
function noteName(note: SideNoteRecord): string {
  if (note.url) return webHostLabel(note.url)
  return note.path.split('/').pop() ?? note.path
}

function noteSourceType(note: SideNoteRecord): string {
  if (note.url) return WEB_SOURCE_TYPE
  return note.path.match(/\.[^./]+$/)?.[0].toLowerCase() ?? ''
}

/** Open a note's subject (web page via the command bus, file in the workspace). */
function openNote(note: SideNoteRecord): void {
  if (note.url) {
    void api.interop.services.providers(WEB_NAVIGATOR_V1)[0]?.invoke('open', [{ url: note.url }])
  }
  else api.workspace.openFile(note.path, note.anchor.type === 'web-selection' ? undefined : note.anchor)
}
function compareNotes(a: SideNoteRecord, b: SideNoteRecord, field: SortField): number {
  if (field === 'name') {
    const byName = noteName(a).localeCompare(noteName(b), undefined, { sensitivity: 'base' })
    return byName !== 0 ? byName : a.note.localeCompare(b.note, undefined, { sensitivity: 'base' })
  }
  const key = field === 'created' ? 'createdAt' : 'updatedAt'
  const byDate = a[key].localeCompare(b[key])
  return byDate !== 0 ? byDate : noteName(a).localeCompare(noteName(b), undefined, { sensitivity: 'base' })
}

/** Cross-file flagged/all SideNotes browser — the plugin's `left_sidebar` view. */
export const FlaggedPanel = (): ReactElement => {
  const { notes, setNotes, loading } = useNotes()
  const [search, setSearch] = useSideNoteViewField<string>('left_sidebar', 'search', '')
  const [showAll, setShowAll] = useSideNoteViewField<boolean>('left_sidebar', 'showAll', false)
  const [sortField, setSortField] = useSideNoteViewField<SortField>('left_sidebar', 'sortField', 'updated')
  const [sortDir, setSortDir] = useSideNoteViewField<SortDir>('left_sidebar', 'sortDir', 'desc')
  const [anchorStatus, setAnchorStatus] = React.useState<Map<string, AnchorStatus>>(new Map())
  const [filterWarning, setFilterWarning] = useSideNoteViewField<boolean>('left_sidebar', 'filterWarning', false)
  const [sourceType, setSourceType] = useSideNoteViewField<string>('left_sidebar', 'sourceType', ALL_SOURCE_TYPES)
  const [compact, setCompact] = useSideNoteViewField<boolean>('left_sidebar', 'compact', false)
  const [menuId, setMenuId] = React.useState<string | null>(null)
  const [editing, setEditing] = React.useState<SideNoteRecord | null>(null)
  const [anchorInfoNonce, setAnchorInfoNonce] = React.useState(0)
  const [filterTypes, setFilterTypes] = React.useState(() => {
    const settings = api.settings.get()
    return filterTypesSetting(settings.filterTypes)
  })

  React.useEffect(() => api.files.onAnchorInfoChanged(() => setAnchorInfoNonce((n) => n + 1)), [])
  React.useEffect(() => api.settings.subscribe(() => {
    const settings = api.settings.get()
    setFilterTypes(filterTypesSetting(settings.filterTypes))
  }), [])

  const sourceTypeOptions = React.useMemo(() => {
    const types = [...new Set(notes.map(noteSourceType).filter(Boolean))]
    return [
      { value: ALL_SOURCE_TYPES, label: uiText('auto.6a72085653e4') },
      ...filterTypes.map((extension) => ({ value: extension, label: extension })),
      ...(types.includes(WEB_SOURCE_TYPE) ? [{ value: WEB_SOURCE_TYPE, label: uiText('sideNotes.filter.web') }] : [])
    ]
  }, [notes, filterTypes])

  React.useEffect(() => {
    if (!sourceTypeOptions.some((option) => option.value === sourceType)) setSourceType(ALL_SOURCE_TYPES)
  }, [sourceType, sourceTypeOptions, setSourceType])

  const visible = React.useMemo(() => {
    const base = showAll ? notes : notes.filter((n) => n.flagged)
    const typed = sourceType === ALL_SOURCE_TYPES ? base : base.filter((note) => noteSourceType(note) === sourceType)
    const filtered = search.trim()
      ? typed.filter((n) => matchesSearch(search, n.tags ?? [], n.note, n.url ?? n.path))
      : typed
    return [...filtered].sort((a, b) => {
      const r = compareNotes(a, b, sortField)
      return sortDir === 'asc' ? r : -r
    })
  }, [notes, search, showAll, sourceType, sortField, sortDir])

  // Stable display order: re-sort only when a sort/filter control changes (below),
  // never on an in-place edit. Toggling a task checkbox bumps `updatedAt` but the
  // card must stay put.
  const displayOrderRef = React.useRef<string[]>([])
  const [orderNonce, setOrderNonce] = React.useState(0)

  React.useEffect(() => {
    displayOrderRef.current = visible.map((n) => n.id)
    setOrderNonce((n) => n + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll, sortField, sortDir, search, sourceType])

  // Seed once when the first load resolves.
  const seededRef = React.useRef(false)
  React.useEffect(() => {
    if (loading || seededRef.current) return
    seededRef.current = true
    displayOrderRef.current = visible.map((n) => n.id)
    setOrderNonce((n) => n + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  // Reconcile: keep the stable order, drop removed ids, append new ids at the end.
  const display = React.useMemo(() => {
    const source = filterWarning ? visible.filter((n) => anchorStatus.has(n.id)) : visible
    const map = new Map(source.map((n) => [n.id, n]))
    const out: SideNoteRecord[] = []
    for (const id of displayOrderRef.current) {
      const n = map.get(id)
      if (n) out.push(n)
    }
    for (const n of source) {
      if (!displayOrderRef.current.includes(n.id)) out.push(n)
    }
    displayOrderRef.current = out.map((n) => n.id)
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, orderNonce, filterWarning, anchorStatus])

  React.useEffect(() => {
    let cancelled = false
    void (async () => {
      const next = new Map<string, AnchorStatus>()
      for (const note of visible) {
        const status = await validateAnchor(note.url ?? note.path, note.anchor)
        if (cancelled) return
        if (status !== 'ok') next.set(note.id, status)
      }
      if (!cancelled) setAnchorStatus(next)
    })()
    return () => { cancelled = true }
  }, [visible, anchorInfoNonce])

  const patch = async (id: string, changes: Partial<SideNoteRecord>): Promise<void> => {
    const current = notes.find((n) => n.id === id)
    if (!current) return
    const next = { ...current, ...changes, updatedAt: new Date().toISOString() }
    setNotes((prev) => prev.map((n) => (n.id === id ? next : n)))
    const ok = await updateNote(id, next, current.updatedAt)
    if (!ok) setNotes((prev) => prev.map((n) => (n.id === id ? current : n)))
  }
  const remove = async (id: string): Promise<void> => {
    const previous = notes
    setNotes((prev) => prev.filter((n) => n.id !== id))
    const ok = await deleteNote(id)
    if (!ok) setNotes(previous)
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
  const openSortMenu = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      () => (
        <SideNotesSortPopover
          field={sortField}
          direction={sortDir}
          options={Object.entries(SORT_LABELS).map(([value, label]) => ({ value, label }))}
          onFieldChange={(value) => setSortField(value as SortField)}
          onDirectionChange={setSortDir}
        />
      ),
      { anchor, align: 'end' },
      { className: 'sidenote-sort-popover', ariaLabel: uiText('auto.90fd0e9a6276') }
    )
  }

  const openSourceTypeMenu = (anchor: HTMLElement): void => {
    void api.ui.openPopover(
      () => (
        <SideNotesFilterPopover
          value={sourceType}
          options={sourceTypeOptions}
          onChange={setSourceType}
        />
      ),
      { anchor, align: 'end' },
      { className: 'sidenote-sort-popover', ariaLabel: uiText('auto.0aafb761a83c') }
    )
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">{uiText('auto.7d660ae8b46e')}</span>
        <div className="sidenotes-header-actions">
          <button className={`sidenote-icon-btn${!showAll ? ' active' : ''}`}
            aria-label={showAll ? uiText('auto.6a72085653e4') : uiText('auto.f8db8a172be6')}
            title={showAll ? uiText('auto.6a72085653e4') : uiText('auto.f8db8a172be6')}
            aria-pressed={!showAll} onClick={() => setShowAll((value) => !value)}>
            <Flag />
          </button>
          {anchorStatus.size > 0 && (
            <button className={`sidenote-icon-btn${filterWarning ? ' active' : ''}`}
              aria-label={uiText('auto.f61b9fcd0854')} title={uiText('auto.74a3a904b38b')}
              onClick={() => setFilterWarning((v) => !v)}>
              <TriangleAlert />
            </button>
          )}
          <button className={`sidenote-icon-btn${compact ? ' active' : ''}`}
            aria-label={uiText('auto.77f9b062ce1b')} title={compact ? uiText('auto.d2f76731e1e1') : uiText('auto.e3719eae891e')}
            onClick={() => setCompact((c) => !c)}>
            <Rows3 />
          </button>
          <button className={`sidenote-icon-btn${sourceType !== ALL_SOURCE_TYPES ? ' active' : ''}`}
            aria-label={uiText('auto.0aafb761a83c')}
            title={`${uiText('auto.0aafb761a83c')} · ${sourceType === ALL_SOURCE_TYPES ? uiText('auto.6a72085653e4') : sourceType === WEB_SOURCE_TYPE ? uiText('sideNotes.filter.web') : sourceType}`}
            aria-haspopup="dialog" aria-pressed={sourceType !== ALL_SOURCE_TYPES}
            onClick={(event) => openSourceTypeMenu(event.currentTarget)}>
            <Filter />
          </button>
          <button className="sidenote-icon-btn sidenote-sort-menu-btn"
            aria-label={uiText('auto.90fd0e9a6276')}
            title={`${sortDir === 'asc' ? uiText('auto.4fee0a06b6e4') : uiText('auto.01e635f27ec2')} · ${SORT_LABELS[sortField]}`}
            aria-haspopup="dialog" onClick={(event) => openSortMenu(event.currentTarget)}>
            {sortDir === 'asc' ? <SortAscending /> : <SortDescending />}
          </button>
        </div>
      </div>
      <div className="sidenote-search-bar sidenote-search-bar--left">
        <Search className="sidenote-search-icon" />
        <input className="sidenote-search-input" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={showAll ? uiText('auto.49cd864445a9') : uiText('auto.7c0451dde956')} aria-label={uiText('auto.ff4f3043a289')} />
        {search && (
          <button className="sidenote-icon-btn sidenote-search-clear" onClick={() => setSearch('')} aria-label={uiText('auto.b667d6f9f635')}>
            <X />
          </button>
        )}
      </div>
      <div className="panel-body flagged-notes-panel-body hidescrollbar">
        {loading ? (
          <div className="tree-empty">{uiText('auto.33ce417454bf')}</div>
        ) : display.length === 0 ? (
          <div className="tree-empty">{search || sourceType !== ALL_SOURCE_TYPES ? uiText('auto.b690846c83ff') : showAll ? uiText('auto.d2a1e72bc320') : uiText('auto.f5ca64c680ee')}</div>
        ) : (
          <div className="flagged-notes-list">
            {display.map((note) => {
              const status = anchorStatus.get(note.id)
              const invalid = status !== undefined
              return (
                <div key={note.id}
                  className={`flagged-note-card${note.flagged ? ' flagged' : ''}${invalid ? ' invalid' : ''}${compact ? ' compact' : ''}`}
                  onClick={() => { selectSideNote(note, 'left_sidebar'); openNote(note) }} title={note.url ?? note.path}>
                  <div className="flagged-note-header">
                    <div className="flagged-note-meta-row">
                      <div className="flagged-note-meta-left">
                        {!note.url ? (
                          <span className="flagged-note-anchor" title={`${note.path}${note.anchor.type !== 'none' ? ` · ${anchorLabel(note.anchor)}` : ''}`}>
                            {noteName(note)}
                          </span>
                        ) : note.anchor.type !== 'none' && <span className="flagged-note-anchor">{anchorLabel(note.anchor)}</span>}
                      </div>
                      <div className="flagged-note-meta-right">
                        {invalid && status && (
                          <TriangleAlert className="sidenote-warning-icon" title={anchorValidationMsg(note.anchor, status)} />
                        )}
                        <button className={`sidenote-icon-btn sidenote-flag-btn${note.flagged ? ' active' : ''}`}
                          aria-label={note.flagged ? uiText('auto.b855c604e861') : uiText('auto.a774409a00c2')} title={note.flagged ? uiText('auto.b855c604e861') : uiText('auto.a774409a00c2')}
                          onClick={(e) => { e.stopPropagation(); void patch(note.id, { flagged: !note.flagged }) }}>
                          <Flag />
                        </button>
                        <NoteMenu noteId={note.id} openId={menuId} setOpenId={setMenuId}
                          onEdit={() => beginEdit(note)}
                          onDelete={() => { void confirmRemove(note.id) }} />
                      </div>
                    </div>
                    {note.url && <span className="flagged-note-file"><Globe className="flagged-note-web-icon" />{noteName(note)}</span>}
                  </div>
                  {compact && (() => {
                    const firstLine = note.note.split('\n').find((l) => l.trim())?.replace(/^#+\s*/, '').trim()
                    return firstLine ? <p className="flagged-note-preview">{firstLine}</p> : null
                  })()}
                  {(
                    <>
                      {!compact && <api.ui.MarkdownView className="sidenote-markdown sidenote-markdown--compact" value={note.note}
                        context={{ ref: { pluginId: 'sideNotes', sourceId: 'notes', itemId: note.id }, sourcePath: note.path || undefined }}
                        onChange={(value) => { void patch(note.id, { note: value }) }} />}
                      {!compact && note.tags && note.tags.length > 0 && (
                        <div className="sidenote-tags-view" onClick={(e) => e.stopPropagation()}>
                          {note.tags.map((tag) => (
                            <span key={tag} className="sidenote-tag-view-pill">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
      {editing && <SideNoteEditModal
        key={editing.id}
        note={editing}
        onSaved={(saved) => {
          setNotes((current) => current.map((note) => note.id === saved.id ? saved : note))
          selectSideNote(saved, 'left_sidebar')
        }}
        onClose={() => setEditing(null)}
      />}
    </div>
  )
}
