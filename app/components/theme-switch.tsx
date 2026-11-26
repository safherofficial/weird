"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

type ThemeOption = {
  id: string;
  label: string;
  swatch: string;
};

const FALLBACK_THEMES: ThemeOption[] = [
  { id: "ice", label: "Ice blue theme", swatch: "var(--primary)" },
  { id: "lime", label: "Acid lime theme", swatch: "var(--primary)" },
  { id: "ruby", label: "Ruby red theme", swatch: "var(--primary)" },
];

let cachedThemes: ThemeOption[] | null = null;

function readThemeSwatch(id: string): string {
  const root = document.documentElement;
  const previous = root.dataset.theme || "ice";
  root.dataset.theme = id;
  const swatch = getComputedStyle(root).getPropertyValue("--primary").trim();
  root.dataset.theme = previous;
  return swatch || "var(--primary)";
}

function getAvailableThemes(): ThemeOption[] {
  if (cachedThemes) return cachedThemes;

  const discovered: ThemeOption[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        if (!(rule instanceof CSSStyleRule)) continue;
        const match = rule.selectorText.match(/^html\[data-theme=(?:"([^"]+)"|'([^']+)'|([^\]]+))\]$/);
        if (!match) continue;

        const id = (match[1] ?? match[2] ?? match[3] ?? "").trim();
        const swatch = rule.style.getPropertyValue("--primary").trim();
        if (!id || !/^[a-z][a-z0-9-]{0,31}$/i.test(id) || !swatch) continue;
        if (discovered.some((item) => item.id === id)) continue;

        const label = rule.style.getPropertyValue("--theme-label")
          .trim()
          .replace(/^["']|["']$/g, "") || `${id.replace(/-/g, " ")} theme`;
        discovered.push({ id, label, swatch });
      }
    } catch {
      // Cross-origin stylesheets are not readable. The local theme sheet remains discoverable.
    }
  }

  const merged = FALLBACK_THEMES.map((item) => ({ ...item, swatch: readThemeSwatch(item.id) }));
  for (const item of discovered) {
    const existingIndex = merged.findIndex((fallback) => fallback.id === item.id);
    if (existingIndex >= 0) merged[existingIndex] = item;
    else merged.push(item);
  }

  cachedThemes = merged;
  return cachedThemes;
}

function readTheme(themes: ThemeOption[]): string {
  const active = document.documentElement.dataset.theme;
  return themes.some((item) => item.id === active) ? active! : (themes[0]?.id ?? "ice");
}

function syncThemeColor() {
  const background = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  if (background) meta.content = background;
}

function applyTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem("dyor-theme", theme);
  } catch {
    // Theme changes remain available for the current session without storage.
  }
  syncThemeColor();
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

type ThemeSwitchProps = {
  placement?: "header" | "menu" | "fixed";
};

export default function ThemeSwitch({ placement = "header" }: ThemeSwitchProps) {
  const [themes, setThemes] = useState<ThemeOption[]>(FALLBACK_THEMES);
  const [theme, setTheme] = useState<string>("ice");
  const [ready, setReady] = useState(false);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const available = getAvailableThemes();
    const active = readTheme(available);
    setThemes(available);
    setTheme(active);
    if (document.documentElement.dataset.theme !== active) {
      document.documentElement.dataset.theme = active;
    }
    setReady(true);
    syncThemeColor();

    const handleThemeChange = () => setTheme(readTheme(available));
    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  const chooseTheme = useCallback((next: string, focus = false) => {
    applyTheme(next);
    setTheme(next);
    if (focus) {
      const index = themes.findIndex((item) => item.id === next);
      refs.current[index]?.focus();
    }
  }, [themes]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (themes.length === 0) return;
    const activeIndex = themes.findIndex((item) => item.id === theme);
    const currentIndex = activeIndex < 0 ? 0 : activeIndex;
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % themes.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + themes.length) % themes.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = themes.length - 1;
    else return;

    event.preventDefault();
    chooseTheme(themes[nextIndex].id, true);
  }

  return (
    <div className={`theme-switch theme-switch--${placement}`} data-ready={ready}>
      <span className="theme-switch__label">THEME</span>
      <div className="theme-switch__group" role="radiogroup" aria-label="Color theme" onKeyDown={handleKeyDown}>
        {themes.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => { refs.current[index] = node; }}
            className={`theme-switch__swatch${theme === item.id ? " is-active" : ""}`}
            style={{ "--swatch-color": item.swatch } as CSSProperties}
            type="button"
            role="radio"
            aria-label={item.label}
            aria-checked={theme === item.id}
            tabIndex={theme === item.id ? 0 : -1}
            onClick={() => chooseTheme(item.id)}
          >
            <span className="theme-switch__swatch-core" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
