import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Daily Departmental Absurdity — One fictional notice per day from THE DYOR DEPARTMENT.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function DailyOfficeOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "54px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>OFFICE OF PUBLICLY ADMINISTERED ABSURDITY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 54 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>FORM DDA-DAILY / UTC ISSUE</span>
          <span style={{ display: "flex", marginTop: 17, fontSize: 70, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>DAILY DEPARTMENTAL</span>
          <span style={{ display: "flex", marginTop: 4, color: "#b6ff65", fontSize: 76, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>ABSURDITY.</span>
          <span style={{ display: "flex", marginTop: 20, color: "#c5cec0", fontSize: 24 }}>One fictional notice. No breaking news. No market feed.</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>DETERMINISTIC TEMPLATE ROTATION / ENTERTAINMENT ONLY</div>
      </div>
    ),
    { ...size }
  );
}
