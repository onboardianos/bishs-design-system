# Design extract catalogue · portal-staging.bishs.com

Captured 2026-10-20 to 10-23 · **203 states across 16 routes** · source: `design-extract (9).zip`.

**How to view:** open `tools/extract-viewer/index.html`, pick a file and a snapshot, then pick a captured overlay (popover, dialog or sheet) to lay on top. The viewer rebuilds each snapshot from its recorded DOM and computed styles, so it's a faithful reference of what rendered. It isn't a working app.

**What each snapshot contains:** the full element tree with position, about 95 computed CSS properties per element, Tailwind classes, ARIA attributes, the text, the Lucide SVGs, image URLs, every open overlay ("portals") with its own styles, and a component inventory with shadcn variants.

**Not captured:** server data beyond what was on screen, behaviour between states, and anything not clicked during capture.

| # | Route | States | Widths | What it shows |
|---|---|---:|---|---|
| 01 | `/customer/discovery/7f4cb988…` | 10 | 1281 | Customer discovery questionnaire. 10 steps: RV type, lifestyle, climate, activities, current RV, tow vehicle, past RVs (liked or disliked), finance. |
| 02 | `/employee/floor` | 31 | 1281 / 1920 / 2133 | Manager Floor (the live Floor Workspace): floor rotation strip (Up now / Pending ack with countdown / Benched), Today’s Schedule, deliveries, New Check-in. 1281 / 1920 / 2133 widths. |
| 03 | `/employee/manager/mcp/37` | 3 | 1920 | MCP tool: Customer Situation rail (Story / Filters), financial position, inventory, store popover. 40 captured overlays. |
| 04 | `/employee/manager/mcp/45` | 19 | 2133 | MCP tool, main capture: filter bar (stock #, unit type, condition, year, make, axles, slides), Your 3 + 1 slots, inventory table, shortlist weighting, AI shortlist. |
| 05 | `/employee/manager/mcp/47` | 1 | 2133 | MCP tool, review state: 4/4 picks filled, tow vehicle and payload, MCP Complete. |
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

## Conversion candidates (suggested order)
1. **MCP tool** (routes 03–05, 23 states, built by `McpWrapper`). Self-contained, manager-only, and the one you flagged.
2. **Outfitter home + My Turn + Walkthrough** (routes 12, 14–16, 90 states). This is the outfitter's mobile-first journey.
3. **Discovery** (customer route 01 + outfitter routes 09–10). One questionnaire with two postures.
4. **Floor**: compare against the existing `conversions/floor-workspace/` and record the changes in the live product as decisions.
5. Alerts, Cases, Stats and Messenger: small screens, which can be done in one batch.

## Token notes (from `portal-globals.css`)
- The live app still uses the pre-WCAG `--text-muted: #7a7d76`. The conversion maps it to `#A2A59C`.
- Undocumented token families: `--dash-*`, `--sidebar-*`, `--phase-*` (one per phase, with light and chip variants), `--state-*` (rotation states: available / upnow / pending / paused / benched / offsite, with stripes), `--z-*`. Pass 2 decides whether each becomes a DS token or maps to an existing one.
- Fonts match the canon: Bebas Neue, Barlow Condensed, Source Sans 3, JetBrains Mono. Geist is loaded but appears unused.
