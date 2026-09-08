import { React, api } from './runtime'
import type { ReactElement } from 'react'
import {
  ANCHOR_LABEL_KEYS,
  anchorOptions,
  anchorOptionsForWeb,
  anchorWithType,
  formatSeconds,
  parseTime,
  readHeadings
} from './anchors'
import { Check, Ellipsis, Pencil, SortAscending, SortDescending, Trash } from './icons'
import type { AnchorType, SideNoteAnchor, SideNoteRecord } from './types'
import { uiText } from './localization'
import { saveNoteValues } from './commands'
import type { DocumentRevision } from './data'

export const SideNotesSortPopover = ({
  field,
  direction,
  options,
  onFieldChange,
  onDirectionChange,
  directionForField
}: {
  field: string
  direction: 'asc' | 'desc'
  options: readonly { value: string; label: string }[]
  onFieldChange: (value: string) => void
  onDirectionChange: (value: 'asc' | 'desc') => void
  directionForField?: (value: string) => 'asc' | 'desc'
}): ReactElement => {
  const [selectedField, setSelectedField] = React.useState(field)
  const [selectedDirection, setSelectedDirection] = React.useState(direction)
  return (
    <div className="sidenote-sort-popover-body">
      <div className="sidenote-sort-heading">
        <span>{uiText('auto.90fd0e9a6276')}</span>
        <div className="sidenote-sort-directions">
          {(['desc', 'asc'] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={`sidenote-sort-direction${selectedDirection === value ? ' active' : ''}`}
              aria-label={uiText(value === 'asc' ? 'auto.4fee0a06b6e4' : 'auto.01e635f27ec2')}
              aria-pressed={selectedDirection === value}
              onClick={() => {
                setSelectedDirection(value)
                onDirectionChange(value)
              }}
            >
              {value === 'asc' ? <SortAscending /> : <SortDescending />}
            </button>
          ))}
        </div>
      </div>
      <div className="sidenote-sort-options">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`sidenote-popover-option${selectedField === option.value ? ' active' : ''}`}
            aria-pressed={selectedField === option.value}
            onClick={() => {
              const changed = selectedField !== option.value
              setSelectedField(option.value)
              onFieldChange(option.value)
              const nextDirection = changed ? directionForField?.(option.value) : undefined
              if (nextDirection) {
                setSelectedDirection(nextDirection)
                onDirectionChange(nextDirection)
              }
            }}
          >
            <span>{option.label}</span>
            <Check className="sidenote-popover-check" />
          </button>
        ))}
      </div>
    </div>
  )
}

export const SideNotesFilterPopover = ({
  value,
  options,
  onChange
}: {
  value: string
  options: readonly { value: string; label: string }[]
  onChange: (value: string) => void
}): ReactElement => {
  const [selected, setSelected] = React.useState(value)
  return (
    <div className="sidenote-sort-options">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`sidenote-popover-option${selected === option.value ? ' active' : ''}`}
          aria-pressed={selected === option.value}
          onClick={() => {
            setSelected(option.value)
            onChange(option.value)
          }}
        >
          <span>{option.label}</span>
          <Check className="sidenote-popover-check" />
        </button>
      ))}
    </div>
  )
}


/** Number input that keeps its own draft so it can be cleared while editing. */
const NumberField = ({
  value, min, ariaLabel, onCommit
}: { value: number; min: number; ariaLabel: string; onCommit: (value: number) => void }): ReactElement => {
  const [text, setText] = React.useState(String(value))
  const focused = React.useRef(false)
  React.useEffect(() => { if (!focused.current) setText(String(value)) }, [value])
  const commit = (raw: string): void => {
    const n = Number(raw)
    const next = raw.trim() === '' || !Number.isFinite(n) ? min : Math.max(min, n)
    setText(String(next))
    onCommit(next)
  }
  return (
    <input
      type="number" min={min} value={text} aria-label={ariaLabel}
      onFocus={() => { focused.current = true }}
      onChange={(e) => {
        setText(e.target.value)
        const n = Number(e.target.value)
        if (e.target.value.trim() !== '' && Number.isFinite(n)) onCommit(Math.max(min, n))
      }}
      onBlur={(e) => { focused.current = false; commit(e.target.value) }}
    />
  )
}

