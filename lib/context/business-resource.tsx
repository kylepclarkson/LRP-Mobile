import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { StampDefinition } from "@/types/stamps";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BusinessResourceService } from "../api/business-resource/business-resource.service";
import { CatalogItem, OfferDefinition } from "../api/business-resource/business-resource.types";

type BusinessResourceContextType = {
  stampDefinitions: StampDefinition[];
  loadingStampDefinitions: boolean;
  catalogItems: CatalogItem[];
  loadingCatalogItems: boolean;
  offerDefinitions: OfferDefinition[];
  loadingOfferDefinitions: boolean;
}

const BusinessResourceContext = createContext<BusinessResourceContextType | undefined>(undefined);

/**
 * This provider provides state related to a business, such as 
 * available stamp definitions, point rewards, etc. The business is provided 
 * from the user's active business role.
 */
export function BusinessResourceProvider({ children }: { children: React.ReactNode }) {

  const { activeBusinessRole } = useBusinessMembershipContext();
  // The available stamp definitions for the current business
  const [stampDefinitions, setStampDefinitions] = useState<StampDefinition[]>([]);
  const [loadingStampDefinitions, setLoadingStampDefinitions] = useState<boolean>(false);

  // Catalog items for the current business
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [loadingCatalogItems, setLoadingCatalogItems] = useState<boolean>(false);

  // Offer definitions for the current business
  const [offerDefinitions, setOfferDefinitions] = useState<OfferDefinition[]>([]);
  const [loadingOfferDefinitions, setLoadingOfferDefinitions] = useState<boolean>(false);

  /** Call backend to fetch stamp definitions.  */
  const refreshStampDefinitions = useCallback(async () => {
    console.debug("Refreshing stamp definitions");
    if (!activeBusinessRole || !activeBusinessRole.business) {
      setStampDefinitions([]);
      return;
    }
    try {
      setLoadingStampDefinitions(true);
      const data = await BusinessResourceService.getStampDefinitions(activeBusinessRole.business.id);
      setStampDefinitions(data);
    } catch (err) {
      console.error(`Error fetching stamp definitions for ${activeBusinessRole.business.id}`);
    } finally {
      setLoadingStampDefinitions(false);
    }
  }, [activeBusinessRole]);

  useEffect(() => {
    refreshStampDefinitions();
  }, [refreshStampDefinitions]);

  /** Call backend to fetch catalog items */
  const refreshCatalogItems = useCallback(async () => {
    console.debug("Refreshing catalog items");
    if (!activeBusinessRole || !activeBusinessRole.business) {
      setCatalogItems([]);
      return;
    }
    try {
      setLoadingCatalogItems(true);
      const data = await BusinessResourceService.getCatalogItems(activeBusinessRole.business.id);
      setCatalogItems(data);
    } catch (err) {
      console.error(`Error fetching catalog items for business=${activeBusinessRole.business.id}`);
    } finally {
      setLoadingCatalogItems(false);
    }
  }, [activeBusinessRole]);

  useEffect(() => {
    refreshCatalogItems();
  }, [refreshCatalogItems])

  /** Call backend to fetch offer definitions */
  const refreshOfferDefinitions = useCallback(async () => {
    console.debug("Refreshing offer definitions items");
    if (!activeBusinessRole || !activeBusinessRole.business) {
      setOfferDefinitions([]);
      return;
    }
    try {
      setLoadingOfferDefinitions(true);
      const data = await BusinessResourceService.getOfferDefinitions(activeBusinessRole.business.id);
      setOfferDefinitions(data);
    } catch (err) {
      console.error(`Error fetching offer definitions for business=${activeBusinessRole.business.id}`);
    } finally {
      setLoadingOfferDefinitions(false);
    }
  }, [activeBusinessRole]);

  useEffect(() => {
    refreshOfferDefinitions();
  }, [refreshOfferDefinitions])


  return (
    <BusinessResourceContext.Provider value={{
      stampDefinitions,
      loadingStampDefinitions,
      catalogItems,
      loadingCatalogItems,
      offerDefinitions,
      loadingOfferDefinitions
    }}>
      {children}
    </BusinessResourceContext.Provider>
  )
}

export function useBusinessResourceContext() {
  const context = useContext(BusinessResourceContext);
  if (context === undefined) {
    throw new Error("useBusinessResourceContext must be within a BusinessResourceProvider");
  }
  return context;
}


