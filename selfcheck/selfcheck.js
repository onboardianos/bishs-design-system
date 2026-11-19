/* Bish's RV design system · self-check · v2.2.0
   Proves a screen was built from the right material and to the rules.
   Use:   <script src="<ds>/selfcheck/selfcheck.js"></script>
          BishSelfCheck.run()            → report object
          BishSelfCheck.panel()          → run + show the report on the page
          BishSelfCheck.markdown(report) → paste into handoff/qa-gates.md
   Or add ?selfcheck=1 to the page URL.  Multi-width run: selfcheck/index.html · Reference: selfcheck/README.md */
(function () {
  'use strict';
  var VERSION = '2.2.0';
  var CANARY = { '--ds-version': VERSION, '--text-muted': '#a2a59c', '--accent-gold': '#8b752e', '--accent-gold-hi': '#b89e4a', '--accent-gold-lo': '#5e4f1f', '--semantic-danger': '#ff8787', '--border-input-light': '#949494' };
  var PALETTE = ['#020000', '#203232', '#8b752e', '#e7ddb4', '#545750', '#ffffff', '#0a1414', '#111e1e', '#1c2e2e', '#243838', '#f7f6f1', '#efede4', '#fafaf6', '#a2a59c', '#4a4d46', '#0a0a09', '#3d3d38', '#6b6b63', '#767670', '#b89e4a', '#5e4f1f', '#6e7268', '#51cf66', '#d3f9d8', '#1b7a2e', '#ffd43b', '#fff3bf', '#c77c00', '#ff8787', '#ffe3e3', '#b02525', '#74c0fc', '#d0ebff', '#1864ab', '#949494', '#000000'];
  var MARKETING_ONLY = ['#a0252b', '#dcd334', '#c9e9eb', '#005568'];
  var EXPECTED = ['AppShell', 'ActionOverlay', 'NavConfig', 'NavIcon', 'RolesNavAdmin', 'Button', 'Badge', 'Card', 'StatTile', 'UnitRow', 'Header', 'Input', 'TabBar', 'Avatar', 'PhaseAlert', 'CustomerCard', 'QuestionCard', 'ChoiceChip', 'ChoiceGroup', 'ChoiceTile', 'SpecLint'];
  var BRAND_FONTS = ['bebas neue', 'barlow condensed', 'source sans 3', 'jetbrains mono'];
  var GOLD_FILL = ['#8b752e', '#b89e4a'], GOLD_LO = '#5e4f1f', CREAM = '#e7ddb4', SUBTLE = '#4a4d46';
  var INTERACTIVE = 'button,a[href],input:not([type="hidden"]),select,textarea,summary,[role="button"],[role="link"],[role="tab"],[role="switch"],[role="menuitem"],[role="option"],[role="checkbox"],[role="radio"],[tabindex]:not([tabindex="-1"])';
  var CATS = [
    ['material', '—', 'Right material (release + tokens + bundle)'],
    ['tokens', 'G5', 'Tokens and colors (WCAG AA)'],
    ['gold', 'G6', 'Gold rule'],
    ['type', '—', 'Typography'],
    ['spacing', '—', 'Spacing (4px scale)'],
    ['icons', 'G7', 'Icons (Lucide only)'],
    ['shell', 'G1', 'AppShell + NavConfig'],
    ['states', 'G8', 'Six data states'],
    ['responsive', 'G3', 'Responsiveness (RF01–RF12)'],
    ['stamping', 'G2', 'Stamping (spec-ready v2)']
  ];
  var MANUAL = [
    ['G3', 'Shrink test 1440 → 375 by dragging, not just the widths sampled here'],
    ['G4', '200% browser text zoom (the harness approximation only covers rem-based type)'],
    ['G8', 'All six data states (loading · empty · error · stale · permission · partial) designed for every module — evidence in state-map.md'],
    ['G9', 'Canvas ⇄ Prototype match 1:1 — evidence in state-map.md'],
    ['G10', 'Every element family has a filled requirement row — requirements.md'],
    ['G11', 'Every reaching role has a designed posture and matrix row — roles-permissions.md'],
    ['G12', 'Every ticket traces to a source; no needs-rule story is Ready — Jira CSV'],
    ['NavConfig', 'The screen never writes nav itself (no NavConfig.save from screen code)']
  ];

  function hex(c) { return '#' + [c.r, c.g, c.b].map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join(''); }
  function rgbOf(h) { h = h.replace('#', ''); return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 }; }
  function parse(s) {
    if (!s || s === 'transparent') return null;
    var m = s.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/);
    if (!m) return null;
    var a = m[4] == null ? 1 : (m[4].indexOf('%') > -1 ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
    return { r: +m[1], g: +m[2], b: +m[3], a: a };
  }
  function dist(a, b) { return Math.max(Math.abs(a.r - b.r), Math.abs(a.g - b.g), Math.abs(a.b - b.b)); }
  function near(c, list, tol) { for (var i = 0; i < list.length; i++) if (dist(c, rgbOf(list[i])) <= (tol || 6)) return list[i]; return null; }
  function lum(c) { var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); }
  function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function over(top, under) { var a = top.a; return { r: top.r * a + under.r * (1 - a), g: top.g * a + under.g * (1 - a), b: top.b * a + under.b * (1 - a), a: 1 }; }
  function cs(el) { return getComputedStyle(el); }
  function own(el) { return el.closest('[data-bos-selfcheck]'); }
  function visible(el) {
    if (own(el) || el.closest('[aria-hidden="true"],[hidden],[inert]')) return false;
    var r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false;
    var s = cs(el); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05;
  }
  function where(el) {
    var id = el.getAttribute && el.getAttribute('data-spec-id'); if (id) return id;
    var p = el.closest && el.closest('[data-spec-id]');
    var t = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28);
    return el.tagName.toLowerCase() + (t ? ' "' + t + '"' : '') + (p ? ' in ' + p.getAttribute('data-spec-id') : '');
  }
  function bgOf(el) {
    var stack = [], n = el;
    while (n && n.nodeType === 1) {
      var s = cs(n);
      if (s.backgroundImage && s.backgroundImage !== 'none') return null;
      var c = parse(s.backgroundColor);
      if (c && c.a > 0) { stack.push(c); if (c.a >= 0.99) break; }
      n = n.parentElement;
    }
    var base = { r: 255, g: 255, b: 255, a: 1 };
    if (!stack.length || stack[stack.length - 1].a < 0.99) stack.push(base);
    var out = stack.pop(); while (stack.length) out = over(stack.pop(), out);
    return out;
  }
  function hasText(el) { for (var i = 0; i < el.childNodes.length; i++) { var c = el.childNodes[i]; if (c.nodeType === 3 && c.textContent.trim()) return true; } return false; }
  function ownText(el) { var t = ''; for (var i = 0; i < el.childNodes.length; i++) if (el.childNodes[i].nodeType === 3) t += el.childNodes[i].textContent; return t.trim(); }
  function isCommit(el) { var b = el.closest('[data-bos-class]'); var id = el.getAttribute('data-spec-id') || ''; return (b && b.getAttribute('data-bos-class') === 'commit') || /^btn-commit/.test(id); }
  function isCurrentNav(el) { var c = el.closest('[aria-current],[aria-selected="true"],[data-current="true"]'); return !!(c && c.getAttribute('aria-current') !== 'false'); }
  function ns() { var k = Object.keys(window).filter(function (k) { return /^BishSRVDesignSystem/.test(k) && window[k] && window[k].AppShell; }); return k.length ? { key: k[0], lib: window[k[0]] } : null; }
  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace(/^["']|["']$/g, '').toLowerCase(); }

  function run(opts) {
    opts = opts || {};
    var root = opts.root || document.body, W = opts.width || document.documentElement.clientWidth;
    var F = {}; CATS.forEach(function (c) { F[c[0]] = {}; });
    function add(cat, sev, rule, el, extra) {
      var key = sev + '|' + rule; var g = F[cat][key] || (F[cat][key] = { sev: sev, rule: rule, count: 0, where: [] });
      g.count++; var w = el ? where(el) : extra; if (w && g.where.length < 6 && g.where.indexOf(w) < 0) g.where.push(w);
    }
    var all = Array.prototype.slice.call(root.querySelectorAll('*')).filter(function (el) { return !(el.closest('svg') && el.tagName.toLowerCase() !== 'svg') && visible(el); }).slice(0, 6000);

    // Right material
    var lib = ns();
    if (!lib) add('material', 'error', 'Design-system bundle not loaded (no window.BishSRVDesignSystem_*). Load _ds_bundle.js via ds-base.js', null, 'window');
    else { var miss = EXPECTED.filter(function (n) { return !lib.lib[n]; }); if (miss.length) add('material', 'error', 'Bundle is missing components: ' + miss.join(', ') + ' — stale or partial copy', null, lib.key); }
    Object.keys(CANARY).forEach(function (k) {
      var v = cssVar(k);
      if (!v) add('material', 'error', k === '--ds-version' ? 'Token stylesheet is unversioned — a stale (v1.x) copy, or colors_and_type.css is not linked' : 'Token ' + k + ' missing — colors_and_type.css not linked', null, k);
      else if (v !== CANARY[k]) add('material', 'error', 'Token ' + k + ' = ' + v + ', release ' + VERSION + ' says ' + CANARY[k] + ' — wrong or stale material', null, k);
    });
    if (document.fonts && document.fonts.check) ['Bebas Neue', 'Barlow Condensed', 'Source Sans 3'].forEach(function (f) { if (!document.fonts.check('16px "' + f + '"')) add('material', 'warn', 'Brand font not loaded: ' + f, null, f); });

    // Tokens + contrast + gold + type + icons + spacing per element
    var commitsByFrame = new Map();
    all.forEach(function (el) {
      var s = cs(el), tag = el.tagName.toLowerCase(), interactive = el.matches(INTERACTIVE);
      var col = parse(s.color), bg = parse(s.backgroundColor), text = hasText(el);
      if (bg && bg.a > 0.5) {
        var bh = hex(bg);
        if (!near(bg, PALETTE)) add('tokens', 'error', 'Off-token fill ' + bh, el);
        if (near(bg, MARKETING_ONLY)) add('tokens', 'warn', 'Heritage marketing accent used as UI fill ' + bh, el);
        if (near(bg, GOLD_FILL, 8)) {
          if (!interactive && !el.closest('button,[role="button"],a[href]')) add('gold', 'error', 'Gold fill on a non-control (card, chip, progress, surface)', el);
          else if (!isCommit(el)) add('gold', 'error', 'Gold fill on a control that is not the COMMIT', el);
          else if (interactive) { var fr = el.closest('[data-bos-level="frame"],[role="dialog"]') || root; commitsByFrame.set(fr, (commitsByFrame.get(fr) || 0) + 1); }
        }
        if (near(bg, [GOLD_LO], 6) && !isCurrentNav(el)) add('gold', 'error', 'Gold-lo fill outside the current nav item', el);
        if (near(bg, [CREAM], 6)) add('gold', 'error', 'Cream used as a fill (cream is text-only)', el);
      }
      ['Top', 'Right', 'Bottom', 'Left'].forEach(function (side) {
        if (parseFloat(s['border' + side + 'Width']) > 0) { var b = parse(s['border' + side + 'Color']); if (b && b.a > 0.2 && !near(b, PALETTE, 8)) add('tokens', 'warn', 'Off-token border ' + hex(b), el); }
      });
      if (text && col) {
        var t = ownText(el), size = parseFloat(s.fontSize), weight = parseInt(s.fontWeight, 10) || 400, upper = s.textTransform === 'uppercase';
        if (col.a > 0.5 && !near(col, PALETTE)) add('tokens', 'error', 'Off-token text color ' + hex(col), el);
        if (near(col, [SUBTLE], 4) && !el.closest('[disabled],[aria-disabled="true"]')) add('tokens', 'warn', '--text-subtle used for informational text (decorative/disabled only)', el);
        if (near(col, [GOLD_LO], 6) && !isCurrentNav(el)) add('gold', 'error', 'Gold-lo used as text', el);
        var back = bgOf(el);
        if (back && !el.closest('[disabled],[aria-disabled="true"]')) {
          var fg = col.a < 1 ? over(col, back) : col, r = ratio(fg, back), large = size >= 24 || (size >= 18.66 && weight >= 700);
          if (r < (large ? 3 : 4.5)) add('tokens', 'error', 'Contrast below AA (' + r.toFixed(2) + ':1, needs ' + (large ? '3' : '4.5') + ')', el);
        }
        var fam = s.fontFamily.split(',')[0].replace(/["']/g, '').trim().toLowerCase();
        if (BRAND_FONTS.indexOf(fam) < 0) add('type', 'error', 'Non-brand font: ' + fam, el);
        if (size < 10) add('type', 'error', 'Text below 10px (' + size + 'px)', el);
        else if (size < 11 && !(upper && weight >= 600)) add('type', 'error', 'Text below the 11px label floor (' + size + 'px)', el);
        if (/^(p|li|dd|td|blockquote)$/.test(tag) && size < 14 && t.length > 40) add('type', 'warn', 'Reading text below 14px', el);
        if (parseFloat(s.letterSpacing) > 6) add('type', 'warn', 'Tracking wider than 6px', el);
        if (/^[▸▾▼▲►◄◀▶‣›»✓✔✕✖×★☆→←↑↓⌄⌃+]$/.test(t)) add('icons', 'error', 'Text glyph "' + t + '" used as an icon (use Lucide)', el);
        try { if (/\p{Extended_Pictographic}/u.test(t)) add('icons', 'error', 'Emoji in UI text', el); } catch (e) { }
      }
      if (tag === 'svg') {
        var r2 = el.getBoundingClientRect();
        var lucide = /\blucide\b/.test(el.getAttribute('class') || '') || el.hasAttribute('data-lucide') || (el.getAttribute('viewBox') === '0 0 24 24' && (el.getAttribute('fill') === 'none') && el.getAttribute('stroke-linecap') === 'round');
        var exempt = el.closest('[data-bos-icon-exception],[data-bos-brand]') || /logo|bish|wayfinder|hexagon/i.test((el.getAttribute('aria-label') || '') + (el.getAttribute('class') || ''));
        if (r2.width <= 48 && r2.height <= 48 && !lucide && !exempt) add('icons', 'error', 'Non-Lucide SVG icon', el);
      }
      if (/(^|\s)(material-icons|material-symbols|fa|fas|far|fa-[a-z-]+|bi|bi-[a-z-]+|glyphicon|ph|ph-[a-z-]+|heroicon)(\s|$)/.test(el.getAttribute('class') || '')) add('icons', 'error', 'Icon font / non-Lucide icon library', el);
      if (s.display !== 'inline' && tag !== 'svg') {
        ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'rowGap', 'columnGap'].forEach(function (p) {
          var v = parseFloat(s[p]); if (!v || isNaN(v) || v % 1 !== 0) return; v = Math.abs(v);
          F.spacing.__n = (F.spacing.__n || 0) + 1;
          if (v > 2 && v % 2 !== 0) { F.spacing.__off = (F.spacing.__off || 0) + 1; add('spacing', 'warn', 'Off-scale spacing ' + v + 'px (' + p.replace(/[A-Z].*/, '') + ')', el); }
        });
      }
    });
    commitsByFrame.forEach(function (n, fr) { if (n > 1) add('gold', 'error', n + ' gold COMMIT fills in one frame (max 1)', fr); });
    var sn = F.spacing.__n || 0, so = F.spacing.__off || 0; delete F.spacing.__n; delete F.spacing.__off;
    if (sn && so / sn > 0.1) add('spacing', 'error', Math.round(100 * so / sn) + '% of spacing values are odd-pixel (off the 4px scale)', null, 'page');

    // AppShell
    var shell = root.querySelector('[data-spec-id="frame-app-shell"]');
    if (opts.singleSurface) { }
    else if (!shell) add('shell', 'error', 'Screen is not mounted in AppShell (G1)', null, 'page');
    root.querySelectorAll('header,nav,[role="navigation"]').forEach(function (el) {
      if (!visible(el) || el.closest('[data-bos-level="shell"],[data-bos-level="layer"][data-bos-type="action"],[data-bos-selfcheck]')) return;
      var r = el.getBoundingClientRect();
      if (el.tagName === 'HEADER' && r.top < 12 && r.width > W * 0.9) add('shell', 'error', 'Hand-built app header outside AppShell', el);
      else if (!opts.singleSurface) add('shell', 'warn', 'Navigation landmark outside AppShell — confirm it is in-page wayfinding, not app nav', el);
    });
    if (root.querySelector('main main')) add('shell', 'error', '<main> nested inside <main> (mount screen content in a <section>, not <main>)', root.querySelector('main main'));

    // Responsiveness at this width
    var de = document.documentElement;
    if (de.scrollWidth > de.clientWidth + 1) add('responsive', 'error', 'Horizontal page scroll at ' + W + 'px (' + de.scrollWidth + ' > ' + de.clientWidth + ')', null, 'page');
    root.querySelectorAll('[data-bos-level="canvas"],[data-bos-level="section"],[data-bos-level="frame"],main,form').forEach(function (el) {
      if (!visible(el)) return; var ox = cs(el).overflowX;
      if (el.scrollWidth > el.clientWidth + 1 && ox !== 'auto' && ox !== 'scroll') add('responsive', 'error', 'Content wider than its container at ' + W + 'px (' + el.scrollWidth + ' > ' + el.clientWidth + ')', el);
      else if (el.scrollWidth > el.clientWidth + 1 && (el.matches('[data-bos-level="canvas"],main'))) add('responsive', 'error', 'Screen scrolls sideways inside the shell at ' + W + 'px (' + el.scrollWidth + ' > ' + el.clientWidth + ')', el);
    });
    var minT = W <= 1023 ? 44 : 28;
    all.filter(function (el) { return el.matches(INTERACTIVE); }).forEach(function (el) {
      if (el.closest('p,li') && el.tagName === 'A' && cs(el).display === 'inline') return;
      var r = el.getBoundingClientRect();
      if (r.width < minT - 0.5 || r.height < minT - 0.5) add('responsive', 'error', 'Target under ' + minT + '×' + minT + 'px at ' + W + 'px', el);
    });
    var cq = all.some(function (el) { var c = cs(el).containerType; return c && c !== 'normal'; });
    if (!cq) add('responsive', 'warn', 'No container queries found (RF05) — screens mounted in artboards/stages must use container-type + @container', null, 'page');
    var commit = all.filter(function (el) { return el.matches(INTERACTIVE) && isCommit(el); })[0];
    if (commit) { var cr = commit.getBoundingClientRect(); if (cr.top > innerHeight || cr.bottom < 0) add('responsive', 'warn', 'The COMMIT is off screen at ' + W + 'px (keep it in the sticky action bar S99)', commit); }

    // Stamping
    var SL = lib && lib.lib.SpecLint;
    if (SL) {
      var rep = SL.run(root);
      if (rep.unstamped.length) rep.unstamped.forEach(function (u) { add('stamping', 'error', 'Unstamped interactive element (suggested: ' + (u.suggested || '—') + ')', u.el); });
      rep.duplicates.forEach(function (u) { add('stamping', 'error', 'Duplicate data-spec-id in one frame', u.el); });
      rep.invalid.forEach(function (u) { add('stamping', 'error', 'Invalid data-spec-id format', u.el); });
      if (rep.commitViolations) add('stamping', 'error', 'More than one data-bos-class="commit" in a frame', null, rep.commitViolations + ' frame(s)');
      if (rep.nestedLayers) add('stamping', 'error', 'Nested data-bos-level="layer"', null, rep.nestedLayers + ' layer(s)');
      F.stamping.__coverage = Math.round(rep.coverage * 100);
    } else {
      all.filter(function (el) { return el.matches(INTERACTIVE) && !el.getAttribute('data-spec-id'); }).forEach(function (el) { add('stamping', 'error', 'Unstamped interactive element', el); });
      add('stamping', 'warn', 'SpecLint not available — fallback stamp check only', null, 'bundle');
    }
    root.querySelectorAll('[data-spec-id]').forEach(function (el) {
      if (own(el)) return; var id = el.getAttribute('data-spec-id'), base = id.split('#')[0], inst = id.split('#')[1];
      if (/-\d+$/.test(base)) add('stamping', 'warn', 'ID ends in a number — looks index-derived, not a stable domain key', el);
      if (/\d+-\d{3}(\b|-)/.test(base)) add('stamping', 'warn', 'ID contains a price/count — derived from live data, will drift', el);
      if (inst && /^\d{1,2}$/.test(inst)) add('stamping', 'warn', 'Instance key looks like an index (#' + inst + ') — use a stable domain key', el);
    });
    var coverage = F.stamping.__coverage; delete F.stamping.__coverage;

    // Score
    var cats = CATS.map(function (c) {
      var groups = Object.keys(F[c[0]]).map(function (k) { return F[c[0]][k]; });
      var errs = groups.filter(function (g) { return g.sev === 'error'; }), warns = groups.filter(function (g) { return g.sev === 'warn'; });
      var score = 100; errs.forEach(function (g) { score -= 15 + Math.min(10, g.count - 1); }); warns.forEach(function (g) { score -= 4; });
      var manual = c[0] === 'states';
      return { key: c[0], gate: c[1], name: c[2], status: manual ? 'manual' : errs.length ? 'fail' : warns.length ? 'warn' : 'pass', score: manual ? null : Math.max(0, score), findings: groups.sort(function (a, b) { return (a.sev === 'error' ? 0 : 1) - (b.sev === 'error' ? 0 : 1) || b.count - a.count; }) };
    });
    var scored = cats.filter(function (c) { return c.score != null && c.key !== 'material'; });
    var materialOk = cats[0].status !== 'fail';
    var score = Math.round(scored.reduce(function (s, c) { return s + c.score; }, 0) / scored.length);
    var blockers = [];
    cats.forEach(function (c) { c.findings.forEach(function (f) { if (f.sev === 'error') blockers.push('[' + c.name + '] ' + f.rule + (f.count > 1 ? ' ×' + f.count : '')); }); });
    return {
      tool: 'bishs-selfcheck', version: VERSION, url: location.href, width: W, at: new Date().toISOString(),
      pass: materialOk && !blockers.length, materialOk: materialOk, score: materialOk ? score : Math.min(score, 40), coverage: coverage,
      categories: cats, blockers: blockers, manual: MANUAL.map(function (m) { return { gate: m[0], check: m[1] }; })
    };
  }

  function markdown(r) {
    var L = ['## Self-check — ' + (r.pass ? 'PASS' : 'FAIL') + ' · ' + r.score + '/100', '', '- Release: v' + r.version + ' · width ' + (r.widths ? r.widths.join(' / ') : r.width) + 'px · ' + r.at, '- Page: ' + r.url, r.coverage != null ? '- SpecLint coverage: ' + r.coverage + '%' : '', '', '| Gate | Category | Status | Score |', '|---|---|---|---|'];
    r.categories.forEach(function (c) { L.push('| ' + c.gate + ' | ' + c.name + ' | ' + c.status + ' | ' + (c.score == null ? '—' : c.score) + ' |'); });
    L.push('', '### Blockers', r.blockers.length ? '' : 'None.');
    r.categories.forEach(function (c) { c.findings.forEach(function (f) { L.push('- **' + f.sev + '** · ' + c.name + ' · ' + f.rule + (f.count > 1 ? ' ×' + f.count : '') + (f.where.length ? ' — `' + f.where.join('`, `') + '`' : '')); }); });
    L.push('', '### Still to prove by hand'); r.manual.forEach(function (m) { L.push('- [ ] ' + m.gate + ' — ' + m.check); });
    return L.filter(function (x) { return x !== null; }).join('\n');
  }

  function panel(r) {
    r = r || run();
    var old = document.querySelector('[data-bos-selfcheck="panel"]'); if (old) old.remove();
    var d = document.createElement('aside'); d.setAttribute('data-bos-selfcheck', 'panel'); d.setAttribute('data-spec-lint-ignore', ''); d.setAttribute('aria-label', 'Design-system self-check');
    d.style.cssText = 'position:fixed;top:12px;right:12px;bottom:12px;width:min(420px,calc(100vw - 24px));z-index:2147483646;overflow:auto;background:#111E1E;color:#FFFFFF;border:1px solid rgba(255,255,255,0.30);border-radius:12px;padding:16px;font:14px/1.5 "Source Sans 3",system-ui,sans-serif;box-shadow:0 20px 25px -5px rgb(0 0 0 / .4)';
    var esc = function (s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); };
    var tone = { pass: '#51CF66', warn: '#FFD43B', fail: '#FF8787', manual: '#74C0FC' };
    var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div style="font:600 11px/1 \'Barlow Condensed\',sans-serif;letter-spacing:3px;text-transform:uppercase;color:#B89E4A">Self-check · v' + r.version + '</div><button type="button" data-close style="min-width:44px;min-height:44px;background:none;border:1px solid rgba(255,255,255,0.30);border-radius:8px;color:#fff;cursor:pointer">Close</button></div>';
    h += '<div style="font:400 40px/1 \'Bebas Neue\',sans-serif;margin:8px 0 4px;color:' + (r.pass ? '#51CF66' : '#FF8787') + '">' + (r.pass ? 'PASS' : 'FAIL') + ' · ' + r.score + '/100</div><div style="color:#A2A59C">' + r.width + 'px · ' + r.blockers.length + ' blocker(s)' + (r.coverage != null ? ' · coverage ' + r.coverage + '%' : '') + '</div>';
    r.categories.forEach(function (c) {
      h += '<div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.13)"><div style="display:flex;justify-content:space-between;gap:8px"><strong>' + esc(c.gate !== '—' ? c.gate + ' · ' : '') + esc(c.name) + '</strong><span style="color:' + tone[c.status] + ';font-weight:600">' + c.status.toUpperCase() + (c.score != null ? ' ' + c.score : '') + '</span></div>';
      c.findings.forEach(function (f) { h += '<div style="margin-top:4px;color:' + (f.sev === 'error' ? '#FF8787' : '#E7DDB4') + '">' + (f.sev === 'error' ? '✕ ' : '! ') + esc(f.rule) + (f.count > 1 ? ' ×' + f.count : '') + '</div>' + (f.where.length ? '<div style="color:#A2A59C;font:12px/1.4 \'JetBrains Mono\',monospace;word-break:break-all">' + esc(f.where.join(' · ')) + '</div>' : ''); });
      if (c.key === 'states') h += '<div style="color:#A2A59C">Not machine-checkable — prove it in state-map.md.</div>';
      h += '</div>';
    });
    d.innerHTML = h; document.body.appendChild(d);
    d.querySelector('[data-close]').onclick = function () { d.remove(); };
    return r;
  }

  window.BishSelfCheck = { VERSION: VERSION, run: run, panel: panel, markdown: markdown, CATEGORIES: CATS, MANUAL: MANUAL };
  if (/[?&]selfcheck=1/.test(location.search)) addEventListener('load', function () { setTimeout(function () { panel(); }, 1500); });
})();
