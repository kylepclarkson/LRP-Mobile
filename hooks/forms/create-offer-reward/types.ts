import { OfferDefinition } from "@/lib/api/business-resource/business-resource.types"

export type CreateOfferRewardFormState = {
  offerDefinition: OfferDefinition | null,
  customerId: string | null
}

export type CreateOfferRewardFormErrors = {
  customerId: string
}