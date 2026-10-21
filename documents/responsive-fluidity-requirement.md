# Responsive Fluidity Requirement — FOUNDATIONAL · STRUCTURAL

**Program:** Dealer OS · Bish's RV
**Authority:** Zach McVicker
**Date:** 2026-08-05
**Status:** Active — applies to every screen in every Dealer OS design project, retroactive to in-flight builds.
**Relationship to existing canon:** Extends CUSTOMER_PORTAL_BLUEPRINT_v1 §14 (Device-Adaptive Architecture) and Foundations §4.4 / §5.3 (device-accurate rendering). Where §14.3 permitted a "framed mobile presentation" at intermediate widths, **this document supersedes that** — the intermediate band must be a genuine adaptive layout, not a framed phone.

---

## 1. The rule in one paragraph

Every screen is **one fluid implementation** that adapts continuously to the width of its container. Drag the browser from 1440px down to 375px and the design must transform *while you drag* — reflowing, recomposing, and changing posture the way the production surface will when it is opened on a desktop, a tablet, or a phone. A "device" is a rendering context the screen responds to, **never a separate design, a separate file, or a fixed frame.** If a design only looks correct at three snapshot widths, it is not done — it must be coherent at **every** width in between.

## 2. Why this is a hard requirement (the explanation)

1. **It is how the product actually behaves.** Customers open find.bishs.com on whatever they have in their hand. Outfitters move between tablet and desktop mid-deal. A design that exists only as a phone mock or only as a desktop mock has not answered the question "what does the user see?" — it has answered a third of it.
2. **One source of truth per screen.** The program already forbids canvas copies vs. prototype copies of a screen (Foundations §2, architecture guide). Device-forked builds are the same disease: three copies that drift apart. Responsiveness keeps priority, hierarchy, and copy in one file where they cannot diverge.
3. **It makes the Canvas honest.** When screens adapt to their *container* (see §4.2), a canvas artboard drawn narrow shows the true mobile posture and one drawn wide shows the true desktop posture — the map stops lying.
4. **It makes the Device toggle honest.** In prototype mode, tapping Mobile / iPad / Desktop should only **resize the stage container**. The screen itself does the adapting. If the toggle swaps to a different layout file, the toggle is theater.
5. **The blueprint already demands it.** §14: mobile-first is the starting posture, never the finish line; the desktop center column *is* the mobile hierarchy, unchanged; the rail is added context, never a competing primary. Fluidity is the mechanism that enforces §14 automatically.

## 3. The requirements (cite by RF-code)

**RF01 — One implementation per screen.** A screen ships as a single HTML/component whose layout is driven by container width. Separate `-mobile` / `-desktop` files, or device forks inside the canvas, are rejected on sight.

**RF02 — Continuous adaptation, not snapshot adaptation.** The screen must be coherent at every width from 360px to 1600px. Between named breakpoints, layout is fluid (percentages, `fr` units, `minmax()`, `clamp()`, flex wrap). Breakpoints re-compose; fluidity covers everything in between. The shrink test (§5.1) is the acceptance gate.

**RF03 — Mobile-first CSS.** Base styles are the mobile posture. Wider postures are added with `min-width` queries, never the reverse. This guarantees the §14 rule structurally: the desktop center column *is* the mobile hierarchy because it is literally the same markup.

**RF04 — Posture bands.** Three named bands, aligned to §14.1 postures. *Degradation order (HIG L1, added 2026-08-05):* as width shrinks, **shed tertiary panels first** — the decision-support rail collapses into disclosure before anything in the center column moves. Degrade by shedding panels, never by reshuffling the core hierarchy; no surprise mid-resize UI reshuffles. One nav model, two presentations (rail on desktop ↔ bottom tabs on mobile — same nav data).
- **≤ 640px — Mobile (glance-and-resume):** single column, one computed action in thumb reach, utilities recede behind `···`. Full-bleed; no phone-chrome cosmetics.
- **641–1023px — Tablet (co-piloted / roomier mobile):** the mobile hierarchy with room to breathe — two-up card grids where cards are siblings, wider media, larger type. **Never a phone frame floating on a background.**
- **≥ 1024px — Desktop (sit-down deliberation):** center column = the mobile hierarchy unchanged in priority and order; the decision-support rail appears **beside** (never above) it, sticky, carrying Hesitation-Ledger modules only. One gold action per screen remains law in every band.

**RF05 — Container-driven, not viewport-driven, wherever the screen can be embedded.** Any screen that will mount inside a Canvas artboard, prototype stage, side-by-side pane, or iframe must respond to its **container** width (CSS container queries: `container-type: inline-size` on the screen root; `@container` rules for posture changes). Viewport `@media` queries are acceptable only for screens that will only ever be the full window. This is what makes a 300px artboard genuinely render the mobile posture while the neighboring 1100px artboard renders the rail.

**RF06 — No fixed-dimension stages or frames.** Prototype stages, artboards, and embeds size the *container* and let the screen respond. Decorative device bezels/phone chrome are forbidden inside the design; if a presentation context wants a bezel, it draws one around the container without constraining the screen's fluidity.

