import { registerWorkflowCommands, type PluginBackendApi, type WorkflowCommandBinding, type WorkflowContributionContract } from '@valley/plugin-sdk'
import config from '../../config.json'

export const bindings: WorkflowCommandBinding[] = [
  {
    "nodeId": "sideNotes.list",
    "command": "sideNotes:list",
    "schemaFingerprint": "16d334797169288248f642063498a6b40b5e9341f2030bb85f3954407e17f0af",
    "effect": "read"
  },
  {
    "nodeId": "sideNotes.get",
    "command": "sideNotes:get",
    "schemaFingerprint": "e1da0da906b62be70b61cf650064d466eb54d12801ad8c39f32b711d14c5fd78",
    "effect": "read"
  },
  {
    "nodeId": "sideNotes.open",
    "command": "sideNotes:open",
    "schemaFingerprint": "e1da0da906b62be70b61cf650064d466eb54d12801ad8c39f32b711d14c5fd78",
    "effect": "read"
  },
  {
    "nodeId": "sideNotes.create",
    "command": "sideNotes:create",
    "schemaFingerprint": "a88dd8b7ef3acd748017b0dc3b3b509864351c04091c52edad83f8cdf84af56a",
    "effect": "write"
  },
  {
    "nodeId": "sideNotes.update",
    "command": "sideNotes:update",
    "schemaFingerprint": "be956e3c2ae9893c28950afbd489b7abfe03c6cda718705294330de4de99d4cc",
    "effect": "write"
  },
  {
    "nodeId": "sideNotes.delete",
    "command": "sideNotes:delete",
    "schemaFingerprint": "e1da0da906b62be70b61cf650064d466eb54d12801ad8c39f32b711d14c5fd78",
    "effect": "write"
  }
]

export function register(api: PluginBackendApi): () => void {
  const contribution = config.runtime.services.find(service => service.id === 'workflow.provider')!
  const registration = registerWorkflowCommands(api, contribution.metadata!.workflow as unknown as WorkflowContributionContract, bindings)
  return () => registration.dispose()
}
