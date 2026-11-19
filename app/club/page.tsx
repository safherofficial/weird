import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import ClubClient from "./club-client";

export const metadata: Metadata = {
  alternates: { canonical: "/club" },
  title: "The 99% Club",
  description: "Five questions. Three fictional indices. Apply to the most exclusive club with absolutely no benefits.",
  openGraph: {
    title: "THE 99% CLUB",
    description: "You did your own research. You are not alone in the paperwork.",
    images: ["/club/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE 99% CLUB",
    description: "Five questions. Three fictional indices. No benefits.",
    images: ["/club/opengraph-image"],
  },
};

export default function ClubPage() {
  return (
    <main className="audit-page club-page" id="main-content">
      <DepartmentHeader activeSection="club" statusMessage="MEMBERSHIP OFFICE / BENEFITS NOT INCLUDED" ctaHref="/club" ctaLabel="APPLY FOR MEMBERSHIP" />

      <div className="club-shell shell" id="content-start" tabIndex={-1}>
        <aside className="club-intro">
          <div className="audit-intro__meta"><span>FORM 99C-001</span><span>MEMBER BENEFITS / NONE</span></div>
          <p className="eyebrow">OFFICE OF COLLECTIVE FINANCIAL REGRET</p>
          <h1>THE 99%<br /><span>CLUB.</span></h1>
          <p className="audit-intro__lead">
            For the over-researched, the under-rewarded and anyone who has ever called a falling chart a long-term opportunity.
          </p>
          <div className="club-intro__stamp">
            <span>OFFICIAL CLUB MOTTO</span>
            <strong>YOU DID YOUR OWN RESEARCH.</strong>
            <small>THE MARKET DID ITS OWN THING.</small>
          </div>
          <div className="club-intro__fineprint">
            “99%” IS A SATIRICAL CLUB NAME. IT IS NOT A REAL MARKET OR COMMUNITY STATISTIC.
          </div>
        </aside>

        <ClubClient />
      </div>

      <DepartmentFooter message={["WELCOME TO THE CLUB.", "YOUR BENEFITS HAVE BEEN DECLINED IN ADVANCE."]} />
    </main>
  );
}
