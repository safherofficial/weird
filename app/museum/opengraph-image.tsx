import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "THE BAGHOLDER MUSEUM — Fifteen fictional Solana trenches relics, including bonding-curve, bundle and CTO artifacts.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function MuseumOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "54px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>BAGHOLDER REHABILITATION / TRENCHES RELIC COLLECTION</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 53 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>ACCESSION REGISTER / 001–012</span>
          <span style={{ display: "flex", marginTop: 16, fontSize: 78, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>THE BAGHOLDER</span>
          <span style={{ display: "flex", marginTop: 4, color: "#b6ff65", fontSize: 78, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>MUSEUM.</span>
          <span style={{ display: "flex", marginTop: 19, color: "#c5cec0", fontSize: 25 }}>12 exhibits. Countless lessons. Absolutely no refunds.</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>ALL ARTIFACTS ARE FICTIONAL / NO REAL PEOPLE OR PROJECTS</div>
      </div>
    ),
    { ...size }
  );
}
