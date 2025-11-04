import { StampCard } from '@/types/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchStampCards } from '../services/auth.service';

type RewardsContextType = {
  stampCards: StampCard[] | [];
  isLoading: boolean;
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider(
  { children }: { children: React.ReactNode }
) {

  const [ stampCards, setStampCards ] = React.useState<StampCard[]>([]);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);

  useEffect(() => {
    console.debug("Rewards useEffect called");
    const initialStampCardsLoad = async () => {
      setIsLoading(true);
      try {
        const fetchedStampCards = await fetchStampCards();
        console.debug("Fetched StampCards on initial load:", fetchedStampCards);
        setStampCards(fetchedStampCards);
      } catch (error) {
        console.error("Error fetching StampCards:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initialStampCardsLoad();
  }, []);


  return (
    <RewardsContext.Provider value={{
      isLoading,
      stampCards
    }}>
      {children}
    </RewardsContext.Provider>
  );
}
// Export the context
export function useRewardsContext() {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewardsContext must be used within a RewardsProvider');
  }
  return context;
}


