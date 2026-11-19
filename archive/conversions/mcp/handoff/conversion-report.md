# MCP · Conversion report

## Pass 1 · Inventory (12 Figma frames → 13 states)
| Figma frame | State id |
|---|---|
| MCP v2 · 1920 · Empty (0 placed) | `empty` |
| MCP v2 · 1920 · Filters panel | `filters` |
| MCP v2 · 1920 · AI shortlist | `shortlist` |
| MCP v2 · 1920 · 1 selected | `one-selected` |
| MCP v2 · 1920 · 1 placed | `one-placed` |
| MCP v2 · 1920 · Dragging (drop target) | `dragging` |
| MCP v2 · 1920 · Picks placed | `picks-placed` |
| MCP v2 · 1920 · Selected view / view-1 | `selected-view` |
| MCP v2 · Unit detail dialog / + overlay | `unit-detail` |
| MCP v2 · 1440 | `collapsed` + 1440 artboards |
| (added) drag alternative | `place-menu`, `slot-menu` |
| (added) after commit | `sent` |

## Pass 2 · Map to the system
- Source header (logo · Floor / Bullpen tabs · store picker · clock · avatar) → **AppShell** (`activeId: floor`). Not hand-built.
- Kit components used by the file → Nexus: Button (outline / ghost / secondary / gold) → `mc-btn` quiet / action / commit; Badge → `mc-tag`, `mc-badge`; Input → `mc-input` / `mc-field`; Avatar → AppShell profile + new **Avatar** DS component (`ui_kits/portal-dark/Avatar.jsx`).
- `img/travel_trailer.png` was missing in the file (`.missing`); uses the RV art already in `conversions/floor-workspace/photos/`.

## Pass 3 · Restructure
- Three columns (Situation · Results · 3 + 1) are one fluid screen: ≥1240 px canvas width = three columns; 900–1239 = results + 3 + 1, situation in a left sheet; < 900 = results only, 3 + 1 in a sheet with a docked commit.
- Deal inputs collapse to a one-line summary under 640 px (RF07).
- Every drag has a stamped alternative: **Place** on an empty slot, **⋮ › Move up / Move down / Remove** on a filled slot.

## Pass 4 · Re-skin to canon (gold rule)
| Source | Converted |
|---|---|
| Gold-filled active tab ("All results · 39", "Selected · 4", "AI shortlist") | Ink pill tab |
| Gold "Filters 4" count, "4/4" badge, slot numbers | Ink badge / olive overline |
| Gold "In slot N" tags | Neutral tag |
| Gold gradient Compare & send | Flat COMMIT: gold-hi rest, gold hover, near-black text |
| Gold-outlined "Discovery · 13 answers" | ACTION (gold outline) — kept |
| Gold avatar (ZM) | AppShell profile avatar (ink) |

## Pass 5 · Fluid
Container-driven layout; no device forks; 44 px targets throughout; table becomes stacked cards under 820 px.

## Pass 6 · Stamp and wire
Sections S03 (workspace), S10 situation, S11 brief, S12 deal inputs, S13 results, S14 3 + 1, S15 dock, S99 action bar. One COMMIT per frame: `btn-commit-compare-and-send` (or `-dock` at narrow widths).

## Canon changes from this conversion
- New DS component **Avatar** (kit family) — ink default, gold for the signed-in user.
- Primary button hover flipped (rest gold-hi → hover gold) — logged in `documents/CHANGES-wcag.md`.
