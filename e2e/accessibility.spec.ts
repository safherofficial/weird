import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

const representativeRoutes = [
  "/",
  "/bridge-incident-office",
  "/governance-office",
  "/airdrop-office",
  "/club",
  "/archives",
  "/daily-office",
  "/museum",
  "/passport",
];

function formatViolations(violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"]) {
  return violations
    .map((violation) => {
      const nodes = violation.nodes
        .map((node) => `  - ${node.target.join(" ")}`)
        .join("\n");
      return `${violation.id} (${violation.impact ?? "unknown"}): ${violation.help}\n${nodes}`;
    })
    .join("\n");
}

for (const route of representativeRoutes) {
  test(`WCAG 2.1 AA scan has no axe violations on ${route}`, async ({ page }) => {
    await page.goto(route);

    const scan = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

    expect(scan.violations, formatViolations(scan.violations)).toEqual([]);
  });
}

test("expanded mobile directory has no axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();

  const scan = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

  expect(scan.violations, formatViolations(scan.violations)).toEqual([]);
});

test("Bridge Incident interview state has no axe violations", async ({ page }) => {
  await page.goto("/bridge-incident-office");
  await page.getByRole("button", { name: /OPEN INCIDENT INTERVIEW/i }).click();

  const scan = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

  expect(scan.violations, formatViolations(scan.violations)).toEqual([]);
});

test("Governance interview state has no axe violations", async ({ page }) => {
  await page.goto("/governance-office");
  await page.getByRole("button", { name: /OPEN GOVERNANCE INTERVIEW/i }).click();

  const scan = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

  expect(scan.violations, formatViolations(scan.violations)).toEqual([]);
});
