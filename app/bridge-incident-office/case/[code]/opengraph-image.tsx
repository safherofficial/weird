import { ImageResponse } from "next/og";
import { buildBridgeResult, decodeBridgeCode } from "../../bridge-engine";

export const alt = "A fictional Bridge Incident Office transfer and settlement case file.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BridgeCaseImage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const answers = decodeBridgeCode(code);
  const result = answers ? buildBridgeResult(answers) : null;
  const title = result?.profile.title ?? "UNRECOGNIZED TRANSFER FILE";
  const finding = result?.finding ?? "CASE FILE NOT FOUND";
  const metrics = [
    { label: "RECEIPT QUALITY", value: result?.receiptQuality ?? 0, color: "#9ad7df" },
    { label: "ROUTE LITERACY", value: result?.routeLiteracy ?? 0, color: "#a7c2b2" },
    { label: "PATIENCE DISCIPLINE", value: result?.patienceDiscipline ?? 0, color: "#d8c6a3" },
  ];
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "45px 52px", backgroundColor: "#0b0b0a", color: "#f0eee8", border: "2px solid #405b62", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "1px solid #34474b" }}>
        <span style={{ color: "#9ad7df", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
        <span style={{ color: "#91aeb2", fontSize: 13, letterSpacing: 2 }}>BRIDGE INCIDENT OFFICE / CASE FILE</span>
      </div>
      <div style={{ display: "flex", marginTop: 26, color: "#91aeb2", fontSize: 14, letterSpacing: 2 }}>CASE No. {result?.caseNumber ?? "------"} / FORM BIO-001</div>
      <div style={{ display: "flex", marginTop: 20, fontSize: 46, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
      <div style={{ display: "flex", marginTop: 17, color: "#9ad7df", fontSize: 15, fontWeight: 700 }}>DEPARTMENTAL FINDING / {finding}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
        {metrics.map((metric) => (
          <div key={metric.label} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "18px", border: "1px solid #34474b", backgroundColor: "#101719" }}>
            <span style={{ color: "#91aeb2", fontSize: 12, letterSpacing: 1 }}>{metric.label}</span>
            <span style={{ display: "flex", marginTop: 12, color: metric.color, fontSize: 34, fontWeight: 800 }}>{metric.value}/100</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #34474b", color: "#9ad7df", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
        <span>ONE RECEIPT IS NOT TWO SETTLEMENTS.</span>
        <span style={{ color: "#91aeb2", fontWeight: 400 }}>ENTERTAINMENT ONLY</span>
      </div>
    </div>,
    { ...size },
  );
}
