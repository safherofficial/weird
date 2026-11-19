import { ImageResponse } from "next/og";
import { buildWhitepaperResult, decodeWhitepaperCode } from "../../whitepaper-engine";

export const runtime = "edge";
export const alt = "A fictional DYOR Department Whitepaper Factory result card.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function WhitepaperCaseImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const decoded = decodeWhitepaperCode(code);
  const result = decoded ? buildWhitepaperResult(decoded.answers, decoded.projectSlug) : null;
  const project = result?.projectLabel ?? "PROJECT PENDING";
  const title = result?.profile.title ?? "UNRECOGNIZED WHITEPAPER FILE";
  const metrics = [
    { label: "TECHNICAL DENSITY", value: result?.technicalDensity ?? 0, color: "#b6ff65" },
    { label: "BUZZWORD DENSITY", value: result?.buzzwordDensity ?? 0, color: "#ff7777" },
    { label: "PRODUCT CLARITY", value: result?.productClarity ?? 0, color: "#c8b5ff" },
  ];

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "45px 52px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>WHITEPAPER FACTORY / CASE FILE</span>
        </div>
        <div style={{ display: "flex", marginTop: 27, color: "#899486", fontSize: 14, letterSpacing: 2 }}>CASE No. {result?.caseNumber ?? "------"} / PROJECT: {project}</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 48, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", marginTop: 14, color: "#b6ff65", fontSize: 18 }}>{result?.profile.subtitle ?? "The Department could not verify this document."}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 27 }}>
          {metrics.map((metric) => (
            <div key={metric.label} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "17px 18px", border: "1px solid #384137", backgroundColor: "#121713" }}>
              <span style={{ color: "#8d968a", fontSize: 12, letterSpacing: 1 }}>{metric.label}</span>
              <span style={{ display: "flex", marginTop: 10, color: metric.color, fontSize: 32, fontWeight: 800 }}>{metric.value}/100</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30382f", color: "#b6ff65", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
          <span>NINE SECTIONS. ONE VERY AMBITIOUS ABSTRACT.</span>
          <span style={{ color: "#7c8778", fontWeight: 400 }}>FICTIONAL</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
