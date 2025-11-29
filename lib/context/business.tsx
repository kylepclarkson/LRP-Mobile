import { EmployeeGroup, StampDefinition } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "@/lib/context/auth";
import { getStampDefinitions } from "../services/api/businesses.service";
import camelcaseKeys from "camelcase-keys";

type BusinessContextType = {
  activeEmployeeGroup: EmployeeGroup | null;
  setActiveEmployeeGroup: React.Dispatch<React.SetStateAction<EmployeeGroup | null>>;
  stampDefinitions: StampDefinition[] | null;
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
    const fn = async () => {
      if (activeEmployeeGroup) {
        const x = await getStampDefinitions(activeEmployeeGroup.business.id);
        setStampDefinitions(camelcaseKeys(x) as unknown as StampDefinition[]);
      }
    }
    fn();
  }, [activeEmployeeGroup]);

  return (
    <BusinessContext.Provider value={{
      activeEmployeeGroup,
      setActiveEmployeeGroup,
      stampDefinitions
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