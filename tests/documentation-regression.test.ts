import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path: string) => readFileSync(path, "utf8");

test("R5 README inventory matches the current routes, Passport count and quality workflow", () => {
  const readme = read("README.md");

  assert.match(readme, /29 distinct achievement badges/);
  assert.match(readme, /twenty curated fictional records across five categories/);
  assert.doesNotMatch(readme, /sixteen curated fictional records across five categories/i);
  assert.match(readme, /nineteen fictional curated artifacts across four collections/);
  assert.doesNotMatch(readme, /fifteen fictional curated artifacts across four collections/i);
  assert.doesNotMatch(readme, /eleven distinct achievement badges/i);
  for (const route of [
    "app/simulator/page.tsx",
    "app/club/page.tsx",
    "app/audit/page.tsx",
    "app/daily-office/page.tsx",
    "app/archives/page.tsx",
    "app/roadmap-generator/page.tsx",
    "app/whitepaper-factory/page.tsx",
    "app/utility-inspector/page.tsx",
    "app/museum/page.tsx",
    "app/cope-index/page.tsx",
    "app/airdrop-office/page.tsx",
    "app/bridge-incident-office/page.tsx",
    "app/governance-office/page.tsx",
    "app/daily-office/atlas/page.tsx",
    "app/daily-office/ledger/page.tsx",
  ]) {
    assert.ok(readme.includes(route), `README must document ${route}`);
  }
  for (const command of ["npm run typecheck", "npm run test:quality", "npm run build"]) {
    assert.ok(readme.includes(command), `README quality checks must include ${command}`);
  }
});

test("R5 Privacy Notice documents the real local-storage and same-origin API behaviour", () => {
  const privacy = read("app/privacy/page.tsx");

  assert.match(privacy, /same-origin GET request to `\/api\/department-case`/);
  assert.match(privacy, /does not receive the visitor's interactive answers/);
  assert.match(privacy, /does not write to an application database/);
  assert.match(privacy, /Passport remains there until it is deleted from its page/);
  assert.match(privacy, /color theme selector also saves the chosen palette identifier in browser localStorage on this device/);
  assert.match(privacy, /is not sent to the Department and is not used for analytics or tracking/);
  assert.match(privacy, /Bridge Incident Office case URL encodes only the seven selected answer indexes/);
  assert.match(privacy, /Governance Accountability Office case URL likewise encodes only the seven selected answer indexes/);
  assert.doesNotMatch(privacy, /disabled and deleted from its page/);
  assert.match(privacy, /Google Fonts/);
  assert.match(privacy, /provider's technical logs/);
});

test("R5 legal pages carry the current review date and do not invent operator details", () => {
  const privacy = read("app/privacy/page.tsx");
  const terms = read("app/terms/page.tsx");

  for (const page of [privacy, terms]) {
    assert.match(page, /LAST REVIEWED \/ 25 NOV 2026/);
    assert.doesNotMatch(page, /22 NOV 2026|22 November 2026/);
  }
  assert.match(privacy, /This page was last reviewed on 25 November 2026\./);
  assert.match(terms, /Last reviewed: 25 November 2026\./);
  assert.match(privacy, /legal identity and a dedicated contact channel .* have not been supplied/);
  assert.match(terms, /legal identity and contact details .* have not been supplied/);
});

test("U66 Governance Accountability Office legal terms disclose the fictional scope", () => {
  const terms = read("app/terms/page.tsx");
  assert.match(terms, /Governance Accountability Office scores only selected answers/);
  assert.match(terms, /does not verify a DAO, proposal, voting power, delegation, quorum or execution/);
});

test("R5 editorial guidance keeps the daily archive and Case Atlas explicitly fictional", () => {
  const brandVoice = read("docs/BRAND_VOICE.md");

  assert.match(brandVoice, /fourteen consecutive fictional UTC dispatches/);
  assert.match(brandVoice, /eighteen date-rotating Trenches Desk themes/);
  assert.match(brandVoice, /not evidence gathered from real projects, people or wallets/);
});

test("U62 legal disclosures identify 99% Club membership as cross-chain", () => {
  const privacy = read("app/privacy/page.tsx");
  const terms = read("app/terms/page.tsx");

  for (const page of [privacy, terms]) {
    assert.match(page, /cross-chain 99% Club membership/i);
    assert.doesNotMatch(page, /Solana Trenches 99% Club membership/i);
  }
});

test("U67 editorial guidance and division counters stay aligned with the live directory", () => {
  const brandVoice = read("docs/BRAND_VOICE.md");
  const divisions = read("app/divisions.ts");
  const home = read("app/page.tsx");
  const header = read("app/components/department-header.tsx");

  assert.ok(brandVoice.includes("The thirteen operational divisions"));
  const divisionRows = brandVoice.split(String.fromCharCode(10)).filter((line) => {
    if (!line.startsWith("| ")) return false;
    const number = Number(line.slice(2, 4));
    return Number.isInteger(number) && number >= 1 && number <= 13 && line[4] === ".";
  });
  assert.equal(divisionRows.length, 13, "Brand Voice must list all thirteen divisions exactly once");

  for (const requiredOffice of [
    "11. Airdrop Entitlement Office",
    "12. Bridge Incident Office",
    "13. Governance Accountability Office",
    "The Snapshot Tribunal",
    "Interchain Transfer Review",
    "The Quorum Tribunal",
  ]) {
    assert.ok(brandVoice.includes(requiredOffice), "Brand Voice must include " + requiredOffice);
  }
  assert.ok(brandVoice.includes("twenty-one fictional case threads across thirteen divisions"));
  assert.ok(brandVoice.includes("eighteen date-rotating Trenches Desk themes plus three static threads"));
  assert.ok(brandVoice.includes("forty-two reference destinations"));
  assert.ok(brandVoice.includes("240 UTC dates"));
  assert.ok(divisions.includes("GOVERNANCE ACCOUNTABILITY OFFICE"));

  assert.ok(home.includes('import { departmentGroups, departments } from "./divisions";'));
  assert.ok(home.includes("<strong>{departments.length}</strong><span>DIVISIONS</span>"));
  assert.ok(home.includes("<strong>{departments.length}</strong><span>PUBLIC DESTINATIONS</span>"));
  assert.ok(header.includes('<span className="mobile-nav__count">{departments.length} DESTINATIONS'));
  assert.ok(!home.includes("<strong>13</strong>"), "homepage division totals must not be hard-coded");
  assert.ok(!header.includes("13 DESTINATIONS"), "mobile navigation total must not be hard-coded");
  assert.ok(!brandVoice.includes("The twelve operational divisions"));
  assert.ok(!brandVoice.includes("the twelve divisions"));
  assert.ok(!brandVoice.includes("Divisions 11 and 12"));
  assert.ok(!brandVoice.includes("two static incident / eligibility threads"));
});
