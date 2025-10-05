import { get, post } from '@/lib/services/api';
import { AuthenticatedUser } from '@/types/User';
import { deleteTokens, getRefreshToken, saveTokens } from './token.service';


/**
 * This service module handles authentication-related operations.
 */
// ====================================================================
/** Credentials required for login. */
export interface LoginCredentials {
  email: string,
  password: string,
}

/** Credentials required for registering a new account. */
export interface RegisterCredentials {
  email: string,
  password: string
}

/**
 * A token pair consisting of access and refresh tokens.
 */
export interface TokenPair {
  access: string,
  refresh: string,
}

// ====================================================================

/**
 * Login in user, receives and stores access and refresh tokens if successful. 
 * @param credentials - User login credentials.
 */
export async function login(credentials: LoginCredentials): Promise<TokenPair> {
  try {
    const data = await post<TokenPair>("user/login/", credentials);
    // Store tokens
    await saveTokens(data.access, data.refresh);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUser(): Promise<AuthenticatedUser> {
  console.debug("Fetching authenticated user details...");
  try {
    const data = await get<AuthenticatedUser>("user/");
    // Set user data in context
    console.debug("Fetched user data:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<void> {
  // TODO - implement logout API call
  await deleteTokens();
}

/**
 * Updates access token using the refresh token. 
 * Throws an error if no refresh token is available.
 */
export async function refreshTokens(): Promise<TokenPair> {
  console.debug("Refreshing tokens...");
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    // TODO - redirect user to login
    console.error("No refresh token available");
    throw new Error("No refresh token available");
  }
  // Call the API to refresh tokens
  const data = await post<TokenPair>("user/login/refresh/", { refreshToken });
  await saveTokens(data.access, data.refresh);
  return data;
}
