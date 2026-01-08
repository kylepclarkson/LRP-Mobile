import { useAuthContext } from "@/lib/context/auth";
import { BusinessRole } from "@/types/businesses";
import { StampDefinition } from "@/types/stamps";
import { EmployeeGroup } from "@/types/types";
import camelcaseKeys from "camelcase-keys";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BusinessService, getStampDefinitions } from "../api/businesses/businesses.service";

type BusinessContextType = {

  userBusinessRoles: BusinessRole[];
  loadingUserBusinessRoles: boolean;
  activeBusinessRole: BusinessRole | null;
  setActiveBusinessRole: React.Dispatch<React.SetStateAction<BusinessRole | null>>;

  businessMode: boolean;
  setBusinessMode: React.Dispatch<React.SetStateAction<boolean>>;

  activeEmployeeGroup: EmployeeGroup | null;
  setActiveEmployeeGroup: React.Dispatch<React.SetStateAction<EmployeeGroup | null>>;
  stampDefinitions: StampDefinition[] | null;
  activeStampDefinition: StampDefinition | null;
  setActiveStampDefinition: React.Dispatch<React.SetStateAction<StampDefinition | null>>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

/**
 * The BusinessProvider provides business-related context, including the user's active business role (if any), 
 * the active business' rewards, stamps, information, etc. 
 */
export function BusinessProvider(
  { children }: { children: React.ReactNode }
) {

  const { user } = useAuthContext();

  // Business roles for the authenticated user. 
  const [userBusinessRoles, setUserBusinessRoles] = useState<BusinessRole[]>([]);
  const [loadingUserBusinessRoles, setLoadingUserBusinessRoles] = useState<boolean>(false);
  // The active business role. This role's business will be the business whose info is rendered throughout the app. 
  const [activeBusinessRole, setActiveBusinessRole] = useState<BusinessRole | null>(null);
  // BusinessMode - if true user will see business layout, else they will see customer layout. 
  // TODO: This should be fetched from user preferences and an enum should be used instead of a boolean.
  const [businessMode, setBusinessMode] = useState<boolean>(false);

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
   * Set the user's business roles.
   */
  const refreshRoles = useCallback(async () => {
    console.debug("Refreshing user business roles");
    if (!user) {
      setUserBusinessRoles([]);
      return;
    }
    try {
      setLoadingUserBusinessRoles(true);
      const data = await BusinessService.getUserRoles();
      console.debug("Fetched user business roles", data);
      setUserBusinessRoles(data);
      // TODO: We assume the first role is the active one. This should be improved with user preferences.
      if (data.length > 0) {
        setActiveBusinessRole(data[0]);
      }
    } catch (err) {
      console.error("Error fetching user business roles", err);
      setUserBusinessRoles([]);
    } finally {
      setLoadingUserBusinessRoles(false);
    }
  }, [user]);
  useEffect(() => {
    refreshRoles();
  }, [refreshRoles]);



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
      userBusinessRoles,
      loadingUserBusinessRoles,
      activeBusinessRole,
      setActiveBusinessRole,
      businessMode,
      setBusinessMode,
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