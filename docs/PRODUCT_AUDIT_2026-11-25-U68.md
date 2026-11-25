# U68 Browser, Accessibility and Performance Follow-up — 25 November 2026

## Scope and baseline

This follow-up extends the source-level U67 audit at main commit `48009cd38ae5dc8c64efedaf1ff2c06e48b5a7b6`. It adds browser-level validation and corrects accessibility issues found in the rendered interface. No editorial copy, scoring logic, data source, wallet integration, token functionality, or visitor-data collection was changed.

The browser checks were run against an optimized local Next.js production build. They are lab results, not field Core Web Vitals and not a measurement of the currently deployed U67 release.

## Rendered accessibility findings and corrections

The initial Chromium/axe inspection identified the following issues:

1. Header and footer brand links overrode their visible label with an `aria-label` whose wording did not match the visible link text. The override was removed so assistive technology receives the name from the actual visible content.
2. The custom desktop scrollbar was rendered outside a named landmark. It is now contained by a labelled `region` named "Page scroll controls"; the scrollbar itself retains its existing role and position behavior.
3. The mobile directory used labelled `section` elements, creating multiple implicit region landmarks. These containers are now named groups rather than landmarks; their visual structure and link destinations are unchanged.
4. Department next-step cards overrode their visible link text with longer `aria-label` values. Those overrides were removed so each link's accessible name is derived from the content a visitor can see.

The corrections are limited to semantics and accessible names. The custom scrollbar interaction and mobile directory behavior were retained.

## Automated browser coverage

The Playwright suite contains **23 Chromium tests**:

- Axe scans across nine representative routes: homepage, Airdrop, Bridge, Governance, 99% Club, Archives, Daily Office, Museum and Passport.
- Additional axe scans of the open mobile directory, the Bridge interview state and the Governance interview state.
- Mobile navigation open/close, Escape handling and focus restoration.
- Horizontal-overflow checks on the homepage at 390px, 768px and 1365px, plus 390px checks on Bridge, Governance, Club and Archives.
- Complete seven-answer Bridge and Governance interview journeys, including generated public case URLs and successful HTTP 200 responses for the resulting public case pages.

**Result: 23/23 passed.** The twelve axe scans reported zero automated violations for the tested page and interface states. These checks cover automated WCAG 2.1 A/AA and best-practice rules; they do not establish full WCAG conformance.

## Manual keyboard and screen-reader review

On 26 November 2026, the project owner confirmed that the manual keyboard and screen-reader review had been completed. This confirmation was provided outside the automated test environment. No device/browser/screen-reader matrix or detailed test log was supplied, so this report records completion as owner-confirmed and does not claim an independently reproduced assistive-technology test matrix or full WCAG conformance.

The separate Chromium keyboard and accessibility-tree audit also passed on the live Production site across eleven routes. It verified skip-link operation, focus movement/restoration, desktop disclosure behavior, mobile menu keyboard behavior and accessible names in the rendered accessibility tree. These automated browser checks do not substitute for the manual screen-reader review.

## Lighthouse lab baseline

Lighthouse **13.6.0** was run against the same local optimized production build. Desktop runs used the desktop preset. The homepage mobile run used Lighthouse's default mobile configuration.

| Route / profile | Performance | Accessibility | Best Practices | SEO | LCP | CLS | FCP | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage / desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.023 | 0.3 s | 0 ms |
| Homepage / mobile | 96 | 100 | 100 | 100 | 1.4 s | 0.039 | 1.4 s | 210 ms |
| Bridge Office / desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.037 | 0.3 s | 0 ms |
| Governance Office / desktop | 100 | 100 | 100 | 100 | 0.3 s | 0.045 | 0.3 s | 10 ms |

Scores and timings are individual lab observations and can vary by machine, browser and run. The mobile homepage performance score is 96; the tested desktop routes score 100 in all four Lighthouse categories. These results do not imply that real-user INP, LCP or CLS have been collected.

The current lab baseline does not justify a performance refactor. A provisional regression guardrail for future repeatable lab runs is: mobile Performance at least 90, Accessibility/Best Practices/SEO at least 95, LCP below 2.5 seconds and CLS below 0.10. These are proposed budgets, not yet CI-enforced thresholds.

## Code-quality checks

The following commands completed successfully in an isolated Vercel sandbox using **Node.js v22.23.5**:

- `npm ci --no-audit --no-fund` — passed.
- `npm run typecheck` — passed.
- `npm run test:quality` — **176 passed, 0 failed**.
- `npm run build` — passed; Next.js generated **77/77** static pages.
- `npx playwright install --with-deps chromium` — passed.
- `npm run test:browser` — **23 passed, 0 failed**.
- `git diff --check` — passed.

The manual GitHub Actions workflow was not dispatched. These are verified sandbox executions of the workflow commands, not a GitHub Actions run. The sandbox worktree was clean after restoring build-generated configuration changes; no local test artifacts were committed.

## Production release

The U68 merge commit `a85051637854fdcccbca962df942798bc22e6056` was subsequently deployed manually to Vercel Production.

- Deployment ID: `dpl_FWYjAXEpJ4ZiJCqtvgarZuTNDG1r`
- Deployment status: `READY`
- Production URL: https://weird-zeta.vercel.app
- Production HTTP check: `200`

The deployment is tied to the U68 merge commit. The U68 changes did not add token, wallet, database, analytics or visitor-data functionality.

## Remaining follow-up

- Firefox and WebKit have not yet been added to the browser matrix; the automated browser suite currently targets Chromium.
- Lighthouse results are local lab measurements; production-origin Lighthouse and field Core Web Vitals are not claimed.
- External Search Console indexing and social-card debugger checks remain separate follow-up work.

## U68 conclusion

U68 adds repeatable real-browser journeys and rendered axe checks to the quality workflow, resolves the accessibility defects found during the initial scan, records a Lighthouse baseline, and has been released to Production. Automated Chromium checks and the project owner's manual keyboard/screen-reader review are complete. Remaining items are cross-browser coverage and separate production-origin SEO/performance verification; they are not blockers to the completed U68 accessibility review.
