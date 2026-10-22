# Business intake (REQUIRED — Step 0D, pass 0)

Fill this in **before** converting or building. The design system turns design structure into tickets. Business rules come only from this intake, and from precedents you confirm. Anything left blank becomes an open question and a **needs-rule** ticket, never an invented rule.

Save it as `<build>/handoff/intake.md`. Every answer needs a **source**: a doc, transcript, ticket, SOP, person and date, or "Zach, 2026-10-22".

## 1 · Outcome
| Field | Answer | Source |
|---|---|---|
| Problem this build solves (one sentence) | | |
| Who has the problem (roles) | | |
| What success looks like (measurable KPI + target) | | |
| What happens today without it (current workaround) | | |
| Out of scope (explicitly) | | |
| Release target (MVP date / phase) | | |

## 2 · Roles
For every role that reaches the build: the role key, what they must be able to do, what they must **not** see or do, and their data scope (own store / own customers / all).

| Role | Must do | Must not | Data scope | Source |
|---|---|---|---|---|
| | | | | |

## 3 · Business rules
One row per rule. A rule is anything a reviewer could say "that's wrong" about: limits, required fields, who approves, sequencing, timing, notifications.

| # | Rule | Applies to (screen / action) | Exception | Source |
|---|---|---|---|---|
| BR-01 | | | | |

## 4 · Data
| Entity | Source system (DMS / CRM / HR / new) | Live or batch | Owner | Source |
|---|---|---|---|---|
| | | | | |

## 5 · Approvals & audit
| Action | Needs approval by | Must be audited? | Retention | Source |
|---|---|---|---|---|
| | | | | |

## 6 · Notifications & integrations
| Trigger | Who is told | Channel (push / SMS / email / in-app) | Source |
|---|---|---|---|
| | | | |

## 7 · Edge cases you already know about
| Case | Expected behaviour | Source |
|---|---|---|
| | | |

## 8 · Inputs attached
List every file given to the build (brief, transcript, screenshots, existing Jira epic, SOP). The intake skills (*bishs-prototype-complete-handoff*, *product-experience-completeness*, *meeting-intelligence-execution*) extract rows from these into sections 1–7, each with its source quoted.

---

**How intake is used:**
- Each **BR-##** rule is attached to the element families it governs, in `<build>-requirements` (`rule: 'BR-03'`).
- The ticket generator copies each linked rule into the ticket's acceptance criteria and its *Source* field.
- A ticket with no linked rule, precedent or canon source is exported with the label **needs-rule** and status **Blocked**.
