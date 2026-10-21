# Project instructions — Bish's RV Design System

## Prototype & Canvas architecture (REQUIRED for every Bish's build)

Any time this design system is used to build a prototype or multi-screen product,
set the project up using the **Prototype & Canvas** dual-mode architecture. The full
reference lives at `documents/prototype-canvas-architecture-guide.md` — read it before
scaffolding. In brief:

**Two modes, one source of truth per screen (never a canvas copy AND a prototype copy):**
- **CANVAS** — Figma-style board (`design_doc_mode = canvas`). Every screen is an
  absolutely-positioned, always-on `<DCArtboard>`, grouped into labeled `DCSection` rows.
  One artboard per meaningful state (including every overlay/variant). This is the "map."
- **PROTOTYPE** — single interactive frame with a left side-panel navigator (~276px,
  collapsible), driving one screen at a time through the real click-flow. This is the
  "walkthrough." The stage is a plain **resizable container**; the Device toggle only changes
  its width (390 / 834 / 1280) and the screen adapts itself. No device bezels or phone
  chrome (see Responsive Fluidity, RF06).

**A single top-center toggle switches modes.** Both modes render the SAME screen
components — a change to a screen shows up in both automatically.

**Side panel controls (top→bottom):** Layer → Device → Style/Variant → prev/next counter
→ Screens list. Each is plain state on the prototype root.
- **Layer** = which product surface (its own flow array + render function). A `useEffect`
  resets to the flow's first screen if the current id isn't in the new layer.
- **Device** = resizes the stage container only (390 / 834 / 1280). It never swaps layouts or
  files — the screen responds via container queries.
- **Style** (Sym/Edit/Type = A/B/C) and **Variant** (Rail/Side/Dots) share a slot by layer;
  greyed on screens with no variants.
- **Counter + Screens list** drive `curId`; each layer keeps its OWN current-screen state
  so switching layers and back remembers position. Active screen gold-filled; key screens
  get a gold dot + cream text; rows numbered `01, 02, …`.

**Each layer has (1) a flow array `{id,label,key?}` and (2) a render function
(`switch(id)`)** wiring in-screen CTAs to `nav.go(nextId)`. Iframe layers use a one-entry
flow rendering a live `<iframe>` of a self-contained sub-app.

**Canvas ↔ Prototype correspondence is 1:1 and MUST be kept:**
- a Layer = a section (or set of sections)
- a screen in the flow = an artboard with the same label
- a style/variant = sibling artboards
- conditional overlays/pop-ups = their own standalone artboards

**When adding a screen, touch three places:** (1) the component, (2) the layer's flow
array + render switch, (3) a matching `DCArtboard` in the canvas section. Missing #2 → not
in prototype nav; missing #3 → not on canvas map.

**Adding a layer** — follow the 7-step checklist in section 6 of the guide.

**Persistence:** panel collapse → `localStorage["<proto>-nav"]`; completed-screen progress
→ `localStorage` per the guide; provide a Reset-progress affordance where a progress meter exists.

## Navigation shell (REQUIRED for every screen) (`AppShell`)

