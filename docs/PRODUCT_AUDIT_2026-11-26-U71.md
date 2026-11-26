# U71 Runtime, Accessibility and Cross-browser Validation — 26 November 2026

## Scope

This report records the final validation of the U71 refinement branch after resolving the homepage/token inconsistencies and completing the proposed quality checks.

The branch preserves the existing Department visual language and routes. The homepage remains shorter and more focused; the 99% Club token is confirmed but its ticker, network and contract details remain undisclosed.

During the browser run, two omissions were caught and corrected before the final pass:

- The Playwright homepage assertion still expected the old token wording and matched a hidden mobile-navigation copy. It now checks the visible homepage token notice and its actual confirmed-but-unannounced explanation.
- The homepage recovery had omitted the existing optional Department Passport entry bar. It has been restored between the office directory and manifesto.

The Space Grotesk variable-font weight declaration was also corrected to a supported `next/font` value.

## Automated checks

All checks below were run against the current U71 branch:

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run test:quality` | PASS — 179 passed, 0 failed |
| `npm run build` | PASS — 77/77 static pages generated |
| Playwright browser matrix | PASS — 96/96 across Chromium, Firefox and WebKit |
| Axe scans | PASS — zero automated violations in the tested routes and expanded interface states |
| `git diff --check` | PASS |

The browser suite was run with one worker and a 90-second per-test timeout to keep the resource-constrained sandbox stable. Each of the three browser projects completed all 32 tests.

Automated axe results do not replace a manual screen-reader review or establish full WCAG conformance.

## Lighthouse lab results

Lighthouse 13.6.0 was run against the optimized local Next.js production build, using the Playwright Chrome for Testing executable (159.0.8154.6). Desktop used the desktop preset; mobile used Lighthouse mobile form-factor simulation.

| Profile | Performance | Accessibility | Best Practices | SEO | LCP | CLS | FCP | TBT | Speed Index |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage / desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 | 0.4 s | 0 ms | 0.5 s |
| Homepage / mobile | 99 | 100 | 100 | 100 | 1.4 s | 0 | 1.4 s | 130 ms | 1.4 s |

These are single-run lab observations and can vary by machine, browser and run. They are not field Core Web Vitals. No real-user INP, LCP or CLS collection has been enabled or claimed.

The U68 provisional lab guardrails remain met: mobile Performance at least 90, Accessibility/Best Practices/SEO at least 95, LCP below 2.5 seconds and CLS below 0.10. The measurements do not justify a broad performance refactor.

## Remaining roadmap work

The next separate visual task is the three-theme selector. It should be treated as a controlled palette exercise, not another full redesign:

- Preserve current layout, copy, navigation and information hierarchy.
- Implement three themes through design tokens/CSS variables rather than route-specific restyling.
- Review screenshots at desktop and mobile sizes before merging.
- Re-run contrast, reduced-motion and browser checks after implementation.

No theme redesign or selector is included in this U71 branch. The previous rejected redesign is not being reintroduced.
