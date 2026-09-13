import { React, api } from './runtime'
import type { Dispatch, SetStateAction } from 'react'
import { loadNotes, onChanged } from './data'
import type { SideNoteRecord } from './types'
import { WEB_ACTIVE_CONTEXT_V1, type ActiveWebContext } from '@valley/plugin-sdk'
import { uiText } from './localization'

/** The active workspace file path, kept fresh via the host state subscription. */
export function useActivePath(): string | null {
  const [path, setPath] = React.useState<string | null>(() => api.getState().activePath)
  React.useEffect(() => api.subscribe(() => setPath(api.getState().activePath)), [])
  return path
}

/**
 * The active website (`{instanceId,url,title}`) published by the Web plugin, or
 * null when no browser tab is focused. A web tab has no vault file, so
 * `useActivePath()` is null while this is set — the panel keys off this instead.
 */
export function useActiveWebContext(): ActiveWebContext | null {
  const subscribe = React.useCallback(
    (listener: () => void) => api.interop.state.subscribe(WEB_ACTIVE_CONTEXT_V1, listener),
    []
  )
  const getSnapshot = React.useCallback(
    () => api.interop.state.get(WEB_ACTIVE_CONTEXT_V1),
    []
  )
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** Load all SideNotes and reload whenever any panel mutates the data file. */
export function useNotes(): {
  notes: SideNoteRecord[]
  setNotes: Dispatch<SetStateAction<SideNoteRecord[]>>
  loading: boolean
  error: string | null
  reload: () => void
} {
  const [notes, setNotes] = React.useState<SideNoteRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const active = React.useRef(false)
  const generation = React.useRef(0)
  const reload = React.useCallback(() => {
    if (!active.current) return
    const current = ++generation.current
    void loadNotes().then((next) => {
      if (!active.current || current !== generation.current) return
      setNotes(next)
      setError(null)
      setLoading(false)
    }).catch(() => {
      if (!active.current || current !== generation.current) return
      setError(uiText('sideNotes.error.load'))
      setLoading(false)
    })
  }, [])
  React.useEffect(() => {
    active.current = true
    reload()
    const unsubscribe = onChanged(reload)
    return () => { active.current = false; generation.current++; unsubscribe() }
  }, [reload])
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
