import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("R1 SEO titles inherit the department brand exactly once and sitemap excludes deliberate noindex routes", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  const audit = readFileSync("app/audit/case/[code]/page.tsx", "utf8");
  const roadmap = readFileSync("app/roadmap-generator/case/[code]/page.tsx", "utf8");
  const whitepaper = readFileSync("app/whitepaper-factory/case/[code]/page.tsx", "utf8");
  const atlas = readFileSync("app/daily-office/atlas/page.tsx", "utf8");
  const ledger = readFileSync("app/daily-office/ledger/page.tsx", "utf8");
  const sitemap = readFileSync("app/sitemap.ts", "utf8");

  assert.ok(layout.includes('template: "%s | THE DYOR DEPARTMENT"'));
  assert.ok(audit.includes("const title = result.profile.title;"));
  assert.ok(audit.includes('const socialTitle = title + " | THE DYOR DEPARTMENT";'));
  assert.ok(audit.includes("title: socialTitle"));
  assert.ok(roadmap.includes("    title,\n    description,"));
  assert.ok(whitepaper.includes("    title,\n    description,"));
  assert.ok(!roadmap.includes('title: title + " | THE DYOR DEPARTMENT"'));
  assert.ok(!whitepaper.includes('title: title + " | THE DYOR DEPARTMENT"'));
  assert.ok(atlas.includes('title: "Department Case Atlas"'));
  assert.ok(ledger.includes('title: "Institutional Memory Ledger"'));
  assert.ok(atlas.includes("robots: { index: false, follow: true }"));
  assert.ok(ledger.includes("robots: { index: false, follow: true }"));
  assert.ok(!sitemap.includes("/daily-office/atlas"));
  assert.ok(!sitemap.includes("/daily-office/ledger"));
});
