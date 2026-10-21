---
name: bishs-rv-design
description: Use this skill to generate well-branded interfaces and assets for Bish's RV (Nexus Design System), either for production or throwaway prototypes, mocks, slides, or decks. Contains essential design guidelines, colors, type, fonts, brand assets, and UI kit components for prototyping. Dark-first Material 3 + shadcn stack with a heritage black/gold/cream palette and Bebas Neue + Barlow Condensed + Source Sans 3 + JetBrains Mono type system. TWO HARD PREREQUISITES, not optional: (1) any prototype or multi-screen build MUST first be scaffolded with the Prototype & Canvas dual-mode architecture (Step 0); (2) EVERY screen MUST be one fluid container-query-driven implementation that adapts continuously from 360px to 1600px — never device-forked files, never fixed frames, never phone chrome (Step 0B, RF01–RF12).
user-invocable: true
---

## ⚠️ STEP 0 — REQUIRED BEFORE ANY BUILD: Prototype & Canvas architecture

**The moment this design system is selected for a prototype or any multi-screen product — including throwaway prototypes, internal tools, and clickable mocks — set the project up using the Prototype & Canvas dual-mode architecture BEFORE building any screens. This is a non-negotiable prerequisite, not an optional pattern. Do not create the first screen until the dual-mode shell exists.**

**Applies to:** anything interactive or with more than one screen/state.
**Exempt:** genuinely single-surface static artifacts only — one slide deck, one email, one flier, one standalone poster/mock with no navigation.

**If you gather requirements first (see the closing section), that is fine — but the very first thing you BUILD must be the Canvas/Prototype shell, before any screen content.**

**Fastest correct start:** begin from the design system's **"Prototype & Canvas Shell (REQUIRED START)"** template (`templates/prototype-canvas-shell/`). It is the dual-mode scaffold already wired — copy it in as the project's entry file, then add your layers, flows, and screens into it. Starting from this template satisfies Step 0 by construction.

1. **Read `documents/prototype-canvas-architecture-guide.md` in full first** — it is the authoritative reference for the structure below.
2. **Scaffold the two modes before authoring content**, with a single top-center toggle switching between them and ONE source of truth per screen (never a canvas copy and a prototype copy):
   - **CANVAS** — Figma-style board (`design_doc_mode = canvas`): every screen an absolutely-positioned, always-on `<DCArtboard>`, grouped into labeled `DCSection` rows; one artboard per meaningful state (including every overlay/variant).
   - **PROTOTYPE** — one interactive frame with a ~276px collapsible left side-panel navigator (Layer → Device → Style/Variant → prev/next counter → Screens list), driving one screen at a time through the real click-flow. The stage is a plain **resizable container** — the Device toggle only changes its width (390 / 834 / 1280). No device bezels, no `GFPhone` chrome: the screen itself adapts (see Step 0B / RF06).
3. **Keep Canvas ↔ Prototype 1:1:** a Layer = a section, a flow screen = an artboard (same label), a style/variant = sibling artboards, a conditional overlay = its own artboard.
4. **When adding a screen, touch three places:** the component, the layer's flow array + render switch, and a matching `DCArtboard`. **When adding a layer,** follow the 7-step checklist in section 6 of the guide.

Only after this shell exists should you build screens. The full brief is also mirrored in `CLAUDE.md` at the project root.

---

## ⚠️ STEP 0A — REQUIRED: the navigation shell (`AppShell`)

