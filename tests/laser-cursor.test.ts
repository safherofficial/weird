import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const component = readFileSync("app/components/laser-cursor.tsx", "utf8");
const stylesheet = readFileSync("app/components/laser-cursor.css", "utf8");

test("laser cursor follows with frame-time-based smoothing rather than a refresh-rate-dependent factor", () => {
  assert.match(component, /FOLLOW_TIME_CONSTANT_MS\s*=\s*48/u);
  assert.match(component, /1\s*-\s*Math\.exp\(-elapsed\s*\/\s*FOLLOW_TIME_CONSTANT_MS\)/u);
  assert.match(component, /MAX_FRAME_DELTA_MS\s*=\s*34/u);
  assert.match(component, /requestAnimationFrame\(animatePosition\)/u);
  assert.doesNotMatch(component, /currentX\s*\+=\s*dx\s*\*\s*0\.28/u);
});

test("laser cursor schedules only while needed and stops when hidden or reduced motion is enabled", () => {
  assert.match(component, /if \(!animationFrame\)\s*\{/u);
  assert.match(component, /if \(cursor\.dataset\.visible !== "true"\) return/u);
  assert.match(component, /stopAnimation\(\);[\s\S]*?hasPosition = false/u);
  assert.match(component, /if \(motionReduced\)\s*\{\s*stopAnimation\(\)/u);
  assert.match(component, /document\.addEventListener\("visibilitychange"/u);
  assert.match(component, /window\.addEventListener\("mouseleave"/u);
  assert.match(component, /document\.addEventListener\("mouseout", handleDocumentMouseOut\)/u);
  assert.match(component, /event\.relatedTarget === null/u);
});

test("laser cursor caches hit testing and avoids repeated DOM state writes", () => {
  assert.match(component, /if \(target === lastTarget\) return/u);
  assert.match(component, /if \(cursor\.dataset\.state !== state\)/u);
  assert.match(component, /if \(cursor\.dataset\.visible !== value\)/u);
  assert.match(component, /INTERACTIVE_SELECTOR/u);
  assert.match(component, /TEXT_ENTRY_SELECTOR/u);
});

test("laser cursor remains desktop-only, restores text entry and respects reduced motion", () => {
  assert.match(stylesheet, /@media \(hover: hover\) and \(pointer: fine\)/u);
  assert.match(stylesheet, /cursor: text !important/u);
  assert.match(stylesheet, /@media \(prefers-reduced-motion: reduce\)/u);
  assert.match(component, /\(hover: hover\) and \(pointer: fine\)/u);
  assert.match(component, /\(prefers-reduced-motion: reduce\)/u);
  assert.match(component, /reducedMotion\.addEventListener\("change"/u);
});

test("laser cursor uses transform and composited scale feedback without permanent pulse animation", () => {
  assert.match(stylesheet, /will-change: transform/u);
  assert.match(stylesheet, /scale: 1\.18/u);
  assert.match(stylesheet, /scale: 0\.76/u);
  assert.doesNotMatch(stylesheet, /animation:\s*laser-cursor-pulse/u);
  assert.doesNotMatch(stylesheet, /@keyframes\s+laser-cursor-pulse/u);
});

test("Raf smoothing reaches the same position after equal elapsed time at 60, 120 and 144 Hz", () => {
  const timeConstant = 48;
  const elapsedTotal = 100;
  const frameIntervals = [1000 / 60, 1000 / 120, 1000 / 144];
  const remainingOffsets = frameIntervals.map((frameInterval) => {
    let elapsed = 0;
    let remaining = 1;
    while (elapsed < elapsedTotal) {
      const delta = Math.min(frameInterval, elapsedTotal - elapsed);
      const follow = 1 - Math.exp(-delta / timeConstant);
      remaining *= 1 - follow;
      elapsed += delta;
    }
    return remaining;
  });

  for (const remaining of remainingOffsets) {
    assert.ok(Math.abs(remaining - remainingOffsets[0]) < 1e-12);
  }
});


test("laser cursor snaps to authoritative pointer coordinates before press and release", () => {
  assert.match(component, /const syncToPointer = \(event: PointerEvent\) =>/u);
  assert.match(component, /targetX = event\.clientX;[\s\S]*?targetY = event\.clientY;[\s\S]*?currentX = targetX;[\s\S]*?currentY = targetY;/u);
  assert.match(component, /stopAnimation\(\);[\s\S]*?writePosition\(currentX, currentY\);/u);
  assert.match(component, /if \(syncToPointer\(event\) && cursor\.dataset\.pressed !== "true"\)/u);
  assert.match(component, /const handlePointerUp = \(event: PointerEvent\) => \{\s*syncToPointer\(event\);/u);
  assert.match(component, /updateHitTarget\(target\)/u);
});
