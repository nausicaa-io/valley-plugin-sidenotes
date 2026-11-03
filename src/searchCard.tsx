import type { ValleyPluginApi, SearchResultAction } from '@valley/plugin-sdk'
import { SEARCH_RESULT_ACTION_V1 } from '@valley/plugin-sdk'
import type { SideNoteAnchor } from './types'

const str = (value: unknown): string => typeof value === 'string' ? value : ''

function navigablePath(value: unknown): string {
  const path = str(value).replace(/\\/g, '/').replace(/^\.\//, '')
  return path === '.valley' || path.startsWith('.valley/') ? '' : path
}

export function registerSearchCard(pluginApi: ValleyPluginApi): () => void {
  const card: SearchResultAction = {
    cardKind: 'sidenote',
    open: async (record, ctx) => {
      if (str(record.id) && !ctx.newTab) {
        await pluginApi.documents.open({ pluginId: pluginApi.pluginId, sourceId: 'notes', itemId: str(record.id) })
        return true
      }
      // A web note opens through the optional navigation service; a file note
      // opens at its anchor and reveals our own notes panel.
      const url = str(record.url)
      if (url) {
        void (ctx.newTab ? pluginApi.links.open(url, { newTab: true }) : pluginApi.links.open(url))
        return true
      }
      const path = navigablePath(record.path) || navigablePath(ctx.path)
      if (path) {
        const anchor = (
          record.anchor && typeof record.anchor === 'object' ? record.anchor : undefined
        ) as SideNoteAnchor | undefined
        pluginApi.workspace.openFile(
          path,
          anchor?.type === 'web-selection' ? undefined : anchor,
          { newTab: ctx.newTab }
        )
        pluginApi.workspace.revealOwnPanel('right_sidebar')
        return true
      }
      return false
    }
  }
  return pluginApi.interop.extensions.provide(SEARCH_RESULT_ACTION_V1, card)
}
