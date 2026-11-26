import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

test("roaming office staff remains permanently absent from the Department shell", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");

  assert.doesNotMatch(layout, /OfficeStaff|office-staff/);
  assert.equal(existsSync("app/components/office-staff.tsx"), false);
  assert.equal(existsSync("app/components/office-staff.css"), false);
});
