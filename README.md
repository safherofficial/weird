# THE DYOR DEPARTMENT

**You came for the 100x. You stayed because you can't sell at a loss.**

The official aftercare desk for Crypto Twitter, Solana memecoin trenches and pump.fun launches: a deliberately useless institution for FOMO, KOL calls, CTO emergencies and bagholder behaviour.

The visitor is not an outsider being mocked. The Department is in the screenshot too. See [the Brand Voice & Editorial Contract](docs/BRAND_VOICE.md) for the editorial rules.

## Product boundaries

- Editorial identity and language rules: [docs/BRAND_VOICE.md](docs/BRAND_VOICE.md).

- No token, wallet connection, real-money mechanics or paid financial product.
- The app does not intentionally set analytics or advertising cookies or include tracking pixels. The optional DYOR Audit archive and Department Passport are stored in local browser storage only. Passport tracking starts only after explicit opt-in; visit stamps and completion achievements are never sent to an application server.
- Shareable result URLs encode selected answers; CTO Emergency Office and Exit Liquidity Department URLs also include the sanitized project label. Anyone with a link can view that result.
- No financial advice, trading signals, investment recommendations or promises of returns.
- Scores, classifications, dashboard labels and simulator events are fictional entertainment. Audit results do not assess actual investment skill, financial risk or market performance. 100X Research Bureau results are based only on visitor-selected answers and do not inspect real projects, tokens, contracts or businesses. CTO Emergency Office output is a fictional parody and is not a real project plan, delivery commitment or forecast. Exit Liquidity Department token dossier output, including token allocations and technical labels, is invented entertainment and is not a real technical specification, token offer or project disclosure. Bagholder Rehabilitation / Museum of Trenches Relics exhibits are invented satirical artifacts and do not refer to actual people, companies, tokens or communities. THE 99% CLUB is a fictional membership joke, not a statistic about real investors or market participants. Copium Administration's Global Cope Index is a synthetic date-seeded dashboard, not real market, investor or community sentiment data. Department Archives contains original fictional records and does not document actual people, projects, companies or events.
- The visitor is part of the joke, never the target.
- Interactive experiences should produce shareable, recognizable Department case files.

## Current release

- Ten numbered operational divisions now organize the existing experiences: Pump.fun Intelligence, Solana Trenches, FOMO Control Unit, KOL Surveillance, Whale & Wallet Investigation, CTO Emergency Office, Exit Liquidity Department, 100X Research Bureau, Bagholder Rehabilitation and Copium Administration. These are editorial identities over existing routes, not ten newly built products.

- Institutional-style landing page with a ten-division directory and shared division identity in navigation and page mastheads.
- DYOR Audit 2.0 with ten questions on CA discovery, deployer history, bundle theories, KOL influence, late entries and exit plans; 17 satirical archetypes and deterministic scoring.
- Three fictional dimensions: Research Effort, Cope Index and Crowd Dependency.
- Primary and secondary patterns, a personalized Department finding and a downloadable PNG case card.
- Public case pages with dynamic Open Graph / X preview cards (1200×630), exact result reconstruction from share URLs, native sharing, copy-link actions, direct X sharing and challenge-a-friend links.
- A local archive of up to five saved Audit cases on the visitor's device, with restore and delete controls.
- Pump.fun Intelligence paper-market simulator: seven fixed fictional launch events covering CA discovery, bundle chatter, copied KOL calls, bonding-curve graduation, CTO takeover and the post-graduation pool; four decisions per round and paper-only accounting.
- Public simulator case pages with dynamic social previews, share links and challenge-a-friend actions.
- The 100X Research Bureau: seven self-reported multiple-choice questions, three fictional scores, ten satirical archetypes and a shareable inspection dossier.
- Public utility inspection case pages with dynamic social previews and challenge-a-friend links.
- The CTO Emergency Office roadmap: six self-reported multiple-choice questions, seven fictional milestones, three satirical scores and ten roadmap archetypes.
- Public roadmap case pages with dynamic social previews, copy/share tools and challenge-a-friend links.
- The Exit Liquidity Department token dossier: seven self-reported choices, nine generated document sections, three fictional scores, ten satirical archetypes and a fictional token allocation model.
- Public token dossier case pages with dynamic social previews, challenge links and HTML / Markdown export. HTML documents include print styling for browser-based Save as PDF.
- Bagholder Rehabilitation / Museum of Trenches Relics: fifteen fictional curated artifacts across four collections, including a bonding-curve progress bar, bundle-wallet family portrait and CTO handover banner; searchable gallery and individual exhibit records.
- SOLANA TRENCHES / THE 99% CLUB: five-question fictional membership application, three satirical indices, six reachable archetypes, membership card export and shareable public member files. The name is not a real 99% market statistic and membership has no benefits.
- COPIUM ADMINISTRATION / GLOBAL COPE INDEX: synthetic UTC-date-seeded dashboard with five fictional dimensions and an optional personal five-question calibration, shareable personal files and downloadable cards. No visitor poll, market feed or real-world sentiment data is used.
- Whale & Wallet Investigation / Department Archives: fifteen curated fictional records across five categories, including post-graduation, CTO handover and copied-KOL case files; searchable library and static detail pages. No user uploads or real event claims.
- The Trenches Desk: UTC-date-seeded fictional CT briefing combining a public bulletin, pump.fun incident report, KOL Intelligence, wallet theories, risk notes, internal memos and a Bagholder post-mortem. Includes a synthetic six-signal Conviction Index, universal sharing, full-dispatch copy and downloadable dispatch cards. The engine recombines original editorial templates; it does not use AI factual research, live market data or external feeds.
- Privacy Notice and entertainment Terms pages, including transparent disclosures for local Audit storage, public case URLs, Google Fonts and hosting-provider processing.
- Shared legal links in the site footer and baseline security response headers.
- Optional Department Passport with ten visit stamps and eleven distinct achievement badges. Stamps record Department visits; badges are awarded for completing interactive experiences and defined challenges. Badge rarity, local unlock notifications, completion progress and downloadable Passport / badge collection cards are included. Existing v1 Passport visit stamps and Trenches Desk streaks are migrated in place; visits are not retroactively counted as completed experiences.
- Technical SEO discovery through `/robots.txt` and `/sitemap.xml`, including canonical landing pages and curated Museum / Archive detail records. Generated personal case URLs remain excluded from the sitemap and marked `noindex`.
- Responsive layout and reduced-motion support.

All ten currently listed Department experiences are available. Further Departments remain planned.

## Requirements

- Node.js 22
- npm 10 or 11

The supported runtime is declared in `.nvmrc`, `.npmrc` and `package.json`.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run typecheck
npm run build
```

GitHub Actions runs both checks on pushes to `main`, `feat/**`, `fix/**` and `chore/**`, and on pull requests targeting `main` or `feat/**`. These checks do not create Vercel deployments. The workflow uses the committed npm lockfile and `npm ci` to keep installs reproducible.

## Deployment

The project is configured for the Vercel Next.js framework. Git-triggered Production deployments are enabled only for `main`; automatic Vercel deployments from all other branches are disabled. Pull requests can still run GitHub Actions quality checks, but Preview deployments are not part of the release flow.

## Technology

- Next.js App Router
- React
- TypeScript
- Custom CSS design system
- Vercel hosting

## Disclaimer

THE DYOR DEPARTMENT is an entertainment project. All scores, classifications, scenarios and simulated market events are fictional. Nothing on this site is investment advice, a recommendation, or a representation of real market data.
