import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { DEPARTMENT_THEMES, THEME_STORAGE_KEY } from "../app/theme-config";

const appRoot = join(process.cwd(), "app");
const themeCss = readFileSync(join(appRoot, "theme-system.css"), "utf8");
const switcher = readFileSync(join(appRoot, "components", "theme-switcher.tsx"), "utf8");
const initializer = readFileSync(join(process.cwd(), "public", "theme-init.js"), "utf8");
const layout = readFileSync(join(appRoot, "layout.tsx"), "utf8");

function channel(hex: string, offset: number) {
  return Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
}

function luminance(hex: string) {
  const linear = (value: number) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  const red = linear(channel(hex, 1));
  const green = linear(channel(hex, 3));
  const blue = linear(channel(hex, 5));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(first: string, second: string) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("the Department exposes exactly three named, unique color themes", () => {
  assert.deepEqual(DEPARTMENT_THEMES.map((theme) => theme.id), ["terminal", "amber", "signal"]);
  assert.equal(new Set(DEPARTMENT_THEMES.map((theme) => theme.label)).size, 3);
  assert.equal(DEPARTMENT_THEMES[0].label, "Terminal Green");
});

test("all theme text and primary accents meet WCAG AA contrast against the canvas", () => {
  for (const theme of DEPARTMENT_THEMES) {
    assert.ok(
      contrastRatio(theme.text, theme.background) >= 4.5,
      theme.id + " primary text must meet 4.5:1 contrast",
    );
    assert.ok(
      contrastRatio(theme.muted, theme.background) >= 4.5,
      theme.id + " secondary text must meet 4.5:1 contrast",
    );
    assert.ok(
      contrastRatio(theme.accent, theme.background) >= 4.5,
      theme.id + " accent must meet 4.5:1 contrast",
    );
  }
});

test("alternate palettes override the shared design tokens, not page-specific accents", () => {
  for (const theme of DEPARTMENT_THEMES.slice(1)) {
    const block = themeCss.match(new RegExp('html\\[data-theme="' + theme.id + '"\\]\\s*\\{([^}]+)\\}'));
    assert.ok(block, theme.id + " palette selector must exist");
    assert.match(block[1], new RegExp("--bg:\\s*" + theme.background.replace("#", "\\#")));
    assert.match(block[1], new RegExp("--panel:\\s*" + theme.panel.replace("#", "\\#")));
    assert.match(block[1], new RegExp("--green:\\s*" + theme.accent.replace("#", "\\#")));
  }
  assert.match(themeCss, /Per-division accents remain independent by design/);
});

test("the switcher is keyboard-operable and persists only an allow-listed theme", () => {
  assert.match(switcher, /aria-pressed=\{activeTheme === theme\.id\}/);
  assert.match(switcher, /event\.key !== "Escape"/);
  assert.match(switcher, /window\.localStorage\.setItem\(THEME_STORAGE_KEY, theme\.id\)/);
  assert.equal(THEME_STORAGE_KEY, "dyor-department-theme-v1");
  assert.match(initializer, /allowedThemes = \["terminal", "amber", "signal"\]/);
  assert.match(initializer, /localStorage/);
  assert.match(layout, /<Script src="\/theme-init\.js" strategy="beforeInteractive" \/>/);
  assert.match(layout, /data-theme="terminal"/);
  assert.match(layout, /suppressHydrationWarning/);
});

test("the active brand accent is tokenized across the app stylesheets", () => {
  const styles: string[] = [];
  function collect(directory: string) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) collect(path);
      else if (entry.name.endsWith(".css") && path !== join(appRoot, "theme-system.css")) {
        styles.push(readFileSync(path, "utf8"));
      }
    }
  }
  collect(appRoot);
  assert.ok(styles.length > 0);
  assert.equal(styles.some((css) => {
    const withoutCanonicalBrandToken = css.replace(/--green\s*:\s*#b6ff65\s*;/gi, "");
    return withoutCanonicalBrandToken.includes("#b6ff65") || withoutCanonicalBrandToken.includes("rgb(182 255 101");
  }), false);
});
