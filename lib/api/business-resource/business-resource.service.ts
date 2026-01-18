import { get } from "@/lib/api/http/api";
import { StampDefinition } from "@/types/stamps";
import { CatalogItem, OfferDefinition } from "./business-resource.types";
import { BusinessResourceUrls } from "./business-resource.urls";


export const BusinessResourceService = {
  getStampDefinitions: (businessId: string, params?: any) => get<StampDefinition[]>(BusinessResourceUrls.stampDefinitions(businessId, params)),
  getCatalogItems: (businessId: string) => get<CatalogItem[]>(BusinessResourceUrls.catalogItems(businessId)),
  getOfferDefinitions: (businessId: string) => get<OfferDefinition[]>(BusinessResourceUrls.offerDefinitions(businessId)),
}

