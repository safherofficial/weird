import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import MuseumClient from "./museum-client";
import { exhibits } from "./museum-data";

export const metadata: Metadata = {
  title: "The Bagholder Museum",
  description: "A curated archive of fictional crypto relics, lost roadmaps, suspicious certificates and preserved specimens of spectacular conviction.",
  openGraph: {
    title: "THE BAGHOLDER MUSEUM",
    description: "Twelve exhibits. Countless lessons. Absolutely no refunds.",
    images: ["/museum/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE BAGHOLDER MUSEUM",
    description: "Twelve exhibits. Countless lessons. Absolutely no refunds.",
    images: ["/museum/opengraph-image"],
  },
};

export default function MuseumPage() {
  return (
    <main className="audit-page museum-page" id="main-content">
      <DepartmentHeader activeSection="museum" statusMessage="COLLECTION OPEN / ARTIFACTS ENTIRELY FICTIONAL" ctaHref="/museum" ctaLabel="VISIT THE COLLECTION" />

      <div className="museum-shell shell" id="content-start" tabIndex={-1}>
        <header className="museum-intro">
          <div className="audit-intro__meta"><span>INSTITUTION EST. YESTERDAY</span><span>ACCESSION REGISTER / 001–012</span></div>
          <p className="eyebrow">THE NATIONAL ARCHIVE OF QUESTIONABLE CONVICTION</p>
          <h1>THE BAGHOLDER<br /><span>MUSEUM.</span></h1>
          <p className="audit-intro__lead">
            A permanent collection of the objects, documents and digital remains left behind by people who did their own research.
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
