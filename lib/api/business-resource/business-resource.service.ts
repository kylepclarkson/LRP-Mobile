import { get, post } from "@/lib/api/http/api";
import { StampDefinition } from "@/types/stamps";
import { OfferReward } from "../offers/offers.types";
import { OfferDefinition } from "../rewards/rewards.types";
import { CatalogItem, CreateOfferRewardRequest } from "./business-resource.types";
import { BusinessResourceUrls } from "./business-resource.urls";


export const BusinessResourceService = {
  getStampDefinitions: (businessId: string, params?: any) => get<StampDefinition[]>(BusinessResourceUrls.stampDefinitions(businessId, params)),
  getCatalogItems: (businessId: string) => get<CatalogItem[]>(BusinessResourceUrls.catalogItems(businessId)),
  getOfferDefinitions: (businessId: string) => get<OfferDefinition[]>(BusinessResourceUrls.offerDefinitions(businessId)),

  createOfferReward: (businessId: string, body: CreateOfferRewardRequest) => post<OfferReward>(BusinessResourceUrls.createOfferReward(businessId), body),
}

