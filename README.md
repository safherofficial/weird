# THE DYOR DEPARTMENT

**You did your own research. The market did its own thing.**

A satirical, deliberately useless institution dedicated to questionable conviction, over-researched entries, disappearing liquidity and the universal experience of holding the bag.

## Product boundaries

- No token, wallet connection, real-money mechanics or paid financial product.
- The app does not intentionally set analytics or advertising cookies or include tracking pixels. The optional DYOR Audit archive is stored in local browser storage only.
- Shareable result URLs encode selected answers; Roadmap Generator and Whitepaper Factory URLs also include the sanitized project label. Anyone with a link can view that result.
- No financial advice, trading signals, investment recommendations or promises of returns.
- Scores, classifications, dashboard labels and simulator events are fictional entertainment. Audit results do not assess actual investment skill, financial risk or market performance. Utility Inspector results are based only on visitor-selected answers and do not inspect real projects, tokens, contracts or businesses. Roadmap Generator output is a fictional parody and is not a real project plan, delivery commitment or forecast. Whitepaper Factory output, including token allocations and technical labels, is invented entertainment and is not a real technical specification, token offer or project disclosure. Bagholder Museum exhibits are invented satirical artifacts and do not refer to actual people, companies, tokens or communities. THE 99% CLUB is a fictional membership joke, not a statistic about real investors or market participants. The Global Cope Index is a synthetic date-seeded dashboard, not real market, investor or community sentiment data. Department Archives contains original fictional records and does not document actual people, projects, companies or events.
- The visitor is part of the joke, never the target.
- Interactive experiences should produce shareable, recognizable Department case files.

## Current release

- Institutional-style landing page.
- DYOR Audit 2.0 with ten questions, 17 satirical archetypes and deterministic multi-signal scoring.
- Three fictional dimensions: Research Effort, Cope Index and Crowd Dependency.
- Primary and secondary patterns, a personalized Department finding and a downloadable PNG case card.
- Public case pages with dynamic Open Graph / X preview cards (1200×630), exact result reconstruction from share URLs, native sharing, copy-link actions, direct X sharing and challenge-a-friend links.
- A local archive of up to five saved Audit cases on the visitor's device, with restore and delete controls.
- The Bagholder Simulator: seven fixed fictional market events, four decisions per round, paper-only portfolio accounting and multiple satirical endings.
- Public simulator case pages with dynamic social previews, share links and challenge-a-friend actions.
- The Utility Inspector: seven self-reported multiple-choice questions, three fictional scores, ten satirical archetypes and a shareable inspection dossier.
- Public utility inspection case pages with dynamic social previews and challenge-a-friend links.
- The Roadmap Generator: six self-reported multiple-choice questions, seven fictional milestones, three satirical scores and ten roadmap archetypes.
- Public roadmap case pages with dynamic social previews, copy/share tools and challenge-a-friend links.
- The Whitepaper Factory: seven self-reported choices, nine generated document sections, three fictional scores, ten satirical archetypes and a fictional token allocation model.
- Public whitepaper case pages with dynamic social previews, challenge links and HTML / Markdown export. HTML documents include print styling for browser-based Save as PDF.
- The Bagholder Museum: twelve fictional curated artifacts across four collections, searchable and filterable gallery, individual exhibit records, dynamic social cards and universal exhibit sharing.
- THE 99% CLUB: five-question fictional membership application, three satirical indices, six reachable archetypes, membership card export and shareable public member files. The name is not a real 99% market statistic and membership has no benefits.
- THE GLOBAL COPE INDEX: synthetic UTC-date-seeded dashboard with five fictional dimensions and an optional personal five-question calibration, shareable personal files and downloadable cards. No visitor poll, market feed or real-world sentiment data is used.
- Department Archives: twelve curated fictional records across five categories, searchable/filterable library, static detail pages, social previews and universal archive-record sharing. No user uploads or real event claims.
- Daily Departmental Absurdity: UTC-date-seeded fictional daily bulletin, incident report, internal memo and quotation, with universal sharing, copy-link and full-dispatch copy actions, plus a downloadable dispatch card. No real news, market events or external feeds are used.
- Privacy Notice and entertainment Terms pages, including transparent disclosures for local Audit storage, public case URLs, Google Fonts and hosting-provider processing.
- Shared legal links in the site footer and baseline security response headers.
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
