import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DailyNoticeView from "./daily-notice-view";
import { buildDailyNotice } from "./daily-engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daily Departmental Absurdity",
  description: "One fictional administrative bulletin per UTC day. No live news, market feed or real-world event reporting.",
  openGraph: {
    title: "DAILY DEPARTMENTAL ABSURDITY",
    description: "A fictional notice from the office of questionable conviction.",
    images: ["/daily-office/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DAILY DEPARTMENTAL ABSURDITY",
    description: "One fictional notice. No real news. No market feed.",
    images: ["/daily-office/opengraph-image"],
  },
};

export default function DailyOfficePage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const notice = buildDailyNotice(issueDate);

  return (
    <main className="audit-page daily-office-page" id="main-content">
      <DepartmentHeader activeSection="daily" statusMessage="DAILY NOTICE / FICTIONAL TEMPLATE ROTATION" ctaHref="/daily-office" ctaLabel="TODAY'S NOTICE" />

      <header className="daily-office-intro shell">
        <div className="audit-intro__meta"><span>FORM DDA-DAILY</span><span>ISSUE / UTC {issueDate}</span></div>
        <p className="eyebrow">OFFICE OF PUBLICLY ADMINISTERED ABSURDITY</p>
        <h1>DAILY DEPARTMENTAL<br /><span>ABSURDITY.</span></h1>
        <p className="audit-intro__lead">One fictional bulletin per UTC day. No breaking news. No market data. No obligation to make sense.</p>
      </header>

      <DailyNoticeView notice={notice} />

      <DepartmentFooter message={["THE NOTICE HAS BEEN ISSUED.", "THE UNDERLYING SITUATION REMAINS ENTIRELY FICTIONAL."]} />
    </main>
  );
}
