import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path: string) => readFileSync(path, "utf8");

test("R5 README inventory matches the current routes, Passport count and quality workflow", () => {
  const readme = read("README.md");

  assert.match(readme, /26 distinct achievement badges/);
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
  assert.doesNotMatch(privacy, /disabled and deleted from its page/);
  assert.match(privacy, /Google Fonts/);
  assert.match(privacy, /provider's technical logs/);
});

test("R5 legal pages carry the current review date and do not invent operator details", () => {
  const privacy = read("app/privacy/page.tsx");
  const terms = read("app/terms/page.tsx");

  for (const page of [privacy, terms]) {
    assert.match(page, /LAST REVIEWED \/ 25 NOV 2026/);
  }
  assert.match(privacy, /legal identity and a dedicated contact channel .* have not been supplied/);
  assert.match(terms, /legal identity and contact details .* have not been supplied/);
});

test("R5 editorial guidance keeps the daily archive and Case Atlas explicitly fictional", () => {
  const brandVoice = read("docs/BRAND_VOICE.md");

  assert.match(brandVoice, /fourteen consecutive fictional UTC dispatches/);
  assert.match(brandVoice, /eighteen fictional themes/);
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
