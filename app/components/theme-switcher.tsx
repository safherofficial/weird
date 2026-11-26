"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  DEPARTMENT_THEMES,
  getDepartmentTheme,
  isDepartmentTheme,
  THEME_STORAGE_KEY,
  type DepartmentTheme,
} from "../theme-config";

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<DepartmentTheme>("terminal");
  const [announcement, setAnnouncement] = useState("");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const rootTheme = document.documentElement.dataset.theme;
    let storedTheme: string | null = null;
    try {
      storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // The visual choice still works when browser storage is unavailable.
    }
    const initialTheme = isDepartmentTheme(storedTheme)
      ? storedTheme
      : isDepartmentTheme(rootTheme)
        ? rootTheme
        : "terminal";

    setActiveTheme(initialTheme);
  }, []);

  function selectTheme(themeId: DepartmentTheme) {
    const theme = getDepartmentTheme(themeId);

    document.documentElement.dataset.theme = theme.id;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme.id);
    } catch {
      // Keep the current-session theme even if persistence is blocked.
    }

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    themeColor?.setAttribute("content", theme.chrome);

    setActiveTheme(theme.id);
    setAnnouncement(theme.label + " theme activated.");
    if (detailsRef.current) {
      detailsRef.current.open = false;
      detailsRef.current.querySelector("summary")?.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape" || !detailsRef.current?.open) return;
    event.preventDefault();
    detailsRef.current.open = false;
    detailsRef.current.querySelector("summary")?.focus();
  }

  const currentTheme = getDepartmentTheme(activeTheme);

  return (
    <div className="theme-switcher">
      <details
          ref={detailsRef}
          onKeyDown={handleKeyDown}
        >
        <summary
          className="theme-switcher__trigger"
          title={"Color theme: " + currentTheme.label}
        >
          <span
            className="theme-switcher__swatch"
            style={{ "--theme-swatch": currentTheme.swatch } as CSSProperties}
            aria-hidden="true"
          />
          <span className="theme-switcher__label">THEME</span>
          <span className="theme-switcher__current">{currentTheme.shortLabel}</span>
          <span className="theme-switcher__sr-only">Color theme: {currentTheme.label}</span>
          <span className="theme-switcher__chevron" aria-hidden="true">⌄</span>
        </summary>

        <div className="theme-switcher__menu" role="group" aria-label="Choose a color theme">
          <p className="theme-switcher__menu-title">INTERFACE PALETTE</p>
          {DEPARTMENT_THEMES.map((theme) => (
            <button
              className="theme-switcher__option"
              type="button"
              key={theme.id}
              aria-pressed={activeTheme === theme.id}
              onClick={() => selectTheme(theme.id)}
            >
              <span
                className="theme-switcher__option-swatch"
                style={{ "--theme-swatch": theme.swatch } as CSSProperties}
                aria-hidden="true"
              />
              <span className="theme-switcher__option-copy">
                <span className="theme-switcher__option-name">{theme.label}</span>
                <span className="theme-switcher__option-description">{theme.description}</span>
              </span>
              <span className="theme-switcher__check" aria-hidden="true">
                {activeTheme === theme.id ? "✓" : ""}
              </span>
            </button>
          ))}
          <p className="theme-switcher__menu-footnote">SAVED ON THIS DEVICE ONLY</p>
        </div>
        </details>
      <span className="theme-switcher__announcement" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
