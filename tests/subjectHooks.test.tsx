import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, renderHook } from '@testing-library/react'
import { createMockValleyApi } from '@valley/plugin-testkit'
import { WEB_ACTIVE_CONTEXT_V1 } from '@valley/plugin-sdk'
import { initRuntime } from '../src/runtime'
import { useActivePath, useActiveWebContext } from '../src/hooks'
import { noteRepository } from '../src/data'

const disposers: Array<() => void> = []
afterEach(() => { cleanup(); for (const dispose of disposers.splice(0)) dispose() })

function fixture(path = 'Ferns.md') {
  const mock = createMockValleyApi({ manifest: { id: 'sideNotes' }, activePath: path, vault: { path: '/fixture/a', name: 'Ferns', displayName: 'Ferns' } })
  initRuntime(mock.api)
  const reader = noteRepository()
  disposers.push(() => reader.dispose())
  const context = { instanceId: 'guest-a', url: 'https://example.com/ferns', title: 'Ferns' }
  const remove = mock.provideInterop(WEB_ACTIVE_CONTEXT_V1, context, 'browser')
  disposers.push(remove)
  const pathCallbacks: Array<() => void> = []
  const webCallbacks: Array<() => void> = []
  const pathDisposers: Array<ReturnType<typeof vi.fn>> = []
  const webDisposers: Array<ReturnType<typeof vi.fn>> = []
  const subscribe = mock.api.subscribe
  const webSubscribe = mock.api.interop.state.subscribe
  vi.spyOn(mock.api, 'subscribe').mockImplementation(listener => {
    pathCallbacks.push(listener)
    const off = subscribe(listener)
    const dispose = vi.fn(off)
    pathDisposers.push(dispose)
    return dispose
  })
  vi.spyOn(mock.api.interop.state, 'subscribe').mockImplementation((contract, listener) => {
    webCallbacks.push(listener)
    const off = webSubscribe(contract, listener)
    const dispose = vi.fn(off)
    webDisposers.push(dispose)
    return dispose
  })
  return { mock, reader, context, remove, pathCallbacks, webCallbacks, pathDisposers, webDisposers }
}

function useSubject() { return { path: useActivePath(), web: useActiveWebContext() } }

describe('captured subject hook lifetimes', () => {
  it('tracks same-session file, browser and provider-removal changes', () => {
    const f = fixture()
    const hook = renderHook(useSubject)
    expect(hook.result.current).toEqual({ path: 'Ferns.md', web: f.context })
    act(() => f.mock.emitState({ activePath: 'Moss.md' }))
    expect(hook.result.current.path).toBe('Moss.md')
    act(() => f.remove())
    expect(hook.result.current.web).toBeNull()
    const next = { instanceId: 'guest-b', url: 'https://example.com/moss', title: 'Moss' }
    act(() => { disposers.push(f.mock.provideInterop(WEB_ACTIVE_CONTEXT_V1, next, 'browser')) })
    expect(hook.result.current.web).toEqual(next)
  })

  it('holds the last snapshots and never reads or subscribes to a replacement API', () => {
    const f = fixture()
    const hook = renderHook(useSubject)
    act(() => f.mock.emitState({ activePath: 'Current.md' }))
    const previous = hook.result.current
    const replacement = createMockValleyApi({ activePath: 'Wrong.md' })
    const read = vi.spyOn(replacement.api, 'getState')
    const webRead = vi.spyOn(replacement.api.interop.state, 'get')
    const subscribe = vi.spyOn(replacement.api, 'subscribe')
    const webSubscribe = vi.spyOn(replacement.api.interop.state, 'subscribe')
    act(() => {
      initRuntime(replacement.api)
      for (const notify of [...f.pathCallbacks, ...f.webCallbacks]) notify()
    })
    hook.rerender()
    expect(hook.result.current).toEqual(previous)
    expect(hook.result.current.web).toBe(previous.web)
    expect(read).not.toHaveBeenCalled()
    expect(webRead).not.toHaveBeenCalled()
    expect(subscribe).not.toHaveBeenCalled()
    expect(webSubscribe).not.toHaveBeenCalled()
  })

  it('does not revive mounted hooks after A→B→A with the identical API object', () => {
    const f = fixture()
    const hook = renderHook(useSubject)
    const previous = hook.result.current
    act(() => {
      initRuntime(createMockValleyApi().api)
      initRuntime(f.mock.api)
      f.mock.emitState({ activePath: 'Late.md' })
      f.remove()
    })
    hook.rerender()
    expect(hook.result.current).toEqual(previous)
    expect(f.reader.isActive()).toBe(false)
  })

  it('holds snapshots through a same-API vault A→B→A and later browser notifications', () => {
    const f = fixture()
    const hook = renderHook(useSubject)
    const previous = hook.result.current
    act(() => {
      f.mock.emitState({ activePath: 'B.md', vault: { path: '/fixture/b', name: 'Moss', displayName: 'Moss' } })
      f.mock.emitState({ activePath: 'New-A.md', vault: { path: '/fixture/a', name: 'Ferns', displayName: 'Ferns' } })
      f.remove()
    })
    hook.rerender()
    expect(hook.result.current).toEqual(previous)
    expect(f.reader.isActive()).toBe(false)
  })

  it('cleans up only captured subscriptions and ignores callbacks delivered after unmount', () => {
    const f = fixture()
    const hook = renderHook(useSubject)
    expect(f.pathDisposers).toHaveLength(1)
    expect(f.webDisposers).toHaveLength(1)
    hook.unmount()
    const read = vi.spyOn(f.mock.api, 'getState')
    const webRead = vi.spyOn(f.mock.api.interop.state, 'get')
    for (const notify of [...f.pathCallbacks, ...f.webCallbacks]) notify()
    expect(read).not.toHaveBeenCalled()
    expect(webRead).not.toHaveBeenCalled()
    expect(f.pathDisposers[0]).toHaveBeenCalledTimes(1)
    expect(f.webDisposers[0]).toHaveBeenCalledTimes(1)
  })

  it('does not subscribe to either replacement source when revocation occurs before effects mount', () => {
    const f = fixture()
    const replacement = createMockValleyApi()
    const read = vi.spyOn(replacement.api, 'getState')
    const subscribe = vi.spyOn(replacement.api, 'subscribe')
    const webSubscribe = vi.spyOn(replacement.api.interop.state, 'subscribe')
    function Wrapper({ children }: { children: React.ReactNode }) {
      React.useLayoutEffect(() => { initRuntime(replacement.api) }, [])
      return <>{children}</>
    }
    const hook = renderHook(useSubject, { wrapper: Wrapper })
    expect(hook.result.current).toEqual({ path: 'Ferns.md', web: f.context })
    expect(read).not.toHaveBeenCalled()
    expect(subscribe).not.toHaveBeenCalled()
    expect(webSubscribe).not.toHaveBeenCalled()
    expect(f.pathDisposers).toHaveLength(0)
    expect(f.webDisposers).toHaveLength(0)
  })

  it('retains browser snapshot bytes even when a revoked provider mutates its old value', () => {
    const f = fixture()
    const hook = renderHook(useSubject)
    const previous = { ...hook.result.current.web! }
    act(() => {
      initRuntime(createMockValleyApi().api)
      f.context.title = 'Late mutation'
      f.context.url = 'https://example.com/late'
      for (const notify of f.webCallbacks) notify()
    })
    hook.rerender()
    expect(hook.result.current.web).toEqual(previous)
  })
})
