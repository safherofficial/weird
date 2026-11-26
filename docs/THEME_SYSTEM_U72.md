# U72 — Department Theme System

## Scope

The interface now has three switchable palettes while retaining its existing layout, copy, navigation, routes, interactions and Department identity. The original Terminal Green palette remains the default. Amber Protocol and Cold Signal are alternate color systems, not visual redesigns.

## Palettes

| Theme | Canvas | Panel | Primary accent |
| --- | --- | --- | --- |
| Terminal Green | `#090b09` | `#111511` | `#b6ff65` |
| Amber Protocol | `#0d0a07` | `#17120c` | `#ffc36b` |
| Cold Signal | `#080c12` | `#101824` | `#78d8f2` |

The theme tokens are shared through CSS custom properties. Existing per-division accent colors remain independent, so the division identity system is not flattened into one global accent.

## Preference and loading

- The preference is stored only in this browser under `dyor-department-theme-v1`.
- The allow-list is `terminal`, `amber`, and `signal`; invalid values fall back to Terminal Green.
- `public/theme-init.js` applies a saved preference before hydration to avoid a visible palette flash.
- No account, database, analytics, server write, or external request is added.
- When browser storage is blocked, the current-session selector still changes the active palette.

## Accessibility

- The selector uses native `details` / `summary` semantics and real buttons with `aria-pressed` state.
- Keyboard users can open the selector, choose a palette and dismiss it with Escape.
- Focus indication and reduced-motion behavior use the shared accessibility tokens.
- Primary text, secondary text and accent colors are checked against each canvas at WCAG AA contrast (4.5:1 or higher).
- Browser tests scan the homepage in each theme with axe-core.

## Validation

The U72 branch adds quality tests for the palette contract, token usage, local preference behavior and contrast, plus cross-browser Playwright coverage for switching, persistence, mobile layout and accessibility. Existing page structure and division-specific palette choices remain intact.
