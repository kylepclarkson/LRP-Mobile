import { StampCard } from '@/types/types';
import camelcaseKeys from 'camelcase-keys';
import React, { createContext, useContext, useEffect } from 'react';
import { getStampCards } from '../services/rewards.service';
import { useAuthContext } from './auth';


type RewardsContextType = {
  stampCards: StampCard[] | [];
  fetchStampCards: () => Promise<void>;
  isLoading: boolean;
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider(
  { children }: { children: React.ReactNode }
) {
  const { user } = useAuthContext();
  const [stampCards, setStampCards] = React.useState<StampCard[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      console.debug("RewardsProvider: no user - skipping StampCard fetch");
      return;
    }
    // const initialStampCardsLoad = async () => {
    //   setIsLoading(true);
    //   try {
    //     const fetchedStampCards = await fetchStampCards();
    //     const x = camelcaseKeys(getStampCards, { deep: true }) as unknown as StampCard[];
    //     setStampCards(x);
    //   } catch (error) {
    //     console.error("Error fetching StampCards:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // initialStampCardsLoad();
    fetchStampCards();
  }, [user]);

  const fetchStampCards = async () => {
    setIsLoading(true);
    try {
      const fetchedStampCards = await getStampCards();
      const x = camelcaseKeys(fetchedStampCards, { deep: true }) as unknown as StampCard[];
      setStampCards(x);
    } catch (error) {
      console.error("Error fetching StampCards:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <RewardsContext.Provider value={{
      isLoading,
      stampCards,
      fetchStampCards
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


