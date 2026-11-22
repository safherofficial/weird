import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const component = readFileSync("app/components/energy-scrollbar.tsx", "utf8");
const stylesheet = readFileSync("app/components/energy-scrollbar.css", "utf8");
const globalStyles = readFileSync("app/components/energy-scrollbar.css", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");

test("energy scrollbar replaces only the desktop document scrollbar without disabling page scrolling", () => {
  assert.match(globalStyles, /@media \(hover: hover\) and \(pointer: fine\)[\s\S]*?scrollbar-width:\s*none/u);
  assert.match(globalStyles, /html::-webkit-scrollbar/u);
  assert.doesNotMatch(globalStyles, /overflow:\s*hidden\s*!important/u);
  assert.match(component, /\(hover: hover\) and \(pointer: fine\)/u);
  assert.match(component, /scrollElement\.scrollTop\s*=\s*target/u);
});

test("energy core follows the document position and exposes an accessible vertical scrollbar", () => {
  assert.match(component, /role="scrollbar"/u);
  assert.match(component, /aria-orientation="vertical"/u);
  assert.match(component, /aria-valuemin=\{0\}/u);
  assert.match(component, /aria-valuemax=\{100\}/u);
  assert.match(component, /aria-valuenow=\{0\}/u);
  assert.match(component, /aria-controls="page-scroll-region"/u);
  assert.match(component, /availableTravel\s*\*\s*progress/u);
  assert.match(component, /scrollElement\.scrollTop/u);
  assert.match(layout, /id="page-scroll-region"/u);
});

test("energy scrollbar supports pointer dragging, track seeking and keyboard navigation", () => {
  assert.match(component, /setPointerCapture\(event\.pointerId\)/u);
  assert.match(component, /releasePointerCapture\(pointerId\)/u);
  assert.match(component, /startedOnThumb/u);
  assert.match(component, /document\.documentElement\.style\.scrollBehavior = "auto"/u);
  assert.match(component, /previousInlineScrollBehavior = null/u);
  assert.match(component, /getProgressFromPointer\(event\.clientY\)/u);
  for (const key of ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"]) {
    assert.match(component, new RegExp(`case "${key}":`, "u"));
  }
});

test("energy trail is canvas-rendered, bounded and stops animating after it fades", () => {
  assert.match(component, /TRAIL_LIFETIME_MS\s*=\s*560/u);
  assert.match(component, /MAX_TRAIL_POINTS\s*=\s*72/u);
  assert.match(component, /MAX_PARTICLES\s*=\s*36/u);
  assert.match(component, /requestAnimationFrame\(render\)/u);
  assert.match(component, /now\s*-\s*trail\[trail\.length\s*-\s*1\]\.at\s*<\s*TRAIL_LIFETIME_MS/u);
  assert.match(component, /if \(animationFrame\) return/u);
});

test("energy scrollbar respects reduced motion, visibility changes and touch devices", () => {
  assert.match(component, /prefers-reduced-motion:\s*reduce/u);
  assert.match(component, /if \(isReducedMotion\)/u);
  assert.match(component, /track\.dataset\.reducedMotion = String\(isReducedMotion\)/u);
  assert.match(component, /document\.addEventListener\("visibilitychange"/u);
  assert.match(component, /resizeObserver\?\.disconnect\(\)/u);
  assert.match(component, /if \(!finePointer\.matches\) return/u);
  assert.match(stylesheet, /@media \(hover: hover\) and \(pointer: fine\)/u);
  assert.match(stylesheet, /@media \(prefers-reduced-motion: reduce\)/u);
});

test("energy scrollbar presents the neon energy core and responsive wake-up state", () => {
  assert.match(stylesheet, /#b6ff65/iu);
  assert.match(stylesheet, /radial-gradient/u);
  assert.match(stylesheet, /data-scrolling="true"/u);
  assert.match(stylesheet, /energy-scrollbar__spark/u);
  assert.match(layout, /<EnergyScrollbar \/>/u);
  assert.match(layout, /energy-scrollbar\.css/u);
});
