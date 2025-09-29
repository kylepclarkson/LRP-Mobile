import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  isLoadingUser: boolean
};

const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider contains details
 * about the current user's authentication status. 
 */
export function AuthenticationProvider(
   {children}: {children: React.ReactNode}
) {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  return (
    <AuthenticationContext.Provider value={{
      isLoadingUser
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error("useAuth must be defined within AuthProvider.")
  }
}

