import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DailyNoticeView from "../../daily-notice-view";
import { buildDailyNotice, isValidUtcDate } from "../../daily-engine";

type DailyArchivePageProps = {
  params: Promise<{ date: string }>;
};

export async function generateMetadata({ params }: DailyArchivePageProps): Promise<Metadata> {
  const { date } = await params;
  if (!isValidUtcDate(date)) {
    return {
      title: "Unrecognized Daily Notice",
      robots: { index: false, follow: false },
    };
  }
  const notice = buildDailyNotice(date);
  const title = notice.headline + " | DAILY DEPARTMENTAL ABSURDITY";
  const description = notice.subject + " " + notice.finding;
  const route = "/daily-office/archive/" + date;
  const image = route + "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: route },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      url: route,
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional Department daily notice for " + date }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function DailyArchivePage({ params }: DailyArchivePageProps) {
  const { date } = await params;
  if (!isValidUtcDate(date)) notFound();
  const notice = buildDailyNotice(date);

  return (
    <main className="audit-page daily-office-page" id="main-content">
      <DepartmentHeader activeSection="daily" statusMessage="ARCHIVED DAILY NOTICE / FICTIONAL" ctaHref="/daily-office" ctaLabel="TODAY'S NOTICE" />
      <header className="daily-office-intro shell">
        <div className="audit-intro__meta"><span>ARCHIVE / DDA-DAILY</span><span>ISSUE / UTC {date}</span></div>
        <p className="eyebrow">OFFICE OF PUBLICLY ADMINISTERED ABSURDITY</p>
        <h1>ARCHIVED<br /><span>NOTICE.</span></h1>
        <p className="audit-intro__lead">A preserved fictional template rotation from the Department's daily notice office.</p>
      </header>
      <DailyNoticeView notice={notice} isArchive />
      <DepartmentFooter message={["THE ARCHIVED NOTICE HAS BEEN OPENED.", "THE ARCHIVE CONTAINS FICTION, NOT CURRENT EVENTS."]} />
    </main>
  );
}
