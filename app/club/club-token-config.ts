/**
 * Single source of truth for the future 99% Club token announcement.
 * Keep public identifiers and external links null until independently
 * confirmed official launch information is supplied.
 */
export const CLUB_TOKEN_ANNOUNCEMENT = {
  projectName: "THE 99% CLUB",
  status: "PRE-LAUNCH / NOT ANNOUNCED",
  ticker: null as string | null,
  network: null as string | null,
  contractAddress: null as string | null,
  explorerUrl: null as string | null,
  marketUrl: null as string | null,
} as const;

export function isOfficialClubTokenLink(value: string | null): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}
