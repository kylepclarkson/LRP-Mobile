import { EmployeeGroup } from "@/types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "@/lib/context/auth";

type BusinessContextType = {
  activeEmployeeGroup: EmployeeGroup | null;
  setActiveEmployeeGroup: React.Dispatch<React.SetStateAction<EmployeeGroup | null>>;
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

  useEffect(() => {
    if (!user) {
      setActiveEmployeeGroup(null);
    } else if (user.employeeGroups.length > 0) {
      setActiveEmployeeGroup(user.employeeGroups[0]);
    } else {
      setActiveEmployeeGroup(null);
    }
  }, [user]);

  return (
    <BusinessContext.Provider value={{
      activeEmployeeGroup,
      setActiveEmployeeGroup
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