import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { buildDailyOfficeDispatch } from "../../daily-engine";
import { isValidInstitutionalMemoryDate } from "../../institutional-memory";

export const dynamic = "force-dynamic";
export const alt = "A date-specific fictional Trenches Desk daily dispatch from THE DYOR DEPARTMENT.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function wrapText(value: string, maxLength: number): string[] {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? line + " " + word : word;
    if (next.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

export default async function ArchivedDailyOpenGraphImage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  if (!isValidInstitutionalMemoryDate(date)) notFound();

  const dispatch = buildDailyOfficeDispatch(date);
  const headlineLines = wrapText(dispatch.headline, 42).slice(0, 2);
  const bulletinLines = wrapText(dispatch.bulletin, 100).slice(0, 2);
  const quoteLines = wrapText(dispatch.quote, 86).slice(0, 2);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "46px 54px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 14, letterSpacing: 2 }}>INSTITUTIONAL MEMORY / {date} UTC</span>
        </div>

        <div style={{ display: "flex", marginTop: 28, color: "#899486", fontSize: 15, letterSpacing: 2 }}>
          {dispatch.reference} / ARCHIVED TRENCHES DESK BRIEFING
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
          {headlineLines.map((line, index) => (
            <span key={index} style={{ display: "flex", color: index === 0 ? "#f0f0e9" : "#b6ff65", fontSize: 49, lineHeight: 1.06, fontWeight: 900, letterSpacing: -1.6 }}>
              {line}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 20, padding: "16px 20px", border: "1px solid #384137", backgroundColor: "#121713" }}>
          <span style={{ color: "#b6ff65", fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>OFFICIAL BULLETIN / FICTIONAL NOTICE</span>
          {bulletinLines.map((line, index) => (
            <span key={index} style={{ display: "flex", marginTop: index === 0 ? 9 : 3, color: "#d8dfd3", fontSize: 18, lineHeight: 1.3 }}>
              {line}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, color: "#d8b477", fontSize: 16, fontWeight: 700 }}>
          <span>CONVICTION INDEX / {dispatch.convictionIndex.score}/100 — {dispatch.convictionIndex.classification}</span>
          <span style={{ color: "#b6ff65" }}>{dispatch.assignedDepartment}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", paddingTop: 15, borderTop: "1px solid #30382f" }}>
          {quoteLines.map((line, index) => (
            <span key={index} style={{ display: "flex", color: "#d8b477", fontSize: 16, lineHeight: 1.25 }}>
              “{line}”
            </span>
          ))}
          <span style={{ display: "flex", marginTop: 10, color: "#ff8580", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            FICTIONAL DAILY SATIRE / NOT REAL NEWS OR MARKET DATA
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
