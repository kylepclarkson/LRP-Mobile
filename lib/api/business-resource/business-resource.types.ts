


export type CatalogItem = {
  id: string,
  name: string
  description: string,
}

type OfferRulesMap = {
  free_item: { requiredPurchase: number }
  percent_discount: { percent: number }
  amount_discount: { amount: number }
}

export type OfferType = keyof OfferRulesMap

export type OfferDefinition = {
  id: string,
  title: string,
  description: string,
  // Note: Snake case matches backend values. 
  // offerType: OfferType
  // offerType: "free_item" | "percent_discount" | "amount_discount",
  // rules: any // TODO convert to proper json type. 
  // rules: OfferRulesMap[OfferType]
} & {
  [K in OfferType]: {
    offerType: K
    rules: OfferRulesMap[K]
  }
}[OfferType]


/** Mapping from offerType value to readable text.  */
export const OfferTypeText = {
  free_item: "Free item",
  percent_discount: "Percent discount",
  amount_discount: "Amount discount"
} as const;
