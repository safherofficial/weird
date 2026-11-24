import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("U58 root not-found route preserves Department identity and gives visitors useful exits", () => {
  const page = readFileSync("app/not-found.tsx", "utf8");
  const styles = readFileSync("app/not-found.module.css", "utf8");

  assert.ok(page.includes("DepartmentHeader"));
  assert.ok(page.includes("DepartmentFooter"));
  assert.ok(page.includes('id="main-content"'));
  assert.ok(page.includes('id="content-start"'));
  assert.ok(page.includes('aria-labelledby="not-found-title"'));
  assert.ok(page.includes("THIS PAGE HAS"));
  assert.ok(page.includes("LEFT THE TRENCHES."));
  assert.ok(page.includes('href="/"'));
  assert.ok(page.includes('href="/audit"'));
  assert.ok(page.includes('href="/#departments"'));
  assert.ok(page.includes("NO LIVE INDEXER"));
  assert.ok(styles.includes("@media (max-width: 760px)"));
  assert.ok(styles.includes("var(--green)"));
});
