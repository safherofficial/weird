export const THEME_STORAGE_KEY = "dyor-department-theme-v1";

export const DEPARTMENT_THEMES = [
  {
    id: "terminal",
    label: "Terminal Green",
    shortLabel: "GREEN",
    description: "The original Department palette.",
    swatch: "#b6ff65",
    chrome: "#090b09",
    background: "#090b09",
    panel: "#111511",
    raised: "#151b15",
    border: "#30382f",
    borderSubtle: "#202720",
    text: "#f0f0e9",
    muted: "#a4ada0",
    tertiary: "#9aa596",
    disabled: "#849080",
    accent: "#b6ff65",
    accentRgb: "182, 255, 101",
  },
  {
    id: "amber",
    label: "Amber Protocol",
    shortLabel: "AMBER",
    description: "Warm signal, same dark interface.",
    swatch: "#ffc36b",
    chrome: "#0d0a07",
    background: "#0d0a07",
    panel: "#17120c",
    raised: "#21190f",
    border: "#4b3923",
    borderSubtle: "#302414",
    text: "#f4efe7",
    muted: "#c0ad91",
    tertiary: "#b7a58b",
    disabled: "#9e8d73",
    accent: "#ffc36b",
    accentRgb: "255, 195, 107",
  },
  {
    id: "signal",
    label: "Cold Signal",
    shortLabel: "CYAN",
    description: "Cool blue signal over deep ink.",
    swatch: "#78d8f2",
    chrome: "#080c12",
    background: "#080c12",
    panel: "#101824",
    raised: "#162231",
    border: "#33475b",
    borderSubtle: "#233344",
    text: "#eef5fb",
    muted: "#afc2d0",
    tertiary: "#a2b6c7",
    disabled: "#879aaa",
    accent: "#78d8f2",
    accentRgb: "120, 216, 242",
  },
] as const;

export type DepartmentTheme = (typeof DEPARTMENT_THEMES)[number]["id"];

export function isDepartmentTheme(value: string | null | undefined): value is DepartmentTheme {
  return DEPARTMENT_THEMES.some((theme) => theme.id === value);
}

export function getDepartmentTheme(value: string | null | undefined) {
  return DEPARTMENT_THEMES.find((theme) => theme.id === value) ?? DEPARTMENT_THEMES[0];
}
