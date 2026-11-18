# THE DYOR DEPARTMENT

**You did your own research. The market did its own thing.**

A satirical, deliberately useless institution dedicated to questionable conviction, over-researched entries, disappearing liquidity and the universal experience of holding the bag.

## Product boundaries

- No token, wallet connection, real-money mechanics or paid financial product.
- No financial advice, trading signals, investment recommendations or promises of returns.
- Scores, classifications, dashboard labels and simulator events are fictional entertainment. Audit results do not assess actual investment skill, financial risk or market performance.
- The visitor is part of the joke, never the target.
- Interactive experiences should produce shareable, recognizable Department case files.

## Current release

- Institutional-style landing page.
- DYOR Audit 2.0 with ten questions, 17 satirical archetypes and deterministic multi-signal scoring.
- Three fictional dimensions: Research Effort, Cope Index and Crowd Dependency.
- Primary and secondary patterns, a personalized Department finding and a downloadable PNG case card.
- Shareable case URLs that reproduce the exact result, direct X sharing, copyable reports and a local archive of up to five saved cases on the visitor's device, with restore and delete controls.
- Responsive layout and reduced-motion support.

Other Departments shown on the homepage are planned features and are not yet available.

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

GitHub Actions runs both checks on pushes to the primary and development branches and on pull requests targeting `main`. The workflow uses the committed npm lockfile and `npm ci` to keep installs reproducible.

## Deployment

The project is configured for the Vercel Next.js framework. Production deployments are connected to the `main` branch. Pull requests may receive Vercel preview deployments.

## Technology

- Next.js App Router
- React
- TypeScript
- Custom CSS design system
- Vercel hosting

## Disclaimer

THE DYOR DEPARTMENT is an entertainment project. All scores, classifications, scenarios and simulated market events are fictional. Nothing on this site is investment advice, a recommendation, or a representation of real market data.
