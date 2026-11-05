# Outfitter + Customer journey · conversion pack

Drop this folder into a **new Claude Design project** that is linked to the **Bish's RV Design System**, then paste the prompt at the bottom.

## What's in this pack
| Path | What it is |
|---|---|
| `BRING-A-DESIGN-IN.md` | The process and the deliverable contract. Follow it exactly |
| `source/extract/*.json` | Rendered snapshots of the live portal (portal-staging.bishs.com): 149 states across 12 routes. Each one holds the DOM, about 95 computed styles per element, text, Lucide SVGs, images and the open overlays |
| `source/extract/screen-index.json` | Route → file → state count. Multipart routes need every part |
| `source/portal-modules.json` | Compiled page code for the whole portal. This build's screens: QueueBoard, MyTurn, WalkthroughScreen, OutfitterDiscoveryTab, DiscoveryRecap, DiscoveryPortalWrapper, OutfitterCases, MyStats, NotificationCenter, StubScreen, OutfitterWrapper |
| `source/portal-globals.css` | The live app's tokens and fonts (Tailwind utilities omitted) |
| `viewer/index.html` | Snapshot viewer: rebuilds any captured state, with an overlay picker. A visual reference only; not runnable |
| `viewer/catalog.json` | One row per state: width, label, overlay count, visible text |

## Components to use (design system, 2026-10-23)
Alerts → `PhaseAlert` · customer / kanban cards → `CustomerCard` · question screens → `QuestionCard` + `ChoiceChip` / `ChoiceGroup` · avatars → `Avatar` (ink on light, white on dark). Every component takes `theme="light" | "dark"`. Previews: the linked design system › Components.

## Routes in this pack
| # | Route | States | Widths | What it shows |
|---|---|---:|---|---|
| 01 | `/customer/discovery/7f4cb988…` | 10 | 1281 | Customer discovery questionnaire. 10 steps: RV type, lifestyle, climate, activities, current RV, tow vehicle, past RVs (liked or disliked), finance. |
| 06 | `/employee/outfitter/alerts` | 5 | 1013 / 1920 | Outfitter notifications: Assignments / Misses / Breaks / Shift filters, empty state, list. |
| 07 | `/employee/outfitter/cases/66` | 3 | 1920 | Read-only case discovery record. |
| 08 | `/employee/outfitter/cases` | 6 | 838 / 1920 | Outfitter case history table, desktop and 838px. |
| 09 | `/employee/outfitter/discovery/66` | 11 | 818 | Outfitter-run discovery, steps 1–10 at 818px. |
| 10 | `/employee/outfitter/discovery/69` | 14 | 556 / 930 / 1584 | Outfitter-run discovery, steps 1–10 at 930px, plus "Discovery complete" and 556px phone. |
| 11 | `/employee/outfitter/messenger` | 5 | 930 / 1900 / 1920 | Messenger stub ("Coming soon"). |
| 12 | `/employee/outfitter/my-turn` | 9 | 818 / 930 / 1920 | My Turn: assignment card (customer, phone, visits, looking for, wearing, location), Acknowledge check-in. |
| 13 | `/employee/outfitter/stats` | 5 | 1920 | My Stats: Today / Week / Month / 90 days. |
| 14 | `/employee/outfitter/walkthrough/30` | 28 | 628 / 708 / 780 | Walkthrough: unit cards, layout / photos / specs, "How did this one feel?" and "Why doesn’t this one work?" sheets (Pass / Maybe / Favorite + reasons), Winning Line-Up, financial position. |
| 15 | `/employee/outfitter/walkthrough/33` | 16 | 735 / 744 / 983 | Walkthrough, second case: assessment coverage (0/24), The Winner! ranking with pros and cons. |
| 16 | `/employee/outfitter` | 37 | 628 / 744 / 818 / 838 / 930 / 931 / 983 / 1327 / 1920 / 2649 | Outfitter home: queue board (on deck / up now / in hole), journey stepper (Discovery → MCP → Worksheet), Move to MCP / Worksheet, One-off customer experience (de-escalation script), deal card. 628–2649px. |

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
> - Deliver `outfitter-customer-dev-handoff.zip` per section 4 of `BRING-A-DESIGN-IN.md`.
> - Build name: `outfitter-customer` · Roles: Outfitter (primary), Customer (discovery portal) · Source: portal-staging.bishs.com, captured 2026-10-20 to 10-23
