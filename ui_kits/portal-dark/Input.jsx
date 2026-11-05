import { makeSpecId } from '../spec-ready/SpecLint.jsx';
export function Input({ label, value, onChange, placeholder, error, helper, disabled, theme = "dark", specId }) {
  const [focus, setFocus] = React.useState(false);
  const L = theme === "light";
  const c = L
    ? { edge: "#949494", focus: "#8B752E", err: "#B02525", errText: "#B02525", label: "#3D3D38", bg: "#FFFFFF", bgOff: "#EFEDE4", text: "#0A0A09", textOff: "#767670", helper: "#6B6B63" }
    : { edge: "rgba(255,255,255,0.30)", focus: "#B89E4A", err: "#E03131", errText: "#FF8787", label: "#E7DDB4", bg: "#111E1E", bgOff: "#0A1414", text: "#fff", textOff: "#4A4D46", helper: "#A2A59C" };
  const borderColor = error ? c.err : focus ? c.focus : c.edge;
  const shadow = focus ? (error ? "0 0 0 3px rgba(224,49,49,0.15)" : "0 0 0 3px rgba(139,117,46,0.15)") : "none";
  return (
    <div style={{ minWidth: 0 }}>
      {label && <label style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 0.5, color: error ? c.errText : c.label, marginBottom: 4 }}>{label}</label>}
      <input data-spec-id={specId || makeSpecId("input", label || placeholder || "field")}
        value={value || ""}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, width: "100%", boxSizing: "border-box",
          padding: "10px 12px", minHeight: 44,
          background: disabled ? c.bgOff : c.bg,
          color: disabled ? c.textOff : c.text,
          border: `1px solid ${borderColor}`, borderRadius: 8, outline: "none",
          boxShadow: shadow,
          transition: "border-color 150ms cubic-bezier(0.2,0,0,1), box-shadow 150ms cubic-bezier(0.2,0,0,1)",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      {(error || helper) && (
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: error ? c.errText : c.helper, marginTop: 4 }}>{error || helper}</div>
      )}
    </div>
  );
}
Object.assign(window, { Input });
