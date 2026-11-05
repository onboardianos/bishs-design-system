# MCP tool · conversion pack

Drop this folder into a **new Claude Design project** that is linked to the **Bish's RV Design System**, then paste the prompt at the bottom.

## What's in this pack
| Path | What it is |
|---|---|
| `BRING-A-DESIGN-IN.md` | The process and the deliverable contract. Follow it exactly |
| `source/extract/*.json` | Rendered snapshots of the live portal (portal-staging.bishs.com): 23 states across 3 routes. Each one holds the DOM, about 95 computed styles per element, text, Lucide SVGs, images and the open overlays |
| `source/extract/screen-index.json` | Route → file → state count. Multipart routes need every part |
| `source/portal-modules.json` | Compiled page code for the whole portal. This build's screens: McpWrapper (module 994642) |
| `source/portal-globals.css` | The live app's tokens and fonts (Tailwind utilities omitted) |
| `viewer/index.html` | Snapshot viewer: rebuilds any captured state, with an overlay picker. A visual reference only; not runnable |
| `viewer/catalog.json` | One row per state: width, label, overlay count, visible text |

## Components to use (design system, 2026-10-23)
Alerts → `PhaseAlert` · customer / kanban cards → `CustomerCard` · question screens → `QuestionCard` + `ChoiceChip` / `ChoiceGroup` · avatars → `Avatar` (ink on light, white on dark). Every component takes `theme="light" | "dark"`. Previews: the linked design system › Components.

## Routes in this pack
| # | Route | States | Widths | What it shows |
|---|---|---:|---|---|
| 03 | `/employee/manager/mcp/37` | 3 | 1920 | MCP tool: Customer Situation rail (Story / Filters), financial position, inventory, store popover. 40 captured overlays. |
| 04 | `/employee/manager/mcp/45` | 19 | 2133 | MCP tool, main capture: filter bar (stock #, unit type, condition, year, make, axles, slides), Your 3 + 1 slots, inventory table, shortlist weighting, AI shortlist. |
| 05 | `/employee/manager/mcp/47` | 1 | 2133 | MCP tool, review state: 4/4 picks filled, tow vehicle and payload, MCP Complete. |

## Known facts to carry into the intake
- The live app uses the pre-WCAG `--text-muted: #7a7d76`. Map it to `#A2A59C`.
- Undocumented token families appear in the source: `--phase-*`, `--state-*` (rotation), `--dash-*`, `--sidebar-*`, `--z-*`. Pass 2 decides whether each maps to a DS token or is proposed as a new one.
- Most screens load their data from the server. What's on screen in the captures is real staging data, while empty, loading and error states only exist where they were captured. Log the missing ones as gaps; never invent them.

## After the inventory
Delete `source/extract/` from the project once pass 1 is recorded in `conversion-report.md`, to keep the project small. GitHub or this zip keeps the originals.

## Prompt to paste
> Convert this design into the Bish's RV design system by following `BRING-A-DESIGN-IN.md` and the linked design system's `documents/design-intake-to-handoff.md`.
> - **Source:** `source/extract/` (rendered snapshots: use these for fidelity), `source/portal-modules.json` (behaviour and copy) and `source/portal-globals.css` (tokens). Open `viewer/index.html` to see any state.
> - Start with business intake. Invent no rules: log every unknown as an open question marked `needs-rule`.
> - Inventory **every** captured state and overlay listed in `viewer/catalog.json`.
> - Keep the original layouts of cards, overlays and sheets. Re-skin them; don't redesign them.
> - Build in the Canvas ⇄ Prototype shell inside AppShell, fluid and stamped, with SpecLint at 100%.
> - Deliver `mcp-tool-dev-handoff.zip` per section 4 of `BRING-A-DESIGN-IN.md`.
> - Build name: `mcp-tool` · Roles: Sales manager (primary), Desk manager · Source: portal-staging.bishs.com, captured 2026-10-20 to 10-23
