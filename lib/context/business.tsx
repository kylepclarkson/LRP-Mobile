import { EmployeeGroup } from "@/types/types";
import React, { createContext, useContext, useState } from "react";

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

  const [activeEmployeeGroup, setActiveEmployeeGroup] = useState<EmployeeGroup | null>(null);

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