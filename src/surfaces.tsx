import { PLUGIN_SURFACE_V1, type PluginSurfaceSnapshot, type ValleyPluginApi } from '@valley/plugin-sdk'
import type { SlotId } from '@valley/plugin-sdk/types'
import type { PluginLinkState } from '@valley/plugin-sdk/paths'
import { React, api } from './runtime'
import { loadNotes, onChanged } from './data'
import { openSideNoteSubject, requireSideNote } from './commands'
import type { SideNoteRecord } from './types'
import { uiText } from './localization'

interface SurfaceState {
  views: Map<SlotId, PluginLinkState>
  selected: Map<SlotId, SideNoteRecord>
  listeners: Set<() => void>
}

function state(): SurfaceState {
  return api.runtime.getOrCreate('sideNotes.surfaces', () => ({ views: new Map(), selected: new Map(), listeners: new Set() }))
}

function notify(): void { for (const listener of state().listeners) listener() }
function subscribe(listener: () => void): () => void {
  const listeners = state().listeners
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
function view(surface: SlotId): PluginLinkState { return { v: 1, search: '', filterWarning: false, ...(surface === 'left_sidebar' ? { showAll: false, compact: false, sourceType: 'all', sortField: 'updated', sortDir: 'desc' } : { sortField: 'position', sortDir: 'asc', aware: false, path: '', url: '' }), ...state().views.get(surface) } }

export function useSideNoteViewField<T extends string | boolean>(surface: SlotId, field: string, fallback: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const read = (): T => (view(surface)[field] ?? fallback) as T
  const value = React.useSyncExternalStore(subscribe, read, read)
  return [value, (next) => {
    state().views.set(surface, { ...view(surface), [field]: typeof next === 'function' ? (next as (previous: T) => T)(read()) : next })
    notify()
  }]
}

export function selectSideNote(note: SideNoteRecord | null, surface: SlotId): void {
  if (note) state().selected.set(surface, note)
  else state().selected.delete(surface)
  notify()
}

export function useSideNoteSubject(path: string, url: string): void {
  React.useEffect(() => {
    const previous = view('right_sidebar')
    if (previous.path === path && previous.url === url) return
    state().views.set('right_sidebar', { ...previous, path, url })
    const selected = state().selected.get('right_sidebar')
    if (selected && (selected.path !== path || (selected.url ?? '') !== url)) state().selected.delete('right_sidebar')
    notify()
  }, [path, url])
}

function snapshot(surface: SlotId): PluginSurfaceSnapshot {
  const selected = state().selected.get(surface)
  const current = view(surface)
  return { title: uiText('plugin.sideNotes.name'), view: current, ...(selected ? { item: { id: selected.id, title: selected.note.split('\n')[0].slice(0, 100), state: { ...current, noteId: selected.id } } } : {}) }
}

export function registerSideNoteSurfaces(pluginApi: ValleyPluginApi): () => void {
  const surfaces = ['left_sidebar', 'right_sidebar'] as const
  const offs = surfaces.map((surface) => pluginApi.interop.extensions.provide(PLUGIN_SURFACE_V1, {
    id: `sideNotes.${surface}`, surface, getSnapshot: () => snapshot(surface), subscribe,
    restore: async (raw, _instanceId, options) => {
      if (raw.v !== 1) throw new Error('Unsupported SideNotes bookmark.')
      const note = typeof raw.noteId === 'string' ? await requireSideNote(raw.noteId) : null
      if (surface === 'right_sidebar' && !note && typeof raw.path === 'string' && raw.path && !(await pluginApi.vault.fileInfo(raw.path))) throw new Error('The bookmarked file no longer exists.')
      if (note && !note.url && !(await pluginApi.vault.fileInfo(note.path))) throw new Error('The bookmarked file no longer exists.')
      if (!options?.background && note) await openSideNoteSubject(pluginApi, note)
      else if (!options?.background && surface === 'right_sidebar' && (typeof raw.path === 'string' && raw.path || typeof raw.url === 'string' && raw.url)) await openSideNoteSubject(pluginApi, { path: typeof raw.path === 'string' ? raw.path : '', url: typeof raw.url === 'string' ? raw.url : undefined, anchor: { type: 'none' } })
      const restored: PluginLinkState = { v: 1 }
      for (const field of ['search', 'path', 'url', 'sourceType']) if (typeof raw[field] === 'string') restored[field] = raw[field]
      for (const field of ['showAll', 'compact', 'filterWarning', 'aware']) restored[field] = raw[field] === true
      restored.sortField = ['position', 'updated', 'created', 'title'].includes(String(raw.sortField)) ? raw.sortField! : surface === 'left_sidebar' ? 'updated' : 'position'
      restored.sortDir = raw.sortDir === 'desc' ? 'desc' : 'asc'
      state().views.set(surface, restored)
      selectSideNote(note, surface)
    }
  }))
  let disposed = false
  offs.push(onChanged(() => {
    void loadNotes().then((notes) => {
      if (disposed) return
      for (const [surface, selected] of state().selected) {
        const next = notes.find((note) => note.id === selected.id)
        if (next) state().selected.set(surface, next)
        else state().selected.delete(surface)
      }
      notify()
    }).catch(() => { if (!disposed) notify() })
  }))
  return () => { disposed = true; offs.forEach((off) => off()) }
}
