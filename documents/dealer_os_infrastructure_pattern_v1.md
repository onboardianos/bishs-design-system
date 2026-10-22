# Dealer OS Design System Infrastructure Pattern v1

Captured from the Customer Funnel Phase 1–3 build. Intended as a starter kit for sibling surface files (in-store, admin portal, cockpit, owner portal). Every section here is a **pattern we've verified in production**, not a proposal.

## 1. File architecture
- **One HTML entry per surface** (e.g. `Customer Funnel - Entry.html`). This file owns: fonts/CSS vars, script loading order, design-canvas mount, prototype mount, mode toggle, state persistence, speaker notes (if any).
- **Component files in `components/`**, each ~300–600 lines, one subject per file (`s3_detail.jsx`, `t3_numbers.jsx`, `mobile_top3.jsx`). When a file crosses ~600 lines or owns >1 subject, split it.
- **Script load order**: React → Babel → shared primitives (`core.jsx`, `design-canvas.jsx`) → screen components (desktop) → mobile components → `prototype.jsx` → `app.jsx`. Every script is `type="text/babel"` except the starter web components.
- **Design system connection**: import Bish's type (Bebas Neue, Barlow Condensed, Source Sans 3) and tokens (`#0A0A09`, `#8B752E`, `#F7F6F1`, `#E7DDB4`) at the top of the entry HTML as CSS variables. Components use inline styles referencing those families literally — no CSS modules, no Tailwind, no styled-components.
- **Global scope discipline**: every component file ends with `Object.assign(window, { … })` exporting its symbols. Never name a style object `styles` — always `t3Styles`, `chromeStyles`. Name collisions silently break cross-file composition.

## 2. Dual-mode toggle
- Entry HTML renders **either** `<DesignCanvas>` (all artboards laid out in a pan/zoom grid) **or** `<Prototype>` (single interactive flow). Controlled by one state `mode: "canvas" | "prototype"` persisted in `localStorage["<surface>:mode"]`.
- Canvas mode composes sections as `<DCSection><DCArtboard><Component /></DCArtboard></DCSection>`. Each artboard mounts the real component at its real viewport size — not a screenshot. Interactions work in canvas.
- Prototype mode runs a state machine (`stage`, `forkVariant`, `detailUnitId`, etc.) and renders one screen at a time. Same components, different harness.

## 3. Variant switcher
- Four axes: **Screen** (stage), **Style** (A/B/C continuation), **User** (persona), **Device** (desktop/mobile). Each axis is one toggle in prototype chrome.
- Every screen component accepts `variant` prop and dispatches. Never hard-branch inside a parent — let the leaf decide.
- To add a new axis (e.g. **Market**): add state in `prototype.jsx`, add toggle in chrome, thread as prop. Don't rename existing axes.

## 4. Chrome conventions
- **SBChrome geometry**: 100px chrome row at top (logo + wayfinder + persona chip + back). **16px content buffer** between chrome and page content — never less.
- **Wayfinder**: progress bar with % + current-step label (`"Phase 2 · T2 of T3"`). Progress bar sits inside chrome, not above content.
- **Cascade rule**: when chrome height changes, every screen's content offset updates via a shared `CHROME_H` constant, not per-screen magic numbers. Change the constant, every screen follows.

## 5. Sticky-note gutter tabs
- `<DCPostIt>` renders inline at end of each `<DCSection>`, collapsed to a 22×8 (canvas-scale) `✎ Notes` tab in the gutter. Hover expands preview, click toggles open.
- **Never `position: absolute`**. Sticky notes live in document flow so they never float over artboards at low zoom.
- Legacy `top/left/right/rotate` props are accepted and silently ignored for call-site stability.

## 6. Scrollytelling pattern (S3 detail)
- `useActiveSection(rootRef, sectionRefs)` — IntersectionObserver rooted on the scroll container. Picks the section whose center is closest to the root's center and returns its index.
- Left pane renders `SceneStack[active]` with crossfade; right pane scrolls freely with 7 sections.
- Sticky action bar lives **inside** the transformed parent (not `position: fixed` against viewport) so it respects the canvas/prototype scale transforms.

## 7. Mobile conventions
- `<MChrome>` = slim 56px chrome with back + % + step label. `<MChipStrip>` for context chips. Mobile frames come from `ios_frame.jsx`.
- **Sticky-inside-scroll-root**: bottom CTAs use `position: sticky; bottom: N` inside the scrolling container — never `position: fixed`, which fights the device frame transform.
- **Accent-only continuation treatment**: mobile compresses A/B/C differentiation to kicker color, headline italic/no-italic, and card border treatment. No layout forks on mobile.

## 8. State persistence
- **Persists** (localStorage): `mode`, `forkVariant`, `canvasPan/zoom`, `openPostIts`, `lastStage` for resume.
- **Does not persist**: OTP state, sheet open/closed, slider values, form inputs. Reloads reset these deliberately — the funnel is exploratory, not a saved session.
- Key format: `bishs:<surface>:<key>`. Every surface namespaces its keys so multiple surfaces can coexist in the same origin.