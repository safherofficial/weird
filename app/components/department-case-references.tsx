import Link from "next/link";
import { getDepartmentCaseReferences, type DepartmentCaseReferenceSource } from "../daily-office/case-atlas";

type DepartmentCaseReferencesProps = {
  source: DepartmentCaseReferenceSource;
  slug: string;
};

export default function DepartmentCaseReferences({ source, slug }: DepartmentCaseReferencesProps) {
  const references = getDepartmentCaseReferences(source, slug);
  if (references.length === 0) return null;

  return (
    <section className="department-case-references" aria-labelledby="department-case-references-title">
      <div className="department-case-references__heading">
        <span>INSTITUTIONAL CROSS-REFERENCE / {references.length} LINKED CASE {references.length === 1 ? "THREAD" : "THREADS"}</span>
        <h2 id="department-case-references-title">THIS RECORD HAS A WIDER FILE.</h2>
        <p>These case themes connect this item to the wider Department register. The links identify fictional editorial relationships, not additional evidence about a real event.</p>
      </div>

      <div className="department-case-references__list">
        {references.map((reference) => (
          <article className="department-case-references__item" key={reference.theme}>
            <div>
              <span>LINKED CASE THEME</span>
              <h3><Link href={"/daily-office/atlas#" + reference.anchor}>{reference.theme} ↗</Link></h3>
            </div>
            <p>{reference.narrative}</p>
            <div className="department-case-references__offices">
              <span>THREE RESPONSIBLE DIVISIONS</span>
              {reference.offices.map((office) => (
                <Link href={office.href} key={office.section}>
                  {office.number} / {office.title} ↗
                </Link>
              ))}
            </div>
            <div className="department-case-references__counterpart">
              <span>{reference.counterpart.label} / {reference.counterpart.accession}</span>
              <Link href={reference.counterpart.href}>{reference.counterpart.title} ↗</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
