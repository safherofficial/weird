import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import { exhibits, getExhibit } from "../../museum-data";

type ExhibitPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return exhibits.map((exhibit) => ({ slug: exhibit.slug }));
}

export async function generateMetadata({ params }: ExhibitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exhibit = getExhibit(slug);
  if (!exhibit) {
    return {
      title: "Exhibit Not Found",
      robots: { index: false, follow: false },
    };
  }
  const title = exhibit.title + " | THE BAGHOLDER MUSEUM";
  const description = exhibit.description;
  const image = "/museum/exhibits/" + exhibit.slug + "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: "/museum/exhibits/" + exhibit.slug },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional museum exhibit: " + exhibit.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function MuseumExhibitPage({ params }: ExhibitPageProps) {
  const { slug } = await params;
  const exhibit = getExhibit(slug);
  if (!exhibit) notFound();

  const path = "/museum/exhibits/" + exhibit.slug;
  const xText = [
    "I visited THE BAGHOLDER MUSEUM.",
    "Exhibit " + exhibit.accession + ": " + exhibit.title + ".",
    exhibit.plaque,
    "A fictional artifact from the archive of questionable conviction.",
  ].join(" ");
  const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" +
    encodeURIComponent("https://weird-zeta.vercel.app" + path);

  return (
    <main className="audit-page museum-exhibit-page" id="main-content">
      <DepartmentHeader activeSection="museum" statusMessage="PUBLIC EXHIBIT / FICTIONAL COLLECTION" ctaHref="/museum" ctaLabel="BACK TO MUSEUM" />

      <article className="museum-exhibit shell" id="content-start" tabIndex={-1}>
        <div className="museum-exhibit__topline">
          <span>ACCESSION No. {exhibit.accession}</span>
          <span>{exhibit.category} / {exhibit.era}</span>
        </div>

        <div className="museum-exhibit__artifact" aria-label="Illustrative museum artifact card">
          <span>THE DYOR DEPARTMENT / MUSEUM COLLECTION</span>
          <b>{exhibit.accession}</b>
          <strong>{exhibit.title}</strong>
          <small>CONDITION: {exhibit.condition}</small>
        </div>

        <div className="museum-exhibit__details">
          <p className="eyebrow">CURATORIAL RECORD / {exhibit.accession}</p>
          <h1>{exhibit.title}</h1>
          <div className="museum-exhibit__plaque">“{exhibit.plaque}”</div>
          <section>
            <span>OBJECT DESCRIPTION</span>
            <p>{exhibit.description}</p>
          </section>
          <section>
            <span>CURATOR'S NOTE</span>
            <p>{exhibit.curatorNote}</p>
          </section>
          <div className="museum-exhibit__facts">
            <div><span>COLLECTION</span><strong>{exhibit.category}</strong></div>
            <div><span>ERA</span><strong>{exhibit.era}</strong></div>
            <div><span>CONDITION</span><strong>{exhibit.condition}</strong></div>
            <div><span>EMOTIONAL WEIGHT</span><strong>{exhibit.emotionalWeight}</strong></div>
          </div>
          <div className="museum-exhibit__actions">
            <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">SHARE THIS EXHIBIT ON X <span>↗</span></a>
            <Link className="button button--quiet" href="/museum">RETURN TO THE COLLECTION ↗</Link>
          </div>
          <p className="museum-exhibit__disclaimer">
            This is a fictional satirical exhibit. It does not represent or accuse a real person, company, token,
            project or community. All object descriptions and provenance notes are invented.
          </p>
        </div>
      </article>

      <DepartmentFooter message={["THE ARCHIVE REMAINS OPEN.", "THE EXHIBITS REMAIN UNVERIFIED."]} />
    </main>
  );
}
