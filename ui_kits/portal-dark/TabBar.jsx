export function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ background: "#020000", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 32px", position: "sticky", top: 0, zIndex: 200 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 0, overflowX: "auto" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => onChange(tab)} style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 12, fontWeight: active === tab ? 600 : 400,
            letterSpacing: 1.5, textTransform: "uppercase",
            padding: "14px 18px 12px", border: "none", cursor: "pointer",
            background: "transparent",
            color: active === tab ? "#B89E4A" : "#A2A59C",
            borderBottom: active === tab ? "2px solid #8B752E" : "2px solid transparent",
            transition: "all 150ms cubic-bezier(0.2,0,0,1)",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>{tab}</button>
        ))}
      </div>
    </div>
  );
}
Object.assign(window, { TabBar });
