import { ImageResponse } from "next/og";
import { buildResult, decodeCaseCode } from "../../audit-engine";

export const alt = "A fictional DYOR Department personal audit case file.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const answers = decodeCaseCode(code);
  const result = answers ? buildResult(answers) : null;

  const profileTitle = result?.profile.title ?? "UNRECOGNIZED CASE FILE";
  const subtitle = result?.profile.subtitle ?? "The Department could not verify this report.";
  const finding = result?.finding ?? "CASE FILE NOT FOUND";
  const crossReadHeadline = result?.crossRead.headline ?? "BEHAVIOURAL CROSS-READ UNAVAILABLE";
  const roast = result?.profile.roast ?? "Please return to the Department and begin again.";
  const caseNumber = result?.caseNumber ?? "------";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "45px 52px",
          backgroundColor: "#090b09",
          color: "#f0f0e9",
          border: "2px solid #34412f",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 20,
            borderBottom: "1px solid #30382f",
            color: "#b6ff65",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          <span>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#929d8d", fontSize: 13, fontWeight: 400 }}>OFFICIAL ENTERTAINMENT FILE</span>
        </div>

        <div style={{ display: "flex", marginTop: 26, color: "#899486", fontSize: 14, letterSpacing: 2 }}>
          CASE No. {caseNumber} / PERSONAL DYOR AUDIT
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontSize: 53,
            lineHeight: 1.05,
            fontWeight: 900,
            letterSpacing: -2,
          }}
        >
          {profileTitle}
        </div>

        <div style={{ display: "flex", marginTop: 10, color: "#b6ff65", fontSize: 20 }}>
          {subtitle}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 18,
            color: "#ff8580",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          DEPARTMENTAL FINDING / {finding}
        </div>

        <div style={{ display: "flex", marginTop: 12, color: "#b6ff65", fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>
          BEHAVIOURAL CROSS-READ / {crossReadHeadline}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          {[
            { label: "RESEARCH EFFORT", value: result?.research ?? 0, color: "#b6ff65" },
            { label: "COPE INDEX", value: result?.cope ?? 0, color: "#ff7777" },
            { label: "CROWD DEPENDENCY", value: result?.crowd ?? 0, color: "#c8b5ff" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "14px 18px",
                border: "1px solid #384137",
                backgroundColor: "#121713",
              }}
            >
              <span style={{ color: "#8d968a", fontSize: 12, letterSpacing: 1 }}>{item.label}</span>
              <span style={{ marginTop: 8, color: item.color, fontSize: 32, fontWeight: 800 }}>{item.value}/100</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: 18, color: "#e1e5dc", fontSize: 17, lineHeight: 1.35 }}>
          “{roast}”
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: 14,
            borderTop: "1px solid #30382f",
            color: "#b6ff65",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          <span>YOUR RESEARCH HAS BEEN ACKNOWLEDGED. YOUR LOSSES REMAIN YOURS.</span>
          <span style={{ color: "#7c8778", fontWeight: 400 }}>ENTERTAINMENT ONLY</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
