(() => {
  const storageKey = "dyor-department-theme-v1";
  const allowedThemes = ["terminal", "amber", "signal"];
  const themeChrome = {
    terminal: "#090b09",
    amber: "#0d0a07",
    signal: "#080c12",
  };

  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (allowedThemes.includes(savedTheme)) {
      document.documentElement.dataset.theme = savedTheme;
    }

    const updateThemeColor = () => {
      const theme = document.documentElement.dataset.theme || "terminal";
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", themeChrome[theme] || themeChrome.terminal);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", updateThemeColor, { once: true });
    } else {
      updateThemeColor();
    }
  } catch {
    document.documentElement.dataset.theme = "terminal";
  }
})();
