import { StampCard } from "@/types/stamps";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getStampCards } from "../services/stamps.service";
import { useAuthContext } from "./auth";

/**
 * Context provider for a user's stamp cards, records, and rewards
 */
type StampsContextType = {
  stampCards: StampCard[];
  loadingStampCards: boolean;
  errorStampCards: string | null;
  fetchStampCards: (queryParams?: string) => Promise<void>;
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
  const [errorStampCards, setErrorStampCards] = useState<string | null>(null);


  const refreshStampCards = useCallback(async (queryParams?: string) => {
    if (!userRef.current) {
      console.debug("Clearing stamp cards");
      setStampCards([]);
      return;
    }
    try {
      setLoadingStampCards(true);
      // TODO implement and user stamps.service.ts w/ query params
      const data = await getStampCards(queryParams);
      setStampCards(data);
      console.debug("Fetched stamp cards");
    } catch (err) {
      console.error("Error fetching stamp cards", err);
      setErrorStampCards("Error fetching stamp cards");
    } finally {
      setLoadingStampCards(false);
    }
  }, []);

  useEffect(() => {
    refreshStampCards();
  }, [user]);


  // --- TODO replace below with the above.
  const fetchStampCards = useCallback(async (queryParams?: string) => {
    setLoadingStampCards(true);
    try {
      const res = await getStampCards(queryParams);
      setStampCards(res);
    } catch (err) {
      setStampCards([]);
      setErrorStampCards("Error fetching stamp cards");
    } finally {
      setLoadingStampCards(false);
    }
  }, [user]);


  useEffect(() => {
    if (!user) {
      setStampCards([]);
      return;
    }

    fetchStampCards();

  }, [user, fetchStampCards]);
  // --- ---

  return (
    <StampsContext.Provider value={{
      stampCards,
      loadingStampCards,
      errorStampCards,
      fetchStampCards
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