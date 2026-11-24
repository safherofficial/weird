import Link from "next/link";
import DepartmentCaseChain from "./department-case-chain";
import { departmentJourneys, type DepartmentJourneyId } from "../lib/department-journeys";

type DepartmentNextStepsProps = {
  currentDepartment: DepartmentJourneyId;
};

export default function DepartmentNextSteps({ currentDepartment }: DepartmentNextStepsProps) {
  const destinations = departmentJourneys[currentDepartment];

  return (
    <section className="department-next-steps" aria-labelledby="department-next-steps-title">
      <div className="department-next-steps__heading">
        <div>
          <span className="department-next-steps__eyebrow">DEPARTMENTAL ROUTING / YOUR FILE IS NOT THE LAST</span>
          <h2 id="department-next-steps-title">WHAT HAPPENS NEXT?</h2>
        </div>
        <span className="department-next-steps__count">
          NEXT ASSIGNMENT / {String(destinations.length).padStart(2, "0")} OFFICES
        </span>
      </div>

      <div className="department-next-steps__grid">
        {destinations.map((destination, index) => (
          <Link
            className="department-next-steps__card"
            href={destination.href}
            key={destination.href}
            aria-label={"Open " + destination.title + ". " + destination.description}
          >
            <span className="department-next-steps__number">ROUTE / {String(index + 1).padStart(2, "0")}</span>
            <strong>{destination.title}</strong>
            <span className="department-next-steps__description">{destination.description}</span>
            <span className="department-next-steps__cta">ENTER DEPARTMENT <span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>

      <div className="department-next-steps__atlas-link">
        <div>
          <span>INSTITUTIONAL REFERENCE / 18 THEMATIC FILES</span>
          <strong>TRACE THIS OFFICE THROUGH THE ENTIRE DEPARTMENT.</strong>
          <p>Open the Case Atlas to follow shared cases, archive precedents and Museum records across all ten divisions.</p>
        </div>
        <Link className="button button--quiet" href="/daily-office/atlas">OPEN THE CASE ATLAS ↗</Link>
      </div>

      <DepartmentCaseChain currentDepartment={currentDepartment} />

      <div className="department-next-steps__passport">
        <p>
          <span>KEEP THE RECORD</span>
          With the Passport enabled, department visits and completed-experience badges are saved locally on this device. Enable it before starting.
        </p>
        <Link href="/passport">OPEN / ENABLE PASSPORT ↗</Link>
      </div>
    </section>
  );
}
