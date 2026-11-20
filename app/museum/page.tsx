import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import MuseumClient from "./museum-client";
import { exhibits } from "./museum-data";

export const metadata: Metadata = {
  alternates: { canonical: "/museum" },
  title: "Bagholder Rehabilitation | Museum of Crypto Relics",
  description: "Fifteen fictional Solana trenches relics: bonding-curve progress bars, bundle-wallet diagrams, KOL screenshots, abandoned deployers and artifacts of bagholder conviction.",
  openGraph: {
    title: "THE BAGHOLDER MUSEUM",
    description: "Fifteen exhibits from the Solana trenches. Countless missed exits. Absolutely no refunds.",
    images: ["/museum/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE BAGHOLDER MUSEUM",
    description: "Fifteen exhibits from the Solana trenches. Countless missed exits. Absolutely no refunds.",
    images: ["/museum/opengraph-image"],
  },
};

export default function MuseumPage() {
  return (
    <main className="audit-page museum-page" id="main-content">
      <DepartmentHeader activeSection="museum" statusMessage="COLLECTION OPEN / ARTIFACTS ENTIRELY FICTIONAL" ctaHref="/museum" ctaLabel="VISIT THE COLLECTION" />

      <div className="museum-shell shell" id="content-start" tabIndex={-1}>
        <header className="museum-intro">
          <div className="audit-intro__meta"><span>INSTITUTION EST. YESTERDAY</span><span>ACCESSION REGISTER / {exhibits[0]?.accession ?? "BHM-001"}–{exhibits[exhibits.length - 1]?.accession ?? "BHM-015"}</span></div>
          <p className="eyebrow">BAGHOLDER REHABILITATION / THE TRENCHES RELIC COLLECTION</p>
          <h1>THE BAGHOLDER<br /><span>MUSEUM.</span></h1>
          <p className="audit-intro__lead">
            A permanent collection of launch-night screenshots, bonding-curve celebrations, bundle theories, KOL calls and CTO banners left behind in the trenches.
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

        <MuseumClient />
      </div>

      <DepartmentFooter message={["PLEASE DO NOT TOUCH THE EXHIBITS.", "THEY ARE ALREADY FRAGILE ENOUGH."]} />
    </main>
  );
}
