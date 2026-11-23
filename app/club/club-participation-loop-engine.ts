import type { ClubCampaignContinuity } from "./club-campaign-continuity-data";

export const CLUB_PARTICIPATION_TEXT_BUDGET = 257;

export type ClubParticipationDraft = {
  id: "challenge-reply" | "conversation-question" | "pass-the-file";
  step: string;
  title: string;
  purpose: string;
  label: string;
  text: string;
};

/**
 * Prepares a manual, three-step conversation relay from the real active Club
 * campaign. It creates editable prompts only; it never reads public replies or
 * records whether a visitor copied, opened or published anything.
 */
export function getClubParticipationDrafts(
  continuity: ClubCampaignContinuity,
): readonly ClubParticipationDraft[] {
  const campaignTitle = continuity.campaign.theme.title.toLowerCase();
  const challengeTitle = continuity.campaign.challenge.title.toLowerCase();
  const factionLabel = continuity.faction?.code ?? "99% CLUB";

  return [
    {
      id: "challenge-reply",
      step: "01 / RESPOND",
      title: "FILE YOUR CHALLENGE RESPONSE",
      purpose: "Answer the active public challenge in your own words.",
      label: "YOUR REPLY",
      text: "My filing for " + challengeTitle + ": [YOUR TAKE]. The Department has received my explanation. #The99PercentClub",
    },
    {
      id: "conversation-question",
      step: "02 / KEEP IT MOVING",
      title: "ASK THE NEXT QUESTION",
      purpose: "Give another participant a specific angle to answer, rather than posting an empty engagement prompt.",
      label: "YOUR FOLLOW-UP QUESTION",
      text: "One question after " + campaignTitle + ": [ASK SOMETHING SPECIFIC]. Which explanation would your faction file? #The99PercentClub",
    },
    {
      id: "pass-the-file",
      step: "03 / HAND OFF",
      title: "PASS THE FILE ON",
      purpose: "Invite another person to add their own fictional explanation. Add a public handle only when appropriate.",
      label: "YOUR HAND-OFF",
      text: "The " + factionLabel + " file moves on: [YOUR TAKE]. Your turn to explain " + campaignTitle + ". The next one is yours. #The99PercentClub",
    },
  ];
}
