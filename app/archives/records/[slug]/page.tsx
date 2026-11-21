import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import RecordPassportActivity from "../../../components/record-passport-activity";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentPublicShare from "../../../components/department-public-share";
import DepartmentCaseReferences from "../../../components/department-case-references";
import { archiveRecords, getArchiveRecord } from "../../archive-data";

type ArchiveRecordPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return archiveRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: ArchiveRecordPageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getArchiveRecord(slug);
  if (!record) {
    return {
      title: "Archive File Not Found",
      robots: { index: false, follow: false },
    };
  }
  const title = record.title + " | WHALE & WALLET INVESTIGATION";
  const description = record.summary;
  const route = "/archives/records/" + record.slug;
  const image = route + "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: route },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional Department archive record: " + record.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArchiveRecordPage({ params }: ArchiveRecordPageProps) {
  const { slug } = await params;
  const record = getArchiveRecord(slug);
  if (!record) notFound();

  const route = "/archives/records/" + record.slug;
  const xText = [
    "THE DYOR DEPARTMENT ARCHIVES / " + record.accession,
    record.title + ".",
    record.finding,
    "A fictional Department record. Filed for entertainment purposes.",
  ].join(" ");

  return (
    <main className="audit-page archive-record-page" id="main-content">
      <RecordPassportActivity activity="archive-record" />
      <DepartmentHeader activeSection="archives" statusMessage="PUBLIC ARCHIVE RECORD / FICTIONAL" ctaHref="/archives" ctaLabel="BACK TO ARCHIVES" />

      <article className="archive-record shell" id="content-start" tabIndex={-1}>
        <div className="archive-record__meta">
          <span>ACCESSION No. {record.accession}</span>
          <span>{record.category} / {record.clearance}</span>
        </div>

        <div className="archive-record__document">
          <div className="archive-record__document-head">
            <span>WHALE & WALLET INVESTIGATION / FICTIONAL CASE ARCHIVE</span>
            <strong>{record.accession}</strong>
          </div>
          <p className="eyebrow">{record.department}</p>
          <h1>{record.title}</h1>
          <p className="archive-record__summary">{record.summary}</p>
          <div className="archive-record__stamp">{record.stamp}</div>

          <div className="archive-record__finding">
            <span>DEPARTMENTAL FINDING</span>
            <strong>{record.finding}</strong>
          </div>

          {record.sections.map((section, index) => (
            <section className="archive-record__section" key={section.heading}>
              <div className="archive-record__section-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}

          <div className="archive-record__related">
            <span>RELATED DEPARTMENT</span>
            <Link href={record.relatedHref}>{record.relatedLabel} ↗</Link>
          </div>
          <DepartmentCaseReferences source="archive" slug={record.slug} />
          <div className="archive-record__footer">
            <span>RECORD STATUS / FILED</span>
            <span>PROVENANCE / FICTIONAL ARCHIVE COLLECTION</span>
          </div>
        </div>

        <div className="archive-record__actions">
          <DepartmentPublicShare
            title="WHALE & WALLET INVESTIGATION / Record"
            shareText={xText}
            casePath={route}
            resourceLabel="ARCHIVE RECORD"
          />
          <Link className="button button--quiet" href="/archives">RETURN TO THE ARCHIVE ↗</Link>
        </div>

        <p className="archive-record__disclaimer">
          This is a fictional satirical record created for THE DYOR DEPARTMENT. It does not describe or accuse
          a real person, company, project, token, market event or community. All provenance and contents are invented.
        </p>
      </article>

      <DepartmentFooter message={["THE FILE HAS BEEN RETURNED TO THE REGISTER.", "NO REAL HISTORY WAS DISTURBED."]} />
    </main>
  );
}
