import type { ValleyPluginApi } from '@valley/plugin-sdk'
import type { SideNoteRecord } from './types'

/**
 * Module-global handles to the host's React instance and plugin API, set once in
 * `register(api)` before any view renders. Components import these instead of
 * bundling their own `react` (which would break the single-React guarantee) or
 * threading `api` through props. JSX in this plugin compiles to
 * `React.createElement` (classic transform), resolving to this binding.
 */
export let React!: typeof import('react')
export let api!: ValleyPluginApi

export function initRuntime(a: ValleyPluginApi): void {
  api = a
  React = a.React
}

export function sideNoteEditStore(): {
  get(): SideNoteRecord | null
  publish(note: SideNoteRecord | null): void
  subscribe(listener: () => void): () => void
} {
  return api.runtime.getOrCreate('sideNotes.editRequest', () => {
    let current: SideNoteRecord | null = null
    const listeners = new Set<() => void>()
    return {
      get: () => current,
      publish: (note: SideNoteRecord | null) => { current = note; for (const listener of listeners) listener() },
      subscribe: (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } }
    }
  })
}

export type SideNoteSelectionDraft =
  | { kind: 'file'; path: string; page: number; snippet: string }
  | { kind: 'web'; url: string; snippet: string }

interface SelectionDraftStore {
  value: SideNoteSelectionDraft | null
  listeners: Set<() => void>
  get(): SideNoteSelectionDraft | null
  publish(value: SideNoteSelectionDraft): void
  consume(value: SideNoteSelectionDraft): void
  subscribe(listener: () => void): () => void
}

export function selectionDraftStore(): SelectionDraftStore {
  return api.runtime.getOrCreate('sideNotes.selectionDraft', () => {
    const store: SelectionDraftStore = {
      value: null,
      listeners: new Set(),
      get: () => store.value,
      publish: (value) => {
        store.value = value
        for (const listener of [...store.listeners]) listener()
      },
      consume: (value) => {
        if (store.value !== value) return
        store.value = null
        for (const listener of [...store.listeners]) listener()
      },
      subscribe: (listener) => {
        store.listeners.add(listener)
        return () => store.listeners.delete(listener)
      }
    }
    return store
  })
}
