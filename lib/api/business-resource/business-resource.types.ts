


export type CatalogItem = {
  id: string,
  name: string
  description: string,
}

/**
 * Request body for creating the create OfferReward API. 
 */
export type CreateOfferRewardRequest = {
  offerDefinitionId: string,
  ownerId: string
  issuanceMechanismType: "manual" | "stamp_program"
  expiresAt?: string
}