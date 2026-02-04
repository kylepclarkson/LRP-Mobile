import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { RewardsService } from "../api/rewards/rewards.service";
import { OfferReward } from "../api/rewards/rewards.types";
import { useAuthContext } from './auth';


type RewardsContextType = {
  offerRewards: OfferReward[],
  loadingOfferRewards: boolean,
  refreshOfferRewards: () => Promise<void>
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider(
  { children }: { children: React.ReactNode }
) {
  const { user } = useAuthContext();
  // Provide a reference to the user to avoid stale closure issues. 
  const userRef = useRef(user);

  // Offer rewards for the current user
  const [offerRewards, setOfferRewards] = useState<OfferReward[]>([]);
  const [loadingOfferRewards, setLoadingOfferRewards] = useState<boolean>(false);

  useEffect(() => {
    userRef.current = user;
  }, [user])

  const refreshOfferRewards = useCallback(async () => {
    if (!userRef.current) {
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
  }, []);

  useEffect(() => {
    refreshOfferRewards();
  }, [user]);


  return (
    <RewardsContext.Provider value={{
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


