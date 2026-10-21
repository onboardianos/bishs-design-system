# WCAG AA Remediation — Change Log

> Applied June 2026. Source audit: `documents/wcag-audit.html`. All changes bring the Nexus
> design system to WCAG 2.2 Level AA for contrast, type size, and target size.

## `colors_and_type.css`

| Token / rule | Before | After | Reason |
|---|---|---|---|
| `--text-muted` | `#7A7D76` | `#A2A59C` | Failed 4.5:1 on card (3.4) & raised (3.0). Now ≥4.9:1 everywhere. |
| `--text-light-muted` | `#9C9C94` | `#767670` | Was 2.56:1 on light page. Now ≈4.6:1. |
| `--text-subtle` | `#4A4D46` | _(unchanged)_ | Documented as **disabled/decorative only** (sub-2.5:1). |
| `--semantic-*-text` (new) | — | `success #51CF66`, `warning #FFD43B`, `danger #FF8787`, `info #74C0FC` | On-dark status text tints for card/raised surfaces & tinted badges. _(Later folded into the base tokens — see below.)_ |
| `--border-input` / `--border-input-light` (new) | — | `rgba(255,255,255,0.30)` / `#949494` | Interactive control edges meet 3:1 (SC 1.4.11). |
| `--fs-label-sm` | `10px` | `11px` | Type floor — no persistent text below 11px. |
| `.overline` color | `--accent-gold` | `--accent-gold-hi` | Base gold fails on cards (3.16:1); gold-hi passes (5.42:1). |
| `a` | `text-decoration: none` | `text-decoration: underline` | Links were color-only (1.92:1 vs body, < 3:1, SC 1.4.1). |

## `ui_kits/portal-dark/` components

- **Button.jsx** — primary variant text `#FFFFFF → #020000` (black-on-gold passes rest 4.68:1 and hover 8.0:1; white failed both). Disabled text → `#A2A59C`.
- **Badge.jsx** — status text → on-dark tints (success `#51CF66`, warning `#FFD43B`, danger `#FF8787`, info `#74C0FC`, neutral `#A2A59C`); text size `10px → 11px`.
- **Input.jsx** — resting border `rgba(255,255,255,0.13) → rgba(255,255,255,0.30)` (perceptible field edge); helper/error text → `#A2A59C` / `#FF8787`.
- **Card.jsx** — subtitle, stat-tile neutral delta, and unit-row phase text → `#A2A59C`; stat-tile label → gold-hi `#B89E4A` at 11px; delta up/down → `#51CF66` / `#FF8787`.
- **Header.jsx** — eyebrow → gold-hi `#B89E4A` (base gold fails on the lighter end of the hero gradient); meta text → `#A2A59C`.
- **TabBar.jsx** — inactive tab color `#4A4D46 → #A2A59C` (was 2.4:1).
- **index.html** — demo eyebrows → gold-hi 11px; toast text → on-dark tints. Now consumes the compiled bundle.

## `preview/module-queue.html`
- Badge text `9.5px → 11px`; filter-chip padding raised so interactive chips clear the 24px target minimum (SC 2.5.8).

## Base semantic colors shifted (follow-up)
The base status tokens were shifted to the accessible dark-surface tones, and the separate `-text` tokens removed (now redundant):

| Token | Before | After |
|---|---|---|
| `--semantic-success` | `#2F9E44` | `#51CF66` |
| `--semantic-warning` | `#F59F00` | `#FFD43B` |
| `--semantic-danger` | `#E03131` | `#FF8787` |
| `--semantic-info` | `#1C7ED6` | `#74C0FC` |

The `-light` (tinted bg) and `-dark` (white-text fill / light-theme text) variants are unchanged. Base values now pass ≥4.5:1 as text on card/raised surfaces. Components already used these literal values, so no component change was needed. The danger solid button keeps `#E03131` (4.51:1 with white — passes).

## Not changed (by design)
- `--text-subtle`, `--border-ghost`, `--border-mid` retained for disabled states / decorative dividers (WCAG-exempt in those roles).
- `danger` solid button keeps white text (4.51:1 — passes).
- Base semantic colors retained — they read fine as text/icons on the page surface; the new `-text` tints cover card/raised use.
