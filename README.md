# SideNotes

Keep margin notes alongside the material you are reading. Anchor a note to a file, heading, line, PDF selection, web page, or media position.

## Features

- Write notes in the sidebar while keeping the source in view.
- Add flags and tags to find related notes again.
- Browse flagged notes and search your SideNotes through Valley.
- Keep note anchors associated with files as their paths change.
- Use Aware mode to show notes near the current audio or video position.

## Install

Open **Settings → Plugins → GitHub**, click **+**, and enter:

`https://github.com/nausicaa-io/valley-plugin-sidenotes`

Review the repository and plugin details, select **main**, and click **Install**. The repository includes the compiled plugin; installation does not require Git or npm.

## Use

Open **SideNotes** in the right sidebar while viewing a file. Add a note for the current context, then use flags and tags to organize it. The left sidebar provides a browser for flagged notes. Adjust file filters and the Aware time range in **Settings → SideNotes**.

## Your data

Notes, tags, and path history are stored in the vault's plugin data. Updating the plugin, changing its branch, or removing its installation preserves those records and your settings.

## Requirements and updates

Requires Valley desktop 0.1.0 or later and plugin API v5. Check for updates from the GitHub plugin detail page. Branch changes and updates are applied only when you choose them.

## SideNotes for websites

A web tab is a `main_workspace` plugin tab with **no vault file**, so the host's
`activePath` is null while a site is focused. Surfing and SideNotes interact only
through optional versioned contracts; either plugin works normally without the
other.

- **Active Web context.** `Page.tsx` publishes the focused tab's
  `{instanceId,url,title}` through **`web.activeContext@1`** on mount / URL /
  title change; the host clears the owner-attributed state on unload
  (order-safe — a clear only fires if the instance still owns the context). Only the
  active tab per pane mounts, so the published context tracks the focused site.
  SideNotes reads it (`useActiveWebContext`) and, when no file is open, keys its
  notes off the **normalized URL** (exact page; fragment stripped, host lowercased,
  query kept) with the `web-selection` anchor.
- **Selection capture.** The address-bar's note button reads the guest's current
  text selection and lists compatible **`selection.textAction@1`** extensions for
  the Web surface. SideNotes provides one action shared with the PDF selection
  popover, keeps the draft in its own runtime store, and reveals its own panel.
  With no provider the affordance is a harmless no-op.

Clicking a Web note navigates through **`web.navigator@1`**. SideNotes never names
Surfing or reaches into its source, commands or state.

## Surface conventions

- **A `white-space: nowrap` chip in a shrinking flex item needs `overflow: hidden` + `text-overflow: ellipsis`** — shrinking the box does not clip the text, so SideNotes' left-panel anchor pill drew straight over the card buttons beside it while the right panel's identical badge (which had the clip) was fine.
- Flat To-Do and SideNotes sidebar lists keep separators between rows and beneath the final row. SideNotes flagged-note rows are full-bleed: the panel body has no horizontal padding, while the card keeps its content padding so normal separators and hover fills reach both panel edges.
- Files auto-reveal uses the exact same crosshair geometry as SideNotes Aware mode. In the right SideNotes header, sorting precedes Create so Create remains the final action.

## Development

Use Node 24.19.0 and npm 11.17.0. Run `npm ci` and `npm run check` in this directory. The package owns its dependencies, tests, localization, and vendored SDK/tool/testkit archives; no Valley app checkout is required. `npm run check` validates imports, types, tests, and builds `runtime/index.js`. Commit rebuilt runtime files with source changes.

The package owns `locales/en.json`, `de.json`, `es.json`, `fr.json`, and `zh-CN.json`. Identity translations use `manifest.name` and `manifest.description`, including while disabled; fallback stays within the package’s English catalog. Authors and their URLs are paired arrays.
