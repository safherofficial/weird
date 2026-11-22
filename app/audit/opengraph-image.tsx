import { ImageResponse } from "next/og";

export const alt = "The DYOR Audit 2.0 — Ten questions. Seventeen degen archetypes. One fictional case file.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function AuditOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "54px 58px",
          backgroundColor: "#090b09",
          color: "#f0f0e9",
          border: "2px solid #34412f",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>FORM DYOR-002 / NOW ACCEPTING CASES</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 47 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>FOMO CONTROL UNIT / KOL-TRIGGERED ENTRY DESK</span>
          <span style={{ display: "flex", marginTop: 15, fontSize: 82, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>THE DYOR AUDIT 2.0</span>
          <span style={{ display: "flex", marginTop: 18, color: "#c5cec0", fontSize: 25 }}>10 questions. 17 degen archetypes. 3 fictional scores. One missing exit plan.</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
          {["RESEARCH EFFORT", "COPE INDEX", "CROWD DEPENDENCY"].map((label) => (
            <div key={label} style={{ display: "flex", flex: 1, padding: "17px 18px", border: "1px solid #384137", backgroundColor: "#121713", color: "#b6ff65", fontSize: 14, letterSpacing: 1 }}>
              {label}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: 17, color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>
          A SATIRICAL PERSONALITY QUIZ / NOT FINANCIAL ADVICE
        </div>
      </div>
    ),
    { ...size }
  );
}
