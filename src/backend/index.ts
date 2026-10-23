import { registerWorkflowCommands, type PluginBackendApi, type WorkflowCommandBinding, type WorkflowContributionContract } from '@valley/plugin-sdk'
import config from '../../config.json'

export const bindings: WorkflowCommandBinding[] = [
  {
    "nodeId": "sideNotes.list",
    "command": "sideNotes:list",
    "schemaFingerprint": "a8624df76ae3a9f6025754973684e480d385c4a4510e3121ab8f98dde5a304b8",
    "effect": "read"
  },
  {
    "nodeId": "sideNotes.get",
    "command": "sideNotes:get",
    "schemaFingerprint": "df4576d39c267cd08ab1bfc868c76499c27685c6ded23ebd41251e240d8aa91a",
    "effect": "read"
  },
  {
    "nodeId": "sideNotes.open",
    "command": "sideNotes:open",
    "schemaFingerprint": "2caf50f894d380aeb24aa74754f2801f1ee58e906c1a7d69f79198f5b3623cf4",
    "effect": "execute"
  },
  {
    "nodeId": "sideNotes.create",
    "command": "sideNotes:create",
    "schemaFingerprint": "cebb75302c0c15f34329964c6659d8539c5c05c57107241b3b69cf726af728a0",
    "effect": "write"
  },
  {
    "nodeId": "sideNotes.update",
    "command": "sideNotes:update",
    "schemaFingerprint": "05e51e8df57507654ba37e96716b7998edfeecddf43001b80615a67d5ce6d1e8",
    "effect": "write"
  },
  {
    "nodeId": "sideNotes.delete",
    "command": "sideNotes:delete",
    "schemaFingerprint": "df4576d39c267cd08ab1bfc868c76499c27685c6ded23ebd41251e240d8aa91a",
    "effect": "write"
  }
]

export function register(api: PluginBackendApi): () => void {
  const contribution = config.runtime.services.find(service => service.id === 'workflow.provider')!
  const registration = registerWorkflowCommands(api, contribution.metadata!.workflow as unknown as WorkflowContributionContract, bindings)
  return () => registration.dispose()
}
