import { expect, test, type Page } from "@playwright/test";

async function readCursorTheme(page: Page) {
  return page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return {
      accent: (() => {
        const probe = document.createElement("span");
        probe.style.color = "var(--department-cursor-accent)";
        document.body.append(probe);
        const value = getComputedStyle(probe).color;
        probe.remove();
        return value;
      })(),
      arrow: style.getPropertyValue("--department-cursor-arrow").trim(),
      hand: style.getPropertyValue("--department-cursor-hand").trim(),
      pointer: getComputedStyle(document.querySelector(".theme-switcher__trigger")!).cursor,
      input: (() => {
        const field = document.createElement("input");
        field.type = "text";
        document.body.append(field);
        const value = getComputedStyle(field).cursor;
        field.remove();
        return value;
      })(),
    };
  });
}

test("the natural arrow and hand stay instant and inherit the active theme", async ({ page }) => {
  await page.goto("/");
  const initial = await readCursorTheme(page);
  expect(initial.accent).toBe("rgb(182, 255, 101)");
  expect(initial.arrow).toContain("data:image/png;base64");
  expect(initial.hand).toContain("data:image/png;base64");
  expect(initial.pointer).toContain("data:image/png;base64");
  expect(initial.arrow).not.toContain("data:image/svg+xml");
  expect(initial.input).toBe("text");
  await expect(page.locator(".laser-cursor")).toHaveCount(0);

  await page.locator(".theme-switcher__trigger").click();
  await page.getByRole("group", { name: "Choose a color theme" })
    .getByRole("button", { name: /Amber Protocol/ }).click();

  const amber = await readCursorTheme(page);
  expect(amber.accent).toBe("rgb(255, 195, 107)");
  expect(amber.arrow).not.toBe(initial.arrow);
  expect(amber.hand).not.toBe(initial.hand);
  expect(amber.pointer).toContain("data:image/png;base64");

  await page.locator(".theme-switcher__trigger").click();
  await page.getByRole("group", { name: "Choose a color theme" })
    .getByRole("button", { name: /Cold Signal/ }).click();

  const signal = await readCursorTheme(page);
  expect(signal.accent).toBe("rgb(120, 216, 242)");
  expect(signal.arrow).not.toBe(amber.arrow);
  expect(signal.hand).not.toBe(amber.hand);
  expect(signal.pointer).toContain("data:image/png;base64");
});
