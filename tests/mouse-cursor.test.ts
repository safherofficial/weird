import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const pointerCss = readFileSync("app/components/theme-pointer.css", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");

test("the pointer keeps familiar arrow and hand silhouettes without a tracking component", () => {
  assert.ok(pointerCss.includes("--department-cursor-arrow"));
  assert.ok(pointerCss.includes("--department-cursor-hand"));
  assert.ok(pointerCss.includes("data:image/png;base64,"));
  assert.ok(!pointerCss.includes("data:image/svg+xml"));
  assert.ok(pointerCss.includes("cursor: text !important"));
  assert.ok(pointerCss.includes("cursor: not-allowed !important"));
  assert.ok(layout.includes("components/theme-pointer.css"));
  assert.ok(!layout.includes("LaserCursor"));
  assert.ok(!layout.includes("laser-cursor"));
  assert.equal(existsSync("app/components/laser-cursor.tsx"), false);
});

test("arrow and hand bitmap cursors change with all three Department themes", () => {
  for (const theme of ["amber", "signal"]) {
    assert.ok(pointerCss.includes('html[data-theme="' + theme + '"]'));
  }
  const arrowLines = pointerCss.split("\n").filter((line) => line.includes("--department-cursor-arrow:"));
  const handLines = pointerCss.split("\n").filter((line) => line.includes("--department-cursor-hand:"));
  assert.equal(arrowLines.length, 3);
  assert.equal(handLines.length, 3);
  const getPng = (line: string) => line.split("base64,")[1]?.split('"')[0] ?? "";
  assert.equal(new Set(arrowLines.map(getPng)).size, 3);
  assert.equal(new Set(handLines.map(getPng)).size, 3);
  assert.ok(pointerCss.includes("--department-cursor-accent: var(--green)"));
});

test("the cursor is instant, inherited, and only customized on fine hover pointers", () => {
  assert.ok(pointerCss.includes("@media (hover: hover) and (pointer: fine)"));
  assert.ok(pointerCss.includes("html, body { cursor: var(--department-cursor-arrow) !important; }"));
  assert.ok(pointerCss.includes("cursor: var(--department-cursor-hand) !important"));
  assert.ok(!pointerCss.includes("html *"));
  assert.ok(!/transition:|animation:|will-change:|requestAnimationFrame/u.test(pointerCss));
  assert.ok(!pointerCss.includes("cursor: none"));
});

test("native text-entry, disabled and drag affordances remain intact", () => {
  assert.ok(pointerCss.includes('textarea, [contenteditable="true"], [role="textbox"]'));
  assert.ok(pointerCss.includes("cursor: text !important"));
  assert.ok(pointerCss.includes("[aria-disabled=" + '"true"' + "]"));
  assert.ok(pointerCss.includes(".energy-scrollbar { cursor: grab !important; }"));
  assert.ok(pointerCss.includes(".energy-scrollbar:active { cursor: grabbing !important; }"));
});
