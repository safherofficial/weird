import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import DepartmentPublicShare from "../../../components/department-public-share";
import { CLUB_FACTION_IDS, getClubFactionById, factions } from "../../club-engine";
import { buildClubFactionShareText } from "../../club-social";

type ClubFactionPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return CLUB_FACTION_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: ClubFactionPageProps): Promise<Metadata> {
  const { id } = await params;
  const faction = getClubFactionById(id);
  if (!faction) {
    return {
      title: "Unrecognized 99% Club faction",
      robots: { index: false, follow: false },
    };
  }

  const canonical = "/club/factions/" + faction.id;
  const description = faction.motto + " " + faction.creed +
    " Discover this fictional crypto-culture faction inside THE 99% CLUB.";
  return {
    alternates: { canonical },
    title: faction.title,
    description,
    openGraph: {
      type: "website",
      title: faction.title + " | THE 99% CLUB",
      description,
      images: [canonical + "/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: faction.title + " | THE 99% CLUB",
      description,
      images: [canonical + "/opengraph-image"],
    },
  };
}

export default async function ClubFactionPage({ params }: ClubFactionPageProps) {
  const { id } = await params;
  const faction = getClubFactionById(id);
  if (!faction) notFound();

  const casePath = "/club/factions/" + faction.id;
  const shareText = buildClubFactionShareText(faction);

  return (
    <main className="audit-page club-faction-page" id="main-content">
      <DepartmentHeader
        activeSection="club"
        statusMessage="FACTION DOSSIER / FICTIONAL CLASSIFICATION"
        ctaHref="/club"
        ctaLabel="APPLY FOR MEMBERSHIP"
      />

      <div className="club-faction-page__shell shell" id="content-start" tabIndex={-1}>
        <section className="club-faction-page__hero" aria-labelledby="club-faction-title">
          <div className="club-faction-page__topline">
            <span>THE 99% CLUB / OFFICIAL FACTION REGISTER</span>
            <span>FACTION CODE / {faction.code}</span>
          </div>
          <div className="club-faction-page__identity">
            <div className="club-faction-page__seal" aria-hidden="true">{faction.seal}</div>
            <div>
              <p className="eyebrow">CRYPTO CULTURE / ALL CHAINS / FICTIONAL ARCHETYPE</p>
              <h1 id="club-faction-title">{faction.title}</h1>
              <p className="club-faction-page__designation">{faction.designation}</p>
              <strong className="club-faction-page__motto">“{faction.motto}”</strong>
            </div>
          </div>
          <div className="club-faction-page__manifesto">
            <span>FACTION CREED / {faction.code}</span>
            <p>{faction.creed}</p>
          </div>
        </section>

        <section className="club-faction-page__details" aria-label="Faction details">
          <article>
            <span>THE OFFICIAL RITUAL</span>
            <h2>WEEKLY CONDUCT.</h2>
            <p>{faction.ritual}</p>
          </article>
          <article>
            <span>DEPARTMENTAL DESIGNATION</span>
            <h2>YOUR OFFICE.</h2>
            <p>{faction.designation}. The Department recognizes this appointment as entirely fictional and administratively binding to absolutely nothing.</p>
          </article>
          <article>
            <span>MEMBERSHIP CLASSIFICATION</span>
            <h2>HOW YOU GET HERE.</h2>
            <p>Complete the five-question Club interview. Your primary answer archetype determines your faction automatically; there is no manual faction shopping or wallet-based qualification.</p>
          </article>
        </section>

        <section className="club-faction-page__share" aria-label="Share this faction">
          <div>
            <span>PUBLIC FACTION DOSSIER / {faction.code}</span>
            <h2>MAKE YOUR EXCUSE <em>OFFICIAL.</em></h2>
            <p>Send this faction dossier to the group chat. Let the Department classify the rest of the timeline.</p>
          </div>
          <div className="club-faction-page__share-actions">
            <DepartmentPublicShare
              title={faction.title + " | THE 99% CLUB"}
              shareText={shareText}
              casePath={casePath}
              resourceLabel="FACTION DOSSIER"
            />
          </div>
        </section>

        <section className="club-faction-page__related" aria-labelledby="club-related-factions-title">
          <header>
            <span>THE COMPLETE REGISTER</span>
            <h2 id="club-related-factions-title">SIX FACTIONS. <em>ZERO ACCOUNTABILITY.</em></h2>
          </header>
          <div className="club-faction-page__related-grid">
            {Object.values(factions).map((other) => (
              <Link
                className={"club-faction-page__related-card" + (other.id === faction.id ? " is-current" : "")}
                href={"/club/factions/" + other.id}
                key={other.id}
                aria-current={other.id === faction.id ? "page" : undefined}
              >
                <b>{other.code}</b>
                <strong>{other.title}</strong>
                <span>{other.id === faction.id ? "CURRENT DOSSIER" : "OPEN DOSSIER ↗"}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="club-faction-page__actions">
          <Link className="button button--primary" href="/club">FIND MY FACTION <span>↗</span></Link>
          <Link className="button button--outline" href="/club#club-factions-title">RETURN TO THE CLUB REGISTER <span>↗</span></Link>
        </div>

        <p className="club-faction-page__disclaimer">
          THE 99% CLUB IS FICTIONAL SATIRE. “99%” IS NOT A MEASURED STATISTIC ABOUT CRYPTO INVESTORS.
          These archetypes are fictional and are not financial profiles, market research, investment advice,
          verified memberships or real-world groups. The satirical language travels across chains; the Department's casework remains fictional.
        </p>
      </div>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="club" />
      </div>

      <DepartmentFooter message={["SIX FACTIONS. ONE VERY FLEXIBLE THESIS.", "THE DEPARTMENT ACCEPTS NO LIABILITY FOR THE GROUP CHAT."]} />
    </main>
  );
}
