import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";

export const metadata: Metadata = {
  title: "Terms & Entertainment Disclaimer",
  description: "Terms for using THE DYOR DEPARTMENT, its fictional simulations, satirical classifications and generated documents.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "01 / ENTERTAINMENT ONLY",
    paragraphs: [
      "THE DYOR DEPARTMENT is a satire and entertainment project. Its questions, classifications, scores, market events, artifacts, roadmap milestones, fictional token dossiers and generated case files are fictional.",
      "The experiences are not financial, investment, legal, tax, accounting, technical-security or business advice. Nothing on this site is an offer, solicitation, recommendation or promise to buy, sell or hold an asset.",
    ],
  },
  {
    title: "02 / NO REAL ASSETS OR MARKET DATA",
    paragraphs: [
      "HYPE-404, Department Paper Credits (DPC), fictional token supplies, allocation models, yields, paper profit/loss and all simulated prices are invented for entertainment. They are not real tokens, currencies, market quotes, investment results or representations of any blockchain asset.",
      "The site does not connect to wallets, exchanges, smart contracts, blockchains or live market feeds. It does not execute trades or move funds.",
    ],
  },
  {
    title: "03 / GENERATED DOCUMENTS",
    paragraphs: [
      "The CTO Emergency Office roadmap and Exit Liquidity Department token dossier create fictional parody documents based on answer choices. Their architectures, security language, token allocations, project labels, milestones, dates and claims are not verified or independently researched.",
      "Do not present generated documents as official project materials, verified token disclosures, security audits, business plans, roadmaps, partnership announcements or delivery commitments. A generated document is not evidence that a product, team, contract or partnership exists.",
    ],
  },
  {
    title: "04 / PUBLIC CASES AND PROJECT LABELS",
    paragraphs: [
      "Visitors may create public case links for the FOMO Control Unit Audit, Pump.fun Intelligence simulator, 100X Research Bureau inspection, CTO Emergency Office roadmap, Exit Liquidity Department token dossier, cross-chain 99% Club membership, Copium Administration personal calibration and Airdrop Entitlement Office interview. Anyone with a case URL may view its contents. CTO Emergency Office and Exit Liquidity Department links include the visitor's sanitized project designation in the shareable URL.",
      "Do not enter personal information, private names, confidential business details, passwords, wallet addresses or other sensitive information. Visitors are responsible for deciding whether to publish or share a case link.",
    ],
  },
  {
    title: "05 / MUSEUM COLLECTION",
    paragraphs: [
      "The Bagholder Rehabilitation / Museum of Trenches Relics is a curated fictional collection. Its artifacts, accession notes, eras, conditions and curator comments are invented. They are not claims about any identifiable person, company, token, project or community.",
    ],
  },
  {
    title: "06 / ACCEPTABLE USE",
    paragraphs: [
      "Visitors must not use the site or its outputs to impersonate a real person or organization, mislead others about a real asset or project, harass a person or publish private information. The site is intended for parody, commentary and entertainment.",
      "The site does not accept user-uploaded artifacts, community comments or public submissions in this release.",
    ],
  },
  {
    title: "07 / AVAILABILITY AND CHANGES",
    paragraphs: [
      "Features may change, be unavailable or be removed. Case URLs depend on the current version of the relevant deterministic generator. The operator does not guarantee uninterrupted availability or permanent support for every historic format.",
      "The site and its content are provided for entertainment without a promise that generated output will be complete, accurate, suitable or useful for any purpose outside the joke.",
    ],
  },
  {
    title: "08 / OPERATOR DETAILS",
    paragraphs: [
      "The legal identity and contact details for the site operator have not been supplied in this release. They must be added by the operator before these terms are treated as a complete legal agreement.",
      "Last reviewed: 25 November 2026.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="audit-page legal-page" id="main-content">
      <DepartmentHeader statusMessage="TERMS / ENTERTAINMENT ONLY" ctaHref="/" ctaLabel="BACK TO HQ" />
      <article className="legal-document shell" id="content-start" tabIndex={-1}>
        <div className="legal-document__meta"><span>THE DYOR DEPARTMENT / TERMS FILE</span><span>LAST REVIEWED / 25 NOV 2026</span></div>
        <p className="eyebrow">THE DYOR DEPARTMENT / TERMS OF ENGAGEMENT</p>
        <h1>TERMS &<br /><span>DISCLAIMER.</span></h1>
        <p className="legal-document__lead">Read the fine print. It is shorter than the token dossier and considerably more useful.</p>
        <div className="legal-document__notice">
          <strong>IMPORTANT</strong>
          <p>This website is a satirical entertainment project. Nothing here is a real asset, market feed, investment assessment, technical audit or project commitment.</p>
        </div>
        {sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <div className="legal-document__actions">
          <Link className="button button--quiet" href="/privacy">READ PRIVACY NOTICE ↗</Link>
          <Link className="button button--quiet" href="/">RETURN TO THE DEPARTMENT ↗</Link>
        </div>
      </article>
      <DepartmentFooter message={["NO TOKEN. NO ALPHA. NO FINANCIAL ADVICE.", "THESE TERMS ARE NOT A CTO HANDOVER PLAN."]} />
    </main>
  );
}
