import type { ClubCampaignDrop } from "./club-campaign-engine";
import type { ClubMemeTemplate } from "./club-war-room-data";
import { CLUB_SOCIAL_HASHTAGS } from "./club-social";

export const CLUB_CAMPAIGN_ARTWORK_FORMATS = [
  { id: "square", label: "SQUARE FEED", dimensions: "1200 × 1200", width: 1200, height: 1200, ratio: "1:1", description: "Square post" },
  { id: "portrait", label: "PORTRAIT FEED", dimensions: "1080 × 1350", width: 1080, height: 1350, ratio: "4:5", description: "Vertical feed post" },
  { id: "story", label: "STORY", dimensions: "1080 × 1920", width: 1080, height: 1920, ratio: "9:16", description: "Full-screen story" },
] as const;

export type ClubCampaignArtworkFormat = (typeof CLUB_CAMPAIGN_ARTWORK_FORMATS)[number];
export type ClubCampaignArtworkFormatId = ClubCampaignArtworkFormat["id"];

/** Resolves a supported canvas size. Square remains the compatibility default. */
export function getClubCampaignArtworkFormat(
  formatId: ClubCampaignArtworkFormatId = "square",
): ClubCampaignArtworkFormat {
  return CLUB_CAMPAIGN_ARTWORK_FORMATS.find((format) => format.id === formatId)
    ?? CLUB_CAMPAIGN_ARTWORK_FORMATS[0];
}

/** Stable sharing copy for all exports in the branded weekly campaign series. */
export function buildClubCampaignArtworkCaption(
  template: ClubMemeTemplate,
  campaign: ClubCampaignDrop,
): string {
  return template.caption + " / " + campaign.theme.title + " (" + campaign.weekKey + "). " + CLUB_SOCIAL_HASHTAGS;
}

/**
 * The no-format signature intentionally preserves the original U35 filename.
 * Explicit formats are identified in the downloaded file name.
 */
export function buildClubCampaignArtworkFilename(
  campaign: ClubCampaignDrop,
  formatId?: ClubCampaignArtworkFormatId,
): string {
  const base = "the-99-percent-club-" + campaign.weekKey.toLowerCase() + "-" + campaign.theme.id;
  return base + (formatId ? "-" + formatId : "") + ".png";
}


export type ClubCampaignArtworkZipEntry = {
  name: string;
  bytes: Uint8Array;
};

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Builds a standards-compliant ZIP archive using the STORE method.
 * Keeping this tiny writer local avoids a third-party runtime dependency;
 * PNG files are already compressed by the PNG encoder.
 */
