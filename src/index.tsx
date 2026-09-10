/**
 * SideNotes — path-specific notes and tasks as a fully disk-loaded plugin. All
 * data flows through the plugin-owned durable SQLite database; navigation, file reads, and
 * rename/line-shift events use the generic plugin API, so no SideNotes-specific
 * code remains in the host.
 *
 * Two views: `sideNotes.panel` (right_sidebar, per-file) and `sideNotes.flagged`
 * (left_sidebar, cross-file flagged browser).
 */
import type {
  TextSelectionAction,
  TextSelectionDetail,
  ValleyPluginApi,
  ValleyPluginModule
} from '@valley/plugin-sdk'
import { TEXT_SELECTION_ACTION_V1 } from '@valley/plugin-sdk'
import { classifyFilePath } from '@valley/plugin-sdk/fileTypes'
import { initRuntime, selectionDraftStore } from './runtime'
import { retargetNotes, shiftLines } from './data'
import { registerSideNotesFence } from './fence'
import { registerSearchCard } from './searchCard'
import { buildSelectionPrefill, extractFromSelection } from './highlights'
import { Panel } from './Panel'
import { FlaggedPanel } from './FlaggedPanel'
import { Settings } from './Settings'
import { initLocalization } from './localization'
import { injectStyles } from './styles'
import { registerSideNoteCommands } from './commands'
import { registerSideNoteSurfaces } from './surfaces'

export function register(api: ValleyPluginApi): () => void {
  initLocalization(api)
  initRuntime(api)
  const disposeStyles = injectStyles()
  const offCommands = registerSideNoteCommands(api)
  const offSurfaces = registerSideNoteSurfaces(api)

  // Retarget anchors when a file is renamed or moved, and shift line anchors on edits.
  const offRenamed = api.files.onRenamed(({ oldPath, newPath }) => {
    void retargetNotes(oldPath, newPath)
  })
  const offLineShift = api.files.onLineShift(({ path, fromLine, delta }) => {
    void shiftLines(path, fromLine, delta)
  })

  const drafts = selectionDraftStore()
  const capture = async (detail: TextSelectionDetail | null): Promise<void> => {
    if (!detail) return
    if (detail.surface === 'web') {
      if (!detail.url || !detail.text.trim()) return
      drafts.publish({ kind: 'web', url: detail.url, snippet: detail.text.trim().slice(0, 200) })
    } else {
      if (!detail.path || !detail.page) return
      const pageText = await api.workspace.getPdfPageText(detail.path, detail.page).catch(() => null)
      const prefill = buildSelectionPrefill({ path: detail.path, page: detail.page, text: detail.text }, pageText)
      if (!prefill) return
      drafts.publish(prefill)
    }
    await api.workspace.revealOwnPanel('right_sidebar')
  }
  const offSelection = api.interop.extensions.provide(TEXT_SELECTION_ACTION_V1, {
    id: 'sideNotes.create',
    labelKey: 'auto.94fd67ed6c0c',
    label: 'Create SideNote from selection',
    surfaces: ['pdf', 'web'],
    run: capture
  } satisfies TextSelectionAction)

  const offHighlightCmd = api.commands.register({
    id: 'highlight-selection',
    label: 'Create SideNote from selection', labelKey: 'auto.94fd67ed6c0c',
    hotkey: 'Mod-Shift-h',
    sideEffect: 'read',
    run: () => {
      const path = api.getState().activePath
      const detail = path && classifyFilePath(path) === 'pdf' ? extractFromSelection(path, api.workspace.getTextSelection()) : null
      if (detail) void capture({ surface: 'pdf', ...detail })
      return undefined
    }
  })

  api.registerView('sideNotes.panel', Panel)
  api.registerView('sideNotes.flagged', FlaggedPanel)
  api.registerView('sideNotes.settings', Settings)

  const offFence = registerSideNotesFence()
  // We own how our hits look and behave in vault-wide search.
  const offSearchCard = registerSearchCard(api)

  return () => {
    offRenamed()
    offCommands()
    offSurfaces()
    offLineShift()
    offSelection()
    offHighlightCmd()
    offFence()
    offSearchCard()
    disposeStyles()
  }
}

const plugin: ValleyPluginModule = { register }
export default plugin
