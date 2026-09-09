import { afterEach, describe, expect, it } from 'vitest'
import { createMockValleyApi } from '@valley/plugin-testkit'
import { injectStyles } from '../src/styles'
import { initRuntime } from '../src/runtime'
import { registerSideNotesFence } from '../src/fence'

afterEach(() => {
  document.head.querySelectorAll('style[id]').forEach((style) => style.remove())
  delete document.documentElement.dataset.theme
})

describe('stylesheet lifecycle', () => {
  it('injects, disposes, and re-registers once in every appearance mode', () => {
    for (const theme of ['dark', 'light', 'reading']) {
      document.documentElement.dataset.theme = theme
      for (let pass = 0; pass < 2; pass++) {
        const dispose = injectStyles()
        expect(document.querySelectorAll('#notes-sidenotes-styles')).toHaveLength(1)
        const css = document.getElementById('notes-sidenotes-styles')?.textContent ?? ''
        expect(css).toMatch(/\.sidenote-list > \.sidenote-card:last-child,[\s\S]*\.flagged-notes-list > \.flagged-note-card:last-child \{\s*box-shadow: inset 0 -1px 0 var\(--border-light\)/)
        expect(css).toMatch(/\.panel-body\.flagged-notes-panel-body \{\s*padding-left: 0;\s*padding-right: 0;/)
        const search = css.match(/\.sidenote-search-bar \{([^}]+)\}/)?.[1] ?? ''
        expect(search).toContain('width: calc(100% - 2 * var(--space-2));')
        expect(search).not.toMatch(/height:|padding:|border:|background:|outline:/)
        expect(css).not.toContain('.sidenote-search-input')
        dispose()
        expect(document.getElementById('notes-sidenotes-styles')).toBeNull()
      }
    }
  })

  it('owns the lazily injected fence stylesheet', () => {
    const mock = createMockValleyApi()
    initRuntime(mock.api)
    const dispose = registerSideNotesFence()
    expect(document.getElementById('notes-sidenotes-fence-styles')).toBeNull()
    mock.codeBlockRenderers.get('sidenotes')?.('', document.createElement('div'), { path: null, meta: null })
    expect(document.querySelectorAll('#notes-sidenotes-fence-styles')).toHaveLength(1)
    dispose()
    expect(document.getElementById('notes-sidenotes-fence-styles')).toBeNull()
  })
})
