import type { ClubFaction, ClubResult } from "./club-engine";

export const CLUB_SOCIAL_HASHTAGS = "#The99PercentClub #ItsNeverOurFault";
export const CLUB_SOCIAL_MANIFESTO = ["IT'S NEVER OUR FAULT.", "THE NEXT ONE IS MINE.", "I DID MY OWN RESEARCH."] as const;

export function buildClubCampaignText(): string {
  return [
    "THE 99% CLUB. Six fictional crypto factions. One shared excuse.",
    CLUB_SOCIAL_MANIFESTO.join(" "),
    CLUB_SOCIAL_HASHTAGS,
  ].join(" ");
}

export function buildClubFactionShareText(faction: ClubFaction): string {
  return [
    "THE 99% CLUB / " + faction.code + ": " + faction.title + ".",
    "\"" + faction.motto + "\"",
    "Find your fictional faction.",
    CLUB_SOCIAL_HASHTAGS,
  ].join(" ");
}

export function buildClubMemberShareText(result: ClubResult): string {
  return [
    "THE 99% CLUB / MEMBER " + result.memberNumber + ".",
    result.profile.title + ".",
    "FACTION: " + result.faction.code + ".",
    "\"" + result.faction.motto + "\"",
    "THE NEXT ONE IS MINE.",
    CLUB_SOCIAL_HASHTAGS,
  ].join(" ");
}

export function buildClubNominationText(result: ClubResult): string {
  return [
    result.profile.title + " filed me in THE 99% CLUB.",
    "I nominate you to find your fictional crypto faction.",
    CLUB_SOCIAL_HASHTAGS,
  ].join(" ");
}
