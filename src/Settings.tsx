import type { ReactElement } from 'react'
import { React, api } from './runtime'
import { uiText } from './localization'

export const DEFAULT_FILTER_TYPES = ['.md', '.mp3', '.mp4', '.pdf']

export function normalizeFilterType(raw: string): string {
  const value = raw.trim().toLowerCase()
  if (!value) return ''
  return value.startsWith('.') ? value : `.${value}`
}

function validFilterType(value: string): boolean {
  return /^\.[^./\\\s]+$/.test(value)
}

export function filterTypesSetting(value: unknown): string[] {
  const source = Array.isArray(value) ? value : DEFAULT_FILTER_TYPES
  const normalized = source.flatMap((entry) => {
    if (typeof entry !== 'string') return []
    const extension = normalizeFilterType(entry)
    return validFilterType(extension) ? [extension] : []
  })
  return [...new Set(normalized)]
}

export const Settings = (): ReactElement => {
  const [settings, setSettings] = React.useState<Record<string, unknown>>(() => api.settings.get())

  React.useEffect(() => api.settings.subscribe(() => setSettings(api.settings.get())), [])

  const mediaRangeSeconds = typeof settings.mediaRangeSeconds === 'number'
    ? settings.mediaRangeSeconds
    : 10
  const filterTypes = filterTypesSetting(settings.filterTypes)
  const { ChipsField, NumberField, Row, Section } = api.ui.settings

  const save = (key: string, value: unknown): void => {
    setSettings((current) => ({ ...current, [key]: value }))
    void api.settings.set(key, value)
  }

  return (
    <Section>
      <Row
        title={uiText('plugin.sideNotes.field.awareRange')}
        description={uiText('auto.204e47f6d7a2')}
      >
        <NumberField
          value={mediaRangeSeconds}
          step={1}
          ariaLabel={uiText('plugin.sideNotes.field.awareRange')}
          onChange={(value) => {
            if (value != null) setSettings((current) => ({ ...current, mediaRangeSeconds: value }))
          }}
          onCommit={(value) => {
            if (value != null) save('mediaRangeSeconds', value)
          }}
        />
      </Row>
      <Row
        className="sidenotes-filter-types-row"
        title={uiText('plugin.sideNotes.field.filterTypes')}
        description={uiText('plugin.sideNotes.field.filterTypesDesc')}
      >
        <ChipsField
          className="sidenotes-filter-types-editor"
          items={filterTypes}
          onChange={(items) => save('filterTypes', filterTypesSetting(items))}
          normalize={normalizeFilterType}
          validate={(value) => validFilterType(value)}
          placeholder=".png"
          ariaLabel={uiText('plugin.sideNotes.field.filterTypes')}
          commitOn={['enter', 'comma', 'space', 'blur']}
          reorderable
        />
      </Row>
    </Section>
  )
}
