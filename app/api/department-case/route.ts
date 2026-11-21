import { NextRequest, NextResponse } from "next/server";
import { departments } from "../../divisions";
import { buildDepartmentNarrative } from "../../lib/department-narrative";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const requestedDepartment = request.nextUrl.searchParams.get("department");
  const office = departments.find((department) => department.section === requestedDepartment);

  if (!office) {
    return NextResponse.json(
      { error: "A valid Department office is required." },
      { status: 400, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  const issueDate = new Date().toISOString().slice(0, 10);
  const narrative = buildDepartmentNarrative(issueDate, office.section);

  return NextResponse.json(narrative, {
    headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
  });
}
