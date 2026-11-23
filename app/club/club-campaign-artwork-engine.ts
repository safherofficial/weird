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
