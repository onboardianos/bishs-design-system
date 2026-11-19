# Self-check — reference

The self-check measures a rendered page against this release and reports a score, blockers and the gates a person still has to prove. This file is the only full description of it; other files point here. When this file and `selfcheck.js` disagree, the code is what runs; fix this file.

## 1 · Run it
| Where | How |
|---|---|
| **All widths (use this to ship)** | Serve the package folder (`npx serve`), open `selfcheck/index.html`, enter the page path relative to `selfcheck/`, press **Run self-check**. It measures at 1440 · 1024 · 834 · 640 · 390 · 360px, then an approximate 200% text pass at 1440 |
| **One page, one width** | Add `<script src="<ds>/selfcheck/selfcheck.js"></script>` and open the page with `?selfcheck=1`. A panel opens 1.5s after load |
| **From code or the console** | `BishSelfCheck.run({ root, width, singleSurface })` returns the report. `BishSelfCheck.panel(report)` shows it. `BishSelfCheck.markdown(report)` returns qa-gates markdown |
| **Is the package complete?** | `selfcheck/index.html` › **Check package**. Compares the folder with `release/files.json` and checks that the versions agree (§7) |

Tick **Single-surface asset** (or pass `singleSurface: true`) for one-off assets, boards and documents that don't mount in AppShell. It switches off the AppShell rules only.

The self-check sees only what's on screen. Open each overlay, drawer, step and role posture and run it again, or the multi-width harness will only judge the default state.

## 2 · Pass, fail and the score
- **Pass** = right material (§3.1) **and** zero errors in every category. Warnings don't fail the build; fix each one or record it in `decisions.md`.
- **Category score** starts at 100. Each distinct error rule costs 15, plus 1 per repeat up to 10 more (so one rule costs at most 25). Each distinct warning rule costs 4. The floor is 0.
- **Overall score** is the plain average of the eight scored categories: tokens, gold, type, spacing, icons, AppShell, responsiveness and stamping. *Right material* and *Six data states* are not averaged.
- **Wrong material** fails the build and caps the overall score at 40, whatever else passes.
- **Multi-width runs** keep each category's worst score and the width it happened at, and merge findings across widths. The 200% pass contributes only fit findings, as warnings.
- The categories match the scored reviews in `reviews/`. A reviewer may weight blockers more heavily; the self-check doesn't.

## 3 · What it checks
Colour matches allow a small tolerance per RGB channel, shown as ±n.

### 3.1 Right material
| Rule | Severity |
|---|---|
| `window.BishSRVDesignSystem_*` exists and has all 21 components in `COMPONENTS.md` | error |
| `--ds-version` equals this release; `--text-muted` `#A2A59C`, `--accent-gold` `#8B752E`, `--accent-gold-hi` `#B89E4A`, `--accent-gold-lo` `#5E4F1F`, `--semantic-danger` `#FF8787`, `--border-input-light` `#949494` all match exactly | error |
| Bebas Neue, Barlow Condensed and Source Sans 3 are loaded | warn |

### 3.2 Tokens and colours, WCAG AA (G5)
| Rule | Severity |
|---|---|
| A fill (≥50% opaque) not within ±6 of a palette token | error |
| A text colour (≥50% opaque) not within ±6 of a palette token | error |
| Text contrast under 4.5:1, or under 3:1 for large text (≥24px, or ≥18.66px at weight 700). Alpha is composited over the real background | error |
| A border (≥20% opaque) not within ±8 of a palette token | warn |
| A heritage marketing accent (red, yellow, light blue, legacy blue) used as a UI fill | warn |
| `--text-subtle` used for text that isn't disabled | warn |

The palette is every hex in `colors_and_type.css` plus pure black.

### 3.3 Gold rule (G6)
| Rule | Severity |
|---|---|
| Gold fill (`#8B752E` / `#B89E4A`, ±8) on anything that isn't a control | error |
| Gold fill on a control that isn't the COMMIT (`data-bos-class="commit"` or an ID starting `btn-commit`) | error |
| More than one gold COMMIT fill in one frame or dialog | error |
| Gold-lo as fill or text outside the current nav item (`aria-current`, `aria-selected="true"`, `data-current="true"`) | error |
| Cream as a fill | error |

### 3.4 Typography
| Rule | Severity |
|---|---|
| The first family in the stack isn't Bebas Neue, Barlow Condensed, Source Sans 3 or JetBrains Mono | error |
| Text under 10px | error |
| Text under 11px, unless uppercase at weight ≥600 (the named overline exception) | error |
| Reading text (`p`, `li`, `dd`, `td`, `blockquote`, over 40 characters) under 14px | warn |
| Letter-spacing over 6px | warn |

### 3.5 Spacing
Padding, top and bottom margins, and gaps are sampled on every visible block.
| Rule | Severity |
|---|---|
| An odd whole-pixel value over 2px (5, 7, 9…) | warn |
| More than 10% of sampled values are odd | error |

Even values off the 4px scale (6, 10, 14) pass, because components and type metrics use them legitimately.

### 3.6 Icons, Lucide only (G7)
| Rule | Severity |
|---|---|
| An SVG up to 48×48 that isn't Lucide. Lucide means class `lucide`, a `data-lucide` attribute, or `viewBox="0 0 24 24"` with `fill="none"` and round line caps | error |
| A single text glyph used as an icon (▸ ▾ ▼ ▲ ► ◄ ‣ › » ✓ ✔ ✕ ✖ × ★ ☆ → ← ↑ ↓ ⌄ ⌃ +) | error |
| Emoji in UI text | error |
| An icon-font or other icon-library class (Material, Font Awesome, Bootstrap Icons, Phosphor, Heroicons, Glyphicons) | error |

