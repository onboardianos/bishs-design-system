import { makeSpecId } from '../spec-ready/SpecLint.jsx';
// Active tab = gold-lo text on light / gold-hi on dark (current-item wayfinding, one of gold's three jobs).
export function TabBar({ tabs, active, onChange, theme = "dark", specId }) {
  const L = theme === "light";
  const c = L ? { bg: "#FFFFFF", line: "rgba(0,0,0,0.08)", on: "#5E4F1F", off: "#6B6B63" } : { bg: "#020000", line: "rgba(255,255,255,0.07)", on: "#B89E4A", off: "#A2A59C" };
  return (
    <div data-spec-id={specId || "nav-tabs"} data-bos-type="nav" style={{ background: c.bg, borderBottom: `1px solid ${c.line}`, padding: "0 32px", position: "sticky", top: 0, zIndex: 200 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
        {tabs.map(tab => (
          <button data-spec-id={makeSpecId("nav-tab", tab)} data-bos-class="nav" aria-current={active === tab ? "page" : undefined} key={tab} onClick={() => onChange(tab)} style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 12, fontWeight: active === tab ? 600 : 400,
            letterSpacing: 1.5, textTransform: "uppercase",
            padding: "14px 18px 12px", minHeight: 44, border: "none", cursor: "pointer",
            background: "transparent",
            color: active === tab ? c.on : c.off,
            borderBottom: active === tab ? "2px solid #8A742D" : "2px solid transparent",
            transition: "all 150ms cubic-bezier(0.2,0,0,1)",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>{tab}</button>
        ))}
      </div>
    </div>
  );
}
Object.assign(window, { TabBar });
