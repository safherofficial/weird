import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import PassportClient from "./passport-client";

export const metadata: Metadata = {
  alternates: { canonical: "/passport" },
  title: "Department Passport",
  description: "An optional local Passport for THE DYOR DEPARTMENT. Collect visit stamps and earn achievement badges by completing experiences and challenges.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "THE DEPARTMENT PASSPORT",
    description: "Ten visit stamps. Eleven achievement badges. Local progress. Absolutely no practical value.",
    images: ["/passport/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DEPARTMENT PASSPORT",
    description: "Ten visit stamps. Eleven achievement badges. Local progress. Absolutely no practical value.",
    images: ["/passport/opengraph-image"],
  },
};

export default function DepartmentPassportPage() {
  return (
    <main className="audit-page passport-page" id="main-content">
      <DepartmentHeader activeSection="passport" statusMessage="OPTIONAL VISIT REGISTER / LOCAL ONLY" ctaHref="/passport" ctaLabel="OPEN MY PASSPORT" />

      <div className="passport-shell shell" id="content-start" tabIndex={-1}>
        <header className="passport-intro">
          <div className="audit-intro__meta">
            <span>REGISTER DPP-001</span>
            <span>10 VISIT STAMPS / 11 ACHIEVEMENT BADGES</span>
          </div>
          <p className="eyebrow">OFFICE OF DEPARTMENTAL VISITS & ACHIEVEMENTS</p>
          <h1>THE DEPARTMENT<br /><span>PASSPORT.</span></h1>
          <p className="audit-intro__lead">
            Department Stamps record where you have been. Achievement Badges reward completed experiences and specific challenges. Two separate records, one optional local Passport.
          </p>
          <div className="passport-intro__notice">
            <span>OPTIONAL / OFF BY DEFAULT</span>
            <strong>NO ACCOUNT. NO SERVER PROFILE. NO PUBLIC TRACKING.</strong>
            <small>VISIT STAMPS AND ACHIEVEMENT PROGRESS STAY IN THIS BROWSER ONLY.</small>
          </div>
        </header>

        <PassportClient />
      </div>

      <DepartmentFooter message={["YOUR VISITS HAVE BEEN ACKNOWLEDGED.", "YOUR ACHIEVEMENTS HAVE NO FINANCIAL VALUE."]} />
    </main>
  );
}
