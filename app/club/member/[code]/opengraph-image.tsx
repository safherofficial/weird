import { ImageResponse } from "next/og";
import { buildClubResult, decodeClubCode } from "../../club-engine";

export const runtime = "edge";
export const alt = "A fictional membership card from THE DYOR DEPARTMENT 99% CLUB.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ClubMemberImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const answers = decodeClubCode(code);
  const result = answers ? buildClubResult(answers) : null;

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 54px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>THE 99% CLUB / MEMBERSHIP OFFICE</span>
        </div>
        <div style={{ display: "flex", marginTop: 38, color: "#899486", fontSize: 15, letterSpacing: 2 }}>MEMBERSHIP CERTIFICATE / {result?.memberNumber ?? "99-000000"}</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 48, lineHeight: 1.05, fontWeight: 900, letterSpacing: -2 }}>{result?.profile.title ?? "UNRECOGNIZED MEMBER FILE"}</div>
        <div style={{ display: "flex", marginTop: 16, color: "#b6ff65", fontSize: 22 }}>{result?.profile.motto ?? "THE DEPARTMENT COULD NOT VERIFY THIS FILE."}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
          {[
            { label: "CONVICTION", value: result?.conviction ?? 0, color: "#b6ff65" },
            { label: "COPE INDEX", value: result?.cope ?? 0, color: "#ff7777" },
            { label: "CHAT DEPENDENCY", value: result?.chatDependency ?? 0, color: "#c8b5ff" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", flex: 1, flexDirection: "column", padding: "15px 17px", border: "1px solid #384137", backgroundColor: "#121713" }}>
              <span style={{ color: "#8d968a", fontSize: 12, letterSpacing: 1 }}>{item.label}</span>
              <span style={{ display: "flex", marginTop: 9, color: item.color, fontSize: 30, fontWeight: 800 }}>{item.value}/100</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30382f", color: "#b6ff65", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
          <span>NO BENEFITS. NO TOKEN. NO REAL 99% STATISTIC.</span>
          <span style={{ color: "#7c8778", fontWeight: 400 }}>ENTERTAINMENT ONLY</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
