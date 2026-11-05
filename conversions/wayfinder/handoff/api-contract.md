# API contract · Wayfinder Discovery (proposed)

| Endpoint | Purpose | Status |
|---|---|---|
| `GET /inventory/snapshot` | Current snapshot (columnar) | Needed |
| `GET/PUT /cases/{id}/discovery` | Load / save answers + current step on every change | Needed (Q-OD-6) |
| `GET /cases/{id}/discovery/matches` | Matches for the saved answers (engine server-side or client) | Needed |
| `POST /cases/{id}/discovery/send` | Customer "Send to my outfitter" (Q-WF-2) | Needed |
| `POST /cases/{id}/trade-in` | Trade-in record (+ voice note if Q-WF-3 says upload) | Needed |
| `GET /reference/tow-vehicles?my=2026` | Tow guide rows (make, model, engine, rating, note) | Needed (prototype ships `data/tow-vehicles.js`) |
| `GET /cases/{id}/discovery/decision-record` | Same JSON as the export | Proposed |
