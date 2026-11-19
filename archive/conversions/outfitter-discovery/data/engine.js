// Source: wayfinder_v2_connected_configurator.html — decision engine (spec v1.1). Carried over unchanged: business logic, not UI.
/*
 * Bish RV Adaptive Discovery Configurator - decision engine.
 * Implements handoff spec v1.1: hard gates (s9), candidate-aware option evaluation (s8),
 * rank groups + scoring (s11), payment/budget math (s10), zero-result recovery (s16).
 *
 * Plain script, no dependencies. Works in the browser (window.Engine) and in Node
 * (module.exports) so the same rules can be unit-tested and later hosted server-side
 * behind the s18 endpoints.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Engine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const QUESTIONNAIRE_VERSION = '1.1.0';
  const SCORING_VERSION = '1.1.0';

  // ------------------------------------------------------------------ characteristic ids
  const IDS = {
    DISH: 1, WASH: 2, DOUBLE_BATH: 3, DUAL_VANITY: 4, FRONT_BATH: 5, REAR_BATH: 6, WALK_THRU: 7, WETBATH: 8,
    DUAL_QUEEN: 9, EAST_WEST: 10, LOFT: 11, MURPHY: 12, TWIN_CONV: 13, TENT: 14, PRIVATE_MASTER: 15,
    TOY_SINGLE: 17, TOY_DOUBLE: 18, DOUBLE_BUNKS: 19, MID_BUNK: 20, PRIVATE_BUNK_ROOM: 21, QUAD_BUNKS: 22,
    SINGLE_BUNKS: 23, TRIPLE_BUNKS: 24, BATH_ENTRY: 25, DUAL_ENTRY: 26, CARGO_DOOR: 27, RAMP: 28,
    FRONT_KITCHEN: 29, REAR_KITCHEN: 30, L_KITCHEN: 31, ISLAND_KITCHEN: 32, U_KITCHEN: 33, FRONT_LIVING: 34,
    REAR_DINETTE: 35, REAR_LIVING: 36, REAR_ENT: 37, PRIVATE_OFFICE: 38, OUTSIDE_KITCHEN: 39,
    FRONT_CAP_WINDOW: 40, SIDE_PATIO: 41, REAR_PATIO: 42, BED_SLIDE: 43, WARDROBE_SLIDE: 44, FULL_WALL: 45,
    SUPER_SLIDE: 46, EXTENDED_SLIDE: 47, STANDARD_SLIDE: 48, TEARDROP: 49, AFRAME: 50,
  };
  const BUNK_IDS = [19, 20, 21, 22, 23, 24];
  const SLIDE_IDS = [43, 44, 45, 46, 47, 48];
  const TOY_BED_IDS = [17, 18];
  const MOTORHOME_CLASSES = ['AD', 'AG', 'B', 'C', 'CD'];
  const TOWABLE_CLASSES = ['TT', 'FW', 'TTTH', 'FWTH', 'HTT', 'FD', 'AT', 'TC', 'DT'];
  const TOY_CLASSES = ['TTTH', 'FWTH'];
  const COMPACT_CLASSES = ['TC', 'B', 'FD', 'HTT', 'AT'];
  const SIDEWALL_CLASSES = ['TT', 'FW', 'TTTH', 'FWTH', 'TC', 'DT', 'HTT', 'FD', 'AT'];

  // Spec s11.1 weights.
  const PREF_WEIGHT = { strongly: 12, prefer: 8, nice: 4, flexible: 6 };
  const MISS_PENALTY = { strongly: 6, prefer: 4, nice: 2, flexible: 2 };
  const AVOID_PENALTY = { avoid: 6, strong: 10 };
  const BASE_SCORE = {
    VERIFIED_AVAILABLE: 50, VERIFIED_L_STOCK_EXAMPLE: 45,
    PROBABLE_NEW: 40, PROBABLE_L: 35,
  };
  const RANK_ORDER = { VERIFIED_AVAILABLE: 1, VERIFIED_L_STOCK_EXAMPLE: 2, PROBABLE_NEEDS_VERIFICATION: 3, INELIGIBLE: 9 };

  // Spec s16.2 step 7 fixed precedence (lower = relax first).
  const GATE_PRECEDENCE = ['gvwrMax', 'lengthMaxFt', 'priceMax', 'sleepsMin', 'slidesMin', 'bunks', 'privateMaster', 'outsideKitchen', 'sidewall', 'classes'];
  const SAFETY_GATES = ['gvwrMax'];
  const PAYMENT_GATES = ['priceMax', 'priceMin'];

  // Spec s10.2.
  const APR_BY_TIER = { fair: 12.0, good: 9.0, veryGood: 6.99 };
  const TERM_BANDS = [
    { lo: 5000, hi: 20000, months: 120 },
    { lo: 20000, hi: 25000, months: 144 },
    { lo: 25000, hi: 60000, months: 180 },
    { lo: 60000, hi: Infinity, months: 240 },
  ];
  const FALLBACK_TAX = 0.06;

  // ------------------------------------------------------------------ helpers
  const hasAny = (unit, ids) => {
    const ch = unit.characteristicTypeIds;
    if (!ch || !ch.length) return false;
    for (let i = 0; i < ids.length; i++) if (ch.indexOf(ids[i]) !== -1) return true;
    return false;
  };
  const hasAll = (unit, ids) => ids.every(id => unit.characteristicTypeIds && unit.characteristicTypeIds.indexOf(id) !== -1);
  const hasFlag = (unit, f) => unit.qaFlags && unit.qaFlags.indexOf(f) !== -1;
  const hasBunks = unit => hasAny(unit, BUNK_IDS);
  const clone = o => JSON.parse(JSON.stringify(o));
  const round2 = v => Math.round(v * 100) / 100;

  function lengthDisplay(inches) {
    if (inches == null) return null;
    const ft = Math.floor(inches / 12);
    const rem = Math.round(inches - ft * 12);
    return rem ? `${ft} ft ${rem} in` : `${ft} ft`;
  }
  function money(v) { return v == null ? null : '$' + Math.round(v).toLocaleString('en-US'); }

  function emptyGates() {
    return {
      classes: [],           // shopper-facing class codes; empty = no type gate
      priceMax: null, priceMin: null,
      gvwrMax: null, gvwrMin: null,
      lengthMaxFt: null, lengthMinFt: null,
      sleepsMin: null, sleepsMax: null,
      slidesMin: null, slidesMax: null,
      requiredChars: [],     // every id required (AND)
      requiredAnyOf: [],     // array of id arrays; unit must have at least one id from each array
      forbiddenChars: [],
      sidewall: null,        // 'LAMINATE' | 'STT'
      lStock: 'include',     // 'include' | 'exclude' | 'only' (refinement only)
      keyword: null,
      locations: [],
    };
  }

  function newSession(snapshot) {
    return {
      sessionId: 'S-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8),
      inventorySnapshotId: snapshot && snapshot.meta ? snapshot.meta.inventorySnapshotId : null,
      questionnaireVersion: QUESTIONNAIRE_VERSION,
      scoringVersion: SCORING_VERSION,
      createdAt: new Date().toISOString(),
      branch: null,            // resolved branch path (s5)
      gates: emptyGates(),
      gateSources: {},         // gateKey -> questionId that set it
      prefs: [],               // {key, concept, label, ids, strength}
      avoids: [],              // {key, concept, label, ids, strength}
      numericPriorities: {},   // value, lightweight, compact, sleepFlex, space, simple
      sidewallPref: null,      // 'laminate' | 'value' | null
      lifestylePaths: [],      // family, couple, extended, toy, compact, outdoor
      sleepers: { adults: null, children: null },
      tow: { applies: null, rating: null, mode: 'derived' },
      budget: { mode: null, priceCeiling: null, taxRate: FALLBACK_TAX, taxIsFallback: true, detail: null },
      store: null,
      answers: {},             // questionId -> raw answer
      refine: emptyGates(),    // s15.3 refinement layer, stored separately from answers
      refineActive: false,
    };
  }

  // ------------------------------------------------------------------ gates (s9)
  // Returns {status: 'pass'|'fail'|'unknown', failed: [...], unknown: [...]}
  function evalGates(unit, g) {
    const failed = [], unknown = [];
    if (g.lStock === 'exclude' && unit.isLStock) failed.push('lStock');
    if (g.lStock === 'only' && !unit.isLStock) failed.push('lStock');
    if (g.classes && g.classes.length) {
      if (!unit.class || hasFlag(unit, 'UNKNOWN_CLASS')) failed.push('classes');
      else if (g.classes.indexOf(unit.class) === -1) failed.push('classes');
    }
    if (g.locations && g.locations.length && g.locations.indexOf(unit.location) === -1) failed.push('locations');
    if (g.priceMax != null || g.priceMin != null) {
      if (unit.price == null) unknown.push('price');
      else if (g.priceMax != null && unit.price > g.priceMax) failed.push('priceMax');
      else if (g.priceMin != null && unit.price < g.priceMin) failed.push('priceMin');
    }
    if (g.gvwrMax != null || g.gvwrMin != null) {
      if (unit.gvwr == null) unknown.push('gvwr');
      else if (g.gvwrMax != null && unit.gvwr > g.gvwrMax) failed.push('gvwrMax');
      else if (g.gvwrMin != null && unit.gvwr < g.gvwrMin) failed.push('gvwrMin');
    }
    if (g.lengthMaxFt != null || g.lengthMinFt != null) {
      if (unit.lengthIn == null) unknown.push('length');
      else if (g.lengthMaxFt != null && unit.lengthIn > g.lengthMaxFt * 12) failed.push('lengthMaxFt');
      else if (g.lengthMinFt != null && unit.lengthIn < g.lengthMinFt * 12) failed.push('lengthMinFt');
    }
    if (g.sleepsMin != null || g.sleepsMax != null) {
      if (unit.sleeps == null) unknown.push('sleeps');
      else if (g.sleepsMin != null && unit.sleeps < g.sleepsMin) failed.push('sleepsMin');
      else if (g.sleepsMax != null && unit.sleeps > g.sleepsMax) failed.push('sleepsMax');
    }
    if (g.slidesMin != null || g.slidesMax != null) {
      if (unit.slides == null) unknown.push('slides');
      else if (g.slidesMin != null && unit.slides < g.slidesMin) failed.push('slidesMin');
      else if (g.slidesMax != null && unit.slides > g.slidesMax) failed.push('slidesMax');
    }
    const noCharData = hasFlag(unit, 'MISSING_CHARACTERISTICS');
    if (g.requiredChars && g.requiredChars.length) {
      if (noCharData) unknown.push('requiredChars');
      else if (!hasAll(unit, g.requiredChars)) failed.push('requiredChars');
    }
    if (g.requiredAnyOf && g.requiredAnyOf.length) {
      for (let i = 0; i < g.requiredAnyOf.length; i++) {
        if (noCharData) { unknown.push('requiredAnyOf'); break; }
        if (!hasAny(unit, g.requiredAnyOf[i])) { failed.push('requiredAnyOf'); break; }
      }
    }
    if (g.forbiddenChars && g.forbiddenChars.length && hasAny(unit, g.forbiddenChars)) failed.push('forbiddenChars');
    if (g.sidewall) {
      if (!unit.sidewallConstruction || unit.sidewallConstruction === 'UNKNOWN') unknown.push('sidewall');
      else if (unit.sidewallConstruction !== g.sidewall) failed.push('sidewall');
    }
    if (g.keyword) {
      const k = g.keyword.toLowerCase();
      const text = [unit.stocknumber, unit.manufacturer, unit.make, unit.model, unit.location, unit.year].join(' ').toLowerCase();
      if (text.indexOf(k) === -1) failed.push('keyword');
    }
    return { status: failed.length ? 'fail' : (unknown.length ? 'unknown' : 'pass'), failed, unknown };
  }

  function rankGroupFor(unit, gateResult) {
    if (gateResult.status === 'fail') return 'INELIGIBLE';
    if (gateResult.status === 'unknown') return 'PROBABLE_NEEDS_VERIFICATION';
    return unit.isLStock ? 'VERIFIED_L_STOCK_EXAMPLE' : 'VERIFIED_AVAILABLE';
  }

  // Merge the questionnaire gates with the refinement layer (refinement never rewrites answers).
  function effectiveGates(session) {
    if (!session.refineActive) return session.gates;
    const g = clone(session.gates), r = session.refine;
    const tighterMax = (a, b) => (a == null ? b : (b == null ? a : Math.min(a, b)));
    const tighterMin = (a, b) => (a == null ? b : (b == null ? a : Math.max(a, b)));
    if (r.classes && r.classes.length) g.classes = g.classes.length ? g.classes.filter(c => r.classes.indexOf(c) !== -1) : r.classes.slice();
    g.priceMax = tighterMax(g.priceMax, r.priceMax); g.priceMin = tighterMin(g.priceMin, r.priceMin);
    g.gvwrMax = tighterMax(g.gvwrMax, r.gvwrMax); g.gvwrMin = tighterMin(g.gvwrMin, r.gvwrMin);
    g.lengthMaxFt = tighterMax(g.lengthMaxFt, r.lengthMaxFt); g.lengthMinFt = tighterMin(g.lengthMinFt, r.lengthMinFt);
    g.sleepsMin = tighterMin(g.sleepsMin, r.sleepsMin); g.sleepsMax = tighterMax(g.sleepsMax, r.sleepsMax);
    g.slidesMin = tighterMin(g.slidesMin, r.slidesMin); g.slidesMax = tighterMax(g.slidesMax, r.slidesMax);
    g.requiredChars = g.requiredChars.concat(r.requiredChars.filter(id => g.requiredChars.indexOf(id) === -1));
    g.requiredAnyOf = g.requiredAnyOf.concat(r.requiredAnyOf);
    g.forbiddenChars = g.forbiddenChars.concat(r.forbiddenChars.filter(id => g.forbiddenChars.indexOf(id) === -1));
    if (r.sidewall) g.sidewall = r.sidewall;
    if (r.lStock && r.lStock !== 'include') g.lStock = r.lStock;
    if (r.keyword) g.keyword = r.keyword;
    if (r.locations && r.locations.length) g.locations = r.locations.slice();
    return g;
  }

  // Split a unit list into verified / probable / ineligible under a gate set.
  function candidates(units, gates) {
    const verified = [], probable = [];
    let ineligible = 0;
    for (let i = 0; i < units.length; i++) {
      const u = units[i];
      const r = evalGates(u, gates);
      if (r.status === 'fail') ineligible++;
      else if (r.status === 'unknown') probable.push(u);
      else verified.push(u);
    }
    return { verified, probable, ineligible };
  }

  function counts(units, gates) {
    let verified = 0, probable = 0;
    const fps = new Set();
    for (let i = 0; i < units.length; i++) {
      const r = evalGates(units[i], gates);
      if (r.status === 'fail') continue;
      if (r.status === 'unknown') probable++; else verified++;
      if (units[i].floorplanId != null) fps.add(units[i].floorplanId);
    }
    return { verified, probable, total: verified + probable, floorplans: fps.size };
  }

  // Candidate-aware preview of a gate patch (s8.1 steps 1-4).
  function previewGate(units, gates, patch) {
    const g = clone(gates);
    Object.keys(patch || {}).forEach(k => {
      if (k === 'requiredChars') g.requiredChars = g.requiredChars.concat(patch[k].filter(id => g.requiredChars.indexOf(id) === -1));
      else if (k === 'requiredAnyOf') g.requiredAnyOf = g.requiredAnyOf.concat(patch[k]);
      else if (k === 'forbiddenChars') g.forbiddenChars = g.forbiddenChars.concat(patch[k]);
      else g[k] = patch[k];
    });
    return { gates: g, counts: counts(units, g) };
  }

  // Ranking-only preview (s8.1 step 5) - how many current candidates would be boosted.
  function previewBoost(candidateUnits, ids) {
    let n = 0;
    for (let i = 0; i < candidateUnits.length; i++) if (hasAny(candidateUnits[i], ids)) n++;
    return n;
  }

  // ------------------------------------------------------------------ lifestyle defaults (s11.1)
  // Fallback ranking concepts for questions the shopper skipped; an explicit answer for the
  // same concept always wins (no double counting).
  const LIFESTYLE_CONCEPTS = {
    family: [
      { concept: 'child_sleep', ids: BUNK_IDS, w: 4, label: 'Bunks for kids' },
      { concept: 'adult_privacy', ids: [IDS.PRIVATE_MASTER], w: 3, label: 'Private master' },
      { concept: 'bath', ids: [IDS.DOUBLE_BATH], w: 3, label: 'Second bathroom' },
      { concept: 'outdoor', ids: [IDS.OUTSIDE_KITCHEN], w: 2, label: 'Outside kitchen' },
    ],
    couple: [
      { concept: 'adult_privacy', ids: [IDS.PRIVATE_MASTER], w: 4, label: 'Private master' },
      { concept: 'living', ids: [IDS.REAR_LIVING], w: 4, label: 'Rear living' },
      { concept: 'slide_bed', ids: [IDS.BED_SLIDE], w: 2, label: 'Bed slide' },
      { concept: 'kitchen', ids: [IDS.ISLAND_KITCHEN, IDS.L_KITCHEN], w: 2, label: 'Island / L kitchen' },
    ],
    extended: [
      { concept: 'amenity_wd', ids: [IDS.WASH], w: 4, label: 'Washer/dryer prep' },
      { concept: 'kitchen', ids: [IDS.ISLAND_KITCHEN], w: 3, label: 'Island kitchen' },
      { concept: 'amenity_dw', ids: [IDS.DISH], w: 2, label: 'Dishwasher prep' },
      { concept: 'slide_wardrobe', ids: [IDS.WARDROBE_SLIDE], w: 3, label: 'Wardrobe slide' },
    ],
    toy: [
      { concept: 'garage_sleep', ids: TOY_BED_IDS, w: 4, label: 'Garage sleeping' },
      { concept: 'loft', ids: [IDS.LOFT], w: 3, label: 'Loft' },
      { concept: 'outdoor_patio', ids: [IDS.REAR_PATIO], w: 3, label: 'Rear patio' },
      { concept: 'ramp', ids: [IDS.RAMP], w: 2, label: 'Ramp door' },
    ],
    compact: [
      { concept: 'bath', ids: [IDS.WETBATH], w: 4, label: 'Wetbath' },
      { concept: 'adult_bed', ids: [IDS.MURPHY, IDS.EAST_WEST], w: 4, label: 'Space-saving bed' },
      { concept: 'type', ids: [IDS.TEARDROP, IDS.TENT, IDS.AFRAME], w: 4, label: 'Compact body style' },
    ],
    outdoor: [
      { concept: 'outdoor', ids: [IDS.OUTSIDE_KITCHEN], w: 4, label: 'Outside kitchen' },
      { concept: 'traffic', ids: [IDS.DUAL_ENTRY], w: 4, label: 'Dual entry' },
      { concept: 'bath_entry', ids: [IDS.BATH_ENTRY], w: 4, label: 'Outside bath entry' },
    ],
  };

  function activeLifestyleConcepts(session) {
    const explicit = new Set();
    session.prefs.forEach(p => explicit.add(p.concept));
    session.avoids.forEach(p => explicit.add(p.concept));
    Object.keys(session.gateSources || {}).forEach(k => { const c = session.gateSources[k] && session.gateSources[k].concept; if (c) explicit.add(c); });
    const seen = new Set(), out = [];
    (session.lifestylePaths || []).forEach(path => {
      (LIFESTYLE_CONCEPTS[path] || []).forEach(c => {
        if (explicit.has(c.concept) || seen.has(c.concept)) return;
        seen.add(c.concept); out.push(c);
      });
    });
    return out;
  }

  // ------------------------------------------------------------------ QA severity (s11.1 / s19)
  function qaPenalty(flag, g) {
    switch (flag) {
      case 'DUPLICATE_STOCKNUMBER': return 5;
      case 'UNKNOWN_CLASS': case 'MISSING_CLASS_ID': return 5;
      case 'UNKNOWN_CONDITION': return 5;
      case 'MISSING_MAKE_ID': case 'MISSING_MANUFACTURER_ID': case 'MISSING_FLOORPLAN_ID': case 'MISSING_CHARACTERISTICS': return 3;
      case 'UNKNOWN_CHARACTERISTIC_ID': return 3;
      case 'MISSING_PRICE': return (g.priceMax != null || g.priceMin != null) ? 3 : 1;
      case 'MISSING_GVWR': return (g.gvwrMax != null || g.gvwrMin != null) ? 5 : 1;
      case 'MISSING_LENGTH': return (g.lengthMaxFt != null || g.lengthMinFt != null) ? 3 : 1;
      case 'MISSING_SLEEP_COUNT': return (g.sleepsMin != null || g.sleepsMax != null) ? 3 : 1;
      case 'SUSPECT_LENGTH_UNIT': return 3;
      case 'IMPLAUSIBLE_PRICE': return 3;
      case 'UNKNOWN_LOCATION': case 'UNKNOWN_SIDEWALL': case 'LOCATION_CMF_MISMATCH': case 'MANUFACTURER_MISMATCH': return 1;
      default: return 1;
    }
  }

  // ------------------------------------------------------------------ scoring (s11)
  // ctx is built once per results run by buildScoringContext().
  function buildScoringContext(session, candidateUnits) {
    const g = effectiveGates(session);
    const known = f => candidateUnits.map(u => u[f]).filter(v => v != null);
    const range = arr => arr.length ? { min: Math.min.apply(null, arr), max: Math.max.apply(null, arr) } : null;
    const observedFlags = new Set();
    candidateUnits.forEach(u => (u.qaFlags || []).forEach(f => observedFlags.add(f)));
    let maxQA = 0;
    observedFlags.forEach(f => { maxQA += qaPenalty(f, g); });
    const prefs = session.prefs, avoids = session.avoids;
    const totalPrefPoints = prefs.reduce((s, p) => s + PREF_WEIGHT[p.strength], 0);
    const totalMissAbs = prefs.reduce((s, p) => s + MISS_PENALTY[p.strength], 0) + avoids.reduce((s, a) => s + AVOID_PENALTY[a.strength], 0);
    const lifestyle = activeLifestyleConcepts(session);
    const totalLifestyle = lifestyle.reduce((s, c) => s + c.w, 0);
    const requiredSleep = (session.sleepers.adults || 0) + (session.sleepers.children || 0);
    return {
      gates: g,
      price: range(known('price')), gvwr: range(known('gvwr')), length: range(known('lengthIn')),
      maxQA, totalPrefPoints, totalMissAbs, lifestyle, totalLifestyle, requiredSleep,
      minSlides: g.slidesMin || 0,
    };
  }

  function scoreUnit(unit, session, ctx) {
    const g = ctx.gates;
    const gateResult = evalGates(unit, g);
    const rankGroup = rankGroupFor(unit, gateResult);
    const reasons = [];
    const comp = {};

    // Base eligibility
    if (rankGroup === 'INELIGIBLE') comp.base = 0;
    else if (rankGroup === 'PROBABLE_NEEDS_VERIFICATION') comp.base = unit.isLStock ? BASE_SCORE.PROBABLE_L : BASE_SCORE.PROBABLE_NEW;
    else comp.base = BASE_SCORE[rankGroup];
    if (rankGroup === 'PROBABLE_NEEDS_VERIFICATION') reasons.push('Needs verification: missing ' + gateResult.unknown.join(', ') + ' data');
    if (unit.isLStock) reasons.push('Floorplan example (L-stock), not a physical unit');

    // Explicit preferences (normalized to 30)
    let earned = 0, missAbs = 0;
    const hits = [], misses = [];
    session.prefs.forEach(p => {
      if (hasAny(unit, p.ids)) { earned += PREF_WEIGHT[p.strength]; hits.push(p.label); }
      else { missAbs += MISS_PENALTY[p.strength]; misses.push(p.label); }
    });
    const avoided = [];
    session.avoids.forEach(a => { if (hasAny(unit, a.ids)) { missAbs += AVOID_PENALTY[a.strength]; avoided.push(a.label); } });
    comp.explicit = ctx.totalPrefPoints ? round2(30 * earned / ctx.totalPrefPoints) : 0;
    if (hits.length) reasons.push('Matches: ' + hits.join(', '));
    if (misses.length) reasons.push('Missing: ' + misses.join(', '));
    if (avoided.length) reasons.push('Has avoided feature: ' + avoided.join(', '));

    // Lifestyle defaults (normalized to 12)
    let lEarned = 0; const lHits = [];
    ctx.lifestyle.forEach(c => { if (hasAny(unit, c.ids)) { lEarned += c.w; lHits.push(c.label); } });
    comp.lifestyle = ctx.totalLifestyle ? round2(12 * lEarned / ctx.totalLifestyle) : 0;
    if (lHits.length) reasons.push('Lifestyle fit: ' + lHits.join(', '));

    // Value / construction (max 8)
    comp.construction = 0;
    const sw = unit.sidewallConstruction;
    if (session.sidewallPref === 'laminate') comp.construction = sw === 'LAMINATE' ? 8 : 0;
    else if (session.sidewallPref === 'value') comp.construction = sw === 'STT' ? 8 : (sw === 'LAMINATE' ? 3 : 0);
    if (comp.construction) reasons.push((sw === 'LAMINATE' ? 'Laminate' : 'STT') + ' construction matches your priority');

    // Numeric priority (cap 7) - only when the shopper asked for it
    let np = 0; const npr = [];
    const P = session.numericPriorities || {};
    const rel = (v, r, invert) => { if (v == null || !r || r.max === r.min) return 0; const t = (v - r.min) / (r.max - r.min); return invert ? 1 - t : t; };
    if (P.value && unit.price != null) { const pts = 3 * rel(unit.price, ctx.price, true); np += pts; if (pts > 1.5) npr.push('lower price'); }
    if (P.lightweight && unit.gvwr != null) { const pts = 3 * rel(unit.gvwr, ctx.gvwr, true); np += pts; if (pts > 1.5) npr.push('lighter weight'); }
    if (P.compact && unit.lengthIn != null) { const pts = 3 * rel(unit.lengthIn, ctx.length, true); np += pts; if (pts > 1.5) npr.push('shorter length'); }
    if (P.sleepFlex && unit.sleeps != null) { const extra = Math.max(0, unit.sleeps - ctx.requiredSleep); const pts = 2 * Math.min(1, extra / 4); np += pts; if (pts > 0) npr.push('extra sleeping'); }
    if (P.space && unit.slides != null) { const extra = Math.max(0, unit.slides - ctx.minSlides); const pts = 2 * Math.min(1, extra / 2); np += pts; if (pts > 0) npr.push('more slide space'); }
    if (P.simple && unit.slides != null) { const pts = unit.slides === 0 ? 2 : (unit.slides === 1 ? 1 : 0); np += pts; if (pts > 0) npr.push('simpler setup'); }
    comp.numeric = round2(Math.min(7, np));
    if (npr.length) reasons.push('Priority fit: ' + npr.join(', '));

    // Miss adjustment (normalized to -12)
    comp.miss = ctx.totalMissAbs ? round2(-12 * missAbs / ctx.totalMissAbs) : 0;

    // QA adjustment (normalized to -8 against the flags observed in the candidate set)
    let qa = 0;
    (unit.qaFlags || []).forEach(f => { qa += qaPenalty(f, g); });
    comp.qa = ctx.maxQA ? round2(-8 * qa / ctx.maxQA) : 0;
    if (unit.qaFlags && unit.qaFlags.length) reasons.push('Data quality: ' + unit.qaFlags.map(f => f.toLowerCase().replace(/_/g, ' ')).join(', '));

    const final = round2(comp.base + comp.explicit + comp.lifestyle + comp.construction + comp.numeric + comp.miss + comp.qa);
    return {
      rankGroup, gateResult, final, display: Math.max(0, Math.min(100, Math.round(final))),
      components: comp, reasons, hits, misses, avoided,
    };
  }

  function sortScored(a, b, session) {
    const P = session.numericPriorities || {};
    let d = RANK_ORDER[a.score.rankGroup] - RANK_ORDER[b.score.rankGroup]; if (d) return d;
    d = b.score.final - a.score.final; if (d) return d;
    d = b.score.components.explicit - a.score.components.explicit; if (d) return d;
    d = b.score.components.lifestyle - a.score.components.lifestyle; if (d) return d;
    d = b.score.components.construction - a.score.components.construction; if (d) return d;
    d = b.score.components.numeric - a.score.components.numeric; if (d) return d;
    if (P.value) { d = (a.unit.price == null) - (b.unit.price == null) || (a.unit.price - b.unit.price); if (d) return d; }
    if (P.lightweight) { d = (a.unit.gvwr == null) - (b.unit.gvwr == null) || (a.unit.gvwr - b.unit.gvwr); if (d) return d; }
    if (P.compact) { d = (a.unit.lengthIn == null) - (b.unit.lengthIn == null) || (a.unit.lengthIn - b.unit.lengthIn); if (d) return d; }
    return String(a.unit.stocknumber).localeCompare(String(b.unit.stocknumber));
  }

  function rankResults(units, session) {
    const g = effectiveGates(session);
    const c = candidates(units, g);
    const pool = c.verified.concat(c.probable);
    const ctx = buildScoringContext(session, pool);
    const scored = pool.map(u => ({ unit: u, score: scoreUnit(u, session, ctx) }));
    scored.sort((a, b) => sortScored(a, b, session));
    const groups = { VERIFIED_AVAILABLE: [], VERIFIED_L_STOCK_EXAMPLE: [], PROBABLE_NEEDS_VERIFICATION: [] };
    scored.forEach(s => groups[s.score.rankGroup].push(s));
    return { groups, all: scored, ineligible: c.ineligible, ctx, gates: g };
  }

  // ------------------------------------------------------------------ payment / budget (s10)
  function principalFromPayment(payment, apr, months) {
    if (!apr) return payment * months;
    const r = apr / 100 / 12;
    return payment * (1 - Math.pow(1 + r, -months)) / r;
  }
  function roundTo500(v) { return Math.round(v / 500) * 500; }

  // Returns {valid, apr, termMonths, principal, ceiling, taxRate, taxIsFallback, message}
  function solveFinanceCeiling(opts) {
    const payment = Number(opts.monthlyPayment) || 0;
    const down = Number(opts.downPayment) || 0;
    const apr = APR_BY_TIER[opts.creditTier] != null ? APR_BY_TIER[opts.creditTier] : APR_BY_TIER.good;
    const taxRate = opts.taxRate != null ? opts.taxRate : FALLBACK_TAX;
    if (payment <= 0) return { valid: false, message: 'Enter a monthly payment to estimate a buying range.' };
    let best = null;
    TERM_BANDS.forEach(b => {
      const p = principalFromPayment(payment, apr, b.months);
      const inBand = p >= b.lo && (b.hi === Infinity ? true : p < b.hi);
      if (inBand && (!best || p > best.principal)) best = { principal: p, months: b.months };
    });
    if (!best) {
      return { valid: false, apr, taxRate, message: 'That payment is too low to finance an RV in our term bands. Budget will not be applied as a filter.' };
    }
    const ceiling = roundTo500((best.principal + down) / (1 + taxRate));
    return {
      valid: ceiling > 0, apr, termMonths: best.months, principal: Math.round(best.principal), downPayment: down,
      taxRate, taxIsFallback: opts.taxRate == null, ceiling,
      message: opts.taxRate == null ? 'Estimated using 6% tax until a store is selected. Final buying range may update based on store tax rate.' : null,
    };
  }

  function cashCeiling(maxSpend) {
    const v = Number(maxSpend);
    return v > 0 ? { valid: true, ceiling: roundTo500(v) } : { valid: false, message: 'Enter a maximum spend.' };
  }

  // Recompute the finance ceiling when a store becomes known (s10.3).
  function applyStoreTax(session, snapshot) {
    const b = session.budget;
    if (!session.store || !snapshot.lookups || !snapshot.lookups.rooftops) return false;
    const r = snapshot.lookups.rooftops[session.store];
    if (!r || r.salesTaxRate == null) return false;
    b.taxRate = r.salesTaxRate; b.taxIsFallback = false;
    if (b.mode === 'finance' && b.detail) {
      const res = solveFinanceCeiling(Object.assign({}, b.detail, { taxRate: r.salesTaxRate }));
      if (res.valid) { b.priceCeiling = res.ceiling; session.gates.priceMax = res.ceiling; b.solved = res; return true; }
    }
    return false;
  }

  // ------------------------------------------------------------------ zero-result recovery (s16)
  function gateLabel(key, session) {
    const g = session.gates;
    switch (key) {
      case 'gvwrMax': return 'Max GVWR ' + Math.round(g.gvwrMax).toLocaleString('en-US') + ' lbs';
      case 'lengthMaxFt': return 'Max length ' + g.lengthMaxFt + ' ft';
      case 'priceMax': return 'Max price ' + money(g.priceMax);
      case 'sleepsMin': return 'Sleeps at least ' + g.sleepsMin;
      case 'slidesMin': return 'At least ' + g.slidesMin + ' slides';
      case 'sidewall': return g.sidewall + ' sidewall required';
      case 'classes': return 'Type: ' + g.classes.join('/');
      default: return key;
    }
  }

  function relaxationCandidates(units, session, snapshot) {
    const g = session.gates;
    const out = [];
    // Relaxations use REPLACE semantics (a list gate is replaced, not appended to).
    const relaxed = patch => counts(units, applyRelaxation(g, { patch }));
    const tryPatch = (key, label, patch, delta, opts) => {
      const c = relaxed(patch);
      out.push(Object.assign({ key, label, patch, delta, unlocked: c.total, verified: c.verified, floorplans: c.floorplans }, opts || {}));
    };
    if (g.gvwrMax != null) {
      for (let step = 500; step <= 6000; step += 500) {
        if (relaxed({ gvwrMax: g.gvwrMax + step }).total > 0) { tryPatch('gvwrMax', 'Increase max GVWR to ' + Math.round(g.gvwrMax + step).toLocaleString('en-US') + ' lbs', { gvwrMax: g.gvwrMax + step }, step / 500, { safety: true, numeric: true }); break; }
      }
      tryPatch('gvwrMax', 'Remove the tow-weight limit', { gvwrMax: null }, 99, { safety: true, numeric: true });
    }
    if (g.lengthMaxFt != null) {
      for (let step = 1; step <= 12; step++) {
        if (relaxed({ lengthMaxFt: g.lengthMaxFt + step }).total > 0) { tryPatch('lengthMaxFt', 'Increase max length to ' + (g.lengthMaxFt + step) + ' ft', { lengthMaxFt: g.lengthMaxFt + step }, step, { numeric: true }); break; }
      }
    }
    if (g.priceMax != null) {
      for (let step = 1; step <= 20; step++) {
        const v = g.priceMax + step * 1000;
        if (relaxed({ priceMax: v }).total > 0) { tryPatch('priceMax', 'Increase max price to ' + money(v), { priceMax: v }, step, { payment: true, numeric: true }); break; }
      }
    }
    if (g.sleepsMin != null && g.sleepsMin > 1) {
      for (let step = 1; step < g.sleepsMin; step++) {
        if (relaxed({ sleepsMin: g.sleepsMin - step }).total > 0) { tryPatch('sleepsMin', 'Lower minimum sleep count to ' + (g.sleepsMin - step), { sleepsMin: g.sleepsMin - step }, step, { numeric: true }); break; }
      }
    }
    if (g.slidesMin != null && g.slidesMin > 0) tryPatch('slidesMin', 'Drop the minimum slide count', { slidesMin: null }, 1, { numeric: true });
    (g.requiredAnyOf || []).forEach((set, i) => {
      const rest = g.requiredAnyOf.filter((_, j) => j !== i);
      const key = set === BUNK_IDS || set.join() === BUNK_IDS.join() ? 'bunks' : 'requiredAnyOf';
      tryPatch(key, 'Make "' + (key === 'bunks' ? 'bunks' : 'that feature') + '" a preference instead of a must-have', { requiredAnyOf: rest }, 1, { replaceKey: 'requiredAnyOf' });
    });
    (g.requiredChars || []).forEach(id => {
      const rest = g.requiredChars.filter(x => x !== id);
      const name = snapshot && snapshot.lookups.characteristicTypes[String(id)] ? snapshot.lookups.characteristicTypes[String(id)].name : ('feature ' + id);
      const key = id === IDS.PRIVATE_MASTER ? 'privateMaster' : (id === IDS.OUTSIDE_KITCHEN ? 'outsideKitchen' : 'requiredChars');
      tryPatch(key, 'Make "' + name + '" flexible instead of required', { requiredChars: rest }, 1, { replaceKey: 'requiredChars' });
    });
    if (g.sidewall) tryPatch('sidewall', 'Open sidewall construction to either type', { sidewall: null }, 1);
    if (g.classes && g.classes.length) tryPatch('classes', 'Widen the RV type', { classes: [] }, 1, { type: true });
    return out;
  }

  // Apply a relaxation patch to a gate object (replace semantics for list gates).
  function applyRelaxation(gates, action) {
    const g = clone(gates);
    Object.keys(action.patch).forEach(k => { g[k] = action.patch[k]; });
    return g;
  }

  function compareRelaxations(a, b) {
    if (b.unlocked !== a.unlocked) return b.unlocked - a.unlocked;          // most inventory unlocked
    if (!!a.safety !== !!b.safety) return a.safety ? 1 : -1;              // non-safety before safety
    if (!!a.payment !== !!b.payment) return a.payment ? 1 : -1;            // shopper gates before payment
    if (!!a.numeric !== !!b.numeric) return a.numeric ? -1 : 1;            // numeric before type/class
    if (!!a.type !== !!b.type) return a.type ? 1 : -1;
    if ((a.delta || 0) !== (b.delta || 0)) return (a.delta || 0) - (b.delta || 0); // smallest change
    if (b.floorplans !== a.floorplans) return b.floorplans - a.floorplans; // more floorplans
    return GATE_PRECEDENCE.indexOf(a.key) - GATE_PRECEDENCE.indexOf(b.key);
  }

  // Returns exactly two actions (or fewer if the gate set has nothing to relax).
  function zeroResultRecovery(units, session, snapshot) {
    const singles = relaxationCandidates(units, session, snapshot);
    let cands = singles.filter(c => c.unlocked > 0);
    // s16.1 step 3: fall back to gate pairs when singles cannot supply two distinct actions.
    const distinctSingleKeys = new Set(cands.map(c => c.key));
    if (distinctSingleKeys.size < 2) {
      for (let i = 0; i < singles.length; i++) for (let j = i + 1; j < singles.length; j++) {
        if (singles[i].key === singles[j].key) continue;
        const g1 = applyRelaxation(session.gates, singles[i]);
        const g2 = applyRelaxation(g1, singles[j]);
        const c = counts(units, g2);
        if (c.total > 0) cands.push({
          key: singles[i].key + '+' + singles[j].key, label: singles[i].label + ' and ' + singles[j].label.charAt(0).toLowerCase() + singles[j].label.slice(1),
          patch: Object.assign({}, singles[i].patch, singles[j].patch), delta: (singles[i].delta || 0) + (singles[j].delta || 0),
          unlocked: c.total, verified: c.verified, floorplans: c.floorplans,
          safety: singles[i].safety || singles[j].safety, payment: singles[i].payment || singles[j].payment, numeric: singles[i].numeric && singles[j].numeric, type: singles[i].type || singles[j].type,
        });
      }
    }
    // Singles are the primary paths (s16.1 steps 1-2); pairs only fill remaining slots (step 3).
    const singlesOnly = cands.filter(c => c.key.indexOf('+') === -1).sort(compareRelaxations);
    const pairsOnly = cands.filter(c => c.key.indexOf('+') !== -1).sort(compareRelaxations);
    cands = singlesOnly.concat(pairsOnly);
    // de-duplicate by primary key so the two actions are genuinely different paths
    const seen = new Set(), picked = [];
    for (let i = 0; i < cands.length && picked.length < 2; i++) {
      const k = cands[i].key.split('+')[0];
      if (seen.has(k)) continue;
      seen.add(k); picked.push(cands[i]);
    }
    picked.forEach(p => { if (p.safety) p.qualifier = 'Requires advisor/tow verification.'; });
    return picked;
  }

  function limitingCombination(session, snapshot) {
    const g = session.gates, parts = [];
    if (g.classes.length) parts.push(g.classes.map(c => (snapshot.lookups.classes[c] || {}).description || c).join('/'));
    if (g.priceMax != null) parts.push('max ' + money(g.priceMax));
    if (g.gvwrMax != null) parts.push('max GVWR ' + Math.round(g.gvwrMax).toLocaleString('en-US'));
    if (g.lengthMaxFt != null) parts.push('max ' + g.lengthMaxFt + ' ft');
    if (g.sleepsMin != null) parts.push('sleeps ' + g.sleepsMin + '+');
    (g.requiredAnyOf || []).forEach(s => parts.push(s.join() === BUNK_IDS.join() ? 'bunks required' : 'feature required'));
    (g.requiredChars || []).forEach(id => parts.push((snapshot.lookups.characteristicTypes[String(id)] || { name: id }).name + ' required'));
    if (g.sidewall) parts.push(g.sidewall + ' sidewall');
    return parts.join(' + ');
  }

  return {
    QUESTIONNAIRE_VERSION, SCORING_VERSION, IDS, BUNK_IDS, SLIDE_IDS, TOY_BED_IDS,
    MOTORHOME_CLASSES, TOWABLE_CLASSES, TOY_CLASSES, COMPACT_CLASSES, SIDEWALL_CLASSES,
    PREF_WEIGHT, MISS_PENALTY, AVOID_PENALTY, BASE_SCORE, RANK_ORDER, APR_BY_TIER, TERM_BANDS, FALLBACK_TAX,
    LIFESTYLE_CONCEPTS, SAFETY_GATES, PAYMENT_GATES,
    hasAny, hasAll, hasFlag, hasBunks, clone, lengthDisplay, money,
    emptyGates, newSession, evalGates, rankGroupFor, effectiveGates, candidates, counts, previewGate, previewBoost,
    activeLifestyleConcepts, qaPenalty, buildScoringContext, scoreUnit, rankResults,
    principalFromPayment, solveFinanceCeiling, cashCeiling, applyStoreTax, roundTo500,
    relaxationCandidates, zeroResultRecovery, limitingCombination, gateLabel,
  };
});
