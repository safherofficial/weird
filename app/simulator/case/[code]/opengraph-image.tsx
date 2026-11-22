import { ImageResponse } from "next/og";
import { buildSimulatorResult, decodeSimulatorCode } from "../../simulator-engine";

export const alt = "A fictional Pump.fun Intelligence paper-market simulation result card from THE DYOR DEPARTMENT.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function SimulatorCaseImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const decisions = decodeSimulatorCode(code);
  const result = decisions ? buildSimulatorResult(decisions) : null;

  const title = result?.profile.title ?? "UNRECOGNIZED SIMULATION FILE";
  const subtitle = result?.profile.subtitle ?? "The Department could not verify this case.";
  const roast = result?.profile.roast ?? "Please return to the simulator and begin again.";
  const crossReadHeadline = result?.crossRead.headline ?? "CROSS-READ NOT AVAILABLE";
  const pnl = result ? (result.paperPnl >= 0 ? "+" : "") + result.paperPnl.toFixed(2) + " DPC" : "—";
  const pnlColor = result && result.paperPnl >= 0 ? "#b6ff65" : "#ff7777";

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
          }}
        >
          <span style={{ color: "#b6ff65", fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>PUMP.FUN PAPER MARKET / CASE FILE</span>
        </div>

        <div style={{ display: "flex", marginTop: 27, color: "#899486", fontSize: 14, letterSpacing: 2 }}>
          CASE No. {result?.caseNumber ?? "------"} / HYPE-404 PAPER MARKET
        </div>

        <div style={{ display: "flex", marginTop: 18, fontSize: 49, lineHeight: 1.05, fontWeight: 900, letterSpacing: -2 }}>
          {title}
        </div>

        <div style={{ display: "flex", marginTop: 13, color: "#b6ff65", fontSize: 19 }}>
          {subtitle}
        </div>

        <div style={{ display: "flex", marginTop: 12, color: "#b6ff65", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
          BEHAVIOURAL CROSS-READ / {crossReadHeadline}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 17 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "18px 20px", border: "1px solid #384137", backgroundColor: "#121713" }}>
            <span style={{ color: "#8d968a", fontSize: 13, letterSpacing: 1 }}>FINAL PAPER NET WORTH</span>
            <span style={{ display: "flex", marginTop: 10, color: "#f0f0e9", fontSize: 34, fontWeight: 800 }}>{(result?.netWorth ?? 0).toFixed(2)} DPC</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "18px 20px", border: "1px solid #384137", backgroundColor: "#121713" }}>
            <span style={{ color: "#8d968a", fontSize: 13, letterSpacing: 1 }}>PAPER PROFIT / LOSS</span>
            <span style={{ display: "flex", marginTop: 10, color: pnlColor, fontSize: 34, fontWeight: 800 }}>{pnl}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "18px 20px", border: "1px solid #384137", backgroundColor: "#121713" }}>
            <span style={{ color: "#8d968a", fontSize: 13, letterSpacing: 1 }}>FICTIONAL RETURN</span>
            <span style={{ display: "flex", marginTop: 10, color: pnlColor, fontSize: 34, fontWeight: 800 }}>{(result?.paperReturn ?? 0).toFixed(1)}%</span>
          </div>
        </div>

        <div style={{ display: "flex", marginTop: 28, color: "#e1e5dc", fontSize: 18, lineHeight: 1.4 }}>
          “{roast}”
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid #30382f", color: "#b6ff65", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
          <span>NO TOKEN. NO REAL MONEY. JUST A VERY REALISTIC AMOUNT OF COPE.</span>
          <span style={{ color: "#7c8778", fontWeight: 400 }}>ENTERTAINMENT ONLY</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
