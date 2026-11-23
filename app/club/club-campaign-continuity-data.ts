import { getClubCampaignDrop } from "./club-campaign-engine";
import { getIsoClubWeekKey } from "./club-weekly";
import {
  getClubFactionById,
  type ClubFaction,
  type ClubFactionId,
} from "./club-engine";
import type { PassportData } from "../passport/passport-store";

export type ClubFactionCampaignMission = {
  title: string;
  instruction: string;
  deliverable: string;
};

/**
 * One editorial role per existing Club faction. These are creative lenses for
 * the shared weekly campaign, not personalised investment guidance.
 */
export const CLUB_FACTION_CAMPAIGN_MISSIONS: Readonly<Record<ClubFactionId, ClubFactionCampaignMission>> = {
  "thesis-preservation-society": {
    title: "PRESERVE THE ORIGINAL THESIS",
    instruction: "Take this week's campaign claim and defend the original thesis without changing its conclusion to fit the latest candle.",
    deliverable: "Write one sentence that separates the original claim from the explanation now being used to protect it.",
  },
  "averaging-down-commission": {
    title: "RECLASSIFY THE POSITION",
    instruction: "Turn this week's setback into an official position-reclassification memo. The joke is the paperwork, not a real trade.",
    deliverable: "Invent a new administrative label for the campaign's central excuse.",
  },
  "signal-reliance-union": {
    title: "REQUEST COMMUNITY CONFIRMATION",
    instruction: "Translate this week's campaign into the message your fictional group chat would pin before anyone checks the source.",
    deliverable: "Name the signal that was treated as proof and the missing primary source.",
  },
  "exit-liquidity-witnesses": {
    title: "FILE THE EXIT TESTIMONY",
    instruction: "Treat this week's campaign as a post-event witness statement. Describe the sequence without identifying real wallets or people.",
    deliverable: "Write a three-part timeline: what was expected, what happened and what the group chat said afterwards.",
  },
  "chart-exile-order": {
    title: "ZOOM OUT THE EVIDENCE",
    instruction: "Reframe this week's campaign from the most distant possible timeframe, until the original event becomes an archaeological footnote.",
    deliverable: "Give the campaign's central event a fictional long-term chart annotation.",
  },
  "early-exit-mutual-aid": {
    title: "FILE THE EXIT BEFORE THE NEXT ENTRY",
    instruction: "Use this week's campaign to write the exit memo that the fictional member would normally postpone until after the next ticker appears.",
    deliverable: "Write one sentence that explains why leaving the trenches is not the same as losing the story.",
  },
};

export type ClubCampaignContinuity = {
  weekKey: string;
  campaign: ReturnType<typeof getClubCampaignDrop>;
  faction: ClubFaction | null;
  mission: ClubFactionCampaignMission | null;
  progress: {
    passportEnabled: boolean;
    membershipInterview: "FILED" | "OPEN" | "NOT SAVED";
    factionAssignment: "ASSIGNED" | "NOT ASSIGNED" | "NOT SAVED";
    completedCoreChallenges: number;
    currentWeeklyRitualFiled: boolean;
  };
};

/**
 * Joins the live weekly campaign to the visitor's existing, optional local
 * Passport. It is read-only and deliberately creates no progress of its own.
 */
export function getClubCampaignContinuity(
  passport: PassportData | null,
  now = new Date(),
): ClubCampaignContinuity {
  const campaign = getClubCampaignDrop(now);
  const weekKey = getIsoClubWeekKey(now).weekKey;
  const faction = passport ? getClubFactionById(passport.clubFactionId) : null;
  const passportEnabled = Boolean(passport?.enabled);
  const membershipInterviewFiled = Boolean(passport?.clubMembershipAnswers);
  const completedCoreChallenges = passport ? Object.keys(passport.clubChallengeAnswers).length : 0;

  return {
    weekKey,
    campaign,
    faction,
    mission: faction ? CLUB_FACTION_CAMPAIGN_MISSIONS[faction.id] : null,
    progress: {
      passportEnabled,
      membershipInterview: membershipInterviewFiled ? "FILED" : passportEnabled ? "OPEN" : "NOT SAVED",
      factionAssignment: faction ? "ASSIGNED" : passportEnabled ? "NOT ASSIGNED" : "NOT SAVED",
      completedCoreChallenges,
      currentWeeklyRitualFiled: passport?.clubWeeklyChallengeAnswers[weekKey] !== undefined,
    },
  };
}
