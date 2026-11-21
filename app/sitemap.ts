import type { MetadataRoute } from "next";
import { archiveRecords } from "./archives/archive-data";
import { exhibits } from "./museum/museum-data";
import { SITE_URL } from "./site-config";
import { CLUB_FACTION_IDS } from "./club/club-engine";

const publicRoutes = [
  "/",
  "/audit",
  "/simulator",
  "/utility-inspector",
  "/roadmap-generator",
  "/whitepaper-factory",
  "/club",
  "/cope-index",
  "/daily-office",
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
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...publicRoutes,
    ...CLUB_FACTION_IDS.map((id) => "/club/factions/" + id),
    ...exhibits.map((exhibit) => "/museum/exhibits/" + exhibit.slug),
    ...archiveRecords.map((record) => "/archives/records/" + record.slug),
  ];

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
  }));
}
