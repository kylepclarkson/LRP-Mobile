import { StampCard } from "@/types/stamps";
import camelcaseKeys from 'camelcase-keys';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { RewardsService } from "../api/rewards/rewards.service";
import { OfferReward } from "../api/rewards/rewards.types";
import { getStampCards } from '../services/stamps.service';
import { useAuthContext } from './auth';


type RewardsContextType = {
  stampCards: StampCard[] | [];
  fetchStampCards: () => Promise<void>;
  isLoading: boolean;

  offerRewards: OfferReward[],
  loadingOfferRewards: boolean,
  refreshOfferRewards: () => Promise<void>
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider(
  { children }: { children: React.ReactNode }
) {
  const { user } = useAuthContext();
  const [stampCards, setStampCards] = React.useState<StampCard[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Offer rewards for the current user
  const [offerRewards, setOfferRewards] = useState<OfferReward[]>([]);
  const [loadingOfferRewards, setLoadingOfferRewards] = useState<boolean>(false);

  const refreshOfferRewards = useCallback(async () => {
    if (!user) {
      console.debug("Clearing offer rewards");
      setOfferRewards([]);
      return;
    }
    try {
      setLoadingOfferRewards(true);
      const data = await RewardsService.getOfferRewards();
      // Convert dates
      setOfferRewards(data.map((offerRewardRaw) => {
        return {
          ...offerRewardRaw,
          issuedAt: new Date(offerRewardRaw.issuedAt),
          expiresAt: offerRewardRaw.expiresAt ? new Date(offerRewardRaw.expiresAt) : undefined,
          redeemedAt: offerRewardRaw.redeemedAt ? new Date(offerRewardRaw.redeemedAt) : undefined,
        }
      }));
      console.debug("Fetched offer rewards");
    } catch (err) {
      console.error("Error fetching offer rewards", err);
    } finally {
      setLoadingOfferRewards(false);
    }
    // 
  }, [user]);
  useEffect(() => {
    refreshOfferRewards();
  }, [refreshOfferRewards]);


  useEffect(() => {
    if (!user) {
      return;
    }
    // fetchStampCards();
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
      fetchStampCards,
      offerRewards,
      loadingOfferRewards,
      refreshOfferRewards
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


