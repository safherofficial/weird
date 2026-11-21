import Link from "next/link";
import DepartmentPublicShare from "../components/department-public-share";
import { CLUB_SOCIAL_HASHTAGS, CLUB_SOCIAL_MANIFESTO, buildClubCampaignText } from "./club-social";

export default function ClubCampaignDesk() {
  const hashtags = CLUB_SOCIAL_HASHTAGS.split(" ");
  return (
    <section className="club-campaign-desk" aria-labelledby="club-campaign-title">
      <div className="club-campaign-desk__intro">
        <span>THE 99% CLUB / OFFICIAL SOCIAL IDENTITY DESK</span>
        <h2 id="club-campaign-title">MAKE THE <em>EXCUSE</em> PUBLIC.</h2>
        <p>One shared language for crypto culture across every chain. Pick your faction, publish your fictional file and bring the next degen into the paperwork.</p>
        <div className="club-campaign-desk__tags" aria-label="Official campaign hashtags">
          {hashtags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="club-campaign-desk__statement">
        <div className="club-campaign-desk__stamp">OFFICIAL<br />CLUB COPY</div>
        <span>THE 99% CLUB / CORE MANIFESTO</span>
        <p>{CLUB_SOCIAL_MANIFESTO.map((line) => <strong key={line}>{line}</strong>)}</p>
        <small>SIX FICTIONAL FACTIONS. ONE SHARED EXCUSE. ALL CHAINS.</small>
        <div className="club-campaign-desk__actions">
          <DepartmentPublicShare title="THE 99% CLUB / Official invitation" shareText={buildClubCampaignText()} casePath="/club" resourceLabel="CLUB INVITE" />
          <Link className="button button--primary" href="/club#content-start">TAKE THE FIVE-QUESTION INTERVIEW <span>↗</span></Link>
        </div>
      </div>
      <p className="club-campaign-desk__disclaimer">THE CAMPAIGN IS SATIRE. “99%” IS NOT A MEASURED STATISTIC. SHARING A POST DOES NOT CREATE A VERIFIED MEMBERSHIP OR TOKEN ENTITLEMENT.</p>
    </section>
  );
}
