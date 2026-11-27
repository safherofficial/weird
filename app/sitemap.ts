import type { MetadataRoute } from "next";
import { archiveRecords } from "./archives/archive-data";
import { exhibits } from "./museum/museum-data";
import { SITE_URL } from "./site-config";
import { CLUB_FACTION_IDS } from "./club/club-engine";
import { getOnchainReportIndex } from "./daily-office/onchain/onchain-data";

const publicRoutes = [
  "/",
  "/audit",
  "/simulator",
  "/utility-inspector",
  "/roadmap-generator",
  "/whitepaper-factory",
  "/club",
  "/cope-index",
  "/airdrop-office",
  "/bridge-incident-office",
  "/governance-office",
  "/daily-office",
  "/daily-office/onchain",
  "/daily-office/onchain/archive",
  "/museum",
  "/archives",
  "/passport",
  "/privacy",
  "/terms",
] as const;

/**
 * Publish stable, indexable destinations only. Individual generated case URLs
 * are deliberately excluded because their route metadata marks them noindex.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const onchainIndex = await getOnchainReportIndex();
  const onchainIssueRoutes = (onchainIndex?.reports ?? []).map((report) => "/daily-office/onchain/" + report.issueDate);
  const routes = [
    ...publicRoutes,
    ...onchainIssueRoutes,
    ...CLUB_FACTION_IDS.map((id) => "/club/factions/" + id),
    ...exhibits.map((exhibit) => "/museum/exhibits/" + exhibit.slug),
    ...archiveRecords.map((record) => "/archives/records/" + record.slug),
  ];

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
  }));
}
