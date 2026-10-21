# The 27 Design Laws — Perception & Action Canon · STRUCTURAL

**Program:** Dealer OS · Bish's RV · **Date canonized:** 2026-08-05 (sources: KnowledgeHub — Decisioning UX Pattern Lab, Dashboard Choice Architecture Strategy Brief, perception research reports, decision-architect skill; diagram: `00000-ALL DESIGN HTML FILES\design-agent-orchestration.html`)

**How this canon works:** every law has a **home phase** — the altitude where it's cheapest to apply. At **ideation** a law is a question (cost: a conversation). At **creation** it's a component or build rule (cost: a layout revision). At **critique** it's a pass/fail test (cost: a rebuild). Load-bearing laws echo at all three altitudes. Laws are cited as L01–L27; companion standards live in `hig-adoptions-2026-08-05.md` and the RF01–RF12 fluidity spec.

---

## I. IDEATION — the architect's ordered interrogation

One agent holds these because they gate each other. Asked in this order; the blueprint is not emitted until every answer exists.

**L15 · Dual-process (System 1/2).** Glance-and-react or weigh-and-commit? Gates every law below — sets tiering, salience budget, friction posture.
**L07 · One truth, five forms.** *The gate:* is this a new truth, or a new encoding of an existing truth? If existing → spec an encoding switch, not a new product. Can end the run.
**L13 · Hick's Law + surface class.** Classify decision / authoring / monitoring, enumerate everything the screen could do, cut to the class ceiling: ≤3 primary actions / ≤3 control clusters (never wizard-split a calculator) / ≤3 response actions with unlimited readout density.
**L12 · Guided vs. expert density.** Who is this user on their fiftieth repetition? First-timer → one thing at a time; expert → dense recognition surface. Minimalism-as-dogma is the named trap.
**L16·17 · Choice architecture + defaults.** Write the sentence: "On open, the pre-selected state is ___, and 80–95% will keep it." The default IS the spec — filters, sort, pre-staged action, prefills.
**L22 · OODA closure.** No metric enters the blueprint without its lever: owner seat + source event + offered action. Can't fill the three fields → the metric is decoration; cut it.
**L21 · Pacing / projection.** Every count or rate must carry a verdict: projection vs goal, in words ("Behind · 18 short — act now"). Changes the data contract, so it's decided here.
**L24 · Explorable simulation.** Does the user need *intuition* about a lever (→ spec a simulator, bind input to output) or *information* (→ a report)? Gated by the authoring class.
**L26 · Progressive disclosure / context-switch penalty.** Inventory the full triage journey; spec Tier 1/2/3 within the surface. Any step requiring a tab exit is a spec defect (20+ min re-orientation cost).

## II. CREATION — laws pushed out of judgment, into artifacts

**Component-encoded (can't be built wrong):**
**L04 · Redundant encoding.** Status chip = color + glyph + value, one unit. Never a bare colored dot. (Colorblind-proof by construction.)
**L05 · Comparison is comprehension.** No naked number: every rate/count ships with its reference slot inline — target tick, peer median, or bands (the bullet-graph discipline).
**L18 · Friction calibration.** Confirm pattern in blast-radius variants: routine = one tap + undo; destructive = type-the-identifier + downstream preview. Generic "Are you sure?" is forbidden — it trains click-through.
**L25 · Commanded ≠ confirmed.** Async actions carry both states + freshness: what was requested, what the source confirmed, and how stale that confirmation is ("Submitted 2:14 PM · no lender ack · last checked 55s ago"). The optimistic checkmark is the state you don't build.

**Rule-encoded (enforced during assembly):**
**L01 · Pre-attentive triage.** Build the *dim state* first — healthy elements recede so the one anomaly owns the only high-salience treatment (<200ms pop).
**L02 · Conjunction budget.** ≤2 simultaneous salience channels per viewport (color, motion, size each count as one). The anomaly that's already red does not also blink and grow.
**L03 · Gestalt grouping.** Group with space and common region before lines and labels; gaps between groups visibly larger than gaps within them.
**L08 · Scan patterns + urgency zoning.** The one critical thing goes top-left (~65% of first fixations); status badges hug the left edge of tables (F-pattern); commit actions end the reading path (Z-pattern).
**L09 · Miller/Cowan chunk cap.** 5–7 top-level chunks per viewport. The eighth gets demoted to Tier 2, never absorbed.
**L10 · Perceptual color thresholds.** Distinguishable-at-a-glance pairs verified (ΔE, and the contrast floors in hig-adoptions §1) against the real Nexus hexes.
**L14 · Fitts's Law.** The primary gold action is the largest target, high-contrast, placed where the eye rests after the context layer. Full-width on mobile (named divergence — thumb reach).
**L19 · Goal-gradient + endowed progress.** Progress shows a velocity vector and projected completion; system-verifiable steps render pre-completed on open.
**L20 · Loss-aversion countdown.** Timers count down to breach, never up from start ("4 days until aging threshold" moves someone; "day 11" is trivia).

## III. CRITIQUE — laws that only work as tests on a rendered screen

Five independent judges, each with a narrow rubric, each seeing the artifact + the original blueprint (so intent is tested, not just craft). Independence is the feature — one broad reviewer smooths over what narrow lenses catch.

| Judge | Owns | Tests |
|---|---|---|
| **SALIENCE** | L01 L02 L03 L08 L09 L12 | Squint test: exactly one thing pops, in the right zone. Salience-channel count ≤2. Chunk cap. Density fits the user's expertise. |
| **ACTION** | L13 L14 L16·17 L18 L22 | 1-second test (name the primary action cold). Reach test. Default-state audit. Stranded-insight check: every alert names who/where/what button. Modality four-part test (hig-adoptions §4). |
| **HONESTY** | L05 L06 L19 L20 L21 L23 | **L06 · Tufte:** lie factor = shown effect ÷ real effect; zero-based axes; chartjunk deleted mentally — did meaning survive? Naked-number sweep. Verdict check ("so will we make it?"). **L23 · Sampling humility:** every rate shows its n; sub-~90-event rates hatched/faded — thin data never gets solid ink. |
| **ENCODING** | L04 L10 | Colorblind simulation over the screenshot. Contrast floors (4.5:1; 7:1 target on dark). Status meaning survives grayscale. |
| **ORIENTATION** | L11 L24 L25 L26 | **L11 · Overview + detail:** click every drill-down — does the map survive? No modal-swallows-map. State-lie check (optimistic ✓). Tab-exit check. Simulator's model visible, not buried. |

**L27 · Cry-wolf / signal detection** exits the panel: it's a production-data audit (% of fired alerts that produced action), run by Prove-It, not on pixels. If most alerts are ignored, the fix is the threshold, not the styling.

**Routing:** every confirmed finding is tagged `craft violation ▸ rebuild` (back to creation) or `intent violation ▸ re-architect` (back to ideation — the screen answers the wrong question). Findings without a routing tag are observations, not findings.

---

## The echo principle

Seven laws appear at all three altitudes — as decision → rule → test: **L01, L04, L05, L13, L14, L21, L22.** When one of these fails at critique, check whether it was ever asked at ideation; if not, the fix is upstream, and the intake was the defect.
