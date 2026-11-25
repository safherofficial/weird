import { ImageResponse } from "next/og";
import { buildDepartmentCaseAtlas } from "../case-atlas";

export const dynamic = "force-dynamic";
export const alt = "THE DYOR DEPARTMENT / CASE ATLAS — an index of fictional crypto-trenches themes across thirteen offices, with date-seeded recurrence and matched-period comparisons.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function DepartmentCaseAtlasOpenGraphImage() {
  const asOfDate = new Date().toISOString().slice(0, 10);
  const atlas = buildDepartmentCaseAtlas(asOfDate, 240);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "52px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>CROSS-DIVISION CASE REGISTER</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 49 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>INSTITUTIONAL REFERENCE / THROUGH {asOfDate} UTC</span>
          <span style={{ display: "flex", marginTop: 16, fontSize: 92, lineHeight: 1, fontWeight: 900, letterSpacing: -5 }}>THE CASE</span>
          <span style={{ display: "flex", marginTop: 0, color: "#b6ff65", fontSize: 92, lineHeight: 1, fontWeight: 900, letterSpacing: -5 }}>ATLAS.</span>
          <span style={{ display: "flex", marginTop: 20, color: "#c5cec0", fontSize: 24 }}>
            {atlas.entries.length} fictional themes / {atlas.divisions.length} offices / {atlas.lookbackDays} date-seeded UTC issues
          </span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", paddingTop: 18, borderTop: "1px solid #30382f", color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>
          RECURRENCE & MATCHED-PERIOD COMPARISONS / NOT LIVE MARKET ACTIVITY
        </div>
      </div>
    ),
    { ...size }
  );
}
