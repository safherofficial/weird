import Link from "next/link";
import DepartmentPublicShare from "../components/department-public-share";
import { CLUB_SOCIAL_HASHTAGS, CLUB_SOCIAL_MANIFESTO, buildClubCampaignText } from "./club-social";

const campaignPillars = [
  { number: "01", title: "THE RESEARCH WAS SOLID", copy: "The chart, the thread, the wallet trail. We checked everything. Mostly." },
  { number: "02", title: "THE MARKET MISUNDERSTOOD", copy: "A red candle is not a verdict. It is an invitation to improve the explanation." },
  { number: "03", title: "THE NEXT ONE IS OURS", copy: "Conviction resets faster than the portfolio. Back to the trenches." },
];

export default function ClubCampaignDesk() {
  const hashtags = CLUB_SOCIAL_HASHTAGS.split(" ");
  return (
    <section className="club-campaign-desk" aria-labelledby="club-campaign-title">
      <div className="club-campaign-desk__intro">
        <span>THE 99% CLUB / OFFICIAL SOCIAL IDENTITY DESK</span>
        <h2 id="club-campaign-title">SIX FACTIONS.<br /><em>ONE EXCUSE.</em></h2>
        <p>A home for the crypto investor who believes in their skills, trusts their research and can explain every loss without ever losing conviction. Across every chain, the script is familiar.</p>
        <div className="club-campaign-desk__tags" aria-label="Official campaign hashtags">
          {hashtags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="club-campaign-desk__statement">
        <div className="club-campaign-desk__stamp">OFFICIAL<br />CLUB COPY</div>
        <span>THE 99% CLUB / CORE MANIFESTO</span>
        <p>{CLUB_SOCIAL_MANIFESTO.map((line) => <strong key={line}>{line}</strong>)}</p>
        <small>NOT A STATISTIC. JUST A VERY FAMILIAR STATE OF MIND.</small>
        <div className="club-campaign-desk__actions">
          <DepartmentPublicShare title="THE 99% CLUB / Official invitation" shareText={buildClubCampaignText()} casePath="/club" resourceLabel="INVITE THE NEXT ONE" />
          <Link className="button button--primary" href="/club#content-start">TAKE THE FIVE-QUESTION INTERVIEW <span>↗</span></Link>
        </div>
      </div>
      <div className="club-campaign-desk__pillars" aria-label="The 99% Club shared mindset">
        {campaignPillars.map((pillar) => <article key={pillar.number}><span>{pillar.number} / CLUB LOGIC</span><h3>{pillar.title}</h3><p>{pillar.copy}</p></article>)}
      </div>
      <p className="club-campaign-desk__disclaimer">THE CAMPAIGN IS SATIRE. “99%” IS NOT A MEASURED STATISTIC. SHARING DOES NOT CREATE A VERIFIED MEMBERSHIP, TOKEN ENTITLEMENT OR FINANCIAL BENEFIT.</p>
    </section>
  );
}
