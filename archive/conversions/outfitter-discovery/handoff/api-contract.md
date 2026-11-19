# API contract · Outfitter Discovery (proposed)

| Endpoint | Purpose | Status |
|---|---|---|
| `GET /inventory/snapshot` | Current snapshot (columnar) | Needed |
| `GET/PUT /cases/{id}/discovery` | Load / save answers + current step on every change | Needed (Q-OD-6) |
| `GET /cases/{id}/discovery/matches` | Matches for the saved answers (engine server-side or client) | Needed |
