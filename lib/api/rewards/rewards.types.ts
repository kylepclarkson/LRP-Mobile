import { Business } from "@/types/businesses"

export interface OfferReward {
  id: string
  offerDefinition: OfferDefinition
  status: 'earned' | 'redeemed' | 'expired',
  issuedAt: Date
  expiresAt?: Date
  redeemedAt?: Date
}
type OfferRulesMap = {
  free_item: { requiredPurchase: number; };
  percent_discount: { percent: number; };
  amount_discount: { amount: number; };
};

export type OfferType = keyof OfferRulesMap;

export type OfferDefinition = {
  id: string;
  title: string;
  business: Business;
  description: string;
} & {
  [K in OfferType]: {
    offerType: K;
    rules: OfferRulesMap[K];
  };
}[OfferType];
/** Mapping from offerType value to readable text.  */
export const OfferTypeText = {
  free_item: "Free item",
  percent_discount: "Percent discount",
  amount_discount: "Amount discount"
} as const;