### 3.7 AppShell and NavConfig (G1)
| Rule | Severity |
|---|---|
| No `frame-app-shell` on the page | error |
| A full-width `<header>` at the top of the page outside AppShell | error |
| `<main>` inside `<main>`. Mount screen content in a `<section>` | error |
| Another `<nav>` or navigation landmark outside AppShell | warn |

### 3.8 Responsiveness, RF01–RF12 (G3, partly)
| Rule | Severity |
|---|---|
| The page scrolls sideways at this width | error |
| A canvas, section, frame, `<main>` or `<form>` is wider than its container without its own scroll region | error |
| The AppShell canvas or `<main>` scrolls sideways | error |
| A target smaller than 44×44px at ≤1023px, or 28×28px above. Inline links inside `p` and `li` are exempt | error |
| No container queries anywhere on the page (RF05) | warn |
| The COMMIT is outside the viewport at this width (keep it in the S99 action bar) | warn |

### 3.9 Stamping, spec-ready v2 (G2)
Runs `SpecLint.run()`. If SpecLint isn't loaded, it falls back to "every interactive element has a `data-spec-id`" and warns.
| Rule | Severity |
|---|---|
| An unstamped interactive element (the report suggests an ID) | error |
| A duplicate ID in one frame, an invalid ID, more than one `data-bos-class="commit"` in a frame, or a nested layer | error |
| An ID ending in `-<number>`, which looks index-derived | warn |
| An ID containing a price or count pattern (`81-995`), which is derived from live data | warn |
| An instance key of one or two digits (`#3`), which looks like an index | warn |

### 3.10 Six data states (G8)
Not machine-checkable. Listed as *manual* and not scored. Prove it in `state-map.md`, or on the flow board (`templates/flow-board/`), which reports G8 from `flow.json`.

## 4 · Exemptions
| Skipped | How |
|---|---|
| Hidden content | `aria-hidden="true"`, `hidden`, `inert`, `display:none`, `visibility:hidden`, opacity ≤5%, zero size |
| The self-check's own UI | anything inside `[data-bos-selfcheck]` |
| Logos and brand marks (icon rule) | `[data-bos-brand]`, or an `aria-label` / class containing logo, bish, wayfinder or hexagon |
| The mobile Action tap-hand (icon rule) | wrap it in `[data-bos-icon-exception]` |
| Disabled controls (contrast and subtle text) | `[disabled]`, `[aria-disabled="true"]` |
| Stamping | `[data-spec-lint-ignore]` is honoured by SpecLint |
| Shapes inside an SVG | only the `<svg>` element itself is checked |

Don't add an exemption to make a check pass. An exemption is only for something the rule doesn't cover.

## 5 · Known limits
- **Visible state only.** Closed overlays, other roles and other steps aren't checked until you open them.
- **Up to 6,000 elements** per run. Larger pages are truncated.
- **Contrast** skips text over a background image or gradient, and ignores ancestor opacity, filters and blend modes.
- **The 200% pass is approximate.** It doubles the root font size, which only scales rem-based type. Real browser zoom (G4) is still a manual gate.
- **Six widths are a sample.** The drag test (G3) is still a manual gate.
- **Stable-ID checks are heuristics.** A runtime ID that looks stable passes. Review IDs against the v2 lifecycle rule.
- **The harness needs one origin.** Serve the package; `file://` and cross-origin pages can't be measured. The harness waits for a stamped element, then about a second, so very slow pages may need a second run.
- **It doesn't judge intent:** hierarchy, copy, the 27 design laws, privacy firewalls, or whether the right component was chosen. That's the reviewer's job.

## 6 · Reading a failure
| Finding | Usual fix |
|---|---|
| Off-token fill or text | Replace the hex with the nearest `var(--…)`. Never add a new hex |
| Contrast below AA | On dark, use `--text-muted` (`#A2A59C`) or brighter. On light, `--text-light-secondary` or darker |
| Gold fill on a non-control / non-COMMIT | Selection becomes ink with a check; a card becomes ink with a gold edge; a secondary action becomes a gold outline |
| Gold-lo as text | Use `--accent-gold-hi` for an overline, ink or white for data |
| Non-brand font | A component got a raw `font-family`, or a fallback rendered. Use `var(--font-*)` |
| Text glyph as icon | Replace with Lucide: `chevron-right`, `chevron-down`, `check`, `x`, `arrow-down` |
| Not mounted in AppShell | Wrap the screen in `AppShell`. Delete the hand-built header and nav |
| Target under 44px | Use the DS control. Increase padding, not just the font size |
| Wider than container | Remove fixed widths and min-widths; give wide tables their own scroll region |
| Unstamped / duplicate | Pass `specId` or `instance` with a stable domain key. Never use an index |
| Wrong material | Point `ds-base.js` at the right folder, or replace the copy with the current release |

## 7 · Versions
The release version lives in four places, and the self-check compares them:
1. `VERSION`
2. `--ds-version` in `colors_and_type.css`
3. `VERSION` at the top of `selfcheck/selfcheck.js`
4. `version` in `release/release.json`

Bump all four together, add a `CHANGELOG.md` entry, then rebuild the release (`release/README.md`).

## 8 · What goes in the handoff
1. Download `qa-gates.selfcheck.md` from the harness and merge it into `<build>/handoff/qa-gates.md`.
2. Tick each manual gate it lists with evidence: G3 drag test, G4 real 200% zoom, G8 data states, G9 Canvas ⇄ Prototype, G10 requirement rows, G11 roles, G12 ticket sources, and "the screen never writes nav itself".
3. Put the overall score and the SpecLint coverage line in the handoff `README.md`.
