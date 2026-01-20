import { OfferDefinition } from "../business-resource/business-resource.types"

export interface OfferReward {
  id: string
  offerDefinition: OfferDefinition
  status: 'earned' | 'redeemed' | 'expired',
  issuedAt: Date
  expiresAt?: Date
  redeemedAt?: Date
}