import { ImageResponse } from "next/og";

export const alt = "The Airdrop Entitlement Office — fictional snapshot and eligibility case intake.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function AirdropOfficeImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "50px 56px", backgroundColor: "#0b0b0a", color: "#f0eee8", border: "2px solid #544a36", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #464033" }}>
        <span style={{ color: "#e4bd76", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
        <span style={{ color: "#a69a7e", fontSize: 14, letterSpacing: 2 }}>DIVISION 11 / FORM AEO-001</span>
      </div>
      <div style={{ display: "flex", marginTop: 58, color: "#e4bd76", fontSize: 18, letterSpacing: 3 }}>AIRDROP ENTITLEMENT OFFICE</div>
      <div style={{ display: "flex", marginTop: 22, maxWidth: 1000, fontSize: 76, lineHeight: .98, fontWeight: 900, letterSpacing: -4 }}>THE SNAPSHOT TRIBUNAL.</div>
      <div style={{ display: "flex", marginTop: 24, color: "#c3bdaE", fontSize: 27 }}>POINTS WERE COUNTED. WERE THE RULES?</div>
      <div style={{ display: "flex", gap: 12, marginTop: "auto", paddingTop: 22, borderTop: "1px solid #464033", color: "#a69a7e", fontSize: 15, letterSpacing: 1 }}>
        <span>7 QUESTIONS</span><span>·</span><span>3 FICTIONAL SCORES</span><span>·</span><span>NO WALLET CHECK</span>
      </div>
    </div>,
    { ...size },
  );
}
