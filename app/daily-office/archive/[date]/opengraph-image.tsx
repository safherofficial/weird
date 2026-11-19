import { ImageResponse } from "next/og";
import { buildDailyNotice, isValidUtcDate } from "../../daily-engine";

export const runtime = "edge";
export const alt = "A fictional Daily Departmental Absurdity notice from THE DYOR DEPARTMENT.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function DailyArchiveImage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const notice = isValidUtcDate(date) ? buildDailyNotice(date) : null;

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 54px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>DAILY DEPARTMENTAL ABSURDITY</span>
        </div>
        <div style={{ display: "flex", marginTop: 35, color: "#899486", fontSize: 14, letterSpacing: 2 }}>DAILY DOCKET / {notice?.docketNumber ?? "DDA-000"}</div>
        <div style={{ display: "flex", marginTop: 12, color: "#b6ff65", fontSize: 14, letterSpacing: 1 }}>{notice?.department ?? "CENTRAL OFFICE"}</div>
        <div style={{ display: "flex", marginTop: 23, fontSize: 48, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{notice?.headline ?? "UNRECOGNIZED DAILY FILE"}</div>
        <div style={{ display: "flex", marginTop: 22, color: "#ff8580", fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>DEPARTMENTAL FINDING / {notice?.finding ?? "NOTICE NOT FOUND"}</div>
        <div style={{ display: "flex", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30382f", color: "#b6ff65", fontSize: 12, letterSpacing: 1 }}>
          FICTIONAL DAILY NOTICE / NOT CURRENT NEWS OR MARKET DATA
        </div>
      </div>
    ),
    { ...size }
  );
}
