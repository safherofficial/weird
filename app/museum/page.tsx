import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import DepartmentPublicShare from "../components/department-public-share";
import { buildDepartmentShareText } from "../lib/department-share-copy";
import MuseumClient from "./museum-client";
import { exhibits, museumCategories } from "./museum-data";

export const metadata: Metadata = {
  alternates: { canonical: "/museum" },
  title: "Bagholder Rehabilitation | Museum of Trenches Relics",
  description: exhibits.length + " fictional cross-chain trenches relics: bridge queue tickets, airdrop passport stamps, multi-chain unlock clocks and governance artifacts.",
  openGraph: {
    title: "THE MUSEUM OF TRENCHES RELICS",
    description: exhibits.length + " fictional exhibits from the cross-chain trenches. Every artifact is fictional; absolutely no refunds.",
    images: ["/museum/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE MUSEUM OF TRENCHES RELICS",
    description: exhibits.length + " fictional exhibits from the cross-chain trenches. Every artifact is fictional; absolutely no refunds.",
    images: ["/museum/opengraph-image"],
  },
};

export default function MuseumPage() {
  const shareText = buildDepartmentShareText({
    opening: "THE DYOR DEPARTMENT / TRENCHES RELIC MUSEUM.",
    finding: exhibits.length + " fictional relics across " + (museumCategories.length - 1) + " collections.",
    evidence: "Bridge receipts, airdrop stamps, unlock clocks and governance artifacts.",
    punchline: "Every exhibit is priceless. None is redeemable.",
    invitation: "Visit the collection.",
  });

  return (
    <main className="audit-page museum-page" id="main-content">
      <DepartmentHeader activeSection="museum" statusMessage="COLLECTION OPEN / ARTIFACTS ENTIRELY FICTIONAL" ctaHref="/museum" ctaLabel="VISIT THE COLLECTION" />

      <div className="museum-shell shell" id="content-start" tabIndex={-1}>
        <header className="museum-intro">
          <div className="audit-intro__meta"><span>INSTITUTION EST. YESTERDAY</span><span>ACCESSION REGISTER / {exhibits[0]?.accession ?? "BHM-001"}–{exhibits[exhibits.length - 1]?.accession ?? "BHM-019"}</span></div>
          <p className="eyebrow">BAGHOLDER REHABILITATION / THE TRENCHES RELIC COLLECTION</p>
          <h1>THE TRENCHES<br /><span>RELIC MUSEUM.</span></h1>
          <p className="audit-intro__lead">
            A permanent collection of crypto-culture relics: bridge receipts, airdrop passport stamps, multi-chain unlock clocks, governance artifacts and the objects left behind in the trenches.
          </p>
          <div className="museum-intro__notice">
            <span>VISITOR NOTICE / PLEASE READ</span>
            <strong>NO REAL PEOPLE. NO REAL PROJECTS. NO REAL ASSETS.</strong>
            <small>EVERY EXHIBIT IS A FICTIONAL SATIRE SPECIMEN.</small>
          </div>
          <div className="museum-intro__stats">
            <div><strong>{String(exhibits.length).padStart(2, "0")}</strong><span>CATALOGUED EXHIBITS</span></div>
            <div><strong>04</strong><span>COLLECTIONS</span></div>
            <div><strong>∞</strong><span>EMOTIONAL DAMAGE</span></div>
          </div>
        </header>

        <section className="department-reference-share" aria-label="Share the Trenches Relic Museum">
          <span>PUBLIC COLLECTION / X-READY SUMMARY</span>
          <div className="department-reference-share__actions">
            <DepartmentPublicShare
              title="THE DYOR DEPARTMENT / Trenches Relic Museum"
              shareText={shareText}
              casePath="/museum"
              resourceLabel="MUSEUM"
            />
          </div>
        </section>

        <MuseumClient />
      </div>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="museum" />
      </div>

      <DepartmentFooter message={["PLEASE DO NOT TOUCH THE EXHIBITS.", "THEY ARE ALREADY FRAGILE ENOUGH."]} />
    </main>
  );
}
