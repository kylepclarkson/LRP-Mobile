import { StampCard } from "@/types/stamps";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
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

  // Stamp card states
  const [stampCards, setStampCards] = useState<StampCard[]>([]);
  const [loadingStampCards, setLoadingStampCards] = useState<boolean>(false);
  const [errorStampCards, setErrorStampCards] = useState<string | null>(null);

  // Stamp rewards states - TODO

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