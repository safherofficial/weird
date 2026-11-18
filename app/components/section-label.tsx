import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label__dot" aria-hidden="true" />
      {children}
    </div>
  );
}
