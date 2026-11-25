import { ImageResponse } from "next/og";

export const alt = "The Bridge Incident Office — fictional cross-chain transfer and settlement incident intake.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BridgeIncidentOfficeImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "50px 56px", backgroundColor: "#0b0b0a", color: "#f0eee8", border: "2px solid #405b62", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #34474b" }}>
        <span style={{ color: "#9ad7df", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
        <span style={{ color: "#91aeb2", fontSize: 14, letterSpacing: 2 }}>DIVISION 12 / FORM BIO-001</span>
      </div>
      <div style={{ display: "flex", marginTop: 58, color: "#9ad7df", fontSize: 18, letterSpacing: 3 }}>BRIDGE INCIDENT OFFICE</div>
      <div style={{ display: "flex", marginTop: 22, maxWidth: 1000, fontSize: 76, lineHeight: .98, fontWeight: 900, letterSpacing: -4 }}>SOURCE CONFIRMED.<br />DESTINATION PENDING.</div>
      <div style={{ display: "flex", marginTop: 24, color: "#c3cdd0", fontSize: 27 }}>THE TRANSFER IS NOW A CASE FILE.</div>
      <div style={{ display: "flex", gap: 12, marginTop: "auto", paddingTop: 22, borderTop: "1px solid #34474b", color: "#91aeb2", fontSize: 15, letterSpacing: 1 }}>
        <span>7 QUESTIONS</span><span>·</span><span>3 FICTIONAL SCORES</span><span>·</span><span>NO WALLET CHECK</span>
      </div>
    </div>,
    { ...size },
  );
}
