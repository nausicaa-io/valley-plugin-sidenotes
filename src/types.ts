import type { JumpAnchor } from '@valley/plugin-sdk/types'

/**
 * A SideNote's anchor — the generic core jump anchors, plus `web-selection` (a
 * text snippet highlighted on a web page). The web variant is kept local to this
 * plugin: web notes navigate through the `web:open` command, never
 * `workspace.openFile`, so the shared `JumpAnchor` union (and the host's
 * anchor-handling) stays untouched.
 */
export type SideNoteAnchor = Exclude<JumpAnchor, { type: 'dataset-record' }> | { type: 'web-selection'; snippet: string }
export type AnchorType = SideNoteAnchor['type']

export interface SideNoteFileKey {
  dev: number
  ino: number
}

/**
 * One SideNote record assembled from the plugin-owned relational datasets.
 *
 * A note's *subject* is either a vault file (`path` set, `url` absent) or a web
 * page (`url` set — the normalized page URL — with `path: ''`). File-only fields
 * (`pathHistory`, `fileKey`) stay empty/absent for web notes.
 */
export interface SideNoteRecord {
  id: string
  path: string
  /** Normalized page URL for a web note; absent for a file note. */
  url?: string
  pathHistory: string[]
  note: string
  flagged?: boolean
  tags: string[]
  anchor: SideNoteAnchor
  fileKey?: SideNoteFileKey
  createdAt: string
  updatedAt: string
}
