import type { ClubCampaignContinuity } from "./club-campaign-continuity-data";

export const CLUB_CONTRIBUTION_CHARACTER_BUDGET = 257;

export type ClubContributionStarter = {
  id: string;
  label: string;
  text: string;
};

/**
 * Builds editable starting points from this week's real campaign and the
 * visitor's saved faction, when available. These are prompts, not submissions.
 */
export function getClubContributionStarters(
  continuity: ClubCampaignContinuity,
): readonly ClubContributionStarter[] {
  const factionLabel = continuity.faction?.code ?? "99% CLUB";
  const campaignTitle = continuity.campaign.theme.title.toLowerCase();
  const challengeTitle = continuity.campaign.challenge.title.toLowerCase();

  return [
    {
      id: "faction-position",
      label: "FACTION POSITION",
      text: "The " + factionLabel + " position on " + campaignTitle + ": [YOUR OFFICIAL EXPLANATION]. The next one is mine. #The99PercentClub",
    },
    {
      id: "department-finding",
      label: "DEPARTMENT FINDING",
      text: "The Department reviewed " + campaignTitle + ". Finding: [YOUR TAKE]. Personal liability remains pending. #The99PercentClub",
    },
    {
      id: "challenge-response",
      label: "CHALLENGE RESPONSE",
      text: "I did my own research on " + challengeTitle + ": [WHAT DID I MISS?]. The next one is mine. #The99PercentClub",
    },
  ];
}

export function getClubContributionWritingCue(
  continuity: ClubCampaignContinuity,
): string {
  return continuity.mission?.deliverable
    ?? "Write one sentence explaining this week's brief in your own words. Keep it fictional and leave out real wallet addresses or private information.";
}
