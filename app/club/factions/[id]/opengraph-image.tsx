import { ImageResponse } from "next/og";
import { getClubFactionById } from "../../club-engine";

export const alt = "A fictional faction dossier from THE DYOR DEPARTMENT 99% CLUB.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ClubFactionImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faction = getClubFactionById(id);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 54px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>THE 99% CLUB / FACTION REGISTER</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", color: "#b6ff65", fontSize: 18, fontWeight: 800, letterSpacing: 4 }}>
            FACTION / {faction?.code ?? "UNKNOWN"}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 51, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>
            {faction?.title ?? "UNRECOGNIZED FACTION FILE"}
          </div>
          <div style={{ display: "flex", marginTop: 22, color: "#d1b474", fontSize: 20, fontWeight: 700 }}>
            {faction?.motto ?? "THE DEPARTMENT COULD NOT VERIFY THIS FACTION."}
          </div>
          <div style={{ display: "flex", marginTop: 18, color: "#aab5a1", fontSize: 16 }}>
            {faction?.designation ?? "NO DESIGNATION AVAILABLE"}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid #30382f", color: "#b6ff65", fontSize: 13, letterSpacing: 1 }}>
          <span>FICTIONAL CRYPTO-CULTURE FACTION / ALL CHAINS</span>
          <span style={{ color: "#7c8778", fontWeight: 400 }}>ENTERTAINMENT ONLY / NOT A STATISTIC</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
