


export type CatalogItem = {
  id: string,
  name: string
  description: string,
}

export type OfferDefinition = {
  id: string,
  title: string,
  description: string,
  offerType: string,
  rules: any // TODO convert to proper json type. 
}
