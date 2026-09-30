import type { ValleyPluginApi } from '@valley/plugin-sdk'
import { api, runtimeGeneration } from './runtime'

const MAX_ACTIVE = 4
const MAX_QUEUED = 32
const MAX_ENTRIES = 32
const MAX_BYTES = 8 * 1024 * 1024

interface ReadTask {
  owner: AnchorReads
  read: () => Promise<string | null>
  resolve: (value: string | null) => void
  reject: (error: unknown) => void
}

interface ReadQueue { active: number; tasks: ReadTask[] }
const queues = new WeakMap<ValleyPluginApi, ReadQueue>()

function pump(queue: ReadQueue): void {
  while (queue.active < MAX_ACTIVE && queue.tasks.length) {
    const task = queue.tasks.shift()!
    queue.active++
    void task.read().then(task.resolve, task.reject).finally(() => { queue.active--; pump(queue) })
  }
}

export class AnchorReadCancelled extends Error {
  constructor() { super('SideNotes anchor reader is no longer active') }
}

export class AnchorReads {
  private readonly generation: number
  private readonly root: string | null
  private disposed = false
  private unsubscribe = (): void => {}
  private readonly queue: ReadQueue
  private bytes = 0
  private cache = new Map<string, { value: string | null; bytes: number }>()
  private pending = new Map<string, Promise<string | null>>()

  constructor(private readonly owner: ValleyPluginApi = api) {
    this.generation = runtimeGeneration
    this.root = owner.getState().vault?.path ?? null
    this.queue = queues.get(owner) ?? { active: 0, tasks: [] }
    queues.set(owner, this.queue)
    this.unsubscribe = owner.subscribe(() => { if (!this.isActive()) this.dispose() })
  }

  isActive(): boolean {
    if (this.disposed || this.owner !== api || this.generation !== runtimeGeneration) return false
    try { return (this.owner.getState().vault?.path ?? null) === this.root } catch { return false }
  }

  assertActive(): void { if (!this.isActive()) throw new AnchorReadCancelled() }

  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    this.unsubscribe()
    this.cache.clear()
    this.bytes = 0
    this.queue.tasks = this.queue.tasks.filter(task => {
      if (task.owner !== this) return true
      task.reject(new AnchorReadCancelled())
      return false
    })
    this.pending.clear()
  }

  file(path: string): Promise<string | null> {
    return this.request(JSON.stringify(['file', path]), () => this.owner.vault.readFile(path))
  }

  page(path: string, page: number): Promise<string | null> {
    return this.request(JSON.stringify(['page', path, page]), () => this.owner.workspace.getPdfPageText(path, page))
  }

  pageCount(path: string): number | null {
    this.assertActive()
    const value = this.owner.workspace.getPdfPageCount(path)
    this.assertActive()
    return value
  }

  mediaDuration(): number | null {
    this.assertActive()
    const value = this.owner.workspace.getMediaDuration()
    this.assertActive()
    return value
  }

  private request(key: string, read: ReadTask['read']): Promise<string | null> {
    if (!this.isActive()) return Promise.reject(new AnchorReadCancelled())
    const cached = this.cache.get(key)
    if (cached) {
      this.cache.delete(key)
      this.cache.set(key, cached)
      return Promise.resolve(cached.value)
    }
    const pending = this.pending.get(key)
    if (pending) return pending
    if (this.queue.active >= MAX_ACTIVE && this.queue.tasks.length >= MAX_QUEUED) return Promise.reject(new Error('Too many SideNotes anchor reads'))
    let task!: ReadTask
    const run = async (): Promise<string | null> => {
      this.assertActive()
      const value = await read()
      this.assertActive()
      const bytes = 2 * (key.length + (value?.length ?? 0))
      if (bytes <= MAX_BYTES) {
        while (this.cache.size >= MAX_ENTRIES || this.bytes + bytes > MAX_BYTES) {
          const [oldKey, entry] = this.cache.entries().next().value!
          this.cache.delete(oldKey)
          this.bytes -= entry.bytes
        }
        this.cache.set(key, { value, bytes })
        this.bytes += bytes
      }
      return value
    }
    const promise = new Promise<string | null>((resolve, reject) => { task = { owner: this, read: run, resolve, reject } })
    this.pending.set(key, promise)
    const clear = (): void => { if (this.pending.get(key) === promise) this.pending.delete(key) }
    void promise.then(clear, clear)
    this.queue.tasks.push(task)
    pump(this.queue)
    return promise
  }
}
