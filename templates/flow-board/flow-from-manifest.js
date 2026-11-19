// Builds flow.json for the Requirements & Flow Board from a SpecLint manifest.
// Load after the design-system bundle; exposes window.BishFlowBoard.
//   const flow = BishFlowBoard.fromManifest(manifest, spec, reqText);
//   BishFlowBoard.download(flow);            → flow.json for templates/flow-board/
//   BishFlowBoard.validate(flow)             → [{ level, message }]
// manifest: SpecLint.manifest(build, snaps)  (entries carry states[]).
// spec:     the hand-written parts — roles, screens (key, state, role, col, label, num, kind, frame, artboards, modules, exits, image|src), edges, questions, columns.
// reqText:  family → { purpose, behaviour, acceptance, validation, source } (the same map the build feeds SpecLint.requirements; e.g. FW_REQ).
(function () {
  const fam = (id) => String(id || '').split('#')[0];
  function fromManifest(manifest, spec, reqText) {
    reqText = reqText || {};
    const entries = (manifest && manifest.entries) || [];
    const screens = (spec.screens || []).map((s) => {
      const inState = entries.filter((e) => (e.states || []).includes(s.state) && (!s.frame || !e.frame || fam(e.frame) === fam(s.frame) || e.level === 'shell'));
      const elements = [...new Set(inState.map((e) => e.id))];
      let requirements = s.requirements;
      if (!requirements) {
        const families = [...new Set(inState.filter((e) => e.level !== 'shell' && (e.interactive || e.level === 'frame')).map((e) => e.family))];
        requirements = families.map((f) => {
          const t = reqText[f] || reqText[f + '#'] || null;
          return t ? { id: f, purpose: t.purpose, behaviour: t.behaviour, validation: t.validation, acceptance: t.acceptance, source: t.source || 'requirements' } : { id: f, purpose: 'No requirement text for this family', acceptance: '', source: null };
        });
      }
      return { ...s, elements, requirements };
    });
    return {
      build: spec.build || manifest.build, version: spec.version || manifest.version, generated: new Date().toISOString().slice(0, 10),
      sources: spec.sources || ['manifest ' + (manifest.build || '') + ' ' + (manifest.version || '')],
      columns: spec.columns, roles: spec.roles, screens, edges: spec.edges || [], questions: spec.questions || [],
    };
  }
  function validate(flow) {
    const out = [], keys = new Set((flow.screens || []).map((s) => s.key)), roles = new Set((flow.roles || []).map((r) => r.id));
    (flow.screens || []).forEach((s) => {
      if (!roles.has(s.role)) out.push({ level: 'error', message: `Screen ${s.key}: role "${s.role}" is not in roles[]` });
      if (!(s.requirements || []).length) out.push({ level: 'error', message: `Screen ${s.key}: no requirements (G10)` });
      (s.requirements || []).forEach((r) => { if (!r.source) out.push({ level: 'warn', message: `Screen ${s.key}: ${r.id} has no source — needs-rule (G12)` }); });
      if (!(s.artboards || []).length) out.push({ level: 'error', message: `Screen ${s.key}: no artboard (G9)` });
    });
    (flow.edges || []).forEach((e) => {
      if (!keys.has(e.from) || !keys.has(e.to)) out.push({ level: 'error', message: `Edge ${e.from} → ${e.to}: unknown screen key` });
      const from = (flow.screens || []).find((s) => s.key === e.from);
      if (from && Array.isArray(from.elements) && !from.elements.some((x) => fam(x) === fam(e.trigger))) out.push({ level: 'error', message: `Edge ${e.from} → ${e.to}: trigger ${e.trigger} is not stamped in that state (G2)` });
    });
    return out;
  }
  function download(flow, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(flow, null, 2)], { type: 'application/json' }));
    a.download = name || 'flow.json'; document.body.appendChild(a); a.click(); a.remove();
  }
  window.BishFlowBoard = { fromManifest, validate, download };
})();