**RF07 — Nothing disappears silently.** Content demoted at narrow widths moves behind progressive disclosure (`···`, drawer, accordion) — it is never simply cut. The §14 Hesitation-Ledger rail modules collapse into disclosure surfaces on mobile; they do not vanish.

**RF08 — Target integrity at every width.** At ≤1023px: minimum 44×44px targets (28×28px is the *absolute* floor per HIG, never the norm), thumb-reach placement for the primary action, no hover-only affordances (every hover reveal has a tap equivalent). At ≥1024px pointer contexts: targets ≥28×28px. At all widths: ~12px clearance around controls with a visible bezel, **~24px around borderless/ghost controls** (HIG A2 — the most-missed spacing rule in web systems).

**RF09 — Fluid type and spacing.** Display type scales with `clamp(min, fluid, max)`; body text never below 14px; spacing stays on the 4px scale at every width. No layout may rely on a fixed pixel canvas to look composed.
*Scope clarification (2026-08-05, HIG-grounded):* the 14px floor governs **reading text** — paragraphs, descriptions, help text, any multi-line prose. Non-reading **UI labels** (table headers, badges, metadata) floor at **11px**. The **10px Nexus gold overline is the single named exception** — permitted because it satisfies Apple's own small-type discipline (macOS caption/footnote styles are 10pt): weight ≥600, positive letter-spacing, uppercase, AA contrast on its surface, never used for content someone must read to proceed. Anything below 10px is a defect on every platform — raise it.

**RF10 — No horizontal scroll, ever.** The page body never scrolls sideways at any width ≥360px. Wide content (tables, comparison grids) scrolls inside its own contained region.

**RF11 — Invariants across all bands.** These do not change with width: the screen's single primary (gold) action; the priority order of content; status color semantics; customer-private / outfitter-private firewalls (R10). If narrowing a screen changes what the user is supposed to do, the design is wrong at one of the widths.

**RF12 — Text-zoom survival (HIG Dynamic Type doctrine, added 2026-08-05).** The layout survives **200% browser text zoom** with no loss of content or function (WCAG 1.4.4). Reading text scales; wayfinding labels (overlines, tab titles, table headers) may stay fixed — Apple's tab-title exemption. Hierarchy holds at every zoom level: primary elements stay findable, meaningful icons scale with their text, truncation stays minimal, and multi-column text drops columns rather than crowding. Test at 200% before presenting, alongside the shrink test.

## 4. What this means for the two build surfaces

### 4.1 In the screen itself
- Root element: `container-type: inline-size;` and a named container.
- Layout: CSS grid/flex with `minmax()`, `auto-fit`, `gap` — no absolute-positioned page composition.
- Posture changes at 641px and 1024px via `@container` (or `@media` only for full-window-only screens), mobile-first per RF03.

### 4.2 In the Canvas / Prototype shell
- **Canvas:** artboards are sized containers (e.g. 380w for mobile posture, 760w for tablet, 1280w for desktop). The *same file* renders in each — a screen may appear as multiple artboards at different widths to show its postures side by side. That IS the device documentation.
- **Prototype:** the Device toggle resizes the stage container to the band widths (390 / 834 / 1280) and does nothing else. Bonus: the stage should be user-draggable/resizable so a reviewer can perform the shrink test live inside the prototype.

## 5. Acceptance tests (run before any screen is called done)

**5.1 The shrink test (the gate Zach will run first).** Open the screen full-window at ~1440px. Drag the window edge continuously down to ~375px. Pass = the layout visibly recomposes through desktop → tablet → mobile postures with no broken intermediate state, no overlap, no clipped content, no horizontal scrollbar, and the gold action visible and reachable the whole way. One broken width = fail.
**5.2 Container test.** Mount the same file in a 380px and a 1280px container on one page: the two mounts must show the two postures simultaneously.
**5.3 Hierarchy invariance test.** List content top-to-bottom at 375px and the center column top-to-bottom at 1440px — the lists must match (§14 / RF11).
**5.4 Disclosure audit.** Everything visible at 1440px must be *reachable* at 375px (RF07).
**5.5 Touch audit.** At 390px, measure the primary action and all tap targets (RF08).

## 6. Paste-block for the design agent (copy this into the project chat verbatim)

> **STANDING REQUIREMENT — RESPONSIVE FLUIDITY (RF01–RF12).** Every screen you design or build in this project is ONE fluid implementation that adapts continuously to container width — not a phone design, not a desktop design, not fixed frames. Build mobile-first; recompose at 641px (tablet) and 1024px (desktop, adds the decision-support rail beside an unchanged center column); stay fluid between breakpoints with grid/flex/clamp; use container queries on the screen root so artboards and stages render their true posture at their size. Device toggles and artboards only resize containers — never swap layouts or files. Nothing is cut at narrow widths, only moved behind disclosure; one gold primary action, same content priority order, at every width; no horizontal scroll ≥360px; 44px touch targets below 1024px. Before presenting any screen, run the shrink test: drag from 1440px to 375px — it must be coherent at EVERY width in between — AND the 200% text-zoom test (RF12). A screen that only works at snapshot widths or default zoom is not done.

---

*Maintenance: absorbed into the Foundations doc at its next version bump as a STRUCTURAL section; until then this file travels with project handoffs the way the Walkthrough handoff did.*
