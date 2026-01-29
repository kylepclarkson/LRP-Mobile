import { OfferDefinition } from "@/lib/api/rewards/rewards.types"

export type CreateOfferRewardFormState = {
  offerDefinition: OfferDefinition | null,
  customerId: string | null
}

export type CreateOfferRewardFormErrors = {
  customerId: string
}