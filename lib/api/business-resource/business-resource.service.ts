import { get } from "@/lib/api/http/api";
import { StampDefinition } from "@/types/stamps";
import { CatalogItem } from "./business-resource.types";
import { BusinessResourceUrls } from "./business-resource.urls";


export const BusinessResourceService = {
  getStampDefinitions: (businessId: string, params?: any) => get<StampDefinition[]>(BusinessResourceUrls.stampDefinitions(businessId, params)),
  getCatalogItems: (businessId: string) => get<CatalogItem[]>(BusinessResourceUrls.catalogItems(businessId))
}