/** Timestamp input accepting m:ss / h:mm:ss / seconds, with a capture button. */
const TimeField = ({
  seconds, onCommit
}: { seconds: number; onCommit: (seconds: number) => void }): ReactElement => {
  const [text, setText] = React.useState(formatSeconds(seconds))
  const focused = React.useRef(false)
  React.useEffect(() => { if (!focused.current) setText(formatSeconds(seconds)) }, [seconds])
  const capture = (): void => {
    const current = api.workspace.getMediaTime()
    if (current === null) return
    onCommit(Math.max(0, current))
    setText(formatSeconds(current))
  }
  return (
    <div className="sidenote-time-field">
      <input
        value={text} placeholder="0:00" aria-label={uiText('auto.19eabc961735')}
        onFocus={() => { focused.current = true }}
        onChange={(e) => {
          setText(e.target.value)
          const parsed = parseTime(e.target.value)
          if (parsed !== null) onCommit(parsed)
        }}
        onBlur={(e) => {
          focused.current = false
          const parsed = parseTime(e.target.value)
          const next = parsed === null ? 0 : Math.max(0, parsed)
          onCommit(next)
          setText(formatSeconds(next))
        }}
      />
      <button type="button" className="sidenote-time-capture" title={uiText('auto.528bfa4632ef')} onClick={capture}>
        {uiText('auto.e3b82040565b')}</button>
    </div>
  )
}

export const AnchorEditor = ({
  path, web = false, anchor, onChange, validationMsg, invalid
}: {
  path: string
  /** Web subject: offer the whole-page / text-selection anchors instead of file ones. */
  web?: boolean
  anchor: SideNoteAnchor
  onChange: (anchor: SideNoteAnchor) => void
  validationMsg?: string
  invalid?: boolean
}): ReactElement => {
  const options = web ? anchorOptionsForWeb() : anchorOptions(path)
  // The host's styled dropdown — never a raw `<select>`, whose popup Chromium
  // hands to the OS unthemed and which ignores the native/custom menu setting.
  const { SelectField } = api.ui.settings
  const ComboField = api.ui.ComboField
  const [headings, setHeadings] = React.useState<string[]>([])
  React.useEffect(() => {
    if (anchor.type !== 'markdown-heading') { setHeadings([]); return }
    void readHeadings(path).then(setHeadings)
  }, [path, anchor.type])

  return (
    <div className={`sidenote-anchor-editor${invalid ? ' invalid' : ''}`}>
      <div className="sidenote-select-wrap">
        <SelectField
          value={anchor.type}
          onChange={(value) => onChange(anchorWithType(value as AnchorType, anchor))}
          ariaLabel={uiText('auto.9c36384c83fb')}
          options={options.map((type) => ({
            value: type,
            label: web && type === 'none' ? uiText('auto.eeb742ed8cac') : uiText(ANCHOR_LABEL_KEYS[type])
          }))}
        />
      </div>
      {anchor.type === 'web-selection' && (
        <input
          className="sidenote-anchor-snippet"
          value={anchor.snippet}
          onChange={(e) => onChange({ ...anchor, snippet: e.target.value })}
          placeholder={uiText('auto.98c236df91df')}
          aria-label={uiText('auto.4b5ddf04bbe5')}
        />
      )}
      {anchor.type === 'pdf-page' && (
        <>
          <NumberField value={anchor.page} min={1} ariaLabel={uiText('auto.300721defdc9')} onCommit={(page) => onChange({ ...anchor, page })} />
          <input
            className="sidenote-anchor-snippet"
            value={anchor.snippet ?? ''}
            onChange={(e) => onChange({ ...anchor, snippet: e.target.value || undefined })}
            placeholder={uiText('auto.2599b7d91cc5')}
            aria-label={uiText('auto.1e149756b7c6')}
          />
        </>
      )}
      {anchor.type === 'media-time' && (
        <TimeField seconds={anchor.seconds} onCommit={(seconds) => onChange({ ...anchor, seconds })} />
      )}
      {anchor.type === 'markdown-line' && (
        <NumberField value={anchor.line} min={1} ariaLabel={uiText('auto.7555728cb6e5')} onCommit={(line) => onChange({ ...anchor, line })} />
      )}
      {anchor.type === 'markdown-heading' && (
        <ComboField
          value={anchor.heading}
          onChange={(heading) => onChange({ ...anchor, heading })}
          options={headings.map((h) => ({ value: h, label: h }))}
          placeholder={uiText('auto.a3089b7fae27')}
          ariaLabel={uiText('auto.353e665a44c8')}
        />
      )}
      {anchor.type === 'markdown-snippet' && (
        <input
          value={anchor.snippet}
          onChange={(e) => onChange({ ...anchor, snippet: e.target.value })}
          placeholder={uiText('auto.2e5ce5a06a35')} aria-label={uiText('auto.ef6127596cae')}
        />
      )}
      {validationMsg && <p className="sidenote-anchor-warning">{validationMsg}</p>}
    </div>
  )
}

