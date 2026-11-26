import { expect, test, type Page } from "@playwright/test";

async function completeBridgeInterview(page: Page) {
  await page.goto("/bridge-incident-office");
  await page.getByRole("button", { name: /OPEN INCIDENT INTERVIEW/i }).click();

  for (let question = 0; question < 7; question += 1) {
    const firstAnswer = page.locator("main .utility-answer").first();
    await expect(firstAnswer).toBeVisible();
    await firstAnswer.click();
  }

  await expect(page.getByText("INCIDENT INTERVIEW COMPLETE / 07 OF 07", { exact: true })).toBeVisible();
}

test("headquarters renders its primary heading and public department route", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /ENTER FOMO CONTROL/i })).toHaveAttribute(
    "href",
    "/audit",
  );
  await expect(page.getByRole("link", { name: /ENTER THE 99% CLUB/i })).toHaveAttribute(
    "href",
    "/club",
  );

  const featuredRoutes = await page.locator("#featured-desks .hq-department").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  );
  expect(featuredRoutes).toEqual(["/simulator", "/club", "/audit"]);
  await expect(page.locator("#departments .hq-department")).toHaveCount(10);
  await expect(page.locator(".hq-status-card__foot")).toHaveCount(0);
  await expect(page.locator(".hq-status__disclaimer")).toBeVisible();
});

test("mobile navigation opens, closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const openButton = page.getByRole("button", { name: "Open navigation menu" });
  const closeButton = page.getByRole("button", { name: "Close navigation menu" });
  const mobileNavigation = page.getByRole("navigation", { name: "Department directory" });

  await expect(openButton).toHaveAttribute("aria-expanded", "false");
  await openButton.click();
  await expect(closeButton).toHaveAttribute("aria-expanded", "true");
  await expect(mobileNavigation).toBeVisible();
  await expect(mobileNavigation.getByRole("link").first()).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(page.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(mobileNavigation).toBeHidden();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
});

for (const width of [390, 768, 1365]) {
  test(`headquarters has no horizontal page overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));

    expect(
      dimensions.content,
      `Document width ${dimensions.content}px exceeds viewport ${dimensions.viewport}px`,
    ).toBeLessThanOrEqual(dimensions.viewport + 1);
  });
}

test("Bridge Incident interview produces a stable public case URL", async ({ page }) => {
  await completeBridgeInterview(page);

  const caseLink = page.getByRole("link", { name: /OPEN PUBLIC CASE FILE/i });
  const casePath = await caseLink.getAttribute("href");

  expect(casePath).toMatch(/^\/bridge-incident-office\/case\/b1-/);

  const challengeLink = page.getByRole("link", { name: /CHALLENGE ANOTHER TRAVELLER/i });
  await expect(challengeLink).toHaveAttribute("href", /\/bridge-incident-office\?challenge=/);

  const response = await page.goto(casePath!);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("BRIDGE");
  await expect(page.getByText(/7 ANSWERS RECORDED/i)).toBeVisible();
});

test("Governance interview completes and exposes a public case URL", async ({ page }) => {
  await page.goto("/governance-office");
  await page.getByRole("button", { name: /OPEN GOVERNANCE INTERVIEW/i }).click();

  for (let question = 0; question < 7; question += 1) {
    const firstAnswer = page.locator("main .utility-answer").first();
    await expect(firstAnswer).toBeVisible();
    await firstAnswer.click();
  }

  await expect(page.getByText("GOVERNANCE INTERVIEW COMPLETE / 07 OF 07", { exact: true })).toBeVisible();

  const caseLink = page.getByRole("link", { name: /OPEN PUBLIC CASE FILE/i });
  const casePath = await caseLink.getAttribute("href");

  expect(casePath).toMatch(/^\/governance-office\/case\/g1-/);
  const response = await page.goto(casePath!);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/QUORUM/);
});

for (const route of ["/bridge-incident-office", "/governance-office", "/club", "/archives"]) {
  test(`${route} has no horizontal overflow on a 390px mobile viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));

    expect(
      dimensions.content,
      `${route} content width ${dimensions.content}px exceeds viewport ${dimensions.viewport}px`,
    ).toBeLessThanOrEqual(dimensions.viewport + 1);
  });
}

test("local Passport stays off until opted in and deletion clears its browser record", async ({ page }) => {
  await page.goto("/passport");

  const readLocalPassport = () => page.evaluate(() => localStorage.getItem("dyor-department:passport:v1"));

  expect(await readLocalPassport()).toBeNull();
  await expect(page.getByRole("button", { name: /ENABLE MY LOCAL PASSPORT/i })).toBeVisible();

  await page.getByRole("button", { name: /ENABLE MY LOCAL PASSPORT/i }).click();
  await expect(page.getByText(/ENABLED ON THIS DEVICE/i)).toBeVisible();

  const enabledRecord = await readLocalPassport();
  expect(enabledRecord).not.toBeNull();
  expect(JSON.parse(enabledRecord ?? "null")).toMatchObject({ enabled: true, visitedDepartments: [], completedActivities: [] });

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /DISABLE & DELETE LOCAL PASSPORT/i }).click();

  await expect(page.getByRole("button", { name: /ENABLE MY LOCAL PASSPORT/i })).toBeVisible();
  expect(await readLocalPassport()).toBeNull();
});


