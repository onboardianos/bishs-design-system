# Bish's RV — Nexus Design System

> **@nexus/design-system · v1.0 · April 2026**
> The single source of truth for Bish's RV digital products. This system combines the 2022 Bish's RV Brand Guidelines (identity layer) with the Nexus product design system (product layer) — a shadcn/Radix/Tailwind/CVA stack with a Material 3 behavioral overlay.

---

## Brand context

Bish's RV is a multi-location RV dealership network. The brand identity is **rugged, heritage-leaning, and confident** — black + gold as the primary palette, dark green as a surface color, cream as the warm text tone. The tagline **"Where Memories Begin"** anchors everything.

Nexus is the **product-layer** system that powers Bish's internal tools: dealer ops, inventory/desking, protection operations (BPOP), pipeline management, fleet tracking, and customer-facing portals. It is dark-first for task-focused admin tools and offers a parallel light theme for surfaces that need it.

**Two products/surfaces are represented:**
1. **Internal Tools / Portal** (dark theme) — dealer ops dashboards, inventory, BPOP protection-ops, pipelines
2. **Light Admin / Data-heavy Tools** (light theme) — the same system re-skinned for long-session data-dense contexts

---

## Sources

The materials that informed this system — the reader may or may not have access:

- **Design System Assets & Materials** (local mount: `Design-System-Assets-&-Materials-Tokens/`)
  - `nexus-design-system-tokens.md` — canonical token reference
  - `nexus-design-system-assets.html` — live HTML asset library (CSS-variable tokens)
  - `nexus-design-system.jsx` — React interactive reference (all component variants)
  - `design-systems-research-v2.html` — research doc justifying stack choices
- **Brand Analysis** (local mount: `Updated Brand Analysis & Improvement/`)
  - `brand_vs_nexus_comparison_light.html` — comparison between the 2022 brand guide and Nexus, with reconciliation recommendations
- **Logo kit** (uploaded) — 16 PNG variations (Black, Gold, White × Tagline variants); also provided in `.eps` + `.ai` masters. See `assets/`.

No Figma link was provided. No production codebase was attached. All UI recreation is inferred from the token docs + the JSX reference.

---

## Index

```
README.md                     ← you are here
SKILL.md                      ← Agent Skill manifest (Claude Code-compatible)
colors_and_type.css           ← CSS vars for all tokens + semantic element styles
assets/                       ← logos (16 variations, all PNG)
preview/                      ← design-system cards (registered for the DS tab)
ui_kits/
  portal-dark/                ← dark-theme portal UI kit (React JSX)
    README.md
    index.html                ← interactive demo
    *.jsx                     ← component files
```

---

## Content fundamentals

**Voice.** The 2022 brand guide describes the Bish's voice as **"Irreverent & Nostalgic"** — warm, direct, a little punchy, never corporate. Within Nexus product surfaces this translates to: **plain-spoken, imperative UI copy**; no exclamation points; no "please" softening; confident button verbs ("Continue", "Approve", "Send to Lender") rather than hedged ones ("Click here to...", "You may proceed...").

**Casing.** Headlines and display type are **UPPERCASE** (Bebas Neue is uppercase-only; Barlow Condensed labels are uppercased with tight letter-spacing). Body copy is **sentence case**. Titles in cards are **Title Case** when rendered in Bebas Neue (which displays as uppercase regardless).

**Pronouns.** "You" for the user. "We" is reserved for team-internal contexts (release notes, admin copy). Never "users" or "customers" in UI — be specific ("the sales rep", "the buyer", "the technician").

**Tone examples** (the kind of copy this system expects):
- ✅ "4 tasks remaining in Phase 3 — Interior Inspection."
- ✅ "Lender response expected in 24 hours."
- ✅ "Unit #4821-B · 2024 Winnebago Vista · Class A"
- ✅ "Send to Lender" (button)
- ✅ "Protection ops · 67% complete"
- ❌ "Hey there! Just a quick heads-up..." (too chatty)
- ❌ "Please click continue to proceed with your next step." (over-polite, passive)
- ❌ "🎉 Nice work!" (emoji — not in brand voice)

**Emoji.** **Never** in UI. The brand is stencil letterforms + gold rules + heritage palette — emoji reads as off-brand. Status is carried by **semantic color + badge text**, not emoji.

