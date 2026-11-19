import { ImageResponse } from "next/og";
import { getArchiveRecord } from "../../archive-data";

export const runtime = "edge";
export const alt = "A fictional administrative record from THE DYOR DEPARTMENT Archives.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ArchiveRecordImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = getArchiveRecord(slug);
  const title = record?.title ?? "UNREGISTERED ARCHIVE FILE";
  const accession = record?.accession ?? "DDA-000";
  const category = record?.category ?? "UNKNOWN CATEGORY";
  const finding = record?.finding ?? "THE DEPARTMENT HAS NO FURTHER INFORMATION.";

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "48px 54px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>CENTRAL RECORDS OFFICE</span>
        </div>
        <div style={{ display: "flex", marginTop: 36, color: "#899486", fontSize: 14, letterSpacing: 2 }}>{accession} / {category}</div>
        <div style={{ display: "flex", marginTop: 21, fontSize: 52, lineHeight: 1.04, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
        <div style={{ display: "flex", marginTop: 23, color: "#ff8580", fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>DEPARTMENTAL FINDING / {finding}</div>
        <div style={{ display: "flex", marginTop: "auto", paddingTop: 18, borderTop: "1px solid #30382f", color: "#b6ff65", fontSize: 13, letterSpacing: 1 }}>
          A FICTIONAL RECORD / PRESERVED FOR ENTERTAINMENT ONLY
        </div>
      </div>
    ),
    { ...size }
  );
}
