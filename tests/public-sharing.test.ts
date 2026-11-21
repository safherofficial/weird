import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";

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
    assert.ok(image.includes("export const runtime = \"edge\""), item.name + " declares a supported image runtime");
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
