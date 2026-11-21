"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PASSPORT_STORAGE_KEY, readPassport, type PassportActivityId } from "../passport/passport-store";

type ReceiptStatus = "checking" | "saved" | "missing";

export default function PassportResultReceipt({ activity }: { activity: PassportActivityId }) {
  const [status, setStatus] = useState<ReceiptStatus>("checking");

  useEffect(() => {
    function syncStatus() {
      const passport = readPassport();
      setStatus(passport?.completedActivities.includes(activity) ? "saved" : "missing");
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === null || event.key === PASSPORT_STORAGE_KEY) syncStatus();
    }

    syncStatus();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [activity]);

  const saved = status === "saved";

  return (
    <aside
      className="passport-result-receipt"
      data-status={status}
      aria-label="Department Passport completion status"
      aria-live="polite"
    >
      <div className="passport-result-receipt__body">
        <span>DEPARTMENT PASSPORT / LOCAL COMPLETION RECORD</span>
        <strong>
          {status === "checking"
            ? "CHECKING THIS DEVICE"
            : saved
              ? "COMPLETED EXPERIENCE RECORDED"
              : "NO PASSPORT RECEIPT FOUND"}
        </strong>
        <p>
          {status === "checking"
            ? "Checking whether this completed experience was saved to your optional local Passport."
            : saved
              ? "This completed experience is saved in your Passport on this device. Your achievement progress is available there."
              : "This result remains shareable, but no local Passport completion was found. Enable the Passport before your next experience; earlier completions are not backfilled."}
        </p>
      </div>
      <Link className="passport-result-receipt__link" href="/passport">
        {saved ? "VIEW MY PASSPORT ↗" : "OPEN / ENABLE PASSPORT ↗"}
      </Link>
    </aside>
  );
}
