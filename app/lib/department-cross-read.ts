export type DepartmentCrossReadSignal = {
  label: string;
  context: string;
  answer: string;
  detail: string;
};

export type DepartmentCrossRead = {
  headline: string;
  interpretation: string;
  signals: [DepartmentCrossReadSignal, DepartmentCrossReadSignal];
};
