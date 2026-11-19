import Link from "next/link";

type DepartmentJourneyId =
  | "audit"
  | "simulator"
  | "utility"
  | "roadmap"
  | "whitepaper"
  | "club"
  | "cope";

type DepartmentDestination = {
  href: string;
  title: string;
  description: string;
};

const departmentRoutes: Record<DepartmentJourneyId, readonly DepartmentDestination[]> = {
  audit: [
    {
      href: "/simulator",
      title: "THE BAGHOLDER SIMULATOR",
      description: "Put your conviction through seven scripted market events and see what happens to your imaginary portfolio.",
    },
    {
      href: "/cope-index",
      title: "THE GLOBAL COPE INDEX",
      description: "Get a personal reading, then consult today's separate synthetic Department index.",
    },
  ],
  simulator: [
    {
      href: "/audit",
      title: "THE DYOR AUDIT 2.0",
      description: "Open a second case on your research habits, conviction and relationship with the group chat.",
    },
    {
      href: "/club",
      title: "THE 99% CLUB",
      description: "Submit a fictional membership application. Benefits remain firmly unavailable.",
    },
  ],
  utility: [
    {
      href: "/roadmap-generator",
      title: "THE ROADMAP GENERATOR",
      description: "Turn a project pitch into seven fictional milestones and a delivery window called soon.",
    },
    {
      href: "/whitepaper-factory",
      title: "THE WHITEPAPER FACTORY",
      description: "Give the concept a technical-sounding document, complete with invented tokenomics.",
    },
  ],
  roadmap: [
    {
      href: "/whitepaper-factory",
      title: "THE WHITEPAPER FACTORY",
      description: "Every ambitious roadmap deserves a document with an abstract and nine questionable sections.",
    },
    {
      href: "/utility-inspector",
      title: "THE UTILITY INSPECTOR",
      description: "Return to the claims desk and ask what the project is supposed to do.",
    },
  ],
  whitepaper: [
    {
      href: "/utility-inspector",
      title: "THE UTILITY INSPECTOR",
      description: "Put the product claims back under review. A whitepaper is not proof of utility.",
    },
    {
      href: "/museum",
      title: "THE BAGHOLDER MUSEUM",
      description: "Explore fictional artifacts preserved from the long history of questionable conviction.",
    },
  ],
  club: [
    {
      href: "/cope-index",
      title: "THE GLOBAL COPE INDEX",
      description: "Request a personal reading alongside the Department's entirely synthetic daily index.",
    },
    {
      href: "/archives",
      title: "DEPARTMENT ARCHIVES",
      description: "Browse fictional incidents, records and administrative evidence from across the Department.",
    },
  ],
  cope: [
    {
      href: "/daily-office",
      title: "THE DAILY DEPARTMENT",
      description: "Read today's fictional bulletin, incident report and internal memo.",
    },
    {
      href: "/club",
      title: "THE 99% CLUB",
      description: "File a membership application with the office of collective financial regret.",
    },
  ],
};

type DepartmentNextStepsProps = {
  currentDepartment: DepartmentJourneyId;
};

export default function DepartmentNextSteps({ currentDepartment }: DepartmentNextStepsProps) {
  const destinations = departmentRoutes[currentDepartment];

  return (
    <section className="department-next-steps" aria-labelledby="department-next-steps-title">
      <div className="department-next-steps__heading">
        <div>
          <span className="department-next-steps__eyebrow">DEPARTMENTAL ROUTING / YOUR FILE IS NOT THE LAST</span>
          <h2 id="department-next-steps-title">WHAT HAPPENS NEXT?</h2>
        </div>
        <span className="department-next-steps__count">NEXT ASSIGNMENT / 02 OFFICES</span>
      </div>

      <div className="department-next-steps__grid">
        {destinations.map((destination, index) => (
          <Link
            className="department-next-steps__card"
            href={destination.href}
            key={destination.href}
            aria-label={"Open " + destination.title + ". " + destination.description}
          >
            <span className="department-next-steps__number">ROUTE / 0{index + 1}</span>
            <strong>{destination.title}</strong>
            <span className="department-next-steps__description">{destination.description}</span>
            <span className="department-next-steps__cta">ENTER DEPARTMENT <span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>

      <div className="department-next-steps__passport">
        <p>
          <span>KEEP THE RECORD</span>
          Enable the optional Department Passport to collect visit stamps locally on this device.
        </p>
        <Link href="/passport">OPEN DEPARTMENT PASSPORT ↗</Link>
      </div>
    </section>
  );
}
