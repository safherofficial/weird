import { ImageResponse } from "next/og";
import { buildDailyCopeIndex } from "./cope-engine";
import { getDailyEditorialCase } from "../daily-office/daily-engine";

export const runtime = "edge";
export const alt = "COPIUM ADMINISTRATION — A fictional daily Solana trenches index of CT echo, launch FOMO and post-graduation cope.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function CopeIndexOpenGraphImage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const dailyIndex = buildDailyCopeIndex(issueDate, getDailyEditorialCase(issueDate));

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "54px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>COPIUM ADMINISTRATION / SYNTHETIC TRENCHES INDEX</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 53 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>DAILY TRENCHES READING / SYNTHETIC VALUES</span>
          <span style={{ display: "flex", marginTop: 17, fontSize: 76, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>THE GLOBAL</span>
          <span style={{ display: "flex", marginTop: 4, color: "#b6ff65", fontSize: 76, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>COPE INDEX.</span>
          <span style={{ display: "flex", marginTop: 18, color: "#e2b875", fontSize: 15, letterSpacing: 2 }}>SHARED DAILY CASE / {dailyIndex.caseTheme}</span>
          <span style={{ display: "flex", marginTop: 10, color: "#c5cec0", fontSize: 20, lineHeight: 1.35 }}>{dailyIndex.caseHeadline}</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>NO LIVE FEED / NO REAL USERS / NO MARKET DATA</div>
      </div>
    ),
    { ...size }
  );
}
