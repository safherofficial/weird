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
            Your Passport has two separate collections: Visit Stamps for the departments you visit, and Achievement Badges for experiences you actually complete. Enable it before you start: after that, qualifying progress is recorded automatically on this device.
          </p>
          <div className="passport-intro__notice">
            <span>START HERE / OPTIONAL LOCAL REGISTER</span>
            <strong>ENABLE YOUR PASSPORT BEFORE COMPLETING ACTIVITIES.</strong>
            <small>IT IS OFF BY DEFAULT. EARLIER ACTIVITIES ARE NOT BACKFILLED. NO ACCOUNT OR SERVER PROFILE IS CREATED.</small>
          </div>
        </header>

        <section className="passport-guide" aria-labelledby="passport-guide-title">
          <div className="passport-guide__heading">
            <p className="eyebrow">THE COLLECTION / OPERATING INSTRUCTIONS</p>
            <h2 id="passport-guide-title">HOW TO EARN<br /><span>YOUR BADGES.</span></h2>
            <p>Three steps. No hidden points, purchases or random drops. Every badge has a specific requirement shown again on its card below.</p>
          </div>
          <div className="passport-guide__steps">
            <article className="passport-guide__step">
              <span>01 / FIRST THING</span>
              <h3>ENABLE THE PASSPORT</h3>
              <p>Press <strong>ENABLE MY LOCAL PASSPORT</strong> below before starting. Until you do, visits and completed experiences are not saved.</p>
            </article>
            <article className="passport-guide__step">
              <span>02 / COMPLETE THE TASK</span>
              <h3>FINISH, DON’T JUST OPEN</h3>
              <p>Answer every question and reach the final result, or complete the CTO Emergency Office roadmap and the Exit Liquidity Department token dossier. The seven core experiences count only when finished.</p>
            </article>
            <article className="passport-guide__step">
              <span>03 / AUTOMATIC REWARD</span>
              <h3>UNLOCK &amp; COLLECT</h3>
              <p>When a requirement is met, the badge unlocks automatically. A notification appears and the Passport updates your progress. No claim button is needed.</p>
            </article>
          </div>
          <div className="passport-guide__difference">
            <article>
              <span>COLLECTION 01</span>
              <h3>VISIT STAMPS</h3>
              <p>Visit any of the 10 departments after enabling the Passport. Each department gives one stamp. A visit alone does not earn an Achievement Badge.</p>
            </article>
            <article>
              <span>COLLECTION 02</span>
              <h3>ACHIEVEMENT BADGES</h3>
              <p>Complete the experience or special challenge written on the badge. For example: finish the DYOR Audit, complete both a Museum exhibit and an Archive record, or build a seven-day Trenches Desk streak.</p>
            </article>
          </div>
          <p className="passport-guide__fineprint">SPECIAL RULES: SEVEN-DAY DESK DUTY requires a visit on seven consecutive UTC calendar dates. THE COMPLETE CIRCUIT requires all seven core experiences. Your record stays in this browser only and is not synchronized across devices.</p>
        </section>

        <PassportClient />
      </div>

      <DepartmentFooter message={["YOUR VISITS HAVE BEEN ACKNOWLEDGED.", "YOUR ACHIEVEMENTS HAVE NO FINANCIAL VALUE."]} />
    </main>
  );
}
