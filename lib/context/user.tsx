import { AuthenticatedUser } from '@/types/users/User';
import React, { createContext, useContext, useState } from 'react';


type UserContextType = {
  user: AuthenticatedUser | null;
  setUser: () => {};
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider(
  { children }: { children: React.ReactNode }
) {
  // TODO move user functionality from existing context to this one. 
  // An authenticated user. Will be null if user is not authenticated
  const [user, setUser] = React.useState<AuthenticatedUser | null>(null);

  return (
    <UserContext.Provider value={{
      user
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("context must be defined within UserProvider");
  }
  return context;
}