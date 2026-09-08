import type { ValleyPluginApi } from '@valley/plugin-sdk'
import { generatedCatalogs } from './generatedCatalogs'

const catalogs = generatedCatalogs

function english(key: string, params?: Parameters<ValleyPluginApi['ui']['t']>[1]): string {
  const fallback = (catalogs.en as Record<string, string>)[key] ?? key
  return fallback.replace(/\{\{([^}]+)\}\}/g, (_match: string, name: string) => String(params?.[name] ?? ''))
}

let translate: ValleyPluginApi['ui']['t'] = english

export function initLocalization(api: ValleyPluginApi): void {
  translate = (key, params) => {
    const value = api.ui.t(key, params)
    return value === key ? english(key, params) : value
  }
  api.ui.registerCatalogs(catalogs)
}

export function uiText(key: string, params?: Parameters<ValleyPluginApi['ui']['t']>[1]): string {
  return translate(key, params)
}