test("simulator completion respects Passport opt-in and unlocks its local badges", async ({ page }) => {
  const passportKey = "dyor-department:passport:v1";
  const readLocalPassport = () =>
    page.evaluate((key) => localStorage.getItem(key), passportKey);

  async function finishSimulation() {
    await page.getByRole("button", { name: /OPEN SIMULATION/i }).click();

    const firstDecision = page.locator(".simulator-choice__button").first();
    for (let round = 0; round < 7; round += 1) {
      await expect(firstDecision).toBeVisible();
      await firstDecision.click();
    }

    await expect(page.locator('[aria-label="Department Passport completion status"]')).toBeVisible();
  }

  await page.goto("/simulator");
  expect(await readLocalPassport()).toBeNull();

  await finishSimulation();
  await expect(page.locator('[aria-label="Department Passport completion status"]')).toHaveAttribute(
    "data-status",
    "missing",
  );
  expect(await readLocalPassport()).toBeNull();

  await page.goto("/passport");
  await page.getByRole("button", { name: /ENABLE MY LOCAL PASSPORT/i }).click();
  await expect(page.getByText(/ENABLED ON THIS DEVICE/i)).toBeVisible();

  await page.goto("/simulator");
  await finishSimulation();
  await expect(page.locator('[aria-label="Department Passport completion status"]')).toHaveAttribute(
    "data-status",
    "saved",
  );

  const savedPassport = JSON.parse((await readLocalPassport()) ?? "null");
  expect(savedPassport).toMatchObject({
    enabled: true,
    completedActivities: ["simulator"],
  });

  await page.goto("/passport");
  const paperSurvivorBadge = page
    .locator(".passport-achievement")
    .filter({ has: page.getByRole("heading", { name: "PAPER MARKET SURVIVOR" }) });
  const firstCaseBadge = page
    .locator(".passport-achievement")
    .filter({ has: page.getByRole("heading", { name: "FIRST CASE FILED" }) });

  await expect(paperSurvivorBadge).toHaveClass(/is-earned/);
  await expect(firstCaseBadge).toHaveClass(/is-earned/);
});


test("Bridge and Governance interviews record their Passport completions and badges", async ({ page }) => {
  const passportKey = "dyor-department:passport:v1";
  const readLocalPassport = () =>
    page.evaluate((key) => localStorage.getItem(key), passportKey);

  await page.goto("/passport");
  await page.getByRole("button", { name: /ENABLE MY LOCAL PASSPORT/i }).click();
  await expect(page.getByText(/ENABLED ON THIS DEVICE/i)).toBeVisible();

  await completeBridgeInterview(page);
  await expect(page.locator('[aria-label="Department Passport completion status"]')).toHaveAttribute(
    "data-status",
    "saved",
  );

  let savedPassport = JSON.parse((await readLocalPassport()) ?? "null");
  expect(savedPassport.completedActivities).toContain("bridge");

  await page.goto("/governance-office");
  await page.getByRole("button", { name: /OPEN GOVERNANCE INTERVIEW/i }).click();

  for (let question = 0; question < 7; question += 1) {
    const firstAnswer = page.locator("main .utility-answer").first();
    await expect(firstAnswer).toBeVisible();
    await firstAnswer.click();
  }

  await expect(page.getByText("GOVERNANCE INTERVIEW COMPLETE / 07 OF 07", { exact: true })).toBeVisible();
  await expect(page.locator('[aria-label="Department Passport completion status"]')).toHaveAttribute(
    "data-status",
    "saved",
  );

  savedPassport = JSON.parse((await readLocalPassport()) ?? "null");
  expect(savedPassport.completedActivities).toEqual(expect.arrayContaining(["bridge", "governance"]));

  await page.goto("/passport");
  const bridgeBadge = page
    .locator(".passport-achievement")
    .filter({ has: page.getByRole("heading", { name: "INTERCHAIN INCIDENT FILED" }) });
  const governanceBadge = page
    .locator(".passport-achievement")
    .filter({ has: page.getByRole("heading", { name: "QUORUM TRIBUNAL FILED" }) });

  await expect(bridgeBadge).toHaveClass(/is-earned/);
  await expect(governanceBadge).toHaveClass(/is-earned/);
});


