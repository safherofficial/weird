import { ImageResponse } from "next/og";
import { buildGovernanceResult, decodeGovernanceCode } from "../../governance-engine";

export const alt = "A fictional Governance Accountability Office proposal and quorum case file.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function GovernanceCaseImage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const answers = decodeGovernanceCode(code);
  const result = answers ? buildGovernanceResult(answers) : null;
  const title = result?.profile.title ?? "UNRECOGNIZED GOVERNANCE FILE";
  const finding = result?.finding ?? "CASE FILE NOT FOUND";
  const metrics = [
    { label: "PROPOSAL CLARITY", value: result?.proposalClarity ?? 0, color: "#c5a6f2" },
    { label: "VOTING DISCIPLINE", value: result?.votingDiscipline ?? 0, color: "#a7c2b2" },
    { label: "EXECUTION AWARENESS", value: result?.executionAwareness ?? 0, color: "#e4bd76" },
  ];
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "45px 52px", backgroundColor: "#0b0b0a", color: "#f0eee8", border: "2px solid #55466a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "1px solid #40364e" }}>
        <span style={{ color: "#c5a6f2", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
        <span style={{ color: "#a99ab9", fontSize: 13, letterSpacing: 2 }}>GOVERNANCE ACCOUNTABILITY OFFICE / CASE FILE</span>
      </div>
      <div style={{ display: "flex", marginTop: 26, color: "#a99ab9", fontSize: 14, letterSpacing: 2 }}>CASE No. {result?.caseNumber ?? "------"} / FORM GAO-001</div>
      <div style={{ display: "flex", marginTop: 20, fontSize: 46, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
      <div style={{ display: "flex", marginTop: 17, color: "#c5a6f2", fontSize: 15, fontWeight: 700 }}>DEPARTMENTAL FINDING / {finding}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
        {metrics.map((metric) => (
          <div key={metric.label} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "18px", border: "1px solid #40364e", backgroundColor: "#15111b" }}>
            <span style={{ color: "#a99ab9", fontSize: 12, letterSpacing: 1 }}>{metric.label}</span>
            <span style={{ display: "flex", marginTop: 12, color: metric.color, fontSize: 34, fontWeight: 800 }}>{metric.value}/100</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #40364e", color: "#c5a6f2", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
        <span>A VOTE IS NOT AN EXECUTED DECISION.</span>
        <span style={{ color: "#a99ab9", fontWeight: 400 }}>ENTERTAINMENT ONLY</span>
      </div>
    </div>,
    { ...size },
  );
}
