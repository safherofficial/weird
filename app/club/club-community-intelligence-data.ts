import type { PassportData } from "../passport/passport-store";
import { CLUB_CAMPAIGN_THEMES } from "./club-campaign-engine";
import { CLUB_CULTURE_POSTS } from "./club-culture";
import { CLUB_MEME_TEMPLATES, CLUB_PUBLIC_CHALLENGES } from "./club-war-room-data";
import { CLUB_WEEKLY_CHALLENGE_ROTATION_LENGTH } from "./club-weekly";

export type ClubCommunityContentInventory = {
  socialDrafts: number;
  memeTemplates: number;
  publicChallenges: number;
  weeklyCampaigns: number;
  weeklyRitualCases: number;
};

export type ClubLocalPassportEvidence = {
  passportEnabled: boolean;
  membershipInterviewFiled: boolean;
  completedChallengeFiles: number;
  weeklyRitualWeeksFiled: number;
  clubBadgesEarned: number;
  factionAssigned: boolean;
};

/**
 * Describes available editorial assets. These are content inventory counts,
 * never user engagement or audience metrics.
 */
export function getClubCommunityContentInventory(): ClubCommunityContentInventory {
  return {
    socialDrafts: CLUB_CULTURE_POSTS.length,
    memeTemplates: CLUB_MEME_TEMPLATES.length,
    publicChallenges: CLUB_PUBLIC_CHALLENGES.length,
    weeklyCampaigns: CLUB_CAMPAIGN_THEMES.length,
    weeklyRitualCases: CLUB_WEEKLY_CHALLENGE_ROTATION_LENGTH,
  };
}

/**
 * Summarizes an opted-in Passport already stored in this browser.
 * A null Passport means there is no persistent local evidence to display.
 */
export function getClubLocalPassportEvidence(passport: PassportData | null): ClubLocalPassportEvidence {
  if (!passport) {
    return {
      passportEnabled: false,
      membershipInterviewFiled: false,
      completedChallengeFiles: 0,
      weeklyRitualWeeksFiled: 0,
      clubBadgesEarned: 0,
      factionAssigned: false,
    };
  }

  return {
    passportEnabled: true,
    membershipInterviewFiled: passport.clubMembershipAnswers !== null,
    completedChallengeFiles: Object.keys(passport.clubChallengeAnswers).length,
    weeklyRitualWeeksFiled: Object.keys(passport.clubWeeklyChallengeAnswers).length,
    clubBadgesEarned: passport.clubBadgeIds.length,
    factionAssigned: passport.clubFactionId !== null,
  };
}
