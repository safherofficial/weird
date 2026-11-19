"use client";

import { useEffect } from "react";
import { recordPassportActivity, type PassportActivityId } from "../passport/passport-store";

export default function RecordPassportActivity({ activity }: { activity: PassportActivityId }) {
  useEffect(() => {
    recordPassportActivity(activity);
  }, [activity]);

  return null;
}
