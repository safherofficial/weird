import { ImageResponse } from "next/og";

export const alt = "The Governance Accountability Office — fictional proposal, quorum and voting-process review.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function GovernanceOfficeImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "50px 56px", backgroundColor: "#0b0b0a", color: "#f0eee8", border: "2px solid #55466a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #40364e" }}>
        <span style={{ color: "#c5a6f2", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
        <span style={{ color: "#a99ab9", fontSize: 14, letterSpacing: 2 }}>DIVISION 13 / FORM GAO-001</span>
      </div>
      <div style={{ display: "flex", marginTop: 58, color: "#c5a6f2", fontSize: 18, letterSpacing: 3 }}>GOVERNANCE ACCOUNTABILITY OFFICE</div>
      <div style={{ display: "flex", marginTop: 22, maxWidth: 1000, fontSize: 72, lineHeight: .98, fontWeight: 900, letterSpacing: -4 }}>THE QUORUM TRIBUNAL.</div>
      <div style={{ display: "flex", marginTop: 24, color: "#d2c8dc", fontSize: 27 }}>A VOTE IS NOT AN EXECUTED DECISION.</div>
      <div style={{ display: "flex", gap: 12, marginTop: "auto", paddingTop: 22, borderTop: "1px solid #40364e", color: "#a99ab9", fontSize: 15, letterSpacing: 1 }}>
        <span>7 QUESTIONS</span><span>·</span><span>3 FICTIONAL SCORES</span><span>·</span><span>NO DAO CHECK</span>
      </div>
    </div>,
    { ...size },
  );
}
