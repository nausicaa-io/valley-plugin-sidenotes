import fs from 'node:fs'
import path from 'node:path'

export async function verify(context) {
  const { evaluate, say, vault, scratch } = context
  const scratchRoot = fs.realpathSync(scratch)
  const lexicalRelative = path.relative(path.resolve(scratch), path.resolve(vault))
  if (!lexicalRelative || lexicalRelative.startsWith('..') || path.isAbsolute(lexicalRelative)) throw new Error('The vault must be inside the disposable scratch directory')
  const sentinel = JSON.parse(fs.readFileSync(path.join(scratchRoot, '.valley-test-run.json'), 'utf8'))
  const vaultRoot = fs.realpathSync(vault)
  const relative = path.relative(scratchRoot, vaultRoot)
  if (sentinel.version !== 1 || !/^[a-z0-9][a-z0-9-]*$/.test(sentinel.kind ?? '') || !relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('This workflow requires a disposable vault inside a sentinel-protected scratch run')
  }
  const liveVault = await evaluate(`(async () => (await window.valley.getVault())?.path ?? null)()`, true)
  if (typeof liveVault !== 'string' || (path.resolve(liveVault) !== path.resolve(vault) && path.resolve(liveVault) !== vaultRoot)) throw new Error('This workflow refuses to drive a different live vault')
  await context.proofInsertRows(evaluate, context.session, 'sideNotes.notes', context.count, (index) => ({
    id: `proof-sidenote-${index}`,
    path: `Proof/Note-${index}.md`,
    note: `Biodiversity packaged proof needle-${index}`,
    flagged: false,
    anchor: { kind: 'file', path: `Proof/Note-${index}.md` },
    createdAt: context.iso,
    updatedAt: context.iso
  }), say)
}
