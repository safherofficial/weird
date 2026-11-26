import { expect, test } from "@playwright/test";

test("editorial staff appears in the page margin and stays non-interactive", async ({ page }) => {
  await page.setViewportSize({ width: 1365, height: 900 });
  await page.goto("/");

  const staffLayer = page.locator(".office-staff");
  await expect(staffLayer).toHaveAttribute("aria-hidden", "true");
  const visibleWorker = page.locator('.office-staff__worker[data-visible="true"]').first();
  await expect(visibleWorker).toBeVisible();

  const placement = await visibleWorker.evaluate((element) => {
    const worker = element.getBoundingClientRect();
    const layer = element.parentElement;
    return {
      left: worker.left,
      pointerEvents: layer ? getComputedStyle(layer).pointerEvents : "auto",
    };
  });

  expect(placement.left).toBeLessThan(40);
  expect(placement.pointerEvents).toBe("none");

  await page.getByRole("link", { name: /ENTER FOMO CONTROL/i }).click();
  await expect(page).toHaveURL(/\/audit$/);
  await expect(page.locator('.office-staff__worker[data-visible="true"]').first()).toBeVisible();
});

test("editorial staff stays out of the way on narrow screens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".office-staff")).toHaveCSS("display", "none");
  await expect(page.locator(".office-staff__worker")).toHaveCount(2);
});
