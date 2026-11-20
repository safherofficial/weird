import { ImageResponse } from "next/og";
import { buildDailyOfficeDispatch } from "./daily-engine";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const alt = "THE TRENCHES DESK — a fictional daily Crypto Twitter and Solana trenches briefing.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function DailyOfficeOpenGraphImage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const dispatch = buildDailyOfficeDispatch(issueDate);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 54px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>TRENCHES DESK / {issueDate}</span>
        </div>
        <div style={{ display: "flex", marginTop: 34, color: "#899486", fontSize: 14, letterSpacing: 2 }}>{dispatch.reference} / DAILY CT & SOLANA TRENCHES BRIEFING</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 42, lineHeight: 1.05, fontWeight: 900, letterSpacing: -1, maxWidth: "100%", flexWrap: "wrap" }}>{dispatch.headline}</div>
        <div style={{ display: "flex", marginTop: 17, padding: "18px 20px", border: "1px solid #384137", backgroundColor: "#121713", color: "#b6ff65", fontSize: 16, lineHeight: 1.4, flexWrap: "wrap" }}>{dispatch.bulletin}</div>
        <div style={{ display: "flex", marginTop: "auto", paddingTop: 17, borderTop: "1px solid #30382f", color: "#ff8580", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
          FICTIONAL DAILY SATIRE / NOT REAL NEWS OR MARKET DATA
        </div>
      </div>
    ),
    { ...size }
  );
}
