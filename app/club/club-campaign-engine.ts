import { getIsoClubWeekKey } from "./club-weekly";
import { CLUB_SOCIAL_HASHTAGS } from "./club-social";
import { CLUB_CULTURE_POSTS } from "./club-culture";
import { CLUB_MEME_TEMPLATES, CLUB_PUBLIC_CHALLENGES } from "./club-war-room-data";

export type ClubCampaignTheme = {
  id: string;
  title: string;
  brief: string;
  memeTemplateId: string;
  culturePostId: string;
  challengeId: string;
};

export const CLUB_CAMPAIGN_THEMES: readonly ClubCampaignTheme[] = [
  {
    id: "loss-classification",
    title: "THE LOSS CLASSIFICATION FILE",
    brief: "A red candle has arrived. Personal liability remains under review.",
    memeTemplateId: "conviction-chart",
    culturePostId: "loss-classification",
    challengeId: "excuse-without-blame",
  },
  {
    id: "dyor-receipt",
    title: "THE INDEPENDENT RESEARCH LOOP",
    brief: "The research was independent. The final approval came from the timeline.",
    memeTemplateId: "research-loop",
    culturePostId: "dyor-receipt",
    challengeId: "dyor-receipt",
  },
  {
    id: "still-early",
    title: "THE OFFICIAL EARLY WINDOW",
    brief: "Time passed. The thesis did not. The Department recognises no expiry date.",
    memeTemplateId: "still-early",
    culturePostId: "still-early",
    challengeId: "next-thesis",
  },
  {
    id: "position-expansion",
    title: "THE POSITION RECLASSIFICATION",
    brief: "It was not averaging down. The paperwork now describes strategic expansion.",
    memeTemplateId: "position-expansion",
    culturePostId: "average-down",
    challengeId: "position-reclassification",
  },
  {
    id: "community-takeover",
    title: "THE COMMUNITY TAKEOVER BRIEF",
    brief: "The roadmap is quiet. The profile picture has already been replaced.",
    memeTemplateId: "community-takeover",
    culturePostId: "ct-translator",
    challengeId: "ct-translator",
  },
  {
    id: "next-one",
    title: "THE NEXT ONE IS MINE",
    brief: "Close the previous file without a lessons-learned section. Open the next one.",
    memeTemplateId: "next-one",
    culturePostId: "the-next-one",
    challengeId: "faction-roll-call",
  },
] as const;

export const CLUB_CAMPAIGN_ROTATION_LENGTH = CLUB_CAMPAIGN_THEMES.length;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
// The first campaign week begins Monday 16 November 2026 (ISO week 47).
const ROTATION_ANCHOR_UTC = Date.UTC(2026, 10, 16);

export type ClubCampaignDrop = {
  weekKey: string;
  weekNumber: number;
  weekStarts: string;
  weekEnds: string;
  weekIndex: number;
  theme: ClubCampaignTheme;
  memeTemplate: (typeof CLUB_MEME_TEMPLATES)[number];
  culturePost: (typeof CLUB_CULTURE_POSTS)[number];
  challenge: (typeof CLUB_PUBLIC_CHALLENGES)[number];
  xPost: string;
  memeCaption: string;
};

export type ClubCampaignSchedule = {
  current: ClubCampaignDrop;
  next: ClubCampaignDrop;
};

function getUtcMonday(date: Date): Date {
  if (!Number.isFinite(date.getTime())) throw new TypeError("A valid campaign date is required.");
  const monday = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const weekday = monday.getUTCDay() || 7;
  monday.setUTCDate(monday.getUTCDate() - weekday + 1);
  return monday;
}

function positiveModulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

export function getClubCampaignDrop(date = new Date()): ClubCampaignDrop {
  const monday = getUtcMonday(date);
  const elapsedWeeks = Math.floor((monday.getTime() - ROTATION_ANCHOR_UTC) / WEEK_MS);
  const weekIndex = positiveModulo(elapsedWeeks, CLUB_CAMPAIGN_ROTATION_LENGTH);
  const theme = CLUB_CAMPAIGN_THEMES[weekIndex];
  const memeTemplate = CLUB_MEME_TEMPLATES.find((item) => item.id === theme.memeTemplateId);
  const culturePost = CLUB_CULTURE_POSTS.find((item) => item.id === theme.culturePostId);
  const challenge = CLUB_PUBLIC_CHALLENGES.find((item) => item.id === theme.challengeId);

  if (!memeTemplate || !culturePost || !challenge) {
    throw new Error("The weekly Club campaign references a missing content asset: " + theme.id);
  }

  const isoWeek = getIsoClubWeekKey(date);
  return {
    weekKey: isoWeek.weekKey,
    weekNumber: isoWeek.weekNumber,
    weekStarts: monday.toISOString().slice(0, 10),
    weekEnds: new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    weekIndex,
    theme,
    memeTemplate,
    culturePost,
    challenge,
    xPost: culturePost.copy,
    memeCaption: memeTemplate.caption + " " + CLUB_SOCIAL_HASHTAGS,
  };
}

export function getClubCampaignSchedule(now = new Date()): ClubCampaignSchedule {
  const current = getClubCampaignDrop(now);
  const nextMonday = new Date(Date.parse(current.weekStarts + "T00:00:00.000Z") + WEEK_MS);
  return { current, next: getClubCampaignDrop(nextMonday) };
}

export function buildClubCampaignPack(drop: ClubCampaignDrop): string {
  return [
    "THE 99% CLUB / WEEKLY CAMPAIGN KIT",
    drop.weekKey + " / " + drop.theme.title,
    "BRIEF: " + drop.theme.brief,
    "\nMAIN X POST\n" + drop.xPost,
    "\nMEME OFFICE / " + drop.memeTemplate.name,
    "TOP LINE: " + drop.memeTemplate.topText,
    "BOTTOM LINE: " + drop.memeTemplate.bottomText,
    "CAPTION: " + drop.memeCaption,
    "\nPUBLIC CHALLENGE / " + drop.challenge.title,
    drop.challenge.postText,
    "REPLY PROMPT: " + drop.culturePost.replyPrompt,
    "\nCAMPAIGN TAGS: " + CLUB_SOCIAL_HASHTAGS,
    "SATIRE / ALL CHAINS / NO FINANCIAL PROMISES.",
  ].join("\n\n");
}
