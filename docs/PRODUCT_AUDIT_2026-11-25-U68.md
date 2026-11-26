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

The new Playwright suite contains **23 Chromium tests**:

- Axe scans across nine representative routes: homepage, Airdrop, Bridge, Governance, 99% Club, Archives, Daily Office, Museum and Passport.
- Additional axe scans of the open mobile directory, the Bridge interview state and the Governance interview state.
- Mobile navigation open/close, Escape handling and focus restoration.
- Horizontal-overflow checks on the homepage at 390px, 768px and 1365px, plus 390px checks on Bridge, Governance, Club and Archives.
- Complete seven-answer Bridge and Governance interview journeys, including generated public case URLs and successful HTTP 200 responses for the resulting public case pages.

**Result: 23/23 passed.** The twelve axe scans reported zero automated violations for the tested page and interface states. These checks cover automated WCAG 2.1 A/AA and best-practice rules; they do not replace a human screen-reader review or establish full WCAG conformance.

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

The following local checks completed successfully:

- `npm run typecheck` — passed.
- `npm run test:quality` — **176 passed, 0 failed**.
- `npm run build` — passed; Next.js generated **77/77** static pages.
- `npm run test:browser` — **23 passed, 0 failed**.
- `git diff --check` — passed.

The sandbox's shell used Node 24 although the repository declares Node 22 as its supported major version. The GitHub Actions workflow uses `.nvmrc` and will provide the authoritative Node 22 CI verification before this work is eligible to merge.

## Remaining verification

- A manual keyboard and screen-reader review, including a real screen-reader session, remains outstanding.
- Firefox and WebKit have not yet been added to the browser matrix; the new CI suite currently targets Chromium.
- Lighthouse results are local lab measurements; production-origin Lighthouse and field Core Web Vitals are not claimed.
- External Search Console indexing and social-card debugger checks remain separate follow-up work.

## U68 conclusion

U68 adds repeatable real-browser journeys and rendered axe checks to the quality workflow, resolves the accessibility defects found during the initial scan, and records a Lighthouse baseline. No production deployment has been made as part of this follow-up.
