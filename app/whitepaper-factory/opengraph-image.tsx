import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EXIT LIQUIDITY DEPARTMENT — A fictional Solana token dossier covering tokenomics, launch narrative and post-graduation risk."
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function WhitepaperFactoryOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "54px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>EXIT LIQUIDITY DEPARTMENT / TOKEN DOSSIER OFFICE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 48 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>FORM WPF-001 / DOCUMENT INTAKE</span>
          <span style={{ display: "flex", marginTop: 15, fontSize: 74, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>THE TOKEN DOSSIER</span>
          <span style={{ display: "flex", marginTop: 4, color: "#b6ff65", fontSize: 74, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>FACTORY.</span>
          <span style={{ display: "flex", marginTop: 19, color: "#c5cec0", fontSize: 24 }}>7 questions. 9 sections. 1 technically impressive situation.</span>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
          {["TECHNICAL DENSITY", "BUZZWORD DENSITY", "PRODUCT CLARITY"].map((label) => (
            <div key={label} style={{ display: "flex", flex: 1, padding: "17px 18px", border: "1px solid #384137", backgroundColor: "#121713", color: "#b6ff65", fontSize: 14, letterSpacing: 1 }}>{label}</div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: 17, color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>FICTIONAL ENTERTAINMENT DOCUMENT / NOT REAL TOKEN DOCUMENTATION</div>
      </div>
    ),
    { ...size }
  );
}