Every Bish's screen mounts inside `AppShell` (`ui_kits/app-shell/`). Never hand-build a header, side panel, drawer or tab bar.
- **Header (≥641px):** logo far left · global search centered · notification bell · profile avatar far right.
- **Side panel (≥1024px, desktop + landscape tablet):** role-driven; expand (240px) / collapse (72px rail); the choice persists per device.
- **Drawer (641–1023px, portrait tablet):** the same role nav as a left drawer, opened from the header menu button.
- **Mobile (≤640px):** header = hamburger menu · logo · search centered · profile; the hamburger opens that role's admin-picked mobile menu; bottom tab bar = two role-driven slots · center Action · Alerts · Messenger (Alerts and Messenger fixed). Action opens that role's Action overlay (pills, terminal action, phase arc).
- **Bands are container-driven** (measured from the shell's own width), never the viewport.
- **Navigation is data, owned by admin.** Buttons live in one global catalog; each role's buttons, mobile slots and overlay actions are switched on in **Admin › Roles & Navigation** (`RolesNavAdmin`), stored in `NavConfig`. Admins can add new nav buttons and actions. Never hardcode a role's nav in a screen.
- Shell elements carry spec-ready v2 stamps (`data-spec-id`, `data-bos-*`, shell sections S01–S04).

## Responsive fluidity (REQUIRED for every screen — RF01–RF12)

Full spec: `documents/responsive-fluidity-requirement.md`. FOUNDATIONAL and STRUCTURAL —
applies to every screen in every build, retroactive to in-flight work.

**Every screen is ONE fluid implementation that adapts continuously to its container width.**
A "device" is a rendering context the screen responds to — never a separate design, file, or
fixed frame. If a design only looks right at three snapshot widths, it is not done.

- **RF01** one implementation per screen — no `-mobile` / `-desktop` files or device forks
- **RF02** coherent at EVERY width 360→1600px; fluid between breakpoints
- **RF03** mobile-first CSS; widen with `min-width` only
- **RF04** bands: ≤640 mobile · 641–1023 tablet (never a framed phone) · ≥1024 desktop
  (center column = mobile hierarchy unchanged; rail sits **beside** it)
- **RF05** `container-type: inline-size` + `@container` on any screen that mounts in an
  artboard, stage, or iframe; viewport `@media` only for full-window-only screens
- **RF06** no fixed-dimension stages or frames; no decorative device bezels
- **RF07** nothing is cut at narrow widths — it moves behind disclosure
- **RF08** 44×44px targets and thumb-reach primary at ≤1023px; no hover-only affordances
- **RF09** `clamp()` type, body ≥14px, 4px spacing scale at every width
- **RF10** no horizontal scroll at any width ≥360px
- **RF11** invariant across bands: one gold primary action, content priority order, status
  semantics, customer/outfitter privacy firewalls
- **RF12** layout survives 200% browser text zoom with no loss of content or function;
  reading text scales, wayfinding labels (overlines, tab titles, table headers) may stay fixed

**Canvas artboards are sized containers** (≈380 / 760 / 1280) rendering the SAME file — a
screen may appear as several artboards at different widths to document its postures.

**Acceptance gate — the shrink test:** open at ~1440px, drag continuously to ~375px. Must
recompose through desktop → tablet → mobile with no broken intermediate state, no overlap,
no clipping, no horizontal scrollbar, gold action reachable throughout. One broken width = fail.
Then run the **200% text-zoom test** (RF12) before calling the screen done.

## Adopted standards — HIG (REQUIRED)

`documents/hig-adoptions-2026-08-05.md` is STRUCTURAL: accessibility floors (contrast,
44×44px touch targets, ~24px clearance around ghost controls, 11px UI-label floor),
feedback/loading timing (nothing under ~2s, determinate over spinner, skeletons never blank
screens), form standards (prefill, pickers over free text, inline validation,
required = disabled-until-valid), modality discipline (four sanctioned modal jobs, one at a
time, no app-within-a-modal), dark-surface architecture (base vs. elevated stacks),
reduced-motion contract, and error grammar (no blame, no "we", state the fix at the point of
the problem). §9 lists the deliberate divergences from Apple — matte over Liquid Glass, theme
by surface role, brand fonts, full-width mobile CTAs — which are closed and not re-litigated.

## Accessibility — WCAG AA (REQUIRED)

The palette is remediated to WCAG 2.2 AA; see `documents/CHANGES-wcag.md` for the change log
and `documents/wcag-audit.html` for the audit. Consequences to honor:
`--text-muted` is `#A2A59C` (never `#7A7D76`); `--text-subtle` is disabled/decorative only;
semantic base tokens are the on-dark tints (`#51CF66` / `#FFD43B` / `#FF8787` / `#74C0FC`);
interactive control edges use `--border-input`; no persistent text below 11px; the gold
overline uses `--accent-gold-hi`; links are underlined; primary buttons take near-black text
on gold.

## Design system usage
Use the tokens in `colors_and_type.css`, the components in `ui_kits/`, and the rules in
`README.md` / `SKILL.md`. Cream is text-only; gold has exactly three jobs — COMMIT fill (≤1 per screen), ACTION outline,
gold-lo for the current nav item only (avatars are ink) — never a card/surface/nav fill (ratified
2026-10-21, `documents/decisions-2026-10-21.md`); 4px spacing base;
semantic colors are never the brand accents.
