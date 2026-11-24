import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";
import { buildDepartmentShareText, DEPARTMENT_SHARE_TEXT_LIMIT } from "../app/lib/department-share-copy";
import { buildDailyOfficeDispatch } from "../app/daily-office/daily-engine";
import { buildDepartmentCaseAtlas } from "../app/daily-office/case-atlas";
import { buildInstitutionalMemory } from "../app/daily-office/institutional-memory";

function readRepoFile(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

type PublicCaseContract = {
  name: string;
  route: string;
  page: string;
  image: string;
  client: string;
  decoder: string;
  builder: string;
  encoder: string;
};

const publicCases: PublicCaseContract[] = [
  {
    name: "DYOR Audit",
    route: "/audit",
    page: "app/audit/case/[code]/page.tsx",
    image: "app/audit/case/[code]/opengraph-image.tsx",
    client: "app/audit/audit-client.tsx",
    decoder: "decodeCaseCode",
    builder: "buildResult",
    encoder: "encodeCaseCode",
  },
  {
    name: "Paper Market Simulator",
    route: "/simulator",
    page: "app/simulator/case/[code]/page.tsx",
    image: "app/simulator/case/[code]/opengraph-image.tsx",
    client: "app/simulator/simulator-client.tsx",
    decoder: "decodeSimulatorCode",
    builder: "buildSimulatorResult",
    encoder: "encodeSimulatorCode",
  },
  {
    name: "Token-Purpose Inspector",
    route: "/utility-inspector",
    page: "app/utility-inspector/case/[code]/page.tsx",
    image: "app/utility-inspector/case/[code]/opengraph-image.tsx",
    client: "app/utility-inspector/utility-inspector-client.tsx",
    decoder: "decodeUtilityCode",
    builder: "buildUtilityResult",
    encoder: "encodeUtilityCode",
  },
  {
    name: "CTO Takeover Roadmap",
    route: "/roadmap-generator",
    page: "app/roadmap-generator/case/[code]/page.tsx",
    image: "app/roadmap-generator/case/[code]/opengraph-image.tsx",
    client: "app/roadmap-generator/roadmap-generator-client.tsx",
    decoder: "decodeRoadmapCode",
    builder: "buildRoadmapResult",
    encoder: "encodeRoadmapCode",
  },
  {
    name: "Fictional Token Dossier",
    route: "/whitepaper-factory",
    page: "app/whitepaper-factory/case/[code]/page.tsx",
    image: "app/whitepaper-factory/case/[code]/opengraph-image.tsx",
    client: "app/whitepaper-factory/whitepaper-factory-client.tsx",
    decoder: "decodeWhitepaperCode",
    builder: "buildWhitepaperResult",
    encoder: "encodeWhitepaperCode",
  },
  {
    name: "99% Club",
    route: "/club",
    page: "app/club/member/[code]/page.tsx",
    image: "app/club/member/[code]/opengraph-image.tsx",
    client: "app/club/club-client.tsx",
    decoder: "decodeClubCode",
    builder: "buildClubResult",
    encoder: "encodeClubCode",
  },
  {
    name: "Personal Cope Calibration",
    route: "/cope-index",
    page: "app/cope-index/case/[code]/page.tsx",
    image: "app/cope-index/case/[code]/opengraph-image.tsx",
    client: "app/cope-index/cope-index-client.tsx",
    decoder: "decodeCopeCode",
    builder: "buildPersonalCopeResult",
    encoder: "encodeCopeCode",
  },
];

test("all seven public result pages expose a complete noindex share and metadata contract", () => {
  for (const item of publicCases) {
    const page = readRepoFile(item.page);
    assert.ok(page.includes("export async function generateMetadata"), item.name + " metadata function");
    assert.ok(page.includes(item.decoder + "("), item.name + " validates the incoming public code");
    assert.ok(page.includes(item.builder + "("), item.name + " rebuilds its result from the code");
    assert.ok(page.includes(item.encoder + "("), item.name + " creates a canonical share code");
    assert.ok(page.includes("if (!") && page.includes("notFound()"), item.name + " rejects invalid public codes");
    assert.ok(page.includes("alternates: { canonical: route }"), item.name + " declares a canonical URL");
    assert.ok(page.includes("robots: { index: false, follow: true }"), item.name + " personal result stays out of search index");
    assert.ok(page.includes("openGraph:"), item.name + " supplies Open Graph metadata");
    assert.ok(page.includes("images: [{ url: image, width: 1200, height: 630"), item.name + " declares a 1200x630 image");
    assert.ok(page.includes("twitter:"), item.name + " supplies X/Twitter card metadata");
    assert.ok(page.includes('card: "summary_large_image"'), item.name + " requests a large social preview");
    assert.ok(page.includes('const image = route + "/opengraph-image"'), item.name + " links metadata to its image endpoint");
    assert.ok(page.includes("DepartmentPublicShare"), item.name + " includes the shared public-link controls");
    assert.ok(page.includes("casePath={caseUrl}"), item.name + " shares the canonical public result URL");
    assert.ok(page.includes('"' + item.route + '?challenge="'), item.name + " builds a challenge URL for its own intake route");
    assert.ok(page.includes("const challengeUrl ="), item.name + " exposes the challenge destination");
  }
});

test("all seven challenge links are understood by their matching intake experiences", () => {
  for (const item of publicCases) {
    const client = readRepoFile(item.client);
    assert.ok(client.includes(item.decoder + "("), item.name + " intake decodes shared challenge codes");
    assert.ok(client.includes('get("challenge")'), item.name + " intake reads the challenge query parameter");
    assert.ok(client.includes(item.builder + "("), item.name + " identifies the originating result");
    assert.ok(client.includes("setChallengeMessage("), item.name + " displays a nomination message");
    assert.ok(client.includes(item.encoder + "("), item.name + " creates a compatible challenge code");
    assert.ok(client.includes(item.route + "?challenge="), item.name + " creates challenges for the matching route");
  }
});

test("all seven dynamic Open Graph endpoints reconstruct the matching fictional result", () => {
  for (const item of publicCases) {
    const image = readRepoFile(item.image);
    assert.ok(image.includes('from "next/og"'), item.name + " uses Next's Open Graph image renderer");
    assert.ok(!image.includes("export const runtime = \"edge\""), item.name + " uses the default Node.js image runtime");
    assert.ok(image.includes("export const alt ="), item.name + " exposes descriptive image alternative text");
    assert.ok(image.includes("export const size = { width: 1200, height: 630 }"), item.name + " uses standard 1200x630 dimensions");
    assert.ok(image.includes('export const contentType = "image/png"'), item.name + " declares PNG output");
    assert.ok(image.includes(item.decoder + "("), item.name + " OG image decodes the same case code");
    assert.ok(image.includes(item.builder + "("), item.name + " OG image uses the same result engine");
    assert.ok(image.includes("new ImageResponse("), item.name + " renders the preview image");
    assert.ok(image.includes("await params"), item.name + " awaits the dynamic route parameter");
  }
});

test("archive records and museum exhibits remain indexable and have matching share previews", () => {
  const resourceRoutes = [
    {
      name: "Archive records",
      page: "app/archives/records/[slug]/page.tsx",
      image: "app/archives/records/[slug]/opengraph-image.tsx",
      lookup: "getArchiveRecord",
      sourceArray: "archiveRecords",
      route: "/archives/records/",
      activeDepartment: "archives",
    },
    {
      name: "Museum exhibits",
      page: "app/museum/exhibits/[slug]/page.tsx",
      image: "app/museum/exhibits/[slug]/opengraph-image.tsx",
      lookup: "getExhibit",
      sourceArray: "exhibits",
      route: "/museum/exhibits/",
      activeDepartment: "museum",
    },
  ];

  for (const item of resourceRoutes) {
    const page = readRepoFile(item.page);
    const image = readRepoFile(item.image);
    assert.ok(page.includes("generateStaticParams"), item.name + " expose static detail routes");
    assert.ok(page.includes(item.sourceArray + ".map("), item.name + " derive static routes from the content collection");
    assert.ok(page.includes(item.lookup + "("), item.name + " validate the requested resource slug");
    assert.ok(page.includes("notFound()"), item.name + " reject unknown resources");
    assert.ok(page.includes("alternates: { canonical:"), item.name + " declare canonical metadata");
    assert.ok(page.includes('type: "article"'), item.name + " are editorial resources, not personal result records");
    assert.ok(page.includes("openGraph:"), item.name + " expose Open Graph metadata");
    assert.ok(page.includes("twitter:"), item.name + " expose large social cards");
    assert.ok(page.includes("DepartmentPublicShare"), item.name + " expose share controls");
    assert.ok(page.includes("casePath={route}") || page.includes("casePath={path}"), item.name + " share their canonical detail route");
    const metadataBlock = page.slice(
      page.indexOf("export async function generateMetadata"),
      page.indexOf("export default async function"),
    );
    const validMetadata = metadataBlock.slice(metadataBlock.indexOf("const title ="));
    assert.ok(!validMetadata.includes("robots: { index: false"), item.name + " valid editorial records remain eligible for indexing");

    assert.ok(image.includes('from "next/og"'), item.name + " use Next's social image renderer");
    assert.ok(image.includes(item.lookup + "("), item.name + " use the same content lookup as the page");
    assert.ok(image.includes("new ImageResponse("), item.name + " render an individual resource preview");
    assert.ok(image.includes("export const size = { width: 1200, height: 630 }"), item.name + " use 1200x630 images");
  }
});

test("public sharing controls use the current public origin and have clipboard and X fallbacks", () => {
  const share = readRepoFile("app/components/department-public-share.tsx");
  assert.ok(share.includes("new URL(casePath, window.location.origin)"), "public share links use the browser's current origin");
  assert.ok(share.includes("navigator.share"), "native share is supported where available");
  assert.ok(share.includes("navigator.clipboard?.writeText"), "modern clipboard API is supported");
  assert.ok(share.includes('document.execCommand("copy")'), "clipboard has a compatibility fallback");
  assert.ok(share.includes("https://twitter.com/intent/tweet"), "X/Twitter intent links are constructed");
  assert.ok(share.includes("noopener,noreferrer"), "new share windows use opener protections");
});

test("global metadata provides an absolute base for canonical and social URLs", () => {
  const layout = readRepoFile("app/layout.tsx");
  const siteConfig = readRepoFile("app/site-config.ts");
  assert.ok(layout.includes("metadataBase: new URL(SITE_URL)"));
  assert.ok(siteConfig.includes("export const SITE_URL = \"https://"));
  assert.ok(layout.includes('card: "summary_large_image"'));
  assert.ok(layout.includes('images: ["/opengraph-image"]'));
});

test("U52 public case and editorial resource posts use one X-safe copy builder", () => {
  const casePages = publicCases
    .filter((item) => item.name !== "99% Club")
    .map((item) => ({ name: item.name, path: item.page }));

  const resourcePages = [
    { name: "Department Archives", path: "app/archives/records/[slug]/page.tsx" },
    { name: "Museum of Trenches Relics", path: "app/museum/exhibits/[slug]/page.tsx" },
  ];

  for (const item of [...casePages, ...resourcePages]) {
    const page = readRepoFile(item.path);
    assert.ok(page.includes("buildDepartmentShareText({"), item.name + " must use the shared character-safe copy builder");
    assert.ok(page.includes("shareText={xText}"), item.name + " must send the composed copy to the share controls");
  }

  const clubPage = readRepoFile("app/club/member/[code]/page.tsx");
  const clubSocial = readRepoFile("app/club/club-social.ts");
  assert.ok(clubPage.includes("buildClubMemberShareText(result)"), "Club public member pages must use their Club-specific copy");
  assert.ok(clubSocial.includes("buildDepartmentShareText({"), "Club member copy must use the shared character budget");
});

test("U52 share copy preserves the finding and punchline within the X URL-safe character budget", () => {
  const complete = buildDepartmentShareText({
    opening: "THE DEPARTMENT filed a fictional case.",
    finding: "Classification: THE LATE-ENTRY SPECIALIST.",
    evidence: "Research: 82/100. Crowd dependency: 94/100.",
    punchline: "The exit plan was still waiting for the next update.",
    invitation: "Run your own audit.",
  });

  assert.match(complete, /THE DEPARTMENT filed a fictional case/);
  assert.match(complete, /THE LATE-ENTRY SPECIALIST/);
  assert.match(complete, /The exit plan was still waiting/);
  assert.ok(complete.length <= DEPARTMENT_SHARE_TEXT_LIMIT);
  assert.ok(complete.length + 1 + 23 <= 280, "copy plus X's reserved short URL must remain under 280 characters");

  const constrained = buildDepartmentShareText({
    opening: "THE DEPARTMENT filed a fictional case for an exceptionally long project label that would otherwise consume the whole post.",
    finding: "Classification: THE PERMANENTLY DEFERRED COMMUNITY TAKEOVER ROADMAP SPECIALIST.",
    evidence: "Delivery: 98/100. Timeline realism: 2/100. Promise inflation: 100/100. A detailed set of optional fictional scores for this public case.",
    punchline: "The milestones have been rescheduled until after the next milestone review.",
    invitation: "Submit your own fictional recovery plan.",
  });

  assert.ok(constrained.length <= DEPARTMENT_SHARE_TEXT_LIMIT);
  assert.match(constrained, /THE DEPARTMENT filed/);
  assert.match(constrained, /The milestones/);
  assert.doesNotMatch(constrained, /\\s+…/);
  assert.doesNotMatch(constrained, /undefined|null/);
});

test("U52 share copy removes empty fields and collapses accidental whitespace", () => {
  const copy = buildDepartmentShareText({
    opening: "  THE 99% CLUB   filed a fictional member record. ",
    finding: "",
    evidence: "   ",
    punchline: " THE NEXT ONE IS MINE.  ",
    invitation: "",
  });

  assert.equal(copy, "THE 99% CLUB filed a fictional member record. THE NEXT ONE IS MINE.");
});

test("U53 Daily Trenches Desk uses concise X-ready copy for current and archived dispatches", () => {
  const client = readRepoFile("app/daily-office/daily-client.tsx");
  assert.ok(
    client.includes('import { buildDepartmentShareText } from "../lib/department-share-copy";'),
    "Daily Trenches Desk must use the shared editorial share-copy builder",
  );
  assert.ok(client.includes("const xText = buildDepartmentShareText({"), "dispatch share copy must use the common X budget");
  assert.ok(client.includes("shareText={xText}"), "the same composed copy must reach the public share controls");

  // The full-dispatch clipboard action remains deliberately unabridged.
  const fullCopy = client.slice(client.indexOf("async function copyDispatch()"), client.indexOf("function downloadCard()"));
  assert.ok(fullCopy.includes("const text = ["), "the full briefing copy remains available");
  assert.ok(fullCopy.includes("dispatch.convictionIndex.readings.map"), "full copy retains all index readings");
  assert.ok(fullCopy.includes("dispatch.sections.flatMap"), "full copy retains every dispatch section");
  assert.ok(fullCopy.includes("dispatch.methodology"), "full copy retains the methodology");
  assert.ok(fullCopy.includes("pageUrl"), "full copy retains the canonical dispatch URL");

  for (const issueDate of ["2026-11-24", "2026-11-17", "2026-10-01", "2026-09-01"]) {
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const shareText = buildDepartmentShareText({
      opening: "THE DYOR DEPARTMENT / TRENCHES DESK.",
      finding: dispatch.headline + " " + dispatch.bulletin,
      evidence: "CONVICTION INDEX: " + dispatch.convictionIndex.score + "/100 — " + dispatch.convictionIndex.classification + ".",
      punchline: dispatch.quote,
      invitation: "A fictional daily dispatch. Not real news or market data.",
    });

    assert.ok(shareText.length <= DEPARTMENT_SHARE_TEXT_LIMIT, issueDate + " dispatch must fit the X text budget");
    assert.ok(shareText.length + 1 + 23 <= 280, issueDate + " dispatch must reserve room for X's short URL");
    assert.ok(shareText.startsWith("THE DYOR DEPARTMENT / TRENCHES DESK."), issueDate + " must retain the institutional hook");
    assert.ok(shareText.includes(dispatch.headline.slice(0, 24)), issueDate + " must retain the dispatch headline");
    assert.ok(shareText.includes(dispatch.quote.slice(0, 24)), issueDate + " must retain the quote's central line");
  }
});



test("U54 Case Atlas and Institutional Memory Ledger use concise route-specific share copy", () => {
  const atlasPage = readRepoFile("app/daily-office/atlas/page.tsx");
  const ledgerPage = readRepoFile("app/daily-office/ledger/page.tsx");
  const styles = readRepoFile("app/globals.css");
  assert.ok(styles.includes(".department-reference-share {"), "both reference routes must receive the shared visual treatment");
  assert.ok(styles.includes(".department-reference-share__actions {"), "share actions must wrap on narrow screens");

  for (const [name, page, route, label] of [
    ["Case Atlas", atlasPage, "/daily-office/atlas", "CASE ATLAS"],
    ["Institutional Memory Ledger", ledgerPage, "/daily-office/ledger", "MEMORY LEDGER"],
  ] as const) {
    assert.ok(page.includes("buildDepartmentShareText({"), name + " must use the shared 235-character composer");
    assert.ok(page.includes("DepartmentPublicShare"), name + " must expose the existing public share controls");
    assert.ok(page.includes("shareText={shareText}"), name + " must pass the composed copy to the share controls");
    assert.ok(page.includes('casePath="' + route + '"'), name + " must share its canonical public route");
    assert.ok(page.includes('resourceLabel="' + label + '"'), name + " must identify the correct resource in share actions");
  }

  const atlas = buildDepartmentCaseAtlas("2026-11-24", 240);
  const atlasCopy = buildDepartmentShareText({
    opening: "THE DYOR DEPARTMENT / CASE ATLAS.",
    finding: atlas.entries.length + " fictional themes routed across " + atlas.divisions.length + " offices.",
    evidence: atlas.lookbackDays + " date-seeded UTC issues; recurrence and matched-period comparisons.",
    punchline: "Every route leads to a record. None leads to market insight.",
    invitation: "Search the fictional register.",
  });

  assert.ok(atlasCopy.length <= DEPARTMENT_SHARE_TEXT_LIMIT, "Atlas copy must fit the shared text budget");
  assert.ok(atlasCopy.length + 1 + 23 <= 280, "Atlas copy must reserve room for X's short URL");
  assert.ok(atlasCopy.startsWith("THE DYOR DEPARTMENT / CASE ATLAS."));
  assert.match(atlasCopy, /18 fictional themes routed across 10 offices/);
  assert.match(atlasCopy, /Every route leads to a record/);

  const records = buildInstitutionalMemory("2026-11-24", 14).slice().reverse();
  const latestRecord = records[0];
  const oldestRecord = records[records.length - 1];
  const ledgerCopy = buildDepartmentShareText({
    opening: "THE DYOR DEPARTMENT / INSTITUTIONAL MEMORY.",
    finding: records.length + " consecutive fictional dispatches, " + oldestRecord.issueDate + " to " + latestRecord.issueDate + " UTC.",
    evidence: "Latest file: " + latestRecord.headline + " " + latestRecord.bulletin,
    punchline: "Fourteen dates later, the paperwork is still pending.",
    invitation: "Review the paper trail.",
  });

  assert.ok(ledgerCopy.length <= DEPARTMENT_SHARE_TEXT_LIMIT, "Ledger copy must fit the shared text budget");
  assert.ok(ledgerCopy.length + 1 + 23 <= 280, "Ledger copy must reserve room for X's short URL");
  assert.ok(ledgerCopy.startsWith("THE DYOR DEPARTMENT / INSTITUTIONAL MEMORY."));
  assert.match(ledgerCopy, /14 consecutive fictional dispatches/);
  assert.match(ledgerCopy, /Fourteen dates later/);
});

test("Case Atlas and Memory Ledger publish route-specific, current large-image social previews", () => {
  const references = [
    {
      name: "Case Atlas",
      route: "/daily-office/atlas",
      page: "app/daily-office/atlas/page.tsx",
      image: "app/daily-office/atlas/opengraph-image.tsx",
      metadataImage: "/daily-office/atlas/opengraph-image",
      builder: "buildDepartmentCaseAtlas",
    },
    {
      name: "Institutional Memory Ledger",
      route: "/daily-office/ledger",
      page: "app/daily-office/ledger/page.tsx",
      image: "app/daily-office/ledger/opengraph-image.tsx",
      metadataImage: "/daily-office/ledger/opengraph-image",
      builder: "buildInstitutionalMemory",
    },
  ];

  for (const item of references) {
    const page = readRepoFile(item.page);
    const image = readRepoFile(item.image);

    assert.ok(page.includes('alternates: { canonical: "' + item.route + '" }'), item.name + " keeps its canonical route");
    assert.ok(page.includes("robots: { index: false, follow: true }"), item.name + " remains intentionally noindex");
    assert.ok(page.includes("openGraph:"), item.name + " exposes Open Graph metadata");
    assert.ok(page.includes('url: "' + item.metadataImage + '"'), item.name + " points metadata to its dedicated image");
    assert.ok(page.includes("twitter:"), item.name + " exposes X/Twitter metadata");
    assert.ok(page.includes('card: "summary_large_image"'), item.name + " requests a large social preview");
    assert.ok(page.includes('images: ["' + item.metadataImage + '"]'), item.name + " uses the same image for X");

    assert.ok(image.includes('from "next/og"'), item.name + " uses Next's Open Graph image renderer");
    assert.ok(image.includes('export const dynamic = "force-dynamic"'), item.name + " refreshes its date-based preview on demand");
    assert.ok(image.includes("export const alt ="), item.name + " exposes descriptive image alternative text");
    assert.ok(image.includes("export const size = { width: 1200, height: 630 }"), item.name + " uses standard large-card dimensions");
    assert.ok(image.includes('export const contentType = "image/png"'), item.name + " declares PNG output");
    assert.ok(image.includes(item.builder + "("), item.name + " renders from its existing source engine");
    assert.ok(image.includes("new ImageResponse("), item.name + " renders a dedicated preview");
    assert.ok(image.includes('new Date().toISOString().slice(0, 10)'), item.name + " uses the current UTC date");
  }

  const atlasImage = readRepoFile("app/daily-office/atlas/opengraph-image.tsx");
  assert.ok(atlasImage.includes("buildDepartmentCaseAtlas(asOfDate, 240)"), "Case Atlas uses the same 240-issue reference window");
  assert.ok(atlasImage.includes("atlas.entries.length"), "Case Atlas preview derives its theme count from current data");
  assert.ok(atlasImage.includes("atlas.divisions.length"), "Case Atlas preview derives its office count from current data");

  const ledgerImage = readRepoFile("app/daily-office/ledger/opengraph-image.tsx");
  assert.ok(ledgerImage.includes("buildInstitutionalMemory(issueDate, 14)"), "Ledger preview uses the same fourteen-day register");
  assert.ok(ledgerImage.includes("latestRecord.headline"), "Ledger preview identifies the latest fictional file");
  assert.ok(ledgerImage.includes("oldestRecord.issueDate") && ledgerImage.includes("latestRecord.issueDate"), "Ledger preview derives its visible date window from the generated records");
});
