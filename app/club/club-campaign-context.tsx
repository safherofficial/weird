"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  PASSPORT_UPDATED_EVENT,
  readPassport,
} from "../passport/passport-store";
import {
  getClubCampaignContinuity,
  type ClubCampaignContinuity,
} from "./club-campaign-continuity-data";

type ClubCampaignContextValue = {
  continuity: ClubCampaignContinuity | null;
  ready: boolean;
};

const ClubCampaignContext = createContext<ClubCampaignContextValue | null>(null);

/**
 * Provides one shared, read-only weekly campaign snapshot to the Club stages.
 * It listens to the existing local Passport events and adds no persistence.
 */
export default function ClubCampaignContinuityProvider({ children }: { children: ReactNode }) {
  const [continuity, setContinuity] = useState<ClubCampaignContinuity | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function refresh() {
      setContinuity(getClubCampaignContinuity(readPassport(), new Date()));
      setReady(true);
    }

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(PASSPORT_UPDATED_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PASSPORT_UPDATED_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return (
    <ClubCampaignContext.Provider value={{ continuity, ready }}>
      {children}
    </ClubCampaignContext.Provider>
  );
}

export function useClubCampaignContext() {
  const value = useContext(ClubCampaignContext);
  if (!value) {
    throw new Error("Club campaign components must be rendered inside ClubCampaignContinuityProvider.");
  }
  return value;
}
