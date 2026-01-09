import { useBusinessMembershipContext } from "@/lib/context/business-membership";
import { StampDefinition } from "@/types/stamps";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BusinessResourceService } from "../api/business-resource/business-resource.service";

type BusinessResourceContextType = {
  stampDefinitions: StampDefinition[];
  loadingStampDefinitions: boolean;
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


  return (
    <BusinessResourceContext.Provider value={{
      stampDefinitions,
      loadingStampDefinitions
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


