export function getDepartmentCaseThemeAnchor(theme: string): string {
  return theme.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
