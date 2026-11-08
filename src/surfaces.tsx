import { provideBookmarkSurface, type PluginSurfaceSnapshot, type ValleyPluginApi } from '@valley/plugin-sdk'
import type { SlotId } from '@valley/plugin-sdk/types'
import type { PluginLinkState } from '@valley/plugin-sdk/paths'
import { React, api } from './runtime'
import { captureNoteMutation, noteRepository } from './data'
import { openSideNoteSubject, requireSideNote } from './commands'
import type { SideNoteRecord } from './types'
import { uiText } from './localization'
import type { InteropValueSchema } from '@valley/plugin-sdk'

const bookmarkStateSchema = {
  "type": "object",
  "properties": {
    "v": {
      "type": "literal",
      "value": 1
    },
    "search": {
      "type": "string"
    },
    "filterWarning": {
      "type": "boolean"
    },
    "showAll": {
      "type": "boolean"
    },
    "compact": {
      "type": "boolean"
    },
    "sourceType": {
      "type": "string"
    },
    "sortField": {
      "type": "string"
    },
    "sortDir": {
      "type": "union",
      "anyOf": [
        {
          "type": "literal",
          "value": "asc"
        },
        {
          "type": "literal",
          "value": "desc"
        }
      ]
    },
    "aware": {
      "type": "boolean"
    },
    "path": {
      "type": "string"
    },
    "url": {
      "type": "string"
    },
    "noteId": {
      "type": "string"
    }
  },
  "required": [
    "v",
    "search",
    "filterWarning",
    "sortField",
    "sortDir"
  ],
  "additionalProperties": false
} satisfies InteropValueSchema



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
    const owner = state()
    const previous = view('right_sidebar', owner)
    if (previous.path === path && previous.url === url) return
    const entry = owner.views.get('right_sidebar')
    const subject = { ...previous, path, url }
    owner.views.set('right_sidebar', subject)
    const selected = owner.selected.get('right_sidebar')
    const dropped = selected && (selected.path !== path || (selected.url ?? '') !== url) ? selected : undefined
    if (dropped) owner.selected.delete('right_sidebar')
    notify(owner)
    // The inverse when the Panel unmounts or re-subjects: give back the subject (and the selection it dropped) this effect
    // replaced, unless something re-subjected the surface since; view fields edited meanwhile are kept.
    return () => {
      const current = owner.views.get('right_sidebar')
      if (!current || current.path !== path || current.url !== url) return
      if (current === subject && !entry) owner.views.delete('right_sidebar')
      else if (current === subject) owner.views.set('right_sidebar', entry!)
      else {
        const restored = { ...current }
        delete restored.path
        delete restored.url
        if (entry && 'path' in entry) restored.path = entry.path
        if (entry && 'url' in entry) restored.url = entry.url
        owner.views.set('right_sidebar', restored)
      }
      const back = view('right_sidebar', owner)
      const selection = owner.selected.get('right_sidebar')
      if (!selection || selection.path !== back.path || (selection.url ?? '') !== back.url) {
        if (dropped) owner.selected.set('right_sidebar', dropped)
        else owner.selected.delete('right_sidebar')
      }
      notify(owner)
    }
  }, [path, url])
}

function snapshot(surface: SlotId, owner = state()): PluginSurfaceSnapshot {
  const selected = owner.selected.get(surface)
  const current = { ...view(surface, owner) }
  if (!current.path) delete current.path
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
  const offs = surfaces.map((surface) => provideBookmarkSurface(pluginApi, {
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
        const info = await pluginApi.realm.fileInfo(path)
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
  }, { stateSchema: bookmarkStateSchema, itemStateSchema: { ...bookmarkStateSchema, required: [...bookmarkStateSchema.required, "noteId"] }, description: (snapshot, item) => typeof snapshot.view.path === 'string' && snapshot.view.path ? snapshot.view.path : uiText(item ? 'bookmark.item' : 'bookmark.view') }))
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
