import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

function relativeLuminance(hex: string) {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground: string, background: string) {
  const values = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

function ruleColor(styles: string, selector: string) {
  const rules = [...styles.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const rule = rules.find((match) => match[1].replace(/\/\*[\s\S]*?\*\//g, "").split(",").some((entry) => entry.trim() === selector));
  const match = rule?.[2].match(/color:\s*(#[0-9a-fA-F]{6})\s*;/);
  assert.ok(match, "Expected an explicit color declaration for " + selector);
  return match[1];
}

test("R2 archived daily dispatches expose a valid heading outline without changing the live desk hierarchy", () => {
  const dailyClient = readFileSync("app/daily-office/daily-client.tsx", "utf8");
  const archivePage = readFileSync("app/daily-office/archive/[date]/page.tsx", "utf8");
  const dailyPage = readFileSync("app/daily-office/page.tsx", "utf8");
  const styles = readFileSync("app/accessibility-refinements.css", "utf8");

  assert.ok(dailyClient.includes('headlineLevel?: "h1" | "h2"'));
  assert.ok(dailyClient.includes('const SupportingHeadingTag = headlineLevel === "h1" ? "h2" : "h3"'));
  assert.ok(dailyClient.includes("<HeadlineTag>{dispatch.headline}</HeadlineTag>"));
  assert.ok(dailyClient.includes('<SupportingHeadingTag id="daily-office-index-title">'));
  assert.ok(archivePage.includes('headlineLevel="h1"'));
  assert.ok(!dailyPage.includes("headlineLevel="));
  assert.ok(styles.includes(".daily-office-headline h1"));
  assert.ok(styles.includes(".daily-office-index__header h2"));
  assert.ok(styles.includes(".daily-office-section h2"));
});

test("R2 homepage membership card is grouped content, not a nested complementary landmark", () => {
  const home = readFileSync("app/page.tsx", "utf8");
  const clubCampaign = readFileSync("app/club/club-campaign-engine-desk.tsx", "utf8");
  assert.ok(home.includes('<div className="hq-club__membership" role="group" aria-label="The 99% Club identity">'));
  assert.ok(!home.includes('<aside className="hq-club__membership"'));
  assert.ok(clubCampaign.includes('<div className="club-campaign-engine__next" role="group" aria-label="Next week campaign preview">'));
  assert.ok(!clubCampaign.includes('<aside className="club-campaign-engine__next">'));
  const accessibilityStyles = readFileSync("app/accessibility-refinements.css", "utf8");
  assert.ok(accessibilityStyles.includes(".department-case-chain__handoff a"));
  assert.ok(accessibilityStyles.includes("min-height: 26px"));
  assert.ok(accessibilityStyles.includes("padding-block: 7px"));
});

test("R2 audited small-text colors meet WCAG AA normal-text contrast on their rendered surfaces", () => {
  const styles = readFileSync("app/accessibility-refinements.css", "utf8");
  const checks: Array<[string, string]> = [
    [".hq-status-card__index", "#0d110d"],
    [".hq-status-card__foot", "#0d110d"],
    [".utility-briefing__facts span", "#101510"],
    [".roadmap-briefing__facts span", "#101510"],
    [".whitepaper-briefing__facts span", "#101510"],
    [".club-briefing__facts span", "#101510"],
    [".result-metrics i", "#101510"],
    [".utility-metrics i", "#101510"],
    [".roadmap-metrics i", "#101510"],
    [".club-metrics i", "#101510"],
    [".museum-exhibit__facts span", "#101510"],
    [".cope-dimension__top strong small", "#0d130d"],
    [".utility-history__heading span:last-child", "#0c100c"],
    [".whitepaper-cover__scores strong small", "#121713"],
    [".whitepaper-allocation__heading small", "#0c110c"],
  ];

  for (const [selector, background] of checks) {
    const foreground = ruleColor(styles, selector);
    assert.ok(
      contrastRatio(foreground, background) >= 4.5,
      selector + " has contrast " + contrastRatio(foreground, background).toFixed(2) + ":1",
    );
  }
});
