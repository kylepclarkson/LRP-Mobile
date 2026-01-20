import { get } from '@/lib/api/http/api';
import { OfferReward } from '@/lib/api/rewards/rewards.types';
import { RewardsUrls } from '@/lib/api/rewards/rewards.urls';

export const RewardsService = {
  getOfferRewards: () => get<OfferReward[]>(RewardsUrls.offerRewards()),
}

