import { makeSpecId } from '../spec-ready/SpecLint.jsx';
export function Input({ label, value, onChange, placeholder, error, helper, disabled , specId }) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "#E03131" : focus ? "#B89E4A" : "rgba(255,255,255,0.30)";
  const shadow = focus ? (error ? "0 0 0 3px rgba(224,49,49,0.15)" : "0 0 0 3px rgba(139,117,46,0.15)") : "none";
  return (
    <div style={{ minWidth: 0 }}>
      {label && <label style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 0.5, color: error ? "#FF8787" : "#E7DDB4", marginBottom: 4 }}>{label}</label>}
      <input data-spec-id={specId || makeSpecId("input", label || placeholder || "field")}
        value={value || ""}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, width: "100%", boxSizing: "border-box",
          padding: "10px 12px",
          background: disabled ? "#0A1414" : "#111E1E",
          color: disabled ? "#4A4D46" : "#fff",
          border: `1px solid ${borderColor}`, borderRadius: 8, outline: "none",
          boxShadow: shadow,
          transition: "border-color 150ms cubic-bezier(0.2,0,0,1), box-shadow 150ms cubic-bezier(0.2,0,0,1)",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
      {(error || helper) && (
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: error ? "#FF8787" : "#A2A59C", marginTop: 4 }}>          {error || helper}
        </div>
      )}
    </div>
  );
}
Object.assign(window, { Input });
