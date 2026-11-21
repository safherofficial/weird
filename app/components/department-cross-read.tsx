import type { DepartmentCrossRead as DepartmentCrossReadData } from "../lib/department-cross-read";

type DepartmentCrossReadProps = {
  read: DepartmentCrossReadData;
};

export default function DepartmentCrossRead({ read }: DepartmentCrossReadProps) {
  return (
    <div className="department-cross-read" aria-label="Behavioural cross-read based on selected answers">
      <div className="department-cross-read__heading">
        <span>BEHAVIOURAL CROSS-READ / SELECTED-ANSWER PATTERN</span>
        <strong>{read.headline}</strong>
        <p>{read.interpretation}</p>
      </div>
      <div className="department-cross-read__signals">
        {read.signals.map((signal) => (
          <article className="department-cross-read__signal" key={signal.label}>
            <span>{signal.label}</span>
            <p>{signal.context}</p>
            <strong>{signal.answer}</strong>
            <small>{signal.detail}</small>
          </article>
        ))}
      </div>
    </div>
  );
}
