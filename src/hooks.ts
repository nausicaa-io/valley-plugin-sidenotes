import { React, api } from './runtime'
import type { Dispatch, SetStateAction } from 'react'
import { noteRepository } from './data'
import type { SideNoteRecord } from './types'
import { WEB_ACTIVE_CONTEXT_V1, type ActiveWebContext } from '@valley/plugin-sdk'
import { uiText } from './localization'
import type { NoteScope } from './noteRepository'
import { normalizeUrl } from './web'

/** The active workspace file path, kept fresh via the host state subscription. */
export function useActivePath(): string | null {
  const [source] = React.useState(() => {
    const owner = api
    const reader = noteRepository()
    let snapshot = owner.getState().activePath
    return {
      getSnapshot: (): string | null => {
        if (reader.isActive()) snapshot = owner.getState().activePath
        return snapshot
      },
      subscribe: (listener: () => void): (() => void) => {
        if (!reader.isActive()) return () => {}
        let active = true
        const dispose = owner.subscribe(() => { if (active && reader.isActive()) listener() })
        return () => { active = false; dispose() }
      }
    }
  })
  return React.useSyncExternalStore(source.subscribe, source.getSnapshot, source.getSnapshot)
}

/**
 * The active website (`{instanceId,url,title}`) published by the Web plugin, or
 * null when no browser tab is focused. A web tab has no vault file, so
 * `useActivePath()` is null while this is set — the panel keys off this instead.
 */
export function useActiveWebContext(): ActiveWebContext | null {
  const [source] = React.useState(() => {
    const owner = api
    const reader = noteRepository()
    const initial = owner.interop.state.get(WEB_ACTIVE_CONTEXT_V1)
    let snapshot = initial ? { ...initial } : null
    return {
      getSnapshot: (): ActiveWebContext | null => {
        if (reader.isActive()) {
          const next = owner.interop.state.get(WEB_ACTIVE_CONTEXT_V1)
          if (!next) snapshot = null
          else if (!snapshot || next.instanceId !== snapshot.instanceId || next.url !== snapshot.url || next.title !== snapshot.title) snapshot = { ...next }
        }
        return snapshot
      },
      subscribe: (listener: () => void): (() => void) => {
        if (!reader.isActive()) return () => {}
        let active = true
        const dispose = owner.interop.state.subscribe(WEB_ACTIVE_CONTEXT_V1, () => { if (active && reader.isActive()) listener() })
        return () => { active = false; dispose() }
      }
    }
  })
  return React.useSyncExternalStore(source.subscribe, source.getSnapshot, source.getSnapshot)
}

export function useNotes(scope?: NoteScope): {
  notes: SideNoteRecord[]
  setNotes: Dispatch<SetStateAction<SideNoteRecord[]>>
  loading: boolean
  error: string | null
  reload: () => void
} {
  const [reader] = React.useState(noteRepository)
  const [notes, setNotes] = React.useState<SideNoteRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const active = React.useRef(false)
  const generation = React.useRef(0)
  const kind = scope?.kind ?? 'all'
  const subject = scope?.kind === 'file' ? scope.path : scope?.kind === 'web' ? normalizeUrl(scope.url) : ''
  const includeWeb = scope?.kind === 'file' && scope.includeWeb === true
  const reload = React.useCallback(() => {
    if (!active.current || !reader.isActive()) return
    const current = ++generation.current
    const selected = kind === 'all' ? undefined : kind === 'file' ? { kind, path: subject, includeWeb } : kind === 'web' ? { kind, url: subject } : { kind }
    void reader.load(selected).then((next) => {
      if (!active.current || !reader.isActive() || current !== generation.current) return
      setNotes(next)
      setError(null)
      setLoading(false)
    }).catch(() => {
      if (!active.current || !reader.isActive() || current !== generation.current) return
      setError(uiText('sideNotes.error.load'))
      setLoading(false)
    })
  }, [kind, subject, includeWeb, reader])
  React.useEffect(() => {
    active.current = true
    setNotes([])
    setLoading(true)
    setError(null)
    const unsubscribe = reader.subscribe(reload)
    reload()
    return () => { active.current = false; generation.current++; unsubscribe() }
  }, [reload, reader])
  return { notes, setNotes, loading, error, reload }
}

/** Track in-flight mutation ids to prevent overlapping writes on a record. */
export function usePending(): {
  isPending: (id: string) => boolean
  setPending: (id: string, on: boolean) => void
  pending: Set<string>
} {
  const [pending, setState] = React.useState<Set<string>>(new Set())
  const isPending = React.useCallback((id: string) => pending.has(id), [pending])
  const setPending = React.useCallback((id: string, on: boolean) => {
    setState((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])
  return { isPending, setPending, pending }
}
