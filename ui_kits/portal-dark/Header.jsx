import { makeSpecId } from '../spec-ready/SpecLint.jsx';
// theme = surface role. dark: ink→green hero. light: white band on cream with the same gold rule.
export function Header({ eyebrow = "Nexus Portal · Dealer Ops", title = "Inventory", titleAccent = "Dashboard", meta = [["Location", "Coeur d'Alene"], ["Units", "284"], ["Updated", "2 min ago"]], theme = "dark", specId, logoSrc }) {
  const L = theme === "light";
  const c = L
    ? { bg: "#FFFFFF", ring: "rgba(139,117,46,0.12)", ring2: "rgba(139,117,46,0.06)", over: "#5E4F1F", title: "#0A0A09", accent: "#8A742D", k: "#3D3D38", v: "#6B6B63", logo: "../../assets/logo-tag-black-gold.png" }
    : { bg: "linear-gradient(135deg, #020000 0%, #203232 65%, #2A4040 100%)", ring: "rgba(139,117,46,0.10)", ring2: "rgba(139,117,46,0.05)", over: "#B89E4A", title: "#fff", accent: "#B89E4A", k: "#E7DDB4", v: "#A2A59C", logo: "../../assets/logo-tag-gold.png" };
  return (
    <header data-spec-id={specId || "sec-page-header"} data-bos-level="section" data-bos-type="header" style={{
      background: c.bg,
      borderBottom: "2px solid #8A742D",
      padding: "40px 32px 32px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, border: `1px solid ${c.ring}`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -120, right: -120, width: 480, height: 480, border: `1px solid ${c.ring2}`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: c.over, marginBottom: 10, fontWeight: 600 }}>{eyebrow}</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: 2, lineHeight: 1, color: c.title, margin: 0, fontWeight: 400 }}>
            {title} <span style={{ color: c.accent }}>{titleAccent}</span>
          </h1>
          <div style={{ marginTop: 14, display: "flex", gap: 24, flexWrap: "wrap" }}>
            {meta.map(([k, v]) => (
              <span key={k} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: c.v }}>
                <strong style={{ color: c.k, fontWeight: 500 }}>{k}</strong> {v}
              </span>
            ))}
          </div>
        </div>
        <img src={logoSrc || c.logo} alt="Bish's RV" style={{ height: 64, opacity: 0.95 }} />
      </div>
    </header>
  );
}
Object.assign(window, { Header });
