import { ImageResponse } from "next/og";
import { getExhibit } from "../../museum-data";

export const alt = "A fictional relic from THE DYOR DEPARTMENT Bagholder Rehabilitation collection.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ExhibitOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibit = getExhibit(slug);
  const title = exhibit?.title ?? "UNREGISTERED ARTIFACT";
  const accession = exhibit?.accession ?? "BHM-000";
  const category = exhibit?.category ?? "UNKNOWN COLLECTION";
  const plaque = exhibit?.plaque ?? "THE DEPARTMENT HAS NO FURTHER INFORMATION.";

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "50px 56px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>BAGHOLDER REHABILITATION / TRENCHES RELIC EXHIBIT</span>
        </div>
        <div style={{ display: "flex", marginTop: 40, color: "#899486", fontSize: 15, letterSpacing: 2 }}>{accession} / {category}</div>
        <div style={{ display: "flex", marginTop: 21, fontSize: 56, lineHeight: 1.05, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", marginTop: 26, color: "#b6ff65", fontSize: 23 }}>{plaque}</div>
        <div style={{ display: "flex", marginTop: "auto", paddingTop: 18, borderTop: "1px solid #30382f", color: "#ff8580", fontSize: 14, letterSpacing: 1 }}>
          A FICTIONAL SPECIMEN / PRESERVED FOR ENTERTAINMENT ONLY
        </div>
      </div>
    ),
    { ...size }
  );
}
