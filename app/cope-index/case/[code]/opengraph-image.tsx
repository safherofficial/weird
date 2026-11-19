import { ImageResponse } from "next/og";
import { buildPersonalCopeResult, decodeCopeCode } from "../../cope-engine";

export const runtime = "edge";
export const alt = "A fictional personal reading from THE DYOR DEPARTMENT Global Cope Index.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CopeCaseImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const answers = decodeCopeCode(code);
  const result = answers ? buildPersonalCopeResult(answers) : null;
  const title = result?.profile.title ?? "UNRECOGNIZED PERSONAL FILE";
  const values = [
    { label: "COPE INDEX", value: result?.copeScore ?? 0, color: "#ff7777" },
    { label: "PATIENCE INDEX", value: result?.patienceScore ?? 0, color: "#b6ff65" },
    { label: "CHAT DEPENDENCY", value: result?.chatDependency ?? 0, color: "#c8b5ff" },
  ];

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 54px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>GLOBAL COPE INDEX / PERSONAL FILE</span>
        </div>
        <div style={{ display: "flex", marginTop: 36, color: "#899486", fontSize: 14, letterSpacing: 2 }}>CASE No. {result?.caseNumber ?? "------"} / SELF-REPORTED READING</div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 48, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", marginTop: 14, color: "#b6ff65", fontSize: 19 }}>{result?.profile.subtitle ?? "The Department could not verify this file."}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          {values.map((item) => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "16px 18px", border: "1px solid #384137", backgroundColor: "#121713" }}>
              <span style={{ color: "#8d968a", fontSize: 12, letterSpacing: 1 }}>{item.label}</span>
              <span style={{ display: "flex", marginTop: 9, color: item.color, fontSize: 31, fontWeight: 800 }}>{item.value}/100</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30382f", color: "#ff8580", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
          FICTIONAL SELF-REPORTED READING / NOT REAL MARKET OR SENTIMENT DATA
        </div>
      </div>
    ),
    { ...size }
  );
}
