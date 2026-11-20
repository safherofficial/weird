import { ImageResponse } from "next/og";
import { buildRoadmapResult, decodeRoadmapCode } from "../../roadmap-engine";

export const runtime = "edge";
export const alt = "A fictional CTO Emergency Office recovery roadmap card from THE DYOR DEPARTMENT.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function RoadmapCaseImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const decoded = decodeRoadmapCode(code);
  const result = decoded ? buildRoadmapResult(decoded.answers, decoded.projectSlug) : null;
  const title = result?.profile.title ?? "UNRECOGNIZED ROADMAP FILE";
  const project = result?.projectLabel ?? "PROJECT SOON";
  const finding = result?.finding ?? "CASE FILE NOT FOUND";
  const scores = [
    { label: "DELIVERY CLARITY", value: result?.delivery ?? 0, color: "#b6ff65" },
    { label: "TIMELINE REALISM", value: result?.realism ?? 0, color: "#c8b5ff" },
    { label: "PROMISE INFLATION", value: result?.inflation ?? 0, color: "#ff7777" },
  ];

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "45px 52px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>CTO EMERGENCY OFFICE / TAKEOVER ROADMAP</span>
        </div>
        <div style={{ display: "flex", marginTop: 27, color: "#899486", fontSize: 14, letterSpacing: 2 }}>CASE No. {result?.caseNumber ?? "------"} / PROJECT: {project}</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 46, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", marginTop: 17, color: "#ff8580", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>DEPARTMENTAL FINDING / {finding}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 27 }}>
          {scores.map((score) => (
            <div key={score.label} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "17px 18px", border: "1px solid #384137", backgroundColor: "#121713" }}>
              <span style={{ color: "#8d968a", fontSize: 12, letterSpacing: 1 }}>{score.label}</span>
              <span style={{ display: "flex", marginTop: 10, color: score.color, fontSize: 32, fontWeight: 800 }}>{score.value}/100</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30382f", color: "#b6ff65", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
          <span>EVERY MILESTONE IS ACHIEVABLE. EVENTUALLY. PROBABLY. SOON.</span>
          <span style={{ color: "#7c8778", fontWeight: 400 }}>FICTIONAL</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
