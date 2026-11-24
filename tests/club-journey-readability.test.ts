import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const styles = readFileSync("app/club/club-journey.module.css", "utf8");

function rule(source: string, selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(escaped + "\\s*\\{([^}]*)\\}"));
  assert.ok(match, "Missing style rule: " + selector);
  return match[1];
}

test("U60 Club journey navigation and stage labels remain readable on desktop and mobile", () => {
  const navLabel = rule(styles, ".nav a > strong");
  const navMeta = rule(styles, ".nav a > small");
  const stageLabel = rule(styles, ".stageMarker strong");
  const stageMeta = rule(styles, ".stageMarker small");

  assert.ok(navLabel.includes("font: 700 11px/"), "Desktop journey labels must be at least 11px.");
  assert.ok(navMeta.includes("font: 9px/"), "Desktop journey helper text must be at least 9px.");
  assert.ok(stageLabel.includes("font: 700 10px/"), "Desktop stage labels must be at least 10px.");
  assert.ok(stageMeta.includes("font: 9px/"), "Desktop stage helper text must be at least 9px.");

  const mobileStart = styles.indexOf("@media (max-width: 700px)");
  assert.ok(mobileStart >= 0, "The existing mobile layout breakpoint must remain present.");
  const mobile = styles.slice(mobileStart);
  const mobileNavLabel = rule(mobile, ".nav a > strong");
  const mobileNavMeta = rule(mobile, ".nav a > small");
  const mobileStageLabel = rule(mobile, ".stageMarker strong");
  const mobileStageMeta = rule(mobile, ".stageMarker small");

  assert.ok(mobileNavLabel.includes("font-size: 10px;"), "Mobile journey labels must be at least 10px.");
  assert.ok(mobileNavMeta.includes("font-size: 9px;"), "Mobile journey helper text must be at least 9px.");
  assert.ok(mobileStageLabel.includes("font-size: 9px;"), "Mobile stage labels must be at least 9px.");
  assert.ok(mobileStageMeta.includes("font-size: 8px;"), "Mobile stage helper text must be at least 8px.");
});
