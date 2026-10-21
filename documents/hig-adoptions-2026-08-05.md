# HIG Adoptions — Standards Incorporated 2026-08-05 · STRUCTURAL

**What this is:** the standards adopted into the Bish's RV / Nexus design guidelines from the 2026-08-05 review of Apple's Human Interface Guidelines (full review with verdicts: `APPLE-HIG-REVIEW (for Bish's design guidelines).md` in Zach's 06_Technology folder). **Nothing in this document changes fonts, colors, or brand identity** — these are behavioral floors, timing standards, and structural rules. Where Bish's deliberately diverges from Apple, the divergence is named in §8 and is not up for re-litigation.

---

## 1. Accessibility floors (hard numbers)

- **Contrast:** 4.5:1 minimum for text up to ~17px-equivalent; 3:1 for 18px+ or bold (WCAG AA — the floor). **On dark surfaces, body text targets 7:1** (Apple's own dark-mode recommendation for custom small text). Verify pairings, don't change the palette: if a text/surface pair misses, use the next text tier up on that surface.
- **Targets:** 44×44px minimum on touch (≤1023px), 28×28px absolute floor — never the norm. Pointer contexts (≥1024px): ≥28×28px.
- **Control clearance:** ~12px around controls with a visible bezel; **~24px around borderless/ghost controls.**
- **Text floors:** reading text ≥14px; UI labels ≥11px; the 10px Nexus gold overline is the single named exception (weight ≥600, positive tracking, uppercase, AA contrast on its surface, never reading-content). Nothing below 10px anywhere. Keep Barlow 300 out of sub-14px sizes.
- **Text zoom:** layouts survive 200% browser text zoom (RF12); reading text scales, wayfinding labels may stay fixed (Apple's tab-title exemption).
- **Gestures:** every complex gesture (swipe-to-delete etc.) has a simple button equivalent. Full keyboard operability. Visible labels match spoken (screen-reader) labels.
- **Never autoplay media. No timer-based auto-dismissal** of content people need to read — alerts and exception toasts persist until acted on or dismissed.

## 2. Feedback & loading standards (honest status)

- **The 1–2 second rule:** under ~2s, show nothing; beyond it, show a progress indicator.
- **Determinate over spinner:** progress bar whenever duration/percent is estimable; spinner only when genuinely unknown.
- **Never a blank screen:** every data region ships a skeleton/placeholder state, replaced as content arrives.
- **Long operations don't spin:** a spinner implies "keep watching." For waits like lender responses, state the fact and the promise: "Submitted 2:14 PM — we'll flag you when the lender responds." (Composes with the commanded/confirmed + freshness-stamp rule.)
- **Confirm completion only for significant tasks** (deal milestones — yes; routine saves — no). **Alerts are reserved for critical, actionable information;** warn only about *unexpected, irreversible* loss, never about the expected result of the user's own action.
- When a command can't run, say why, at the point of the action.
- Status signals are multimodal: color + text/glyph at minimum (never color alone).

## 3. Form / data-entry standard

- Minimize asked input; fetch automatically what the system already knows; **prefill reasonable defaults**.
- **Pickers/choices over free text** whenever the value set is known.
- Labeled fields + format-showing placeholders ("name@example.com"); formatters that only accept valid input.
- **Inline validation as values are entered** — error at the moment and place of the problem, never only at submit.
- **Required = disabled-until-valid:** the Continue action stays disabled until required fields are valid, and required fields are unmistakable. Composes with Dealer OS R05: soft-fail fields never block progression.
- Never prepopulate password fields; obscure sensitive entry (SSN, credit fields).

## 4. Modality discipline

A modal is allowed only for one of four jobs: (1) critical info requiring action, (2) confirm/modify the last action, (3) a distinct, narrowly-scoped task, (4) deliberate immersion. Otherwise nonmodal.
- One modal at a time; never more than one alert.
- **No app-within-a-modal:** no navigation hierarchy inside a modal; unavoidable subviews get a single path through.
- Modal titled by its task; obvious dismissal; **confirm before dismissing if unsaved user content would be lost** (gesture and button both).

## 5. Undo, charts, search, onboarding

- **Undo:** name the action ("Undo Typing"); show the result — scroll to it if off-screen; support multiple undo; offer revert-all where sessions are long (desking/worksheet).
- **Charts:** chart only for trend/state/comparison — otherwise a sortable table. Same dataset keeps identical chart type/colors/annotations from card to expanded view (continuity). Novel chart forms must teach themselves. Every chart element carries accessibility labels.
- **Search:** one clear place to search everything; local search is a filter on the current view; **scope always visible**; recents before typing, suggestions while typing; history clearable.
- **Onboarding:** contextual just-in-time tips over upfront tutorials; skippable, never re-shown, reachable later; ship usable defaults; request permissions at first use, with the why.

## 6. Dark-surface architecture

- **Elevation on dark = lighter surface,** formalized as two stacks: **base** (page → deep → inset — recede) and **elevated** (card → raised — sheets, drawers, popovers, foreground layers). Modals/sheets on dark use the raised end of the ramp, never shadow.
- Muted text (`--text-muted`) is prohibited on surface pairings that fall under 4.5:1 — check the pairing, use the next tier up.
- White-background content images (unit photos, documents) are slightly darkened on dark UI so they don't glow.
- Tokens are semantic: components reference tokens only, never raw hex — so higher-contrast variant sets can ship without component edits.

## 7. Layer model & motion (the matte translation of Liquid Glass)

- **Two layers:** content, and a floating control layer above it (sticky bars, tab rails, toolbars). The control layer uses one documented surface treatment — raised surface + hairline border — and marks the content transition with an **opaque gradient scrim/fade edge, never blur.**
- Four-step separation-strength scale maps to the existing surface ramp; pick surfaces by role, never by rendered appearance.
- **Reduced motion contract (`prefers-reduced-motion`):** every transition has a fade fallback — fades replace slides/zooms, no depth/blur transitions, animations cancelable, never force waiting. Don't animate frequent-path UI.

## 8. Writing additions

- **Error grammar:** no blame, no "Oops"; state the fix at the point of the problem ("Choose a password with at least 8 characters"); instruct positively ("Use only letters," never "Invalid name"). **If an error is common, the interaction design is the bug.**
- Never "we" in UI copy ("Unable to load content," not "We're having trouble").
- Settings labels describe what ON does; link directly to settings rather than describing paths.
- One progression verb per flow, never mixed. On shared floor surfaces (mixed touch/pointer), prefer input-neutral verbs ("Select," "Choose") over "tap"/"click."

## 9. Named divergences from Apple (deliberate, defended, closed)

1. **Matte over Liquid Glass** — no blur/translucency; Nexus is matte by decree. Precedent from Apple itself: glass flattens to opaque under Reduce Transparency/Increase Contrast — opaque *is* the accessible baseline. Also GPU cost on floor tablets.
2. **Theme by surface role, not user toggle** — dark portal/ops, light data-admin. Not a user preference.
3. **Brand fonts over system fonts** — Bebas Neue / Barlow Condensed / Source Sans 3 / JetBrains Mono, with documented substitution rationale.
4. **Full-width mobile CTAs** — deliberate Fitts's-Law thumb-reach decision on the customer portal.
