import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthenticatedUser } from "../../types/users/User";
import {
  getUser,
  LoginCredentials,
  RegisterCredentials,
  register as registerUser,
  login as signIn,
  logout as signOut
} from "../services/auth.service";
import { getAccessToken, saveTokens } from "../services/token.service";


const PLACEHOLDER_USER = {
  id: "1",
  email: "michael-wilbert@email.com",
  first_name: "Michael",
  last_name: "Wilbert"
}

type AuthContextType = {
  user: AuthenticatedUser | null;
  isLoadingUser: boolean;
  setIsLoadingUser: React.Dispatch<React.SetStateAction<boolean>>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
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
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  // If fetching user is in a loading state
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingUser(true);
    // Fetches user details using access token, if one exists
    const initialUserLoad = async () => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        setIsLoadingUser(false);
        return;
      }
      try {
        const user = await getUser();
        console.debug("Fetched user on initial load:", user);
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };
    initialUserLoad();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoadingUser(true);
    try {
      await signIn(credentials);
      const user = await getUser();
      setUser(user);
    } catch (error) {
      // Re-throw the error so it can be caught by the caller
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }

  const logout = async () => {
    setIsLoadingUser(true);
    try {
      await signOut();
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  }

  const register = async (registerCredentials: RegisterCredentials) => {
    setIsLoadingUser(true);
    try {
      const registerResponse = await registerUser(registerCredentials);
      saveTokens(registerResponse.tokens.access, registerResponse.tokens.refresh);
      setUser(registerResponse.user);

    } catch (error) {
      // Re-throw the error so it can be caught by the caller
      throw error;
    } finally {
      setIsLoadingUser(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoadingUser,
      setIsLoadingUser,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the context
export function useAuthSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be defined within AuthProvider.")
  }
  return context;
}
