# Roles & permissions (REQUIRED — canon)

Every Bish's build defines **who can see what** and **who can do what**, for every screen, section, action and field. It does this before handoff, in a matrix that traces to stamped elements. Navigation visibility lives in `NavConfig` and is admin-owned. Permissions follow the same model: one global catalog, switched on per role in the admin tool.

## 1 · Role catalog

| Key | Role | Surface | Scope of data |
|---|---|---|---|
| `admin` | Internal admin | Desktop | All stores |
| `gm` | General manager | Desktop | Own store(s) |
| `manager` | Sales manager | Desktop / tablet | Own store |
| `receptionist` | Front desk | Desktop / tablet | Own store · today |
| `outfitter` | Sales outfitter | Phone / tablet | Own customers + rotation |
| `fi` | F&I producer | Desktop | Deals in F&I for own store |
| `tech` | Service technician | Phone / tablet | Assigned work orders |
| `customer` | Customer | Phone / web | Own case only |

New roles are added in **Admin › Roles & Navigation**. A role is a bundle of navigation, permissions and a data scope. It is never hardcoded in a screen.

## 2 · Permission verbs

Each permission is named `<entity>.<verb>`, e.g. `case.assign`, `rep.bench` or `rotation.reorder`.

| Verb | Meaning |
|---|---|
| `view` | Can see the entity or field |
| `create` | Can create it |
| `edit` | Can change fields |
| `move` | Can change state or phase |
| `assign` | Can set the owner |
| `override` | Can act outside the normal rule (out-of-turn assignment, skipping rotation) |
| `approve` | Can approve another person's request |
| `bench` / `pause` | Can take someone out of rotation |
| `delete` / `close` | Can end the entity (customer left, void) |
| `export` | Can export data |

## 3 · Access states (per role × element)

| State | UI treatment | Stamp |
|---|---|---|
| **hidden** | Not rendered at all. Use when the role has no business knowing it exists. | — |
| **read** | Visible, with no action affordance | `data-bos-access="read"` |
| **act** | Fully enabled | `data-bos-access="act"` |
| **reason** | Enabled; commit requires a reason, and it's audited | `data-bos-access="reason"` |
| **approve** | Enabled, but creates a request that a role with `approve` must confirm | `data-bos-access="approve"` |
| **disabled** | Visible but disabled, with an inline explanation of who *can* do it. Use only when knowing the control exists helps the user (e.g. "Only a manager can bench or un-bench"). | `data-bos-access="disabled"` |

Default to **hidden** over **disabled**. A disabled control must always say why and who can do it, following the HIG error grammar.

## 4 · Stamping permission points

Every gated element carries `data-bos-perm="<entity>.<verb>"` and its current `data-bos-access` for the rendered role. The manifest records both, so the handoff lists every permission point and SpecLint can check:
- every `commit` or `action` element that changes data has a `data-bos-perm`;
- no element with `data-bos-access="hidden"` is in the DOM.

## 5 · Data visibility scopes & privacy firewalls (RF11)

- **Own-store:** staff see only their store unless their role is `admin` or `gm`.
- **Own-customers:** outfitters see full detail for their own cases only. Others' cases show as name + phase only.
- **Own-stats:** outfitters see their own stats. Peer comparison is a manager view.
- **Customer firewall:** customers never see internal notes, outfitter performance, rotation, bench reasons, F&I numbers or other customers.
- **Coaching & discipline:** bench reasons, coaching notes and bench history are visible to `manager`, `gm` and `admin` only.
- **Audit:** every `override`, `bench`, `pause`, `reason` and `approve` action writes an audit entry: who, what, reason, when.

## 6 · Required in every build

1. `handoff/roles-permissions.md`, the 10th handoff file:
   - Matrix A: roles × screens / sections (hidden / read / act).
   - Matrix B: roles × actions (`<entity>.<verb>` → access state, approver, audit).
   - Matrix C: roles × data fields (visibility scope).
   - Approval chains, plus a list of every audit event.
2. **A designed posture for every role that can reach the build.** It appears as a Canvas section per role and in the Prototype **Role** switcher.
3. **Gate G11:** every reaching role has a matrix row, a built posture and a reviewed state, and every data-changing control carries `data-bos-perm`.
