import { ImageResponse } from "next/og";
import { buildUtilityResult, decodeUtilityCode } from "../../utility-engine";

export const alt = "A fictional 100X Research Bureau token-purpose inspection card.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function UtilityCaseImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const answers = decodeUtilityCode(code);
  const result = answers ? buildUtilityResult(answers) : null;
  const title = result?.profile.title ?? "UNRECOGNIZED UTILITY FILE";
  const subtitle = result?.profile.subtitle ?? "The Department could not verify this inspection.";
  const finding = result?.finding ?? "CASE FILE NOT FOUND";
  const crossReadHeadline = result?.crossRead.headline ?? "CROSS-READ NOT AVAILABLE";
  const metrics = [
    { label: "UTILITY EVIDENCE", value: result?.evidence ?? 0, color: "#b6ff65" },
    { label: "NARRATIVE FOG", value: result?.fog ?? 0, color: "#ff7777" },
    { label: "TOKEN JUSTIFICATION", value: result?.tokenFit ?? 0, color: "#c8b5ff" },
  ];

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "45px 52px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>100X RESEARCH BUREAU / CASE FILE</span>
        </div>
        <div style={{ display: "flex", marginTop: 27, color: "#899486", fontSize: 14, letterSpacing: 2 }}>CASE No. {result?.caseNumber ?? "------"} / FORM UTI-001</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 47, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", marginTop: 12, color: "#b6ff65", fontSize: 18 }}>{subtitle}</div>
        <div style={{ display: "flex", marginTop: 20, color: "#ff8580", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>DEPARTMENTAL FINDING / {finding}</div>
        <div style={{ display: "flex", marginTop: 11, color: "#b6ff65", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
          BEHAVIOURAL CROSS-READ / {crossReadHeadline}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 17 }}>
          {metrics.map((metric) => (
            <div key={metric.label} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "17px 18px", border: "1px solid #384137", backgroundColor: "#121713" }}>
              <span style={{ color: "#8d968a", fontSize: 12, letterSpacing: 1 }}>{metric.label}</span>
              <span style={{ display: "flex", marginTop: 10, color: metric.color, fontSize: 32, fontWeight: 800 }}>{metric.value}/100</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30382f", color: "#b6ff65", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
          <span>UTILITY CLAIMS HAVE BEEN RECEIVED. PROOF IS A SEPARATE DEPARTMENT.</span>
          <span style={{ color: "#7c8778", fontWeight: 400 }}>ENTERTAINMENT ONLY</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
