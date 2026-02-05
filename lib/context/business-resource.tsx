import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BusinessResourceService } from "../api/business-resource/business-resource.service";
import { CatalogItem } from "../api/business-resource/business-resource.types";
import { OfferDefinition } from "../api/rewards/rewards.types";
import { StampProgram } from "../api/stamps/stamps.types";

type BusinessResourceContextType = {
  stampPrograms: StampProgram[];
  loadingstampPrograms: boolean;
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
  const [stampPrograms, setstampPrograms] = useState<StampProgram[]>([]);
  const [loadingstampPrograms, setLoadingstampPrograms] = useState<boolean>(false);

  // Catalog items for the current business
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [loadingCatalogItems, setLoadingCatalogItems] = useState<boolean>(false);

  // Offer definitions for the current business
  const [offerDefinitions, setOfferDefinitions] = useState<OfferDefinition[]>([]);
  const [loadingOfferDefinitions, setLoadingOfferDefinitions] = useState<boolean>(false);

  /** Call backend to fetch stamp definitions.  */
  const refreshstampPrograms = useCallback(async () => {
    console.debug("Refreshing stamp definitions");
    if (!activeBusinessRole || !activeBusinessRole.business) {
      setstampPrograms([]);
      return;
    }
    try {
      setLoadingstampPrograms(true);
      const data = await BusinessResourceService.getstampPrograms(activeBusinessRole.business.id);
      setstampPrograms(data);
    } catch (err) {
      console.error(`Error fetching stamp definitions for ${activeBusinessRole.business.id}`);
    } finally {
      setLoadingstampPrograms(false);
    }
  }, [activeBusinessRole]);

  useEffect(() => {
    refreshstampPrograms();
  }, [refreshstampPrograms]);

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
      stampPrograms,
      loadingstampPrograms,
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