**Unicode glyphs.** Acceptable in small doses: `▸` (section bullet), `—` em-dash as the primary internal separator, `·` middle-dot for inline metadata separators ("Unit #4821 · Class A · Phase 3"). `→` only when literally indicating direction.

**Numbers, units, IDs.** Always monospaced (`JetBrains Mono`) when standalone or in tables. Never abbreviate VIN, stock number, unit number. Use gold (`--accent-gold-hi`) for IDs that are clickable.

---

## Visual foundations

### Colors
Six-color brand palette: **Black, Dark Green, Gold, Cream, Olive, White**. Role-separated:
- **Black / Dark Green** → surfaces only
- **Cream** → text only (never a background fill)
- **Gold** → exactly three legal jobs, all lint-checkable (ratified 2026-10-21, see `documents/decisions-2026-10-21.md`):
  1. **COMMIT fill** — `--accent-gold`, near-black text, max one per screen
  2. **ACTION outline** — gold border + gold-lo text, any number
  3. **Gold-lo wayfinding** — `--accent-gold-lo` (7.0:1 on cream) for the *current* nav item's text/icon/indicator bar only. Never a nav fill. Avatars are ink.
  Gold is never a card/surface fill — high-salience cards use ink fill + a gold accent edge.
- **White** → text on dark; page background in light theme

Five dark surfaces build elevation through color progression (page → deep → inset → card → raised), not shadow. Four light surfaces (page → inset → raised → card) use shadow for elevation.

Semantic color is separated from brand color. Material 3 status colors (`#2F9E44` success, `#F59F00` warning, `#E03131` danger, `#1C7ED6` info) drive all status UI — never the brand accents.

### Type
Four families:
- **Bebas Neue** (display) — uppercase stencil-condensed, single weight. Page titles, hero text, card titles.
- **Barlow Condensed** (UI) — navigation, tabs, buttons, labels, overlines. 300–700 weights.
- **Source Sans 3** (body) — paragraphs, descriptions, help text. Use 16px/1.7 for long-form, 14px/1.6 as the workhorse, 12px/1.5 for captions.
- **JetBrains Mono** (code) — hex values, VINs, stock numbers, code, API data.

Overlines are signature: `Barlow Condensed 10px, weight 600, letter-spacing 4px, uppercase, color gold`. These sit above every section title.

### Spacing
**4px base, no exceptions.** 12-step scale `--sp-1 (4px)` through `--sp-24 (96px)`. Every component padding, margin, and gap is a multiple of 4.

### Backgrounds
**No photography or hand-drawn illustration in the product UI.** The signature background is the dark-hero gradient: `linear-gradient(135deg, #020000 0%, #203232 65%, #2A4040 100%)` with a 2px gold border-bottom and faint concentric gold circles decoratively positioned. Never full-bleed imagery in product — reserve that for marketing pages.

No repeating patterns. No noise/grain. Solid surfaces with subtle elevation.

### Animation
**Material 3 easing.** Three duration tiers: `fast 150ms` (hover, toggles), `normal 250ms` (dropdowns, panels), `slow 350ms` (modals, page transitions). Default curve `cubic-bezier(0.2, 0, 0, 1)` for enter; `cubic-bezier(0.3, 0, 1, 1)` for exit. No bounces. No elastic. Restrained and confident.

### Hover / press states
Every interactive element carries a **content-colored overlay**:
- Hover: 8% opacity
- Focus: 12% opacity + 2px gold-hi ring, 2px offset
- Pressed: 12% opacity
- Disabled: 38% opacity on content, no overlay

Primary buttons hover from `#8B752E → #B89E4A` (gold → gold-hi). Ghost buttons hover with a 6% white overlay. No scale-on-press shrink — state is carried by color, not geometry.

### Borders
Hairline borders, never decorative: `rgba(255,255,255,0.07)` ghost, `rgba(255,255,255,0.13)` mid. Gold borders `rgba(139,117,46,0.28)` or `0.55` for emphasis. Borders on light theme are `rgba(0,0,0,0.08)` / `0.15`.

### Shadows
Five levels. **On dark surfaces, use surface-color progression** (page → card → raised) instead of shadows — dark-on-dark shadow reads muddy. On light, use the standard Material-style shadow stack.

