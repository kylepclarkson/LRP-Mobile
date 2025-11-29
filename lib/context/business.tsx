import { useAuthContext } from "@/lib/context/auth";
import { EmployeeGroup, StampDefinition } from "@/types/types";
import camelcaseKeys from "camelcase-keys";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getStampDefinitions } from "../services/api/businesses.service";

type BusinessContextType = {
  activeEmployeeGroup: EmployeeGroup | null;
  setActiveEmployeeGroup: React.Dispatch<React.SetStateAction<EmployeeGroup | null>>;
  stampDefinitions: StampDefinition[] | null;
  activeStampDefinition: StampDefinition | null;
  setActiveStampDefinition: React.Dispatch<React.SetStateAction<StampDefinition | null>>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

/**
 * The business provider contains details
 * about employee users.
 */
export function BusinessProvider(
  { children }: { children: React.ReactNode }
) {

  const { user } = useAuthContext();

  const [activeEmployeeGroup, setActiveEmployeeGroup] = useState<EmployeeGroup | null>(null);
  const [stampDefinitions, setStampDefinitions] = useState<StampDefinition[] | null>(null);
  const [activeStampDefinition, setActiveStampDefinition] = useState<StampDefinition | null>(null);

  /**
   * Set the ActiveEmployeeGroup for this user. 
   */
  useEffect(() => {
    if (!user) {
      setActiveEmployeeGroup(null);
    } else if (user.employeeGroups.length > 0) {
      setActiveEmployeeGroup(user.employeeGroups[0]);
    } else {
      setActiveEmployeeGroup(null);
    }
  }, [user]);

  /**
   * Set the StampDefinitions that this user can create StampRecords for.  
   */

  useEffect(() => {
    const fetchStampDefinitions = async () => {
      if (activeEmployeeGroup) {
        const data = await getStampDefinitions(activeEmployeeGroup.business.id);
        const _stampDefinitions = camelcaseKeys(data) as unknown as StampDefinition[];
        console.debug("setting stamp definitions", _stampDefinitions);
        setStampDefinitions(_stampDefinitions);
        if (_stampDefinitions.length > 0) {
          setActiveStampDefinition(_stampDefinitions[0])
        }
      }
    }
    fetchStampDefinitions();
  }, [activeEmployeeGroup]);

  return (
    <BusinessContext.Provider value={{
      activeEmployeeGroup,
      setActiveEmployeeGroup,
      stampDefinitions,
      activeStampDefinition,
      setActiveStampDefinition
    }}>
      {children}
    </BusinessContext.Provider>
  )
}

export function useBusinessContext() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error("useBusinessContext must be used within a BusinessContextProvider");
  }
  return context;
}