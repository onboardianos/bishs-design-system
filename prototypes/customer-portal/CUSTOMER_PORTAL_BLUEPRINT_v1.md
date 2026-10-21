# Customer Portal — Product Blueprint v1

Dealer OS · Customer-facing surface · Blueprint spec (product-blueprint-agent output)
Drafted 2026-08-04 · Sources: Zach's portal brief (verbal, this session), Dealer_OS_Requirements_Master (Module 01 Shopping Environment + M7 Ownership OE-01–OE-04), six-phase journey model, In-Store Walkthrough documentation tool, Bluesheet discovery spec, desking/worksheet + trade appraisal tools, CIT finance-journey tracking.

---

## 1. Executive summary

The Customer Portal is the customer's side of the Dealer OS glass: one persistent, personal place where everything that happened — and everything that happens next — is visible, understandable, and actionable. It is not a website page; it is a **journey companion that transforms with the customer**. The same portal renders differently depending on where the customer is: after a visit it is a recap and decision tool; during financing it is a progress tracker; after delivery it is an ownership concierge.

**First build focus (this blueprint's detail layer): the Visit Recap → Decide stage.** A customer sits with an outfitter, answers discovery questions, gets manager-recommended units with reasoning, tours units while the outfitter documents likes/dislikes/verdicts — then goes home. The portal is what they open at home: every unit they toured, their own words, their pros and cons, their verdicts (Passed / Maybe / Favorite), their open questions with outfitter answers, and a clear path to the next step.

**North-star behavior:** the customer never has to remember, guess, or chase. They review, they comprehend, they check the box — *"I know what I need to know"* — and they move.

---

## 2. Business outcome map

| # | BUSINESS OUTCOME | Portal mechanism | Metric |
|---|---|---|---|
| B1 | Recover the "went home to think about it" customer — the largest leak in the funnel | At-home Visit Recap: their own tour notes, pros/cons, favorites; per-unit Q&A that pulls them back into dialogue | Return-visit rate after first visit; portal-login rate within 72h of visit |
| B2 | Faster, more confident decisions | Stage-specific comprehension checklist ("what you need to know to be confident"); side-by-side compare of toured units | Days from first visit → deposit; % customers completing comprehension check |
| B3 | Trust through transparency | Trade reasoning + marketplace analysis shown, not hidden; finance progress visible (who's working, which banks, status) | Deal-jacket dispute rate; finance-stage inbound call volume (should drop) |
| B4 | Word-of-mouth reach | Shareable unit views (family/friends see the RV, not the money) | Shares created; visits originating from share links |
| B5 | Lifetime retention (V2) | Ownership ecosystem: service booking, RVFix, first-trip planning, repurchase pathway (OE-01–OE-04) | Service bookings via portal; repurchase re-entry rate |
| B6 | Readiness signal to the floor | Every portal action (units re-viewed, questions asked, boxes checked) feeds readiness scoring to the outfitter/manager | Readiness-score accuracy vs. actual close |

---

## 3. Roles and permissions

| Role | Sees | Can do | Never sees |
|---|---|---|---|
| **Customer** (account owner) | Everything in their own journey: units, notes, verdicts, Q&A, worksheet (once shared), trade eval, finance progress, delivery, ownership | Review, ask questions, check comprehension boxes, share units, request video call, e-sign, deposit, schedule | Other customers; internal-only manager notes; margin/cost data |
| **Co-shopper** (via share link) | Shared unit(s): photos, specs, pros/cons chosen for sharing | View only; optional reaction | ALL financials, trade data, personal Q&A, discovery answers |
| **Outfitter** | Mirror of their customer's portal (via Floor Workspace) | Answer questions, add tour documentation, nudge next step | Customer's private comprehension state edits |
| **Sales Manager** | Same mirror + controls | Publish recommendations + reasoning; share worksheet; approve trade eval publication | — |
| **Finance (F&I)** | Finance stage of the mirror | Update finance progress states; start video call; request docs | Pre-finance browsing behavior detail |
| **System (Concierge)** | — | Stage transitions, notifications, checklists, content service | — |

`REQUIREMENT` — Customer-private vs. outfitter-private discipline applies (Dealer OS standard): the customer's raw discovery answers and tour quotes belong to the customer's view; internal strategy notes never render in the portal.

`REQUIREMENT` — Share links expose zero financial data, zero discovery data, zero Q&A. Units only.

---

## 4. High-level canvas architecture (macro layer)

One portal, eight stage-states. The Home surface re-composes per stage; nothing is ever deleted — completed stages collapse into the **Journey Timeline** (always accessible).

```
[0 BROWSE]* → [1 VISIT PREP] → [2 VISIT RECAP ●FOCUS] → [3 DECIDE] → [4 STRUCTURE] → [5 COMMIT] → [6 IN-FLIGHT] → [7 OWN]
```

| Stage | Portal becomes | Primary content | Source module |
|---|---|---|---|
| 0 Browse *(future-first: online start)* | Inventory explorer + progressive profile | Saved units, preferences forming | Module 01 |
| 1 Visit Prep | Appointment companion | What to expect, who you'll meet, directions | Reception/check-in |
| **2 Visit Recap — FOCUS** | **Tour memory + recommendation review** | **Recommended units + why · toured units · pros/cons · verdicts · Q&A** | **Bluesheet + Walkthrough tool** |
| 3 Decide | Comparison + confidence builder | Compare favorites, comprehension checklist, schedule re-visit | Portal-native |
| 4 Structure | The numbers, transparently | Worksheet (price/discount/payments), trade eval + reasoning + marketplace analysis | Desking + Trade tools |
| 5 Commit | Signing room | Deposit, agreement e-sign, what happens next | Closing journey |
| 6 In-Flight | Progress tracker | Finance status (who/where/which banks), approval alerts, video call, delivery scheduling + prep videos/checklist | CIT tracking + Delivery |
| 7 Own | Ownership ecosystem (V2) | Unit + docs + warranty, service booking, RVFix, first-trip planner, seasonal reminders | M7: OE-01–OE-04 |

**Canvas layout note (Figma):** center anchor = Portal Home in its 8 stage variants arranged left→right; each stage's screen cluster hangs below its Home variant; spec text blocks sit right of each screen; master visual key panel far left.

---

## 5. Visual key and system indicators

Bind to Nexus design system tokens. Portal-specific indicators:

| Indicator | Meaning |
|---|---|
| ★ gold badge | Customer's FAVORITE unit (verdict from tour) |
| ◐ amber badge | MAYBE unit |
| ✕ neutral-gray badge | PASSED unit (never red — passing is progress, not failure) |
| 🔒 lock chip | Content exists but not yet shared with customer (e.g., worksheet before manager publishes) |
| ✓ teal check | Comprehension item confirmed by customer |
| ● pulsing dot | New activity since last login (new answer, new status) |
| Role chip (photo + name) | Which human did/said this — outfitter, manager, finance. Every piece of dealer-authored content is attributed to a real person |
| "Why we picked this" ribbon | Manager reasoning block on recommended units |
| Green arrow | Customer forward action |
| Purple arrow | Dealer-side handoff happening for you (visible transparency) |
| Timeline node (filled/current/empty) | Journey progress marker |

`REQUIREMENT` — Every status uses the approved Nexus status-color taxonomy. No raw hex inventions.

`BUSINESS OUTCOME` — Attribution chips (real names, real faces) are the trust mechanism: "Mike is working on your financing right now" beats "Status: Processing."

---

## 6. Flow diagram description — FOCUS stage (Visit Recap → Decide)

**Entry points:** SMS/email link sent at visit end ("Your visit recap is ready") · direct login · QR handed by outfitter.

```
Login/Magic link
   └→ S1 PORTAL HOME (Visit Recap state)
         ├→ S2 MY RECOMMENDATIONS (manager picks + reasoning)
         │      └→ S3 UNIT DETAIL ──┬→ tab: Tour Notes (pros/cons/quotes)
         │                          ├→ tab: My Questions (Q&A thread)  ←── outfitter answers (purple handoff)
         │                          ├→ tab: Photos/Walkaround
         │                          └→ tab: Numbers 🔒 (until Stage 4 share)
         ├→ S4 MY TOUR BOARD (Favorite ★ / Maybe ◐ / Passed ✕ lanes)
         │      └→ S5 COMPARE (2–3 units side-by-side: specs + MY pros/cons)
         ├→ S6 CONFIDENCE CHECKLIST (comprehension check-offs)
         │      └→ unlocks/suggests → next-step actions (revisit, numbers request, talk to outfitter)
         ├→ S7 SHARE (create co-shopper link per unit)
         └→ GLOBAL: Ask-a-Question (context-aware, routes internally)
Back paths: every screen → Home. Loop: Q&A answer notification → deep-link to that unit's Questions tab.
Blocked path: Numbers tab locked until manager shares worksheet (shows "Ask for my numbers" CTA instead — turns a lock into a lead signal).
```

---

## 7. Screen-by-screen documentation (FOCUS stage)

### S1 — Portal Home · Visit Recap state

- **Purpose:** re-ground the customer in 10 seconds: where you are, what you did, what matters now.
- **BUSINESS OUTCOME:** B1/B2 — this is the screen that recaptures the at-home thinker.
- **Layout (top→bottom):**
  1. Journey timeline strip (stage 2 of 7 filled)
  2. "Right now" card: single most important next action (e.g., "You favorited the Brinkley Model Z — 3 of your questions have new answers ●")
  3. Your visit recap: date, outfitter chip, N units toured → S4
  4. Recommended for you (manager picks preview) → S2
  5. Confidence meter: X of Y comprehension items checked → S6
  6. Quiet footer: everything else (share, help, settings)
- **Controls:** cards are the buttons — no separate nav maze. Persistent: Ask-a-Question FAB, Journey Timeline.
- **State rules:** card stack composition is stage-driven (see §8). New-activity dots computed vs. last_seen_at.
- **Data/events:** `portal_session_start {stage, hrs_since_visit}` · `home_card_tap {card}`.
- **Edge:** zero units toured (visit cut short) → recap card becomes "Here's what we learned about what you want" (bluesheet echo) + recommendations.
- **Acceptance:** cold open → correct stage state < 1s; the "Right now" card always names a concrete action, never generic "Welcome back."

### S2 — My Recommendations

- **Purpose:** show the units the manager chose *for this customer* and — critically — **why**.
- **Content per unit card:** hero photo · year/make/model/floorplan · ★/◐/✕ badge if toured · **"Why we picked this for you" ribbon** — manager reasoning rendered as plain-language bullets explicitly tied to the customer's own discovery answers ("You said sleeping for 6 was a must — this bunkhouse sleeps 7") · toured/not-toured chip · **list price shown** (decided Q3); payments/discount/trade locked until worksheet publication.
- **REQUIREMENT:** reasoning must reference at least one discovery answer verbatim-adjacent. Generic reasoning ("great unit!") fails acceptance.
- **Controls:** card → S3 · "I want to see this one" (not-yet-toured units → notifies outfitter, schedules) · sort: Recommended order (manager-set) default.
- **Handoff (purple):** "I want to see this one" → outfitter notification + task; customer sees "Sarah's been notified — she'll reach out to set it up."
- **Events:** `recommendation_viewed`, `tour_requested {unit}` (a high-value readiness signal).

### S3 — Unit Detail (the workhorse screen)

- **Purpose:** everything about one unit *through this customer's eyes*.
- **Tabs:**
  1. **Overview** — photos/walkaround video, key specs, floorplan; share button.
  2. **My Tour Notes** — the outfitter-documented record, rendered as the customer's own: verdict badge; **Pros list / Cons list** built from their reactions; their quotes ("You said: 'This kitchen is exactly what Sarah wanted'"); attributed to outfitter chip with tour date.
  3. **My Questions** — per-unit Q&A thread. Customer asks here; answer arrives here (+ notification). Unanswered = "Sarah's on it" state with role chip.
  4. **Numbers** 🔒 — locked until Stage 4 publication. Locked state shows "Want to see what this would look like financially? → Request my numbers" (green CTA, high-value signal).
- **REQUIREMENT:** tour notes are read-only-authored by outfitter but the customer can add their own note ("Add my own note") — appended, attributed to customer, visible to outfitter mirror.
- **REQUIREMENT:** a question asked on a unit routes to the assigned outfitter; if unanswered > SLA (OPEN QUESTION Q4), escalates to manager.
- **Events:** `unit_viewed {verdict, tab, dwell}` · `question_asked {unit, tab_context}` · `numbers_requested {unit}` · `own_note_added`.
- **Edge:** unit sold while customer deliberates → banner "This one found a home" + manager-picked nearest alternates (never a dead end).

### S4 — My Tour Board

- **Purpose:** the verdict landscape at a glance — Favorite / Maybe / Passed lanes.
- **Layout:** three lanes with unit cards; Favorite lane visually elevated (gold, larger cards). Passed lane collapsed by default ("Show the ones you passed on (4)").
- **Controls:** card → S3 · select 2–3 across lanes → "Compare" → S5 · customer may move a card between lanes (**their** verdict; change syncs to outfitter mirror with notification — a Maybe→Favorite move is a hot signal).
- **Events:** `verdict_changed {from, to, unit}` · `compare_started {units}`.
- **Edge:** everything Passed → empathetic state: "None of these were the one — that's useful too." + "Here's what we learned" + re-engage CTA to outfitter.

### S5 — Compare

- **Purpose:** kill decision paralysis between finalists.
- **Content:** 2–3 columns; rows = photos, sleeps, length, weight/towability, key features **and — the differentiator — each unit's MY-pros / MY-cons rows** pulled from tour documentation. Spec rows where units are identical are collapsed by default ("Show 12 identical specs") so differences dominate.
- **REQUIREMENT:** comparison must foreground the customer's own recorded reactions, not just brochure specs. This is the screen where "what did *I* think?" gets answered.
- **Events:** `compare_viewed {units, dwell}`.

### S6 — Confidence Checklist (comprehension check-offs)

- **Purpose:** the customer's stated need made concrete: "check off the box — yes, I comprehend what I need to be confident."
- **Content:** stage-specific list of comprehension items, each with: plain statement ("I understand the difference between the two floorplans I'm considering") · supporting resource (video/short read/the relevant portal screen) · check control · optional "I still have a question about this" → opens contextual Q&A.
- Stage 2/3 list (v1): what I toured & my verdicts · why these units were recommended for me · key differences between my favorites · what towing/storage means for my situation · what the next step would be if I moved forward.
- **REQUIREMENT:** never gate portal features behind checklist completion — it's a confidence instrument, not a wall. It *suggests*: all-checked → celebrate + "Ready to see your numbers?" CTA.
- **BUSINESS OUTCOME:** B2/B6 — each check is a readiness event feeding the floor's readiness score.
- **Events:** `comprehension_checked {item}` · `comprehension_question {item}` · `checklist_completed {stage}`.

### S7 — Share

- **Purpose:** let the customer show the RV (B4) — safely.
- **Flow:** from unit → "Share this RV" → preview exactly what recipient sees (photos, specs, optionally selected pros) → toggle "include my pros list" (default OFF) → copy link/SMS.
- **REQUIREMENT:** share view contains zero pricing, zero trade, zero Q&A, zero discovery data. Preview-before-send is mandatory.
- **Events:** `share_created {unit, includes_pros}` · `share_opened {ref}` (anonymous).

### GLOBAL — Ask-a-Question

- **Purpose:** "ask it right there, in the area they want to ask about."
- **Behavior:** FAB present on every screen; question inherits context `{stage, screen, unit?, checklist_item?}`; routes by context map (unit/tour → outfitter · numbers/trade → sales manager · finance stage → F&I · delivery/service → concierge/service). Customer sees who received it (role chip) and typical response time.
- **REQUIREMENT:** context routing is invisible to the customer — they just ask. Internally the routing map is config, not code.
- **Events:** `question_asked {context…}` · `question_answered {latency}`.

---

## 8. State logic and gate rules

**Stage engine (portal-level):**

| Transition | Trigger (system event, never manual customer toggle) |
|---|---|
| 0→1 | Appointment set / check-in created |
| 1→2 | Visit session closed by outfitter (tour docs published) |
| 2→3 | Auto with 2 (Decide tools live immediately); Home emphasis shifts on first at-home login |
| 3→4 | Manager publishes worksheet/trade eval to portal |
| 4→5 | Customer initiates deposit/agreement OR manager sends agreement |
| 5→6 | Deposit confirmed |
| 6→7 | Delivery completed |

`REQUIREMENT` — Stages accumulate; they never hide history. Journey Timeline exposes every prior stage read-only.
`REQUIREMENT` — Regression allowed (deal falls through at 5 → portal returns to 3 gracefully, no data loss, no shame states).

**Content locks:**

| Content | Locked until | Locked-state behavior |
|---|---|---|
| Numbers tab (S3) | Manager publishes worksheet | Shows "Request my numbers" CTA (lock → lead signal) |
| Trade evaluation + marketplace analysis | Manager approves publication | Not rendered at all before (no teaser of unapproved numbers) |
| Finance progress | Deposit confirmed | N/A pre-stage |
| Tour notes | Outfitter closes visit session | Units show "toured today — notes coming shortly" same-day |

**Q&A SLA (decided):** unanswered question > **4 business hours** → manager escalation task; > 8 business hours → concierge auto-acknowledge to customer ("We haven't forgotten — flagged to the team").

---

## 9. Data, events, notifications, analytics

**Reads (existing Dealer OS sources — portal owns none of this data):** discovery answers (Bluesheet) · recommendations + reasoning (manager/desking) · tour documentation: pros, cons, quotes, verdicts (Walkthrough tool) · worksheet (Desking) · trade eval + marketplace analysis (Trade tool) · finance milestones (CIT tracking) · delivery scheduling · inventory/media.

**Portal-owned writes:** customer accounts/sessions · Q&A threads · comprehension checks · customer-authored notes · verdict changes · share links · notification prefs.

`DEV NOTE` — Portal is a *view + interaction layer* over existing Dealer OS records. Single source of truth stays in the origin modules; portal writes only its own interaction data. This is what makes the "mirror" (outfitter sees what customer sees) cheap and always-true.

**Event taxonomy (all events carry customer_id, stage, session):** listed per-screen above; every event streams to the readiness-scoring service (B6) and the analytics store.

**Notifications (customer-facing):** visit recap ready (visit close) · question answered (deep-link to thread) · numbers shared · finance milestone (approved, bank submitted, docs needed) · delivery reminders (T-7/T-1 with prep checklist). Channels: push/SMS/email per prefs. `REQUIREMENT` — every notification deep-links to the exact portal location it references.

---

## 10. Edge cases and failure states

1. Multiple visits → recaps stack in Timeline; Home always reflects latest; verdicts merge (latest wins, history kept).
2. Two decision-makers, one account → v1: shared login + co-shopper links. (`OPEN QUESTION` Q5: dual full accounts.)
3. Outfitter leaves company → attribution chips persist historically; active assignment re-routes; portal shows new outfitter intro card.
4. Unit sold mid-deliberation → S3 edge behavior (alternates, no dead end).
5. Customer never logs in → outfitter mirror shows "never opened"; triggers human follow-up task, not more automated spam.
6. Stale data/feed failure → sections render last-known with honest timestamp ("as of 2:14 PM"), never silent-blank.
7. Customer disputes a documented con ("I never said that") → "Add my own note" is the pressure valve; note notifies outfitter.

---

## 11. Developer handoff checklist

- [ ] Stage engine: event-driven state machine per §8; stages accumulate; regression path tested
- [ ] Read-model adapters for the 7 source modules (§9) with staleness timestamps
- [ ] Portal-owned schema: accounts, sessions, qa_threads, comprehension_checks, customer_notes, verdict_overrides, share_links, notification_prefs
- [ ] Q&A routing config map (context → role) — config-driven, not hardcoded
- [ ] Share-link renderer: separate unauthenticated view with hard allowlist of fields (deny-by-default)
- [ ] Notification service: template + deep-link per §9
- [ ] Readiness event stream: every listed event published
- [ ] Mirror parity: outfitter Floor Workspace renders customer view from same read models
- [ ] Auth: magic-link primary (low-friction), password optional
- [ ] Nexus token binding for all UI; status colors from approved taxonomy only

## 12. QA and acceptance criteria (stage-2 focus)

- [ ] Fresh customer, visit closed → recap SMS link → S1 renders correct stage, correct units, correct verdicts
- [ ] Pros/cons/quotes exactly match walkthrough tool records; attribution chips correct
- [ ] Question asked on unit → lands with assigned outfitter; answer → notification → deep-link → thread
- [ ] Numbers tab locked pre-publication; "Request my numbers" fires signal; unlocks correctly on publish
- [ ] Share link shows zero financial/discovery/Q&A data (verified against allowlist, not spot-check)
- [ ] Verdict move Maybe→Favorite reflects in outfitter mirror < 5s with notification
- [ ] Comprehension check-offs persist, never gate, feed readiness
- [ ] All screens render Nexus tokens; passes brand conformance review (dealer-os-case-reviewer)
- [ ] Empty/edge states: no-units visit, all-passed board, sold unit, stale feed

## 13. Open questions and assumptions

**DECIDED 2026-08-04 (Zach):**

| # | Decision |
|---|---|
| Q1 ✓ | **Real humans + neutral concierge.** Dealer-authored content always attributed to real people (role chips, names, faces); system content speaks as neutral "Bish's Concierge." No invented persona/avatar. |
| Q2 ✓ | **Browse stage deferred; design the progressive-profile schema now** so online-start bolts on later without re-platforming. No Browse screens in v1. |
| Q3 ✓ | **Show list price** on recommended units pre-worksheet (it's public on the website anyway). Payments, discounts, and trade math stay locked until worksheet publication. |
| Q4 ✓ | **Q&A SLA = 4 business hours** to outfitter, then manager escalation; 8 business hours triggers concierge auto-acknowledge. |

**Still open:**

| # | OPEN QUESTION |
|---|---|
| Q5 | Dual decision-maker accounts (spouse/partner) — v1 defaults to shared login + co-shopper links. |
| Q6 | Existing Customer Buying Portal App prototype: build base vs. reference-only — Claude to audit against this blueprint before new code. |

**Assumptions to confirm:** walkthrough tool captures pros/cons/quotes/verdicts in structured form (it was designed to); trade marketplace analysis is a produceable artifact per trade eval; CIT tracking exposes milestone events; magic-link auth acceptable to compliance.

---

## 14. Device-Adaptive Architecture — FOUNDATIONAL RULE (added 2026-08-04, per Zach)

`REQUIREMENT` — **No screen is designed for one device.** Every screen spec in this program names its per-device architecture before build. Mobile-first is the starting posture, never the finish line. If a device changes what the user expects or how they deliberate, that difference is named in the spec — this section is the template.

### 14.1 Device postures (same priorities, different posture)

| Device | Posture | What the extra context is FOR |
|---|---|---|
| **Mobile** | Glance-and-resume. One computed action, thumb reach, short sessions. | Nothing extra — Hick's at its hardest. Utilities recede behind ···. |
| **Desktop** | Sit-down deliberation. Longer sessions, often evening, often two people at the screen. | A **decision-support rail** beside (never above) the core hierarchy — answers the hesitations that stop the next step. |
| **Tablet/in-store** | Co-piloted. Outfitter mirror context. | Governed by the in-store program's Foundations doc, not this section. |

`REQUIREMENT` — The center column on desktop is the mobile hierarchy, unchanged in priority and order: your tour · your favorite · why it's the favorite · next step = numbers. The rail may never introduce a competing primary. One gold action per screen remains law on every device.

### 14.2 The Hesitation Ledger (desktop rail = hesitation answers)

The rail exists to answer one question: *if they don't tap "See My Numbers," why not?* Each module maps to a named hesitation. This ledger is maintained as hesitations are validated/discovered:

| Hesitation (why they stall) | Rail module answer | Screen(s) |
|---|---|---|
| "Asking for numbers = sales pressure" | **No-Pressure Estimate** — private self-serve payment ballpark, "nobody gets notified" | Home |
| "No idea what my current rig is worth" | **Your Trade** — real range in about a minute | Home |
| "I don't understand the process / what I'd be committing to" | **Learn Before You Decide** — how financing works (video), true cost of ownership (guide), what happens after yes (video) | Home |
| "I'm not deciding alone" | **Deciding Together** — share favorite (RV only, never numbers) + video-call scheduling | Home, Answers |
| "I still have unit questions" | **Your Outfitter** module + Related-to-your-questions resources | Answers, Tour |
| "Torn between finalists" | **Still Weighing It** — compare vs. maybes, second look booking | Tour |

`REQUIREMENT` — Every rail module carries information scent (concrete labels, durations, real names) and maps to a ledger row. A module that doesn't answer a named hesitation doesn't ship.
`BUSINESS OUTCOME` — Rail engagement is itself a readiness signal: which hesitation-answer a customer opens tells the outfitter exactly what's in the way (`rail_module_opened {module, hesitation}` event).

### 14.3 Build artifact

`PORTAL_FLOW_PROTOTYPE.html` (this folder) implements S1 Home + Answers thread + Tour Board responsively: ≤430px = full-bleed mobile app; ≥1024px = center column + sticky decision-support rail; in between = framed mobile presentation. This file is the living reference for the pattern.

## Next actions in the expert pipeline

1. **decision-architect** → run S1 Portal Home (Visit Recap state) through the pipeline: exact card stack, choice reduction, action placement bound to Nexus.
2. **dealer-os-case-designer** → case the conversion moment "at-home review → return/commit" (Type classification, R-codes, readiness instrumentation).
3. **ui-ux-pro-max** → style/palette/typography pass once Q1 (character) is decided.
4. **reskin-to-nexus / Figma** → screens S1–S7 from this spec + decision-architect blueprints.
5. Audit existing prototype (Q6) against this spec.
