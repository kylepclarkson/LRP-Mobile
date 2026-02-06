import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { StampsService } from "../api/stamps/stamps.service";
import { StampCard } from "../api/stamps/stamps.types";
import { useAuthContext } from "./auth";

/**
 * Context provider for a user's stamp cards, records, and rewards
 */
type StampsContextType = {
  stampCards: StampCard[];
  loadingStampCards: boolean;
  refreshStampCards: (queryParams?: string) => Promise<void>;
}

const StampsContext = createContext<StampsContextType | undefined>(undefined);

export function StampsProvider(
  { children }: { children: React.ReactNode }
) {
  const { user } = useAuthContext();
  // Provide a reference to the user to avoid stale closure issues. 
  const userRef = useRef(user);

  // Stamp card states
  const [stampCards, setStampCards] = useState<StampCard[]>([]);
  const [loadingStampCards, setLoadingStampCards] = useState<boolean>(false);

  useEffect(() => {
    userRef.current = user;
  }, [user])

  const refreshStampCards = useCallback(async (queryParams?: string) => {
    console.debug("Refreshing stamp cards");
    if (!userRef.current) {
      console.debug("Clearing stamp cards");
      setStampCards([]);
      return;
    }
    try {
      setLoadingStampCards(true);
      const data = await StampsService.getStampCards(queryParams);
      setStampCards(data);
      console.debug("Fetched stamp cards", JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching stamp cards", err);
    } finally {
      setLoadingStampCards(false);
    }
  }, []);

  useEffect(() => {
    refreshStampCards();
  }, [user]);

  return (
    <StampsContext.Provider value={{
      stampCards,
      loadingStampCards,
      refreshStampCards,
    }}>
      {children}
    </StampsContext.Provider>
  )
}

export function useStampsContext() {
  const context = useContext(StampsContext);
  if (context === undefined) {
    throw new Error('useStampsContext must be used within a StampsProvider')
  }
  return context;
}