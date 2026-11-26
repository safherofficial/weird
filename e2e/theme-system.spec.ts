import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const storageKey = "dyor-department-theme-v1";

test("the three themes switch accessibly, persist, and preserve header geometry", async ({ page }) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  const trigger = page.locator(".theme-switcher__trigger");
  await expect(header).toBeVisible();
  await expect(trigger).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "terminal");

  const originalHeader = await header.boundingBox();
  expect(originalHeader).not.toBeNull();

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".theme-switcher details")).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(page.locator(".theme-switcher details")).not.toHaveAttribute("open", "");
  await expect(trigger).toBeFocused();

  await trigger.click();
  const themeGroup = page.getByRole("group", { name: "Choose a color theme" });
  await expect(themeGroup.getByRole("button", { name: /Terminal Green/ })).toBeVisible();
  await expect(themeGroup.getByRole("button", { name: /Amber Protocol/ })).toBeVisible();
  await expect(themeGroup.getByRole("button", { name: /Cold Signal/ })).toBeVisible();

  await themeGroup.getByRole("button", { name: /Amber Protocol/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "amber");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0d0a07");
  await expect(page.locator(".theme-switcher__current")).toHaveText("AMBER");
  await expect(page.locator(".theme-switcher__sr-only")).toHaveText("Color theme: Amber Protocol");
  await expect(page.locator(".theme-switcher details")).not.toHaveAttribute("open", "");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "amber");

  await page.locator(".theme-switcher__trigger").click();
  await page.getByRole("group", { name: "Choose a color theme" })
    .getByRole("button", { name: /Cold Signal/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "signal");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "signal");

  await page.locator(".theme-switcher__trigger").click();
  await page.getByRole("group", { name: "Choose a color theme" })
    .getByRole("button", { name: /Terminal Green/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "terminal");

  const finalHeader = await header.boundingBox();
  expect(finalHeader).not.toBeNull();
  expect(Math.abs((finalHeader?.height ?? 0) - (originalHeader?.height ?? 0))).toBeLessThanOrEqual(1);
  await page.evaluate((key) => window.localStorage.removeItem(key), storageKey);
});

test("the theme selector stays usable on a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  const trigger = page.locator(".theme-switcher__trigger");
  await expect(trigger).toBeVisible();
  const box = await trigger.boundingBox();
  expect(box).not.toBeNull();
  expect(box?.width).toBeLessThanOrEqual(48);
  expect((await page.locator("body").evaluate((element) => element.scrollWidth)))
    .toBeLessThanOrEqual(375);

  await trigger.click();
  await expect(page.getByRole("group", { name: "Choose a color theme" })).toBeVisible();
  await page.getByRole("group", { name: "Choose a color theme" })
    .getByRole("button", { name: /Amber Protocol/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "amber");
});



test("each selectable theme passes an automated WCAG 2.1 AA scan on HQ", async ({ page }) => {
  await page.goto("/");
  const themes = [
    { label: /Terminal Green/, id: "terminal", background: "rgb(9, 11, 9)" },
    { label: /Amber Protocol/, id: "amber", background: "rgb(13, 10, 7)" },
    { label: /Cold Signal/, id: "signal", background: "rgb(8, 12, 18)" },
  ];

  for (const theme of themes) {
    await page.locator(".theme-switcher__trigger").click();
    await page.getByRole("group", { name: "Choose a color theme" })
      .getByRole("button", { name: theme.label }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme.id);
    await expect(page.locator("body")).toHaveCSS("background-color", theme.background);

    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();
    expect(scan.violations.map((violation) => violation.id)).toEqual([]);
  }
});