### Transparency / blur
Transparency is used sparingly: state overlays (8%/12%), badge backgrounds (12% of semantic color), subtle border fades. **No glassmorphism / backdrop-filter blur** — this system is matte, not glossy. Solid surfaces carry the hierarchy.

### Radii
**8px default** (`--radius-md`) for cards, inputs, buttons. 4px for tags, 12px for large containers, 16px for modals, pill-full for badges and avatars. Sharp 0px only for hero-section edge treatments. Never oversize rounding — this system is restrained, not friendly-rounded.

### Cards
Three-part anatomy: **header** (raised surface) → **body** (card surface) → optional **footer** (with actions, flex-end aligned). 1px ghost border, 8px radius. No drop shadow on dark. Header carries a Bebas Neue title + uppercase Barlow sub-label in text-muted.

### Imagery
**Cool tones, restrained.** No warm/golden-hour filters. Dealership photography should be neutral-to-cool, crisp, no vignettes. B&W acceptable when paired with the gold accent. Grain: no.

### Layout rules
- Max content width: **1100–1200px** centered
- Page gutters: 32px (portal) / 56px (marketing)
- Sticky tab navigation: top 0, 1px ghost bottom border
- Footer: 48px top padding, 1px ghost top border, muted text
- Density modes (never mixed within a single view):
  - **Comfortable** (default) — 48px touch targets, 16px body, 24px vertical rhythm
  - **Compact** (data-dense) — 36px targets, 14px body, 16px rhythm

---

## Iconography

The brand-guide RV unit icons (10 types × outline/color/solid = 30 assets) have not been vectorized into this system yet — they live in `.eps/.ai` masters that were not provided as PNG/SVG. **Flagged as a gap** in the Reconciliation Plan and deferred.

For general UI iconography, Nexus specifies **Lucide React** — 20px default, 1.5px stroke, round caps + joins. In this repo we pull Lucide from CDN (`lucide@latest`) rather than bundling. **Substitution noted** — the 2022 brand guide did not specify a UI icon library, so Lucide is a best-practice import, not a brand-authentic choice. If the user wants to swap to Heroicons or Phosphor (same stroke discipline), swap at the CSS-class level.

Two brand-specific shape primitives from the 2022 guide are **not yet in Nexus** and are flagged for v1.1:
- **Wayfinder** — the distinctive mark used as the apostrophe in the logo and as a sub-brand anchor
- **Hexagon** — built from Wayfinder geometry, used for callouts and badges

These belong in `assets/shapes/` once vectorized. Current interim: use Lucide `chevron-right` as a Wayfinder stand-in where directional affordances are needed.

**Emoji:** not used. **Unicode glyphs:** `▸ · — →` only, as documented in Content Fundamentals.

---

## Font substitutions & rationale

The 2022 brand guide specifies paid, commercially-licensed typefaces. Nexus substitutes open-licensed, web-ready alternatives that preserve the visual personality. See `preview/type-substitutions.html` for the full rationale card.

| Role | Brand guide | Nexus | License |
|---|---|---|---|
| **Display** | Sucrose | **Bebas Neue** | paid → free (Google Fonts) |
| **UI** | Geogrotesque | **Barlow Condensed** | paid → free (Google Fonts) |
| **Body** | Source Sans Pro | **Source Sans 3** | aligned — variable-font version of the same family |
| **Mono** | — | **JetBrains Mono** | free |

**Display (Sucrose → Bebas Neue).** Sucrose is the Adobe-Fonts stencil-unicase face used in the Bish's logo itself. Bebas preserves the condensed all-caps geometry, tall x-height, and utilitarian-stencil character. Not a perfect match — Sucrose has genuine broken stencil strokes; Bebas is clean — but at UI sizes it holds the same compositional weight and reads as "Bish's-adjacent" rather than generic.

**UI (Geogrotesque → Barlow Condensed).** Geogrotesque is a premium geometric-condensed sans for subheads and chrome. Barlow Condensed is the closest open-source face — clean letterforms at small sizes, geometric-condensed personality, and the full 300–700 weight range Nexus needs.

**Body (Source Sans Pro → Source Sans 3).** Not really a substitution — Source Sans 3 is Adobe's updated variable-font version of Source Sans Pro. Same designer, same visual intent, modern format.

