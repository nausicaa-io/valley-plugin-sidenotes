import { React } from './runtime'
import type { ReactElement, ReactNode } from 'react'

/**
 * Inline SVG icons. The plugin can't use `react-icons` — bundling it would pull
 * in a second React and break the single-instance guarantee — so these are
 * hand-rolled Lucide-style glyphs drawn with the host's React.
 */
type IconProps = { className?: string; title?: string }

const Svg = (props: IconProps & { children: ReactNode }): ReactElement =>
  React.createElement(
    'svg',
    {
      className: props.className,
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true
    },
    props.title ? <title>{props.title}</title> : null,
    props.children
  )

export const StickyNote = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l7-7V5a2 2 0 0 0-2-2Z" />
    <path d="M15 21v-5a2 2 0 0 1 2-2h5" />
  </Svg>
)

export const Plus = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
)

export const Globe = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </Svg>
)

export const Search = (p: IconProps): ReactElement => (
  <Svg {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Svg>
)

export const Filter = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M3 4h18l-7 8v6l-4 2v-8Z" /></Svg>
)

export const X = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M18 6 6 18M6 6l12 12" /></Svg>
)

export const Flag = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z" />
    <path d="M4 22v-7" />
  </Svg>
)

export const Ellipsis = (p: IconProps): ReactElement => (
  <Svg {...p}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></Svg>
)

export const Pencil = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></Svg>
)

export const Trash = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></Svg>
)

export const Check = (p: IconProps): ReactElement => (
  <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>
)

export const Rows3 = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <rect width="18" height="4" x="3" y="2" rx="1" />
    <rect width="18" height="4" x="3" y="10" rx="1" />
    <rect width="18" height="4" x="3" y="18" rx="1" />
  </Svg>
)

export const Crosshair = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    <circle cx="12" cy="12" r="2" />
  </Svg>
)

export const TriangleAlert = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </Svg>
)

export const SortAscending = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M3 6h11M3 12h8M3 18h5" />
    <path d="m17 15 3 3 3-3M20 6v12" />
  </Svg>
)

export const SortDescending = (p: IconProps): ReactElement => (
  <Svg {...p}>
    <path d="M3 6h5M3 12h8M3 18h11" />
    <path d="m17 9 3-3 3 3M20 6v12" />
  </Svg>
)
