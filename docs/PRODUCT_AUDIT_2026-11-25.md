# Product Audit — 25 November 2026

## Status and method

This is a source-level product audit of the U66 production baseline at commit `f9c46b8e76af2530851fb32e8d140fe25409320b`. It reviews the route inventory, navigation graph, interactive engines, public result routes, content systems, Passport, SEO, security configuration, privacy disclosures, tests and release workflow.

This report does not claim that a browser-based end-to-end run, visual device inspection, screen-reader session or Lighthouse measurement was performed. The final quality workflow remains manual by project-owner decision.

## Findings

### Product structure — PASS

- The Department directory contains thirteen numbered divisions, with matching routes and a corresponding Passport visit stamp for each.
- All thirteen division journeys have two distinct, valid next destinations. The regression suite checks that the graph resolves to real division routes, avoids self-links and remains connected.
- The homepage directory and mobile navigation now derive their destination totals from the shared division inventory instead of hard-coding the number 13.
- The 99% Club remains explicitly cross-chain; the Department's wider editorial identity remains rooted in Solana and Crypto Twitter.

### Interactive experiences — PASS, with manual UX validation still required

- The core experiences use deterministic, locally computed results and answer-derived public case URLs. The three newest interviews (Snapshot Tribunal, Interchain Transfer Review and Quorum Tribunal) each validate seven answers, derive bounded fictional scores and reject malformed result codes.
- The Case Atlas documents twenty-one fictional threads: eighteen date-rotating Trenches Desk themes and three static airdrop, bridge and governance threads. Those threads connect to curated Archive and Museum references.
- The Institutional Memory Ledger presents fourteen date-seeded fictional dispatches.
- The 99% Club's campaign, contribution and participation tools are documented as editable drafts and browser-local artwork exports, not auto-publishing or verified community engagement.

### Sharing and discoverability — PASS at source/test level

- Stable landing pages and curated records are listed in the sitemap. Generated personal result URLs are intentionally excluded and marked `noindex`.
- The security regression suite expects 31 Open Graph image routes and checks their Next ImageResponse implementation.
- Existing share builders reserve URL space and keep X copy within the documented 235-character text budget.
- Search Console indexing and third-party social-card rendering cannot be established from repository source alone; they require external service inspection.

### Privacy and security boundaries — PASS at source/configuration level

- The documented product boundary remains no token, wallet connection, user account, application database, market feed or server-side visitor progress profile.
- The optional Audit archive and Passport use browser storage. Passport visit/completion tracking remains local and opt-in.
- The application defines a restrictive Content Security Policy, disables inline event-handler attributes, blocks frames and objects, and does not enable `unsafe-eval`. The Vercel configuration retains the existing security response headers.
- Current regression tests inspect known unsafe HTML and dynamic-code sinks in application source. They are static safeguards, not a penetration test or dynamic security assessment.

### Accessibility — PARTIAL

- The code includes a skip link, named navigation landmarks, a responsive mobile directory, Escape-key dismissal with focus returned to the menu button, reduced-motion handling, keyboard support for the custom desktop scrollbar and a global return-to-top control.
- The existing accessibility regression suite checks heading structure, selected small-text contrast values and touch-target refinements. This change adds a regression guard for mobile-menu state and keyboard dismissal.
- There is no browser-driven axe/WCAG scan or screen-reader test in the current package/test setup. CSS/source assertions cannot prove the final rendered experience is accessible.

### Reliability and performance — PARTIAL

- The U66 release baseline was previously verified with TypeScript PASS, 174 quality tests PASS and a successful production build generating 77 routes. Those are inherited baseline results, not a fresh run against this U67 branch.
- The current Vercel runtime-error query returned no runtime errors in its selected seven-day window. Granular runtime-log retention is limited on the current plan; the seven-day log query was unavailable, so no broader clean-log claim is made.
- The repository does not currently define a browser E2E suite, a Lighthouse/Web Vitals performance budget or field-performance monitoring. Actual layout stability, interaction latency and Core Web Vitals therefore remain unverified by this source audit.

## Changes made in this audit tranche

1. Rewrote `docs/BRAND_VOICE.md` to reflect all thirteen divisions and the current 21-thread Case Atlas instead of the obsolete twelve-division / two-static-thread description.
2. Added documentation regression coverage for the division inventory, Atlas scope and current route counts.
3. Replaced hard-coded homepage and mobile navigation division totals with values derived from `departments.length`.
4. Updated Bridge and Governance regression assertions for the data-derived mobile navigation count.
5. Added a mobile navigation accessibility regression check for ARIA state, Escape-key closure and focus restoration.

No token, wallet, live market integration, analytics, database or new external dependency was introduced.

## Remaining quality priorities

| Priority | Gap | Recommended next action |
| --- | --- | --- |
| High | No real-browser end-to-end coverage | Add a small manually triggered browser smoke suite for navigation, interview completion, share URLs and responsive layouts. Keep its execution owner-triggered. |
| High | No automated rendered accessibility scan | Add an owner-triggered axe scan and retain a short keyboard/screen-reader manual pass. |
| Medium | No repeatable performance baseline | Run Lighthouse on the production homepage and representative interactive/result routes; record mobile and desktop scores before setting budgets. |
| Medium | External SEO/social rendering is not proven by source tests | Confirm canonical/indexing state in Search Console and inspect generated cards in the relevant social preview debuggers. |
| Ongoing | Editorial repetition can only be partly caught by deterministic tests | Review a rotating sample of current and archived dispatches for repeated setups, reused punchlines and weak department specificity. |

## Owner-run final release checks

The repository's GitHub Actions workflow is intentionally manual and runs `npm run typecheck`, `npm run test:quality` and `npm run build`. Vercel Git-triggered deployments remain disabled. After the production deployment, the owner should launch **Actions → Manual quality checks → Run workflow** and review the result.

The owner should also perform a browser pass on desktop and a narrow mobile viewport: visit all thirteen division landing pages; open and close the mobile directory with pointer and keyboard; complete one interview from each of the three newest offices; open a generated result link; verify its social card; exercise Passport opt-in and deletion; and check Privacy / Terms, visible focus, reduced motion and return-to-top behaviour.

## Audit conclusion

No additional live-data or persistence feature is required to complete the current product. The core product map is connected and its source-level safeguards are substantial. The main verified documentation defect and duplicated route counters have been corrected in this tranche. The largest remaining quality gaps are browser-level verification, rendered accessibility testing and a repeatable performance baseline.