test("Museum exhibits and Archive records complete the Passport culture-curator achievement", async ({ page }) => {
  const passportKey = "dyor-department:passport:v1";
  const readLocalPassport = () =>
    page.evaluate((key) => localStorage.getItem(key), passportKey);

  await page.goto("/passport");
  await page.getByRole("button", { name: /ENABLE MY LOCAL PASSPORT/i }).click();
  await expect(page.getByText(/ENABLED ON THIS DEVICE/i)).toBeVisible();

  await page.goto("/museum/exhibits/the-seventeenth-rocket");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect.poll(async () => {
    const passport = JSON.parse((await readLocalPassport()) ?? "null");
    return passport?.completedActivities ?? [];
  }).toContain("museum-exhibit");

  await page.goto("/archives/records/the-entry-was-impeccable");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect.poll(async () => {
    const passport = JSON.parse((await readLocalPassport()) ?? "null");
    return passport?.completedActivities ?? [];
  }).toEqual(expect.arrayContaining(["museum-exhibit", "archive-record"]));

  await page.goto("/passport");
  const cultureCuratorBadge = page
    .locator(".passport-achievement")
    .filter({ has: page.getByRole("heading", { name: "CULTURE CURATOR" }) });
  await expect(cultureCuratorBadge).toHaveClass(/is-earned/);
});


test("DYOR Audit and Airdrop interviews record their Passport activities and unlock badges", async ({ page }) => {
  const passportKey = "dyor-department:passport:v1";
  const readLocalPassport = () =>
    page.evaluate((key) => localStorage.getItem(key), passportKey);

  await page.goto("/passport");
  await page.getByRole("button", { name: /ENABLE MY LOCAL PASSPORT/i }).click();
  await expect(page.getByText(/ENABLED ON THIS DEVICE/i)).toBeVisible();

  await page.goto("/audit");
  const firstAuditAnswer = page.locator(".answer-option").first();
  for (let question = 0; question < 10; question += 1) {
    await expect(firstAuditAnswer).toBeVisible();
    await firstAuditAnswer.click();
  }

  await expect(page.locator('[aria-label="Department Passport completion status"]')).toHaveAttribute(
    "data-status",
    "saved",
  );

  let savedPassport = JSON.parse((await readLocalPassport()) ?? "null");
  expect(savedPassport.completedActivities).toContain("audit");

  await page.goto("/airdrop-office");
  await page.getByRole("button", { name: /OPEN ENTITLEMENT INTERVIEW/i }).click();

  const firstAirdropAnswer = page.locator("main .utility-answer").first();
  for (let question = 0; question < 7; question += 1) {
    await expect(firstAirdropAnswer).toBeVisible();
    await firstAirdropAnswer.click();
  }

  await expect(page.getByText("ENTITLEMENT INTERVIEW COMPLETE / 07 OF 07", { exact: true })).toBeVisible();
  await expect(page.locator('[aria-label="Department Passport completion status"]')).toHaveAttribute(
    "data-status",
    "saved",
  );

  savedPassport = JSON.parse((await readLocalPassport()) ?? "null");
  expect(savedPassport.completedActivities).toEqual(expect.arrayContaining(["audit", "airdrop"]));

  await page.goto("/passport");
  const auditBadge = page
    .locator(".passport-achievement")
    .filter({ has: page.getByRole("heading", { name: "FORENSIC AUDITOR" }) });
  const airdropBadge = page
    .locator(".passport-achievement")
    .filter({ has: page.getByRole("heading", { name: "SNAPSHOT TRIBUNAL FILED" }) });

  await expect(auditBadge).toHaveClass(/is-earned/);
  await expect(airdropBadge).toHaveClass(/is-earned/);
});

test("Utility inspection respects Passport opt-in and unlocks its local badge", async ({ page }) => {
  const passportKey = "dyor-department:passport:v1";
  const readLocalPassport = () =>
    page.evaluate((key) => localStorage.getItem(key), passportKey);

  async function completeInspection() {
    await page.getByRole("button", { name: /OPEN INSPECTION/i }).click();

    const firstAnswer = page.locator(".utility-answer").first();
    for (let question = 0; question < 7; question += 1) {
      await expect(firstAnswer).toBeVisible();
      await firstAnswer.click();
    }

    await expect(page.getByText("INSPECTION COMPLETE / 07 OF 07", { exact: true })).toBeVisible();
  }

  await page.goto("/utility-inspector");
  expect(await readLocalPassport()).toBeNull();

  await completeInspection();
  await expect(page.locator('[aria-label="Department Passport completion status"]')).toHaveAttribute(
    "data-status",
    "missing",
  );
  expect(await readLocalPassport()).toBeNull();

  await page.goto("/passport");
  await page.getByRole("button", { name: /ENABLE MY LOCAL PASSPORT/i }).click();
  await expect(page.getByText(/ENABLED ON THIS DEVICE/i)).toBeVisible();

  await page.goto("/utility-inspector");
  await completeInspection();
  await expect(page.locator('[aria-label="Department Passport completion status"]')).toHaveAttribute(
    "data-status",
    "saved",
  );

  const savedPassport = JSON.parse((await readLocalPassport()) ?? "null");
  expect(savedPassport).toMatchObject({
    enabled: true,
    completedActivities: ["utility"],
  });

  await page.goto("/passport");
  const utilityBadge = page
    .locator(".passport-achievement")
    .filter({ has: page.getByRole("heading", { name: "TOKEN-PURPOSE WITNESS" }) });
  await expect(utilityBadge).toHaveClass(/is-earned/);
});
