import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const component = readFileSync("app/components/scroll-to-top.tsx", "utf8");
const stylesheet = readFileSync("app/components/scroll-to-top.css", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");

test("scroll-to-top is mounted globally once for every route through the root layout", () => {
  assert.match(layout, /import ScrollToTop from "\.\/components\/scroll-to-top"/u);
  assert.match(layout, /import "\.\/components\/scroll-to-top\.css"/u);
  assert.match(layout, /<ScrollToTop \/>/u);
});

test("scroll-to-top appears only after meaningful page scrolling and cleans up its listener", () => {
  assert.match(component, /SHOW_AFTER_PX\s*=\s*520/u);
  assert.match(component, /window\.scrollY\s*>\s*SHOW_AFTER_PX/u);
  assert.match(component, /addEventListener\("scroll", updateVisibility, \{ passive: true \}\)/u);
  assert.match(component, /removeEventListener\("scroll", updateVisibility\)/u);
});

test("scroll-to-top is an accessible button and cannot receive focus while hidden", () => {
  assert.match(component, /<button[\s\S]*?type="button"/u);
  assert.match(component, /aria-label="Back to top"/u);
  assert.match(component, /aria-hidden=\{!isVisible\}/u);
  assert.match(component, /tabIndex=\{isVisible \? 0 : -1\}/u);
  assert.match(component, /disabled=\{!isVisible\}/u);
});

test("scroll-to-top scrolls the document to zero and respects reduced-motion preferences", () => {
  assert.match(component, /window\.scrollTo\(\{[\s\S]*?top:\s*0,[\s\S]*?behavior:\s*prefersReducedMotion\s*\?\s*"auto"\s*:\s*"smooth"/u);
  assert.match(component, /prefers-reduced-motion:\s*reduce/u);
});

test("scroll-to-top stays clear of the desktop energy scrollbar and remains reachable on mobile", () => {
  assert.match(stylesheet, /right:\s*44px/u);
  assert.match(stylesheet, /@media \(max-width:\s*640px\)[\s\S]*?right:\s*20px/u);
  assert.match(stylesheet, /min-height:\s*44px/u);
  assert.match(stylesheet, /:focus-visible/u);
});
