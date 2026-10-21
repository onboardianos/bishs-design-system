# S1 Portal Home (Visit Recap state) — Decision-Architect Blueprint

Companion to: CUSTOMER_PORTAL_BLUEPRINT_v1.md (§7, screen S1)
Pipeline: decision-architect (Stages 1–4, validated) · 2026-08-04
Surface: Buying Center · dark mode · Nexus v1.1 tokens (read from colors_and_type.css)

## Stage 1 — Reality Resolution (summary)

- **State A:** customer at home, hours-to-days post-visit; cognitive load HIGH (units blurring, big-ticket stakes, memory fading).
- **State B:** one tap that resumes their decision where their energy actually is. The system computes the target (priority: new outfitter answers > favorite-unit review > confidence checklist). Customer recalls nothing.
- **Surface class:** decision → Hick's hard cap, ≤3 primaries.
- **System offload:** right-now computation, new-activity counts, verdict aggregation, stage detection.

## Stage 2 — Choice Reduction (summary)

11 candidates → **3 primaries** (`hicks_law_check: passed`):
1. `right_now_card` (THE action) · 2. `tour_board_entry` · 3. `recommendations_entry`
Secondary: confidence meter row, Ask-a-Question footer. Recessed: share/settings/help/notifications (footer menu), passed units (inside Tour Board only, never on Home).

## Stage 3 — Nexus Spatial Architecture

```json
{
  "case_id": "portal-s1-home-visit-recap",
  "surface_mode": "dark",
  "information_scent_rule": "GLOBAL: every tappable label names its concrete destination contents — real names, real counts, real unit names. Banned label patterns: 'New activity', 'View more', 'My stuff', 'Updates'.",
  "nexus_hierarchy": {
    "action_layer": {
      "elements": [
        {
          "element_id": "right_now_card",
          "role": "THE primary action — system-computed next-best step",
          "label_pattern": "'Sarah answered your 3 questions about the Brinkley Model Z ▸' | 'Your favorite — Brinkley Model Z — review your tour notes ▸' | fallback: 'Check off what you know — 2 of 7 confidence items left ▸'",
          "scent": "names the person (attribution chip w/ photo), the count, and the unit — the customer knows exactly what is behind the tap",
          "behavioral_rule": "never urgency/pressure framing; frames progress-forward ('review', 'see'), never loss ('don't miss out')"
        }
      ],
      "surface": "raised #243838, full-width, top of fold below timeline strip",
      "type_role": "unit name in font-display Bebas Neue; eyebrow 'RIGHT NOW' in font-ui Barlow Condensed 600 caps; body in Source Sans 3",
      "action_color": "gold #8B752E — the card CTA only; the entire card is the tap target",
      "fitts_placement": "first focal element after the 10-second re-ground; full-width card = maximal target; on mobile the CTA edge sits in natural thumb arc"
    },
    "context_layer": {
      "elements": [
        {
          "element_id": "tour_board_entry",
          "label_pattern": "'YOUR TOUR — 6 units · ★ 1 favorite · 2 maybes ▸' + favorite unit thumbnail + toured date + outfitter chip 'with Sarah'",
          "scent": "counts + the favorite's actual photo — predicts the board exactly"
        },
        {
          "element_id": "recommendations_entry",
          "label_pattern": "'PICKED FOR YOU BY MIKE — 4 units matched to your answers ▸' + manager chip",
          "scent": "names who picked and why-basis ('matched to your answers'), predicting the reasoning ribbons inside"
        },
        {
          "element_id": "journey_timeline_strip",
          "label_pattern": "7 nodes, current pulsing: 'VISIT ✓ · REVIEWING ● · NUMBERS · ...' — tappable nodes are only the filled ones",
          "scent": "each node names its stage in one word; empty nodes render muted (future, not clickable promises)"
        }
      ],
      "surface": "cards #1C2E2E on page #020000; timeline strip inset #111E1E at very top",
      "type_role": "card titles font-ui Barlow Condensed; counts font-mono JetBrains; prose font-body Source Sans 3; cream #E7DDB4 as text only",
      "de_emphasis": "smaller type scale + text-muted #7A7D76 for metadata — hierarchy by type role and surface, no blur"
    },
    "recessed_layer": {
      "elements": [
        { "element_id": "confidence_meter_row", "treatment": "compact single row under context cards: 'You understand 5 of 7 things buyers like you want to know ▸' — text-muted until >50% complete, then success #2F9E44 accent on the count" },
        { "element_id": "ask_question_entry", "treatment": "persistent footer bar, outlined style (never gold): 'Ask Sarah anything ▸' — secondary but always reachable; context-routes per blueprint" },
        { "element_id": "share_settings_help_notifications", "treatment": "progressive disclosure behind footer menu '···'; share lives on unit screens, not Home" },
        { "element_id": "passed_units", "treatment": "never on Home — inside Tour Board's collapsed lane only (loss-aversion: passing is progress, not failure)" }
      ]
    }
  }
}
```

## Stage 4 — Validation

```json
{
  "case_id": "portal-s1-home-visit-recap",
  "is_valid": true,
  "checks": {
    "surface_class_fit": "pass — decision surface; one computed primary, no wizard-split needed",
    "intent_alignment": "pass — every layer serves 'uncertain at home → re-grounded, one obvious next step'",
    "hick_stress_test": "pass — primary obvious in ~1s: one raised gold-CTA card above two context cards; 3 primaries total",
    "cognitive_friction": "pass — system computes the next-best action, activity counts, and stage; customer recalls nothing",
    "nexus_conformance": "pass — dark-surface tokens v1.1; gold = action only; status colors per taxonomy; glyphs ▸ · — only; no blur/glass/emoji; cream as text only"
  },
  "error_routing": { "target_stage": null, "violation_code": null, "details": null, "required_fix": null }
}
```

## Rationale (plain language)

The screen answers one question — "where was I, and what's the one thing worth doing right now?" — and the system answers it FOR the customer via the computed Right-Now card: one gold action, full-width, labeled with person + count + unit (information scent as law — no vague labels anywhere on this screen). Eleven candidates cut to three primaries. Passed units and utilities demoted by hierarchy, not deleted. Behavioral canon enforced structurally: no urgency mechanics, attribution chips on all dealer-authored content, "passed" framed as progress. Contextual adaptation is inherent: this is the Visit Recap composition of the stage-adaptive Home; the same three-slot structure re-composes per stage.

## Handoff

- → `reskin-to-nexus` / Figma: visual build of S1 from this hierarchy.
- → `dealer-os-case-designer`: Right-Now card computation rule + tap events = instrumentation of the "at-home review → return" moment.
- Next screen for this pipeline: S3 Unit Detail.
