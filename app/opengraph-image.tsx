import { ImageResponse } from "next/og";

export const alt = "THE DYOR DEPARTMENT — The official aftercare desk for Crypto Twitter, pump.fun launches and the Solana trenches.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "54px 58px",
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
            paddingBottom: 22,
            borderBottom: "1px solid #30382f",
          }}
        >
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>PUMP.FUN AFTERCARE / SOLANA TRENCHES / CRYPTO TWITTER</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 52 }}>
          <span style={{ color: "#b6ff65", fontSize: 15, letterSpacing: 3 }}>THE OFFICIAL HEADQUARTERS OF FINANCIAL DELUSION</span>
          <span style={{ display: "flex", flexDirection: "column", marginTop: 18, fontSize: 58, lineHeight: 1.01, fontWeight: 900, letterSpacing: -2.5 }}>
            <span>YOU CAME FOR</span>
            <span style={{ color: "#b6ff65" }}>THE 100X.</span>
            <span>YOU STAYED</span>
            <span>BECAUSE YOU CAN'T</span>
            <span style={{ color: "#b6ff65" }}>SELL AT A LOSS.</span>
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 18, borderTop: "1px solid #30382f" }}>
          <span style={{ color: "#929d8d", fontSize: 16 }}>PUMP.FUN AFTERCARE. SOLANA TRENCHES. CRYPTO TWITTER.</span>
          <span style={{ color: "#b6ff65", fontSize: 13, fontWeight: 700 }}>TOKEN CONFIRMED / DETAILS NOT ANNOUNCED</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