**Why substitute rather than license the real faces?**
1. **Cost at scale.** Sucrose and Geogrotesque are paid per-site or per-pageview. Across Dealer OS, the portal, and admin tools — thousands of employees and tens of thousands of customer-facing pageviews — license cost compounds.
2. **Performance.** Google Fonts' Bebas and Barlow are CDN-cached and compressed; they load faster than foundry-delivered fonts, and the cache is reused across any other site that serves them.
3. **Fallback safety.** Free Google fonts have guaranteed long-term availability. Paid foundry fonts can hit license disputes, acquisition drama, or CDN changes that break production overnight.

🚩 **This substitution should be formally sanctioned in a 1-page brand-guide-addendum.** If the licenses are ever acquired, drop the `.woff2` files into `fonts/` and update `colors_and_type.css` to point at them — the type roles and scales stay identical.

---

## Components

Exported React components (bundled to `_ds_bundle.js`, namespace `window.BishSRVDesignSystem_26feec`), all in `ui_kits/portal-dark/`:

- **Button** — primary / secondary / ghost / danger × sm / md / lg
- **Badge** — six semantic status pills (gold, success, warning, danger, info, neutral)
- **Input** — labeled field with helper, error, and disabled states
- **TabBar** — sticky underline tab navigation
- **Header** — branded portal header with gradient, eyebrow, title, and meta row
- **Card** — three-part container (header / body / footer)
- **StatTile** — KPI tile with label, value, and delta
- **UnitRow** — inventory list row with status badge

## Components

- **AppShell** — required navigation shell: header, role-driven side panel / drawer / mobile tab bar (`ui_kits/app-shell/`)
- **ActionOverlay** — mobile Action overlay: role pills, terminal action, phase arc
- **NavConfig** — global nav catalog + per-role assignments (with `NavIcon`, `NAV_ICONS`, `UI_ICONS`, `SHELL_THEME`)
- **RolesNavAdmin** — Admin › Roles & Navigation: add nav buttons/actions, switch them on per role, pick mobile slots, publish
- **Badge**, **Button**, **Card**, **StatTile**, **UnitRow**, **Header**, **Input**, **TabBar** — portal primitives (`ui_kits/portal-dark/`)

## UI Kits

- **`ui_kits/portal-dark/`** — the signature dark-theme portal look: headers, tabs, stat cards, unit-row tables, buttons, inputs, badges, modals. See its `index.html` for a live, click-through demo, and `README.md` for component inventory.

---

## Code handoff: shadcn/ui

Production code uses **shadcn/ui + Radix + Tailwind + CVA**. The components in `ui_kits/` are reference implementations with inline styles that render without a build step. `shadcn/` is the bridge to code:
- `globals.css`: the Tailwind v4 theme with shadcn variables, light and dark.
- `tailwind.preset.js`: the same theme for Tailwind v3.
- `variants.ts.tpl`: CVA recipes. Rename it to `.ts` when you copy it into a code repo.
- `components.json`: the shadcn CLI config.

See `shadcn/README.md` for install steps and the map from each Nexus component to its shadcn primitive.

## Repository & agents

Source repo: **github.com/onboardianos/bishs-design-system**. Other tools and agents should read from it:
- **Claude Code:** clone the repo, or add it as a git submodule, then copy `SKILL.md` to `.claude/skills/bishs-rv-design/SKILL.md` (or point a project's `CLAUDE.md` at it). Put `CLAUDE.md` at the root of any build repo.
- **Code repos:** follow `shadcn/README.md`.
- **MCP / other agents:** read `README.md`, `SKILL.md`, `colors_and_type.css` and `documents/` as canon.

## Caveats

- **No production codebase was attached when this system was created.** The shadcn layer in `shadcn/` is derived from the tokens and has not been checked against a shipping repo. All component recreations are derived from the Nexus tokens doc + the provided JSX reference. If a real codebase exists, importing it would let us match pixel-perfect behavior (CVA variants, exact Tailwind classes, animation timings from the shipping code).
- **No Figma link.** Would tighten the visual match, especially for the Wayfinder/Hexagon primitives.
- **Sucrose / Geogrotesque font substitution** is flagged above.
- **RV unit icon set (10 × 3 variants)** is not vectorized yet — deferred.
- **Light-theme UI kit** is covered in the token system + CSS but not yet built out as its own kit; the portal-dark kit demonstrates the stack and can be re-skinned to light in ~a day.
