import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import RoadmapGeneratorClient from "./roadmap-generator-client";

export const metadata: Metadata = {
  alternates: { canonical: "/roadmap-generator" },
  title: "CTO Emergency Office | Community Takeover Roadmap",
  description: "The fictional CTO Emergency Office generates seven recovery phases for an abandoned Solana memecoin: deployer silence, community takeover, access questions and endless soon.",
  openGraph: {
    title: "CTO EMERGENCY OFFICE | COMMUNITY TAKEOVER ROADMAP",
    description: "The deployer went quiet. The community took over. Seven fictional recovery phases are now due: soon.",
    images: ["/roadmap-generator/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "CTO EMERGENCY OFFICE | COMMUNITY TAKEOVER ROADMAP",
    description: "Generate a fictional CTO takeover plan, complete with access questions, community milestones and an impossible ETA.",
    images: ["/roadmap-generator/opengraph-image"],
  },
};

export default function RoadmapGeneratorPage() {
  return (
    <main className="audit-page roadmap-page" id="main-content">
      <DepartmentHeader activeSection="roadmap" statusMessage="FUTURE DELIVERABLES / TIMING SUBJECT TO SOON" ctaHref="/roadmap-generator" ctaLabel="GENERATE ROADMAP" />

      <div className="roadmap-shell shell" id="content-start" tabIndex={-1}>
        <aside className="roadmap-intro">
          <div className="audit-intro__meta"><span>FORM RPG-001</span><span>DEPLOYER STATUS: LAST SEEN / SOON</span></div>
          <p className="eyebrow">CTO EMERGENCY OFFICE / COMMUNITY TAKEOVER DESK</p>
          <h1>THE CTO TAKEOVER<br /><span>ROADMAP.</span></h1>
          <p className="audit-intro__lead">
            The deployer has stopped posting. A new CTO account has appeared. Generate seven fictional recovery phases for the CA, the community, the keys and the next promised update.
          </p>
          <div className="roadmap-intro__stamp">
            <span>HANDOVER CHECKLIST / ACCESS NOT VERIFIED</span>
            <strong>A NEW X BIO IS NOT A VERIFIED HANDOVER.</strong>
            <small>ALL RECOVERY PHASES SUBJECT TO THE NEXT COMMUNITY UPDATE.</small>
          </div>
          <div className="roadmap-intro__fineprint">
            THIS IS A PARODY GENERATOR. NO REAL PROJECT, TEAM OR TOKEN IS INSPECTED.
          </div>
        </aside>

        <RoadmapGeneratorClient />
      </div>

      <DepartmentFooter message={["YOUR CTO PLAN HAS BEEN FILED.", "THE DEPLOYER STILL HAS NOT REPLIED."]} />
    </main>
  );
}
