# Decisions — 2026-10-21

Ratified by Zach from `documents/decision-board-gold-and-spec-v2.html`.

| # | Decision | Pick | Resulting rule |
|---|---|---|---|
| A · D1 | Active nav colour | **(b) split** | Current nav item uses `--accent-gold-lo` for text, icon, and indicator bar. Never a nav fill. Inactive items use `--text-light-muted` (#767670) on light, `--text-muted` (#A2A59C) on dark. |
| B | "Up next" hero fill | **(b) strict** | No gold card/surface fills. High-salience cards = ink fill (`--brand-black`) + 4px `--accent-gold-hi` accent edge; timers use the warning token. |
| C | Avatar fill | **(c) ink** | Avatars fill with ink (`--text-light-primary` #0A0A09 on light, `--surface-raised` on dark) + white initials. No gold on avatars. |
| D2 | Section type `nav` | **ratified** | `nav` joins the fixed section types; shell side panel, drawer, and mobile tab bar are `data-bos-type="nav"`. No COMMIT inside a nav section. |
| D3 | ID prefix | **(a) class as prefix** | `data-spec-id = <class>-<slug>` for interactive elements (`btn-commit-check-in`, `btn-action-assign#jacksons`, `nav-floor`, `info-menu-customer#jacksons`). Breakpoint and grid are attributes, never in the ID. |
| D4 | Manifest scope | **per build** | One `<build>.manifest.json` per build; IDs scoped `SCREEN::id`. |

## The gold rule (canonical)
Gold has exactly three legal jobs:
1. **COMMIT fill** — `--accent-gold`, near-black text, ≤1 per screen
2. **ACTION outline** — gold border, gold-lo text
3. **Gold-lo wayfinding** — current nav item's text, icon, indicator bar only

Anything else gold is a lint failure. Brand marks (logos, Wayfinder) are assets, not UI, and are exempt.

## Assets added
- `assets/logo-bishs-os.png` — BISHS›OS wordmark, for light surfaces (416×191, transparent)
- `assets/logo-bishs-os-white.png` — same, black recoloured to white, for dark surfaces

| E | Action overlay contents | **per role, admin-configured** | Overlay pills, terminal action and phase arc are switched on per role in Admin › Roles & Navigation, same as nav buttons. |
| F | Nav ownership | **global catalog + per-role toggles** | Admins can add nav buttons and actions, then assign them to roles. Mobile: two role slots left of Action; Alerts + Messenger fixed. |

## Built
- `ui_kits/app-shell/` — AppShell, ActionOverlay, NavConfig, RolesNavAdmin (card: Navigation › App Shell)
- `assets/icon-action-tap.svg` — mobile Action glyph (Figma)

## Still open
- None.

_Correction logged 2026-10-21: C was first recorded as (b) gold-lo; Zach's corrected pick is (c) ink._
