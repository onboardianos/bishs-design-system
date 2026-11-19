# Engineering · Outfitter Discovery

- **Engine:** ship `data/engine.js` as a shared module (UMD, already Node-exportable). Unit-test gates, scoring and recovery against the snapshot fixture.
- **Snapshot:** serve from the inventory service; cache by `inventorySnapshotId`. Columnar JSON keeps the payload ~1.1 MB; gzip brings it to ~200 KB.
- **Performance:** every answer recomputes candidates and previews over ~6,900 units. Memoise `compute(S)` per answer set; move to a worker if p95 > 50 ms on the store tablets.
- **Components:** AppShell, Header, StatTile, QuestionCard, ChoiceTile, ChoiceChip/Group, Input, Card, Badge, Button from the DS. Custom blocks: StepRail, NumberStepper, Notice, Select, Checkbox (see component-map).
- **Container queries:** `@container app` at 640 / 1024.
