import { OfferDefinition } from "@/lib/api/offers/offers.types"

export type CreateOfferRewardFormState = {
  offerDefinition: OfferDefinition | null,
  customerId: string | null
}

export type CreateOfferRewardFormErrors = {
  customerId: string
}