import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("U59 Club journey navigation is available before Stage 1 and links every stage", () => {
  const page = readFileSync("app/club/page.tsx", "utf8");
  const navigationStart = page.indexOf('<nav className={journey.nav} aria-label="99% Club five-stage journey">');
  const navigationEnd = page.indexOf("</nav>", navigationStart);
  const identityStageStart = page.indexOf('id="club-journey-identity"');

  assert.ok(navigationStart >= 0, "The five-stage journey navigation must exist.");
  assert.ok(navigationEnd > navigationStart, "The journey navigation must be closed.");
  assert.ok(identityStageStart >= 0, "Stage 1 must remain available.");
  assert.ok(navigationStart < identityStageStart, "Visitors must see the journey navigation before the membership interview.");

  const navigation = page.slice(navigationStart, navigationEnd);
  const linkedStages = [...navigation.matchAll(/<Link href="#([^"]+)">/g)].map((match) => match[1]);
  const expectedStages = [
    "club-journey-identity",
    "club-journey-factions",
    "club-journey-campaign",
    "club-journey-content",
    "club-journey-participation",
  ];

  assert.deepEqual(linkedStages, expectedStages, "The navigation must preserve the five-stage order and destinations.");
  for (const stageId of expectedStages) {
    assert.ok(page.includes('id="' + stageId + '"'), "The navigation target " + stageId + " must exist.");
  }
});
