import { ImageResponse } from "next/og";
import { buildInstitutionalMemory } from "../institutional-memory";

export const dynamic = "force-dynamic";
export const alt = "THE DYOR DEPARTMENT / INSTITUTIONAL MEMORY LEDGER — fourteen consecutive fictional Trenches Desk dispatches connected by a date-based paper trail.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function InstitutionalMemoryOpenGraphImage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const records = buildInstitutionalMemory(issueDate, 14).slice().reverse();
  const latestRecord = records[0];
  const oldestRecord = records[records.length - 1];

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "52px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>TRENCHES DESK / INSTITUTIONAL MEMORY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 38 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>
            {oldestRecord.issueDate} — {latestRecord.issueDate} / UTC REGISTER
          </span>
          <span style={{ display: "flex", marginTop: 13, fontSize: 72, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>THE MEMORY</span>
          <span style={{ display: "flex", marginTop: 0, color: "#b6ff65", fontSize: 72, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>LEDGER.</span>
          <span style={{ display: "flex", marginTop: 15, color: "#c5cec0", fontSize: 23 }}>
            {records.length} consecutive fictional dispatches. The paper trail remembers.
          </span>
          <span style={{ display: "flex", marginTop: 18, color: "#b6ff65", fontSize: 19, fontWeight: 700 }}>
            LATEST FILE / {latestRecord.reference}
          </span>
          <span style={{ display: "flex", marginTop: 7, color: "#f0f0e9", fontSize: 25, lineHeight: 1.15, fontWeight: 700, flexWrap: "wrap" }}>
            {latestRecord.headline}
          </span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30382f", color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>
          FICTIONAL CONTINUITY / NO VISITOR DATA IS STORED
        </div>
      </div>
    ),
    { ...size }
  );
}
