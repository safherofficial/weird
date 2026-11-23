import type { ClubCampaignDrop } from "./club-campaign-engine";
import type { ClubMemeTemplate } from "./club-war-room-data";
import { CLUB_SOCIAL_HASHTAGS } from "./club-social";

/**
 * Stable metadata and sharing copy for the branded weekly meme export.
 * Visual rendering remains client-side on the existing canvas.
 */
export function buildClubCampaignArtworkCaption(
  template: ClubMemeTemplate,
  campaign: ClubCampaignDrop,
): string {
  return template.caption + " / " + campaign.theme.title + " (" + campaign.weekKey + "). " + CLUB_SOCIAL_HASHTAGS;
}

export function buildClubCampaignArtworkFilename(campaign: ClubCampaignDrop): string {
  return "the-99-percent-club-" + campaign.weekKey.toLowerCase() + "-" + campaign.theme.id + ".png";
}
