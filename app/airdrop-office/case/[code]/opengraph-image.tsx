import { ImageResponse } from "next/og";
import { buildAirdropResult, decodeAirdropCode } from "../../airdrop-engine";

export const alt = "A fictional Airdrop Entitlement Office snapshot and eligibility case file.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function AirdropCaseImage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const answers = decodeAirdropCode(code);
  const result = answers ? buildAirdropResult(answers) : null;
  const title = result?.profile.title ?? "UNRECOGNIZED ENTITLEMENT FILE";
  const finding = result?.finding ?? "CASE FILE NOT FOUND";
  const metrics = [
    { label: "RECEIPT QUALITY", value: result?.receipts ?? 0, color: "#e4bd76" },
    { label: "RULE AWARENESS", value: result?.ruleAwareness ?? 0, color: "#a7c2b2" },
    { label: "EXPECTATION CONTROL", value: result?.expectationControl ?? 0, color: "#c8b5ff" },
  ];
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "45px 52px", backgroundColor: "#0b0b0a", color: "#f0eee8", border: "2px solid #544a36", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "1px solid #464033" }}>
        <span style={{ color: "#e4bd76", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
        <span style={{ color: "#a69a7e", fontSize: 13, letterSpacing: 2 }}>AIRDROP ENTITLEMENT OFFICE / CASE FILE</span>
      </div>
      <div style={{ display: "flex", marginTop: 26, color: "#a69a7e", fontSize: 14, letterSpacing: 2 }}>CASE No. {result?.caseNumber ?? "------"} / FORM AEO-001</div>
      <div style={{ display: "flex", marginTop: 20, fontSize: 46, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
      <div style={{ display: "flex", marginTop: 17, color: "#e4bd76", fontSize: 15, fontWeight: 700 }}>DEPARTMENTAL FINDING / {finding}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
        {metrics.map((metric) => (
          <div key={metric.label} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "18px", border: "1px solid #464033", backgroundColor: "#17150f" }}>
            <span style={{ color: "#a69a7e", fontSize: 12, letterSpacing: 1 }}>{metric.label}</span>
            <span style={{ display: "flex", marginTop: 12, color: metric.color, fontSize: 34, fontWeight: 800 }}>{metric.value}/100</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #464033", color: "#e4bd76", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
        <span>POINTS ARE NOT AN ALLOCATION. ACTIVITY IS NOT AUTOMATIC ELIGIBILITY.</span>
        <span style={{ color: "#a69a7e", fontWeight: 400 }}>ENTERTAINMENT ONLY</span>
      </div>
    </div>,
    { ...size },
  );
}