export const SideNoteEditModal = ({
  note,
  onSaved,
  onClose
}: {
  note: SideNoteRecord
  onSaved: (note: SideNoteRecord) => void
  onClose: () => void
}): ReactElement => {
  const [text, setText] = React.useState(note.note)
  const [tags, setTags] = React.useState(note.tags)
  const [anchor, setAnchor] = React.useState(note.anchor)
  const [flagged, setFlagged] = React.useState(!!note.flagged)
  const [busy, setBusy] = React.useState(false)
  const [error, setError] = React.useState('')
  const [documentRevision, setDocumentRevision] = React.useState<DocumentRevision>()
  const documentRef = { pluginId: 'sideNotes', sourceId: 'notes', itemId: note.id }
  const cancel = async (): Promise<void> => {
    if (busy) return
    try {
      await api.documents.drafts.clear(documentRef)
      onClose()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    }
  }
  const save = async (): Promise<void> => {
    if (busy || !text.trim()) return
    setBusy(true)
    setError('')
    try {
      if (!documentRevision) throw new Error(uiText('sideNotes.error.save'))
      const result = await saveNoteValues(note.id, { note: text, tags, anchor, flagged }, note.updatedAt, documentRevision)
      api.undo.push({
        label: uiText('sideNotes.command.update'),
        undo: async () => {
          try { await result.revert.run(); return { ok: true } }
          catch (reason) { return { ok: false, message: String(reason) } }
        },
        redo: async () => {
          try { await result.revert.reapply(); return { ok: true } }
          catch (reason) { return { ok: false, message: String(reason) } }
        }
      })
      onSaved(result.value)
      await api.documents.drafts.clear(documentRef)
      onClose()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : String(reason))
    } finally {
      setBusy(false)
    }
  }
  const footer = <div className="sidenote-edit-actions">
    <button className="sidenote-cancel-btn" disabled={busy} onClick={() => void cancel()}>{uiText('auto.77dfd2135f4d')}</button>
    <button className="sidenote-save-btn" disabled={busy || !text.trim() || !documentRevision} onClick={() => void save()}>{uiText('auto.efc007a393f6')}</button>
  </div>
  return <api.ui.Modal
    title={uiText('sideNotes.command.update')}
    size="medium"
    bodyClassName="sidenote-edit-form"
    onClose={() => void cancel()}
    footer={footer}
  >
    <api.ui.NoteInput value={text} context={{ ref: documentRef, sourcePath: note.path || undefined }} tags={tags} onTagsChange={setTags} onRevisionChange={(revision) => setDocumentRevision((current) => !current || revision.expectedRevision < current.expectedRevision ? revision : current)} onChange={setText} onSave={() => void save()} onCancel={() => void cancel()} />
    <api.ui.TagInput value={tags} onChange={setTags} />
    <AnchorEditor path={note.path} web={!!note.url} anchor={anchor} onChange={setAnchor} />
    <label><input type="checkbox" checked={flagged} disabled={busy} onChange={(event) => setFlagged(event.target.checked)} />{uiText('sideNotes.field.flagged')}</label>
    {error && <p role="alert">{uiText('sideNotes.error.save')} {error}</p>}
  </api.ui.Modal>
}

export const NoteMenu = ({
  noteId, setOpenId, onEdit, onDelete, disabled = false
}: {
  noteId: string
  openId: string | null
  setOpenId: (id: string | null) => void
  onEdit: () => void
  onDelete: () => void
  disabled?: boolean
}): ReactElement => {
  return (
    <div className="sidenote-menu-wrap">
      <button
        className="sidenote-icon-btn" aria-label={uiText('auto.5430d0e5fb8c')} title={uiText('auto.6bf5da9c080b')} disabled={disabled}
        onClick={(e) => {
          e.stopPropagation()
          setOpenId(noteId)
          void api.ui.openMenu([
            { label: uiText('auto.5301648dcf6b'), icon: <Pencil />, enabled: !disabled, onSelect: onEdit },
            { label: uiText('auto.f6fdbe48dc54'), icon: <Trash />, enabled: !disabled, danger: true, onSelect: onDelete }
          ], { anchor: e.currentTarget, align: 'end' }).finally(() => setOpenId(null))
        }}
      >
        <Ellipsis />
      </button>
    </div>
  )
}
