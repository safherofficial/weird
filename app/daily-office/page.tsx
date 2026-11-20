import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DailyOfficeClient from "./daily-client";
import { buildDailyOfficeDispatch } from "./daily-engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/daily-office" },
  title: "Daily Departmental Absurdity",
  description: "A date-seeded fictional dispatch from THE DYOR DEPARTMENT, featuring KOL Intelligence, on-chain interpretations, risk reclassification, conviction scores and a Bagholder post-mortem.",
  openGraph: {
    title: "THE DAILY DEPARTMENTAL ABSURDITY",
    description: "The Department has filed another day of completely fictional business.",
    images: ["/daily-office/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DAILY DEPARTMENTAL ABSURDITY",
    description: "One daily fictional dispatch. Zero real-world market information.",
    images: ["/daily-office/opengraph-image"],
  },
};

export default function DailyOfficePage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const dispatch = buildDailyOfficeDispatch(issueDate);

  return (
    <main className="audit-page daily-office-page" id="main-content">
      <DepartmentHeader activeSection="daily" statusMessage="DAILY DESK / FICTIONAL EDITORIAL CONTENT" ctaHref="/daily-office" ctaLabel="READ TODAY'S FILE" />

      <div className="daily-office-shell shell" id="content-start" tabIndex={-1}>
        <header className="daily-office-intro">
          <div className="audit-intro__meta">
            <span>DAILY REGISTER / {dispatch.reference}</span>
            <span>ISSUED / {dispatch.issueDate} UTC</span>
          </div>
          <p className="eyebrow">OFFICE OF DEPARTMENTAL ABSURDITY</p>
          <h1>THE DAILY<br /><span>DEPARTMENT.</span></h1>
          <p className="audit-intro__lead">
            One UTC-dated fictional dispatch: social consensus investigations, suspicious wallet interpretations, risk reclassification, a synthetic conviction index and a post-mortem that refuses to admit defeat.
          </p>
          <div className="daily-office-intro__notice">
            <span>EDITORIAL NOTICE / NOT A NEWS SERVICE</span>
            <strong>ALL DISPATCHES ARE FICTIONAL AND DATE-SEEDED.</strong>
            <small>NO REAL PROJECTS, PEOPLE, TOKENS OR MARKET EVENTS ARE COVERED.</small>
          </div>
        </header>
        <DailyOfficeClient dispatch={dispatch} />
      </div>

      <DepartmentFooter message={["TODAY'S DISPATCH HAS BEEN FILED.", "TOMORROW'S PROBLEMS ARE ALREADY IN REVIEW."]} />
    </main>
  );
}