export function buildClubCampaignArtworkZip(entries: ClubCampaignArtworkZipEntry[]): Uint8Array {
  if (entries.length === 0 || entries.length > 0xffff) {
    throw new Error("The artwork pack must contain between 1 and 65535 files.");
  }

  const encoder = new TextEncoder();
  const prepared = entries.map((entry) => {
    if (!entry.name || entry.name.startsWith("/") || entry.name.includes("\\")
      || entry.name.split("/").some((part) => part === ".." || part === "")) {
      throw new Error("The artwork pack contains an invalid file name.");
    }
    const name = encoder.encode(entry.name);
    if (name.length > 0xffff || entry.bytes.byteLength > 0xffffffff) {
      throw new Error("An artwork pack entry exceeds the supported ZIP size.");
    }
    return { name, bytes: entry.bytes, crc: crc32(entry.bytes) };
  });

  if (new Set(prepared.map((entry) => Array.from(entry.name).join(","))).size !== prepared.length) {
    throw new Error("The artwork pack contains duplicate file names.");
  }

  const localLength = prepared.reduce((total, entry) => total + 30 + entry.name.length + entry.bytes.length, 0);
  const centralLength = prepared.reduce((total, entry) => total + 46 + entry.name.length, 0);
  const totalLength = localLength + centralLength + 22;
  if (totalLength > 0xffffffff) throw new Error("The artwork pack exceeds the ZIP32 size limit.");

  const output = new Uint8Array(totalLength);
  const view = new DataView(output.buffer);
  let cursor = 0;
  const centralRecords: Array<{ name: Uint8Array; crc: number; size: number; offset: number }> = [];

  for (const entry of prepared) {
    const offset = cursor;
    view.setUint32(cursor, 0x04034b50, true); cursor += 4;
    view.setUint16(cursor, 20, true); cursor += 2;
    view.setUint16(cursor, 0x0800, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    view.setUint16(cursor, 0x0021, true); cursor += 2;
    view.setUint32(cursor, entry.crc, true); cursor += 4;
    view.setUint32(cursor, entry.bytes.length, true); cursor += 4;
    view.setUint32(cursor, entry.bytes.length, true); cursor += 4;
    view.setUint16(cursor, entry.name.length, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    output.set(entry.name, cursor); cursor += entry.name.length;
    output.set(entry.bytes, cursor); cursor += entry.bytes.length;
    centralRecords.push({ name: entry.name, crc: entry.crc, size: entry.bytes.length, offset });
  }

  const centralOffset = cursor;
  for (const entry of centralRecords) {
    view.setUint32(cursor, 0x02014b50, true); cursor += 4;
    view.setUint16(cursor, 20, true); cursor += 2;
    view.setUint16(cursor, 20, true); cursor += 2;
    view.setUint16(cursor, 0x0800, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    view.setUint16(cursor, 0x0021, true); cursor += 2;
    view.setUint32(cursor, entry.crc, true); cursor += 4;
    view.setUint32(cursor, entry.size, true); cursor += 4;
    view.setUint32(cursor, entry.size, true); cursor += 4;
    view.setUint16(cursor, entry.name.length, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    view.setUint16(cursor, 0, true); cursor += 2;
    view.setUint32(cursor, 0, true); cursor += 4;
    view.setUint32(cursor, entry.offset, true); cursor += 4;
    output.set(entry.name, cursor); cursor += entry.name.length;
  }

  const centralSize = cursor - centralOffset;
  view.setUint32(cursor, 0x06054b50, true); cursor += 4;
  view.setUint16(cursor, 0, true); cursor += 2;
  view.setUint16(cursor, 0, true); cursor += 2;
  view.setUint16(cursor, centralRecords.length, true); cursor += 2;
  view.setUint16(cursor, centralRecords.length, true); cursor += 2;
  view.setUint32(cursor, centralSize, true); cursor += 4;
  view.setUint32(cursor, centralOffset, true); cursor += 4;
  view.setUint16(cursor, 0, true); cursor += 2;

  if (cursor !== totalLength) throw new Error("The artwork ZIP archive could not be assembled.");
  return output;
}

export function buildClubCampaignArtworkPackFilename(campaign: ClubCampaignDrop): string {
  return "the-99-percent-club-" + campaign.weekKey.toLowerCase() + "-" + campaign.theme.id + "-artwork-pack.zip";
}


export type ClubCampaignArtworkPreflightFindings = {
  campaignTitleClipped: boolean;
  topTextClipped: boolean;
  bottomTextClipped: boolean;
  horizontalOverflow: boolean;
  outsideSafeArea: boolean;
  topTextEmpty: boolean;
  bottomTextEmpty: boolean;
  smallestHeadlineFontPx: number;
};

export type ClubCampaignArtworkPreflight = {
  formatId: ClubCampaignArtworkFormatId;
  label: string;
  dimensions: string;
  ready: boolean;
  issues: string[];
};

/**
 * Converts measurements collected from the actual canvas renderer into
 * visible preflight results. A pack is safe to export only when all formats pass.
 */
export function buildClubCampaignArtworkPreflight(
  formatId: ClubCampaignArtworkFormatId,
  findings: ClubCampaignArtworkPreflightFindings,
): ClubCampaignArtworkPreflight {
  const format = getClubCampaignArtworkFormat(formatId);
  const issues: string[] = [];
  if (findings.campaignTitleClipped) issues.push("Campaign title exceeds its two-line layout.");
  if (findings.topTextEmpty) issues.push("Top headline is empty.");
  if (findings.bottomTextEmpty) issues.push("Bottom headline is empty.");
  if (findings.topTextClipped) issues.push("Top headline is truncated.");
  if (findings.bottomTextClipped) issues.push("Bottom headline is truncated.");
  if (findings.horizontalOverflow) issues.push("Text exceeds its available horizontal area.");
  if (findings.outsideSafeArea) issues.push("One or more elements exceed the safe canvas area.");
  if (!Number.isFinite(findings.smallestHeadlineFontPx) || findings.smallestHeadlineFontPx < 38) {
    issues.push("Headline type falls below the 38 px readability threshold.");
  }
  return {
    formatId,
    label: format.label,
    dimensions: format.dimensions,
    ready: issues.length === 0,
    issues,
  };
}
