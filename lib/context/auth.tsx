import React, { createContext, useContext, useState } from "react";
import { AuthenticatedUser } from "../../types/User";


const PLACEHOLDER_USER = {
  id: "1",
  first_name: "Michael",
  last_name: "Wilbert"
}

type AuthContextType = {
  user: AuthenticatedUser | undefined;
  isLoadingUser: boolean
  login: () => {}
  logout: () => {}
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication provider contains details
 * about the current user's authentication status. 
 */
export function AuthProvider(
  { children }: { children: React.ReactNode }
) {

  // An authenticated user, null if not authenticated
  const [user, setUser] = useState<AuthenticatedUser | undefined>(undefined);
  // If fetching user is in a loading state
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  const login = async () => {
    // TODO implement backend call
    console.info("login called")
    setUser(PLACEHOLDER_USER);
  }

  const logout = async () => {
    // TODO implement backend call
    console.info("logout called")
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoadingUser,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be defined within AuthProvider.")
  }
  return context;
}

