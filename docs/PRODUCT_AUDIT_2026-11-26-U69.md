# U69 Cross-browser E2E and Accessibility Matrix — 26 November 2026

## Scope and baseline

U69 extends the browser quality gates from Chromium-only to Chromium, Firefox and WebKit. The branch is based on the merged U68 Production commit a85051637854fdcccbca962df942798bc22e6056.

This is a test infrastructure and documentation change. It does not modify product pages, editorial content, scoring logic, wallet/token functionality, user data handling or production application behavior. No Production deployment is required or included.

## Changes

- Added desktop Firefox and WebKit projects alongside the existing desktop Chromium project in playwright.config.ts.
- Updated the GitHub Actions quality workflow to install all three Playwright browser engines before running npm run test:browser.
- Added scripts/playwright-https-server.mjs, a local-only HTTPS reverse proxy used by Playwright. The application Content Security Policy includes upgrade-insecure-requests; serving the local production build over plain HTTP caused WebKit to upgrade local stylesheet requests to HTTPS, leaving the page unstyled in that test environment. The HTTPS proxy lets all three engines exercise the built application with its production CSP unchanged. Its self-signed certificate is temporary and is accepted only by the Playwright test context.

The initial WebKit failure was traced to local HTTP/CSP test setup, not an application contrast defect: WebKit attempted HTTPS for local CSS assets and received no stylesheet response. The final cross-browser run was performed through the HTTPS test origin.

## Automated coverage

Each browser project runs the same 23 checks, for **69 successful tests total**:

- Twelve axe scans per browser: nine representative routes and three expanded interface states (mobile department navigation, Bridge interview and Governance interview).
- Public homepage and department navigation.
- Mobile menu keyboard dismissal and focus restoration.
- Horizontal overflow checks at desktop, tablet and mobile widths.
- Bridge and Governance interview flows and stable public case URLs.
- Mobile overflow checks on department, Club and archive pages.

The axe scans use WCAG 2.1 A/AA and best-practice tags. They are automated checks of the tested routes and states, not a claim of full WCAG conformance.

## Verification results

Executed directly in a Vercel sandbox with Node.js 22.23.5 and npm 11.19.1:

| Check | Result |
|---|---:|
| npm ci --no-audit --no-fund | PASS |
| npm run typecheck | PASS |
| npm run test:quality | **176 passed, 0 failed** |
| npm run build | PASS — Next.js 16.4.6, 77/77 static pages |
| CI=1 npm run test:browser | **69 passed, 0 failed** |
| Browser matrix | 23 Chromium + 23 Firefox + 23 WebKit |
| git diff --check | PASS |

The manual GitHub Actions workflow was not dispatched during this audit. The results above are direct Node 22 sandbox execution, not a GitHub Actions run.

## Accessibility review status

The project owner confirmed that the separate manual review, including a real screen-reader session on Production, was completed. The screen-reader product, OS and browser version were not supplied in the project notes and are therefore not asserted here. Automated axe checks and browser keyboard tests remain complementary to that owner-confirmed manual review.

## Release decision

U69 changes only quality tooling, the workflow definition and documentation. No Production build was deployed as part of this work. The merged Production application remains on U68 until a separate product release is requested.
