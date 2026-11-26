import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const themeNames = ["Ice blue theme", "Acid lime theme", "Ruby red theme"] as const;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      if (sessionStorage.getItem("__dyor-theme-test-reset") !== "1") {
        localStorage.removeItem("dyor-theme");
        sessionStorage.setItem("__dyor-theme-test-reset", "1");
      }
    } catch {
      // The application falls back to the default ice theme when storage is unavailable.
    }
  });
});

test("ice is the default theme and all three radio options are exposed", async ({ page }) => {
  await page.goto("/");
  const group = page.getByRole("radiogroup", { name: "Color theme" });

  await expect(page.locator("html")).toHaveAttribute("data-theme", "ice");
  await expect(group.getByRole("radio")).toHaveCount(3);
  for (const name of themeNames) {
    await expect(group.getByRole("radio", { name })).toBeVisible();
  }
  await expect(group.getByRole("radio", { name: themeNames[0] })).toHaveAttribute("aria-checked", "true");
});

test("theme changes update the root, browser theme color and live theme event", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    (window as typeof window & { __themeChanges?: string[] }).__themeChanges = [];
    window.addEventListener("themechange", (event) => {
      const detail = (event as CustomEvent<{ theme: string }>).detail;
      (window as typeof window & { __themeChanges?: string[] }).__themeChanges?.push(detail.theme);
    });
  });

  await page.getByRole("radio", { name: themeNames[1] }).click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "lime");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#070a06");
  expect(await page.evaluate(() => (window as typeof window & { __themeChanges?: string[] }).__themeChanges)).toContain("lime");
});

test("selected theme persists after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: themeNames[2] }).click();
  await page.reload();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "ruby");
  await expect(page.getByRole("radio", { name: themeNames[2] })).toHaveAttribute("aria-checked", "true");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0a0405");
});

test("theme radios support arrow and Home/End keyboard navigation", async ({ page }) => {
  await page.goto("/");
  const ice = page.getByRole("radio", { name: themeNames[0] });
  await ice.focus();
  await page.keyboard.press("ArrowRight");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "lime");
  await expect(page.getByRole("radio", { name: themeNames[1] })).toBeFocused();
  await page.keyboard.press("End");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "ruby");
  await expect(page.getByRole("radio", { name: themeNames[2] })).toBeFocused();
  await page.keyboard.press("Home");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "ice");
  await expect(page.getByRole("radio", { name: themeNames[0] })).toBeFocused();
});

test("mobile keeps a fixed theme control and exposes a second one inside the menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("radiogroup", { name: "Color theme" })).toBeVisible();
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("navigation", { name: "Department directory" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Department directory" }).getByRole("radiogroup", { name: "Color theme" })).toBeVisible();
});

test("reduced-motion preference keeps sacred geometry static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".sacred-geometry animateMotion")).toHaveCount(0);
});

const departmentRoutes = [
  "/simulator",
  "/club",
  "/audit",
  "/daily-office",
  "/archives",
  "/roadmap-generator",
  "/whitepaper-factory",
  "/utility-inspector",
  "/museum",
  "/cope-index",
  "/airdrop-office",
  "/bridge-incident-office",
  "/governance-office",
];

for (const route of departmentRoutes) {
  for (const theme of ["ice", "lime", "ruby"] as const) {
    test(`${route} has no axe violations in the ${theme} theme`, async ({ page }) => {
      await page.goto(route);
      if (theme !== "ice") {
        const label = theme === "lime" ? themeNames[1] : themeNames[2];
        await page.getByRole("radio", { name: label }).click();
      }

      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();

      expect(
        scan.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          help: violation.help,
          targets: violation.nodes.map((node) => node.target),
        })),
      ).toEqual([]);
    });
  }
}
