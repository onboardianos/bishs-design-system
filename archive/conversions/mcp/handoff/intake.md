# MCP · Business intake (pass 0)

## 1 · Purpose
After discovery, the sales manager builds the customer's **3 + 1**: three recommended units plus one "great idea", priced against the customer's monthly ceiling, and sends them to the customer. Source: Figma MCP v2 frames; Floor Workspace hub ("Manager select Top 3", "Do MCP now").

## 2 · Roles (see `documents/roles-and-permissions.md`)
| Permission | Sales manager | Outfitter | Source |
|---|---|---|---|
| `mcp.edit_deal` | act | read | Figma (manager surface) · outfitter posture is a **proposal** |
| `mcp.select` | act | hidden | Figma |
| `mcp.place` | act | hidden | Figma |
| `mcp.send` (COMMIT) | act | hidden | Figma |
| `mcp.view_margin` | act | hidden | Figma shows unit cost + margin · hiding from outfitters is a **proposal** |
| `mcp.filters` | act | act | proposal |

## 3 · Business rules
| ID | Rule | Source |
|---|---|---|
| BR-M01 | Payment = amortised (DSRP + tax − down − trade equity) at rate % over term, term capped at 240 mo | Figma: $38,995 → $38,335 financed → $389/mo (verified on every row) |
| BR-M02 | A unit **fits** when payment ≤ ceiling; results split into Inside / Over the ceiling, each oldest-first | Figma |
| BR-M03 | Same config units are grouped; the row shows the oldest stock and "N units" | Figma ("6 units · oldest of 6 shown") |
| BR-M04 | Four slots in fixed order: Slot 1, Slot 2, Target unit, Great idea | Figma |
| BR-M05 | Placing a unit in a slot also selects it; one unit can occupy one slot | Figma (rows read "In slot 2") |
| BR-M06 | Compare & send needs at least one placed unit | Figma ("Drag at least 1 unit into a slot to compare and send") |
| BR-M07 | Response clock counts up against a 5:00 target | Figma ("Response 0:43 / 5:00") |
| BR-M08 | AI shortlist = 5 units with reasons drawn from discovery answers | Figma |
| BR-M09 | Tax credit applies tax to (DSRP − trade amount) | **Proposal** · `needs-rule` (Q-MCP-5) |

## 4 · Open questions (`needs-rule`, tickets Blocked until answered)
| ID | Question |
|---|---|
| Q-MCP-1 | Can outfitters open MCP at all? Built as read-only. |
| Q-MCP-2 | What does Compare & send open? No compare frame exists; built as a direct send that locks picks. |
| Q-MCP-3 | Inventory feed: the frames show 12 of 39 configs and no stock list for grouped units. |
| Q-MCP-4 | Aged-unit threshold: 212 d and 406 d are flagged amber; 152 d is not. Built at 180 d. |
| Q-MCP-5 | Tax-credit and trade-equity math (trade ACV vs. trade amount). |
| Q-MCP-6 | What happens at 5:00? Built: clock turns red, no escalation. |
| Q-MCP-7 | Must-have match is only given for one unit (4 of 4); the matching rule is unknown. |
