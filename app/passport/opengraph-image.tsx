import { ImageResponse } from "next/og";

export const alt = "THE DYOR DEPARTMENT Passport — ten departments, local visit stamps and fictional achievements.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function DepartmentPassportOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "54px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>OFFICE OF DEPARTMENTAL VISITS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 52 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>REGISTER DPP-001 / VISITS + COMPLETION BADGES</span>
          <span style={{ display: "flex", marginTop: 17, fontSize: 78, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>THE DEPARTMENT</span>
          <span style={{ display: "flex", marginTop: 4, color: "#b6ff65", fontSize: 78, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>PASSPORT.</span>
          <span style={{ display: "flex", marginTop: 19, color: "#c5cec0", fontSize: 25 }}>12 visit stamps. 28 achievement badges. Absolutely no practical value.</span>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
          {["OPTIONAL / OFF BY DEFAULT", "NO ACCOUNT", "LOCAL STORAGE ONLY"].map((label) => (
            <div key={label} style={{ display: "flex", flex: 1, padding: "17px 18px", border: "1px solid #384137", backgroundColor: "#121713", color: "#b6ff65", fontSize: 13, letterSpacing: 1 }}>{label}</div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: 17, color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>VISITS ARE RECORDED ONLY AFTER EXPLICIT OPT-IN</div>
      </div>
    ),
    { ...size }
  );
}
