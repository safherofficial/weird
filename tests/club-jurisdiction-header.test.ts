import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const header = readFileSync("app/components/department-header.tsx", "utf8");

test("U61 keeps the Department Solana-rooted while identifying every 99% Club page as cross-chain", () => {
  assert.ok(header.includes('activeSection === "club"'), "The Club masthead must be selected by its route identity.");
  assert.ok(
    header.includes("THE CROSS-CHAIN SURVIVOR REGISTRY / ALL CHAINS & CYCLES"),
    "The Club masthead must clearly identify its cross-chain scope.",
  );
  assert.ok(
    header.includes("THE OFFICIAL AFTERCARE DESK FOR THE SOLANA TRENCHES"),
    "The Department masthead must retain its Solana-rooted identity elsewhere.",
  );
  assert.ok(header.includes("<span>{toplineLabel}</span>"), "The selected masthead label must render in the shared header.");

  for (const [path, content] of [
    ["app/club/page.tsx", readFileSync("app/club/page.tsx", "utf8")],
    ["app/club/factions/[id]/page.tsx", readFileSync("app/club/factions/[id]/page.tsx", "utf8")],
    ["app/club/member/[code]/page.tsx", readFileSync("app/club/member/[code]/page.tsx", "utf8")],
  ] as const) {
    assert.ok(content.includes('activeSection="club"'), path + " must use the cross-chain Club masthead context.");
  }
});
