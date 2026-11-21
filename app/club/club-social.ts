import type { ClubFaction, ClubResult } from "./club-engine";

export const CLUB_SOCIAL_HASHTAGS = "#The99PercentClub #ItsNeverOurFault #TheNextOneIsMine";
export const CLUB_SOCIAL_MANIFESTO = [
  "IT'S NEVER OUR FAULT WHEN WE LOSE.",
  "THE NEXT ONE IS MINE.",
  "I DID MY OWN RESEARCH.",
  "I KNOW EXACTLY WHAT I'M DOING.",
] as const;

const CLUB_IDENTITY = "For the crypto investor who trusts their skills, backs their own research and finds a fresh explanation for every red candle.";

export function buildClubCampaignText(): string {
  return [
    "WELCOME TO THE 99% CLUB.",
    CLUB_IDENTITY,
    "Six fictional factions. Every chain. One universal investor instinct:",
    CLUB_SOCIAL_MANIFESTO.join(" "),
    "Find your faction. File your excuse. Nominate the friend who is already researching the next one.",
    CLUB_SOCIAL_HASHTAGS,
    "Satire, not a statistic or financial advice.",
  ].join(" ");
}

export function buildClubFactionShareText(faction: ClubFaction): string {
  return [
    "THE 99% CLUB / " + faction.code + ": " + faction.title + ".",
    "\"" + faction.motto + "\"",
    "It's never our fault when we lose. The next one is mine.",
    "Find your fictional faction across all chains.",
    CLUB_SOCIAL_HASHTAGS,
  ].join(" ");
}

export function buildClubMemberShareText(result: ClubResult): string {
  return [
    "THE 99% CLUB / MEMBER " + result.memberNumber + ".",
    result.profile.title + ".",
    "FACTION: " + result.faction.code + ".",
    "\"" + result.faction.motto + "\"",
    "I did my own research. It's never our fault when we lose. The next one is mine.",
    CLUB_SOCIAL_HASHTAGS,
  ].join(" ");
}

export function buildClubNominationText(result: ClubResult): string {
  return [
    result.profile.title + " filed me in THE 99% CLUB.",
    "I nominate you to prove your research skills and find your fictional crypto faction.",
    "It's never our fault when we lose. The next one is yours.",
    CLUB_SOCIAL_HASHTAGS,
  ].join(" ");
}
