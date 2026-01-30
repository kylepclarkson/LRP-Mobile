import { OfferReward } from "../api/rewards/rewards.types";


export type OfferRewardBadgePayload = {
  _namespace: "aandeg";
  _type: "offer-reward-badge";
  _version: "1";
  offerRewardId: string;
}

export function createOfferRewardPayload(offerReward: OfferReward): OfferRewardBadgePayload {
  return {
    _namespace: "aandeg",
    _type: "offer-reward-badge",
    _version: "1",
    offerRewardId: offerReward.id
  }
}

export function stringifyOfferRewardPayload(payload: OfferRewardBadgePayload) {
  return JSON.stringify(payload);
}

export function parseOfferRewardPayload(raw: string): OfferRewardBadgePayload | null {
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed._namespace === 'aandeg' &&
      parsed._type === 'offer-reward-badge'
    ) {
      return parsed as OfferRewardBadgePayload;
    }
    return null
  } catch {
    return null;
  }
}