Every Bish's screen mounts inside `AppShell` (`ui_kits/app-shell/`). Never hand-build a header, side panel, drawer or tab bar.
- **Header (≥641px):** logo far left · global search centered · notification bell · profile avatar far right.
- **Side panel (≥1024px, desktop + landscape tablet):** role-driven; expand (240px) / collapse (72px rail); the choice persists per device.
- **Drawer (641–1023px, portrait tablet):** the same role nav as a left drawer, opened from the header menu button.
- **Mobile (≤640px):** header = hamburger menu · logo · search centered · profile; the hamburger opens that role's admin-picked mobile menu; bottom tab bar = two role-driven slots · center Action · Alerts · Messenger (Alerts and Messenger fixed). Action opens that role's Action overlay (pills, terminal action, phase arc).
- **Bands are container-driven** (measured from the shell's own width), never the viewport.
- **Navigation is data, owned by admin.** Buttons live in one global catalog; each role's buttons, mobile slots and overlay actions are switched on in **Admin › Roles & Navigation** (`RolesNavAdmin`), stored in `NavConfig`. Admins can add new nav buttons and actions. Never hardcode a role's nav in a screen.
- Shell elements carry spec-ready v2 stamps (`data-spec-id`, `data-bos-*`, shell sections S01–S04).

## ⚠️ STEP 0B — REQUIRED FOR EVERY SCREEN: Responsive fluidity (RF01–RF12)

**Every screen is ONE fluid implementation that adapts continuously to its container's width — not a phone design, not a desktop design, not fixed frames.** Full spec: `documents/responsive-fluidity-requirement.md`. This is FOUNDATIONAL and STRUCTURAL; it applies to every screen in every build, including in-flight ones.

- **RF01 · One implementation per screen.** No `-mobile` / `-desktop` files, no device forks. Separate device files are rejected on sight.
- **RF02 · Continuous, not snapshot.** Coherent at EVERY width 360→1600px. Fluid between breakpoints (`%`, `fr`, `minmax()`, `clamp()`, flex wrap).
- **RF03 · Mobile-first CSS.** Base styles = mobile posture; widen with `min-width` only, never the reverse.
- **RF04 · Three posture bands.** ≤640 mobile (single column, one action in thumb reach, utilities behind `···`); 641–1023 tablet (same hierarchy, roomier, two-up grids — **never a phone frame on a background**); ≥1024 desktop (center column = the mobile hierarchy unchanged, decision-support rail appears **beside** it, sticky). Degradation order: shed tertiary panels (the rail) into disclosure first; never reshuffle the core hierarchy mid-resize. One nav model, two presentations (rail ↔ bottom tabs).
- **RF05 · Container-driven, not viewport-driven.** Any screen that mounts in a Canvas artboard, prototype stage, or iframe uses `container-type: inline-size` on its root + `@container` rules. Viewport `@media` only for full-window-only screens.
- **RF06 · No fixed-dimension stages or frames.** Artboards and stages size the *container*; the screen responds. Decorative device bezels/phone chrome are forbidden inside the design.
- **RF07 · Nothing disappears silently.** Demoted content moves behind disclosure (`···`, drawer, accordion) — never cut.
- **RF08 · Target integrity at every width.** ≤1023px: 44×44px minimum targets (28×28px is the absolute floor, never the norm), thumb-reach primary, no hover-only affordances. ≥1024px pointer: targets ≥28×28px. All widths: ~12px clearance around bezeled controls, **~24px around borderless/ghost controls.**
- **RF09 · Fluid type and spacing.** Display type via `clamp()`; reading text never below 14px; UI labels ≥11px; the 10px gold overline is the single named exception (weight ≥600, positive tracking, uppercase, AA contrast, never reading-content); nothing below 10px anywhere; spacing stays on the 4px scale at every width.
- **RF10 · No horizontal scroll, ever** at any width ≥360px. Wide tables/grids scroll inside their own region.
- **RF11 · Invariants across all bands.** One gold primary action, content priority order, status color semantics, and privacy firewalls do not change with width.
- **RF12 · Text-zoom survival.** The layout survives 200% browser text zoom with no loss of content or function; reading text scales, wayfinding labels (overlines, tab titles, table headers) may stay fixed. Test at 200% before presenting.

**Canvas + Prototype consequences:** artboards are sized containers (≈380 / 760 / 1280) rendering the SAME file at different widths — that IS the device documentation. The Device toggle resizes the stage container and does nothing else; make the stage user-resizable so a reviewer can run the shrink test in place.

**Before calling any screen done, run the shrink test (5.1):** open at ~1440px, drag continuously to ~375px. Pass = recomposes through desktop → tablet → mobile with no broken intermediate state, no overlap, no clipping, no horizontal scrollbar, gold action visible and reachable the whole way. **One broken width = fail.** Then run the RF12 zoom test at 200%.

---

Read the `README.md` file within this skill, and explore the other available files. Key entry points:

- `documents/prototype-canvas-architecture-guide.md` — **required** dual-mode setup (see Step 0)
- `documents/responsive-fluidity-requirement.md` — **required** RF01–RF12 fluidity spec + acceptance tests (see Step 0B)
- `documents/hig-adoptions-2026-08-05.md` — **required** adopted standards: accessibility floors, feedback/loading timing, form validation, modality discipline, dark-surface architecture, error grammar, and the named divergences from Apple's HIG
- `documents/design-laws.md` — **required** the 27 perception/action laws (L01–L27) with their phase homes: the ideation interrogation (ask before designing), the creation component/build rules, and the five-judge critique rubric. Before designing any screen, run the ideation questions (L15, L07, L13, L12, L16·17, L22, L21, L24, L26); before presenting any screen, run the five-lens critique tests
- `CLAUDE.md` — project-wide instructions (Prototype & Canvas requirement + DS usage rules)
- `README.md` — brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — drop-in CSS variables + semantic element styles
- `assets/` — 16 Bish's RV logo PNGs (Black/Gold/White × Tagline variants)
- `ui_kits/portal-dark/` — dark-theme React/JSX component kit with an interactive `index.html` demo
- `preview/` — rendered design-system cards (tokens, type, components)

**If creating single-surface static artifacts** (one slide deck, one email, one flier/poster — the Step 0 shell does NOT apply to these; interactive prototypes, internal-tool UI, and multi-screen mocks DO require it):
1. Copy the logo(s) you need out of `assets/` into your output folder
2. Link `colors_and_type.css` (or inline its `:root` block) so `var(--accent-gold)`, `var(--font-display)`, etc. resolve
3. Load the four Google Fonts: Bebas Neue, Barlow Condensed, Source Sans 3, JetBrains Mono
4. Reference components in `ui_kits/portal-dark/` for pixel-accurate headers, buttons, cards, badges, inputs, tables

**If working on production code,** copy assets and read the rules in `README.md` to become an expert in designing with this brand. Key non-negotiables:
- Cream (`#E7DDB4`) is text-only, never a fill
- Gold has exactly three jobs: COMMIT fill (max one per screen), ACTION outline, and gold-lo (`#5E4F1F`) for the current nav item only (avatars are ink). Never a card, surface, or nav fill — high-salience cards use ink + gold accent edge. See `documents/decisions-2026-10-21.md`
- 4px spacing base, always
- Every interactive element carries a state-layer overlay (8% hover, 12% focus/active, 38% disabled)
- Dark surfaces use color progression for elevation; light surfaces use shadows — on dark, elevation = the *lighter* end of the ramp (base stack recedes, elevated stack comes forward), never shadow
- Uppercase-only display type (Bebas Neue); Barlow Condensed uppercase labels with 3-4px letter-spacing
- Semantic colors ≠ brand accents — never use heritage red/yellow/blue for status
- Every screen is one fluid container-query implementation (RF01–RF12) — mobile-first, no device forks, no fixed frames, passes the shrink test and the 200% zoom test
- Honest status per `documents/hig-adoptions-2026-08-05.md` §2: skeletons never blank screens, progress indicator past ~2s (determinate whenever estimable), alerts reserved for critical+actionable, no timer-based auto-dismissal of readable content
- Forms per §3: prefill defaults, pickers over free text, inline validation, required = disabled-until-valid (soft-fail fields never block, per R05)
- Modals per §4: only for the four sanctioned jobs; one at a time; no app-within-a-modal; confirm before dismissing unsaved content
- The 27 design laws (`documents/design-laws.md`) govern every screen: ideation questions asked before designing, creation rules enforced while building (dim-state-first, ≤2 salience channels, no naked numbers, status = color+glyph+value, commanded≠confirmed), five-lens critique run before presenting

**If the user invokes this skill without any other guidance,** ask them what they want to build or design — is it a marketing page, an internal tool, a slide deck, a login flow? Ask a few focused questions about audience, density mode (comfortable vs. compact), and whether they want dark or light theme. Then act as an expert designer who outputs HTML artifacts **or** production code, depending on the need. **If the answer is a prototype or anything multi-screen, Step 0 (the Prototype & Canvas shell) is the first build step — asking questions does not waive it. Step 0B (responsive fluidity) applies to every screen you then build, with no exceptions.**
