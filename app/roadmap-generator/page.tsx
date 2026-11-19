import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import RoadmapGeneratorClient from "./roadmap-generator-client";

export const metadata: Metadata = {
  title: "Roadmap Generator",
  description: "Six questions. Seven fictional phases. Generate a crypto roadmap featuring ambitious milestones, questionable deadlines and a generous amount of soon.",
  openGraph: {
    title: "THE ROADMAP GENERATOR",
    description: "Every milestone is achievable. Eventually. Probably. Soon.",
    images: ["/roadmap-generator/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE ROADMAP GENERATOR",
    description: "Six questions. Seven fictional phases. One very ambitious timeline.",
    images: ["/roadmap-generator/opengraph-image"],
  },
};

export default function RoadmapGeneratorPage() {
  return (
    <main className="audit-page roadmap-page" id="main-content">
      <DepartmentHeader activeSection="roadmap" statusMessage="FUTURE DELIVERABLES / TIMING SUBJECT TO SOON" ctaHref="/roadmap-generator" ctaLabel="GENERATE ROADMAP" />

      <div className="roadmap-shell shell" id="content-start" tabIndex={-1}>
        <aside className="roadmap-intro">
          <div className="audit-intro__meta"><span>FORM RPG-001</span><span>ESTIMATED ARRIVAL: SOON</span></div>
          <p className="eyebrow">OFFICE OF FUTURE DELIVERABLES</p>
          <h1>THE ROADMAP<br /><span>GENERATOR.</span></h1>
          <p className="audit-intro__lead">
            Every project has a vision. Every vision has phases. Every phase has a date that will be reviewed in a future phase.
          </p>
          <div className="roadmap-intro__stamp">
            <span>OFFICIAL DEPARTMENTAL GUIDANCE</span>
            <strong>SOON™ IS A FLEXIBLE DELIVERY WINDOW.</strong>
            <small>ALL MILESTONES SUBJECT TO A FURTHER ANNOUNCEMENT.</small>
          </div>
          <div className="roadmap-intro__fineprint">
            THIS IS A PARODY GENERATOR. NO REAL PROJECT, TEAM OR TOKEN IS INSPECTED.
          </div>
        </aside>

        <RoadmapGeneratorClient />
      </div>

      <DepartmentFooter message={["YOUR MILESTONES HAVE BEEN ACKNOWLEDGED.", "YOUR DEADLINES REMAIN UNDER DISCUSSION."]} />
    </main>
  );
}
