import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
const component = readFileSync(new URL("../app/components/office-staff.tsx", import.meta.url), "utf8");
const stylesheet = readFileSync(new URL("../app/components/office-staff.css", import.meta.url), "utf8");

test("editorial office staff is mounted globally without changing page content", () => {
  assert.match(layout, /import OfficeStaff from "\.\/components\/office-staff"/);
  assert.match(layout, /import "\.\/components\/office-staff\.css"/);
  assert.match(layout, /<OfficeStaff \/>/);
});

test("office employees remain decorative and never capture pointer input", () => {
  assert.match(component, /aria-hidden="true"/);
  assert.match(stylesheet, /pointer-events:\s*none/);
  assert.match(stylesheet, /z-index:\s*8/);
});

test("office staff follows semantic page sections and respects accessibility preferences", () => {
  assert.match(component, /querySelectorAll<HTMLElement>\("section"\)/);
  assert.match(component, /prefers-reduced-motion/);
  assert.match(component, /MutationObserver/);
  assert.match(stylesheet, /prefers-reduced-motion:\s*reduce/);
  assert.match(stylesheet, /max-width:\s*900px/);
});

test("office employee roles have distinct editorial props and theme-aware accents", () => {
  for (const role of ["writer", "editor", "archivist"]) {
    assert.ok(component.includes('"' + role + '"'), "Missing staff role: " + role);
    assert.ok(stylesheet.includes('data-role="' + role + '"'), "Missing role styling: " + role);
  }
  assert.match(component, /var\(--accent-primary/);
});
