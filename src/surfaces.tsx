import { PLUGIN_SURFACE_V1, type PluginSurfaceSnapshot, type ValleyPluginApi } from '@valley/plugin-sdk'
import type { SlotId } from '@valley/plugin-sdk/types'
import type { PluginLinkState } from '@valley/plugin-sdk/paths'
import { React, api } from './runtime'
import { captureNoteMutation, noteRepository } from './data'
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

function notify(owner = state()): void { for (const listener of owner.listeners) listener() }
function subscribe(listener: () => void, owner = state()): () => void {
  const listeners = owner.listeners
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
function view(surface: SlotId, owner = state()): PluginLinkState { return { v: 1, search: '', filterWarning: false, ...(surface === 'left_sidebar' ? { showAll: false, compact: false, sourceType: 'all', sortField: 'updated', sortDir: 'desc' } : { sortField: 'position', sortDir: 'asc', aware: false, path: '', url: '' }), ...owner.views.get(surface) } }

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

function snapshot(surface: SlotId, owner = state()): PluginSurfaceSnapshot {
  const selected = owner.selected.get(surface)
  const current = view(surface, owner)
  return { title: uiText('manifest.name'), view: current, ...(selected ? { item: { id: selected.id, title: selected.note.split('\n')[0].slice(0, 100), state: { ...current, noteId: selected.id } } } : {}) }
}

export function registerSideNoteSurfaces(pluginApi: ValleyPluginApi): () => void {
  const ownedState = state()
  const reader = noteRepository()
  let disposed = false
  const assertActive = (): void => { if (disposed || !reader.isActive()) throw new Error('SideNotes surface is no longer active') }
  const mutation = captureNoteMutation(pluginApi, assertActive)
  const restoreGenerations = new Map<SlotId, number>()
  const surfaces = ['left_sidebar', 'right_sidebar'] as const
  const offs = surfaces.map((surface) => pluginApi.interop.extensions.provide(PLUGIN_SURFACE_V1, {
    id: `sideNotes.${surface}`, surface, getSnapshot: () => snapshot(surface, ownedState), subscribe: (listener) => subscribe(listener, ownedState),
    restore: async (raw, _instanceId, options) => {
      assertActive()
      raw = { ...raw }
      const background = options?.background === true
      const generation = (restoreGenerations.get(surface) ?? 0) + 1
      restoreGenerations.set(surface, generation)
      const assertRestore = (): void => {
        assertActive()
        if (restoreGenerations.get(surface) !== generation) throw new Error('SideNotes surface restore was replaced')
      }
      if (raw.v !== 1) throw new Error('Unsupported SideNotes bookmark.')
      const note = typeof raw.noteId === 'string' ? await requireSideNote(raw.noteId, mutation) : null
      assertRestore()
      const fileExists = async (path: string): Promise<boolean> => {
        const info = await pluginApi.vault.fileInfo(path)
        assertRestore()
        return !!info
      }
      if (surface === 'right_sidebar' && !note && typeof raw.path === 'string' && raw.path && !(await fileExists(raw.path))) throw new Error('The bookmarked file no longer exists.')
      if (note && !note.url && !(await fileExists(note.path))) throw new Error('The bookmarked file no longer exists.')
      if (!background && note) await openSideNoteSubject(pluginApi, note, assertRestore)
      else if (!background && surface === 'right_sidebar' && (typeof raw.path === 'string' && raw.path || typeof raw.url === 'string' && raw.url)) await openSideNoteSubject(pluginApi, { path: typeof raw.path === 'string' ? raw.path : '', url: typeof raw.url === 'string' ? raw.url : undefined, anchor: { type: 'none' } }, assertRestore)
      assertRestore()
      const restored: PluginLinkState = { v: 1 }
      for (const field of ['search', 'path', 'url', 'sourceType']) if (typeof raw[field] === 'string') restored[field] = raw[field]
      for (const field of ['showAll', 'compact', 'filterWarning', 'aware']) restored[field] = raw[field] === true
      restored.sortField = ['position', 'updated', 'created', 'title'].includes(String(raw.sortField)) ? raw.sortField! : surface === 'left_sidebar' ? 'updated' : 'position'
      restored.sortDir = raw.sortDir === 'desc' ? 'desc' : 'asc'
      ownedState.views.set(surface, restored)
      if (note) ownedState.selected.set(surface, note)
      else ownedState.selected.delete(surface)
      notify(ownedState)
    }
  }))
  let refreshGeneration = 0
  offs.push(reader.subscribe(() => {
    if (disposed || !reader.isActive()) return
    const generation = ++refreshGeneration
    const selection = [...ownedState.selected]
    if (!selection.length) return
    void reader.load({ kind: 'ids', ids: selection.map(([, note]) => note.id) }).then((notes) => {
      if (disposed || !reader.isActive() || generation !== refreshGeneration) return
      for (const [surface, selected] of selection) {
        if (ownedState.selected.get(surface) !== selected) continue
        const next = notes.find((note) => note.id === selected.id)
        if (next) ownedState.selected.set(surface, next)
        else ownedState.selected.delete(surface)
      }
      for (const listener of ownedState.listeners) listener()
    }).catch(() => { if (!disposed && reader.isActive() && generation === refreshGeneration) for (const listener of ownedState.listeners) listener() })
  }))
  return () => { disposed = true; offs.forEach((off) => off()) }
}
