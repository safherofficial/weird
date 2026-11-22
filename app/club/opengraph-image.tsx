import { ImageResponse } from "next/og";

export const alt = "THE 99% CLUB — Six fictional crypto-culture factions. One shared excuse across all chains.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ClubOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "54px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>CRYPTO TRENCHES / ALL CHAINS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 54 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>CRYPTO TRENCHES / ALL CHAINS / 99% CLUB</span>
          <span style={{ display: "flex", marginTop: 17, fontSize: 91, lineHeight: 1, fontWeight: 900, letterSpacing: -5 }}>THE 99% CLUB.</span>
          <span style={{ display: "flex", marginTop: 23, color: "#c5cec0", fontSize: 26 }}>Five crypto-culture questions. Six fictional factions. Zero practical benefits.</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", color: "#ff8580", fontSize: 14, letterSpacing: 1 }}>
          “99%” IS A SATIRICAL CLUB NAME / NOT A REAL MARKET STATISTIC
        </div>
      </div>
    ),
    { ...size }
  );
}
