// Loads the Bish's RV Nexus design system into this page, wherever it lives.
// Order: explicit override → this design system's own tree → the usual linked-DS folders.
// Override (only if auto-find fails): <meta name="bishs-ds-base" content="path/to/ds"> or window.BISHS_DS_BASE = 'path'.
(() => {
  const STYLES = ['colors_and_type.css'];
  const NAMES = ['bishs-rv-design-system', 'Bishs-RV-Design-System', 'bishs-design-system', 'nexus-design-system'];
  const meta = document.querySelector('meta[name="bishs-ds-base"]');
  const forced = window.BISHS_DS_BASE || (meta && meta.content);
  const ups = ['', '../', '../../', '../../../'];
  const candidates = forced ? [forced] : ['../..', ...ups.flatMap((u) => NAMES.map((n) => `${u}_ds/${n}`)), '.', '..'];
  const strip = (b) => b.replace(/\/+$/, '');
  const probe = (b) => fetch(strip(b) + '/_ds_bundle.js', { method: 'HEAD', cache: 'no-store' }).then((r) => r.ok).catch(() => false);
  const mount = (b) => {
    b = strip(b);
    for (const p of STYLES) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = b + '/' + p; document.head.appendChild(l); }
    const s = document.createElement('script'); s.src = b + '/_ds_bundle.js';
    s.onerror = () => fail(`found ${b} but its bundle failed to load`);
    document.head.appendChild(s);
    window.BISHS_DS_RESOLVED = b;
  };
  const fail = (why) => {
    console.error(`ds-base.js: Bish's RV design system not found (${why}). Link the design system to this project, or set <meta name="bishs-ds-base" content="_ds/<folder>">. Tried: ${candidates.join(', ')}`);
    const show = () => { const d = document.createElement('div'); d.setAttribute('role', 'alert'); d.textContent = "Bish's RV design system not found. Link it to this project, or set the bishs-ds-base meta tag. See the console for the paths tried."; d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483647;padding:14px 16px;border-radius:8px;background:#B02525;color:#fff;font:600 15px/1.4 system-ui,sans-serif'; document.body.appendChild(d); };
    document.body ? show() : addEventListener('DOMContentLoaded', show);
  };
  (async () => { for (const b of candidates) { if (await probe(b)) return mount(b); } fail('no candidate path answered'); })();
})();
