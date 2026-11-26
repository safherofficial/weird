"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

type Theme = "ice" | "lime" | "ruby";

const THEMES: ReadonlyArray<{ id: Theme; label: string }> = [
  { id: "ice", label: "Ice blue theme" },
  { id: "lime", label: "Acid lime theme" },
  { id: "ruby", label: "Ruby red theme" },
];

function readTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === "lime" || value === "ruby" ? value : "ice";
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

function applyTheme(theme: Theme) {
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
  const [theme, setTheme] = useState<Theme>("ice");
  const [ready, setReady] = useState(false);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    setTheme(readTheme());
    setReady(true);
    syncThemeColor();
    const handleThemeChange = () => setTheme(readTheme());
    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, []);

  const chooseTheme = useCallback((next: Theme, focus = false) => {
    applyTheme(next);
    setTheme(next);
    if (focus) {
      const index = THEMES.findIndex((item) => item.id === next);
      refs.current[index]?.focus();
    }
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = THEMES.findIndex((item) => item.id === theme);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % THEMES.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + THEMES.length) % THEMES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = THEMES.length - 1;
    else return;
    event.preventDefault();
    chooseTheme(THEMES[nextIndex].id, true);
  }

  return (
    <div className={`theme-switch theme-switch--${placement}`} data-ready={ready}>
      <span className="theme-switch__label">THEME</span>
      <div className="theme-switch__group" role="radiogroup" aria-label="Color theme" onKeyDown={handleKeyDown}>
        {THEMES.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => { refs.current[index] = node; }}
            className={`theme-switch__swatch theme-switch__swatch--${item.id}${theme === item.id ? " is-active" : ""}`}
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
