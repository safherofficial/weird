import { ImageResponse } from "next/og";
import { archiveRecords } from "./archive-data";

const firstArchiveAccession = archiveRecords[0]?.accession ?? "DDA-001";
const lastArchiveAccession = archiveRecords[archiveRecords.length - 1]?.accession ?? "DDA-020";

export const alt = `THE DEPARTMENT ARCHIVES — ${archiveRecords.length} fictional crypto-trenches case files covering wallet theories, launch incidents, bridges and governance.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ArchivesOpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "54px 58px", backgroundColor: "#090b09", color: "#f0f0e9", border: "2px solid #34412f", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid #30382f" }}>
          <span style={{ color: "#b6ff65", fontSize: 23, fontWeight: 800, letterSpacing: 1 }}>THE DYOR DEPARTMENT</span>
          <span style={{ color: "#899486", fontSize: 13, letterSpacing: 2 }}>WHALE & WALLET INVESTIGATION / CASE ARCHIVE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 54 }}>
          <span style={{ color: "#b6ff65", fontSize: 16, letterSpacing: 3 }}>REGISTER / {firstArchiveAccession}–{lastArchiveAccession}</span>
          <span style={{ display: "flex", marginTop: 17, fontSize: 76, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>THE DEPARTMENT</span>
          <span style={{ display: "flex", marginTop: 4, color: "#b6ff65", fontSize: 76, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>ARCHIVES.</span>
          <span style={{ display: "flex", marginTop: 20, color: "#c5cec0", fontSize: 24 }}>{archiveRecords.length} fictional case files. Nothing to redact.</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", color: "#ff8580", fontSize: 13, letterSpacing: 1 }}>MEMOS / INCIDENTS / APPENDICES / NOTICES / MEMBERSHIP FILES</div>
      </div>
    ),
    { ...size }
  );
}
