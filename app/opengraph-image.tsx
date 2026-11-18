import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "THE DYOR DEPARTMENT — You did your own research. The market did its own thing.";
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
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>INDEPENDENT OFFICE OF FINANCIAL REGRET</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 52 }}>
          <span style={{ color: "#b6ff65", fontSize: 15, letterSpacing: 3 }}>A PUBLIC SERVICE ANNOUNCEMENT FOR THE CRYPTO-ADJACENT</span>
          <span style={{ display: "flex", flexDirection: "column", marginTop: 18, fontSize: 64, lineHeight: 1.02, fontWeight: 900, letterSpacing: -3 }}>
            <span>YOUR RESEARCH WAS</span>
            <span style={{ color: "#b6ff65" }}>IMPECCABLE.</span>
            <span>YOUR ENTRY WAS NOT.</span>
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 18, borderTop: "1px solid #30382f" }}>
          <span style={{ color: "#929d8d", fontSize: 16 }}>YOU DID YOUR OWN RESEARCH. THE MARKET DID ITS OWN THING.</span>
          <span style={{ color: "#b6ff65", fontSize: 13, fontWeight: 700 }}>NO TOKEN / NO UTILITY / NO FINANCIAL ADVICE</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
