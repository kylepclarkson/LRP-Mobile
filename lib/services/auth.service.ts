import { get, paths, post } from '@/lib/api/http/api';
import { AuthenticatedUser } from '@/types/types';
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
  password: string,
  date_of_birth: string,
  first_name: string,
  last_name: string,
}

/**
 * A token pair consisting of access and refresh tokens.
 */
export interface TokenPair {
  access: string,
  refresh: string,
}

export interface RegisterResponse {
  user: AuthenticatedUser,
  tokens: TokenPair,
}

// ====================================================================

/**
 * Login in user, receives and stores access and refresh tokens if successful. 
 * @param credentials - User login credentials.
 */
export async function login(credentials: LoginCredentials): Promise<TokenPair> {
  console.debug("Attempting login with user credentials");
  try {
    const data = await post<TokenPair>(paths.authentication.login, credentials);
    // Store tokens
    await saveTokens(data.access, data.refresh);
    return data;
  } catch (error) {
    console.debug("Error caught while attempting login", error);
    throw error;
  }
}

export async function getUser(): Promise<AuthenticatedUser> {
  console.debug("Fetching authenticated user...");
  try {
    const authenticatedUser = await get<AuthenticatedUser>(paths.authentication.user);
    return authenticatedUser;
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<void> {
  await deleteTokens();
}

export async function register(credentials: RegisterCredentials): Promise<RegisterResponse> {
  try {
    const data = await post<RegisterResponse>(paths.authentication.register, credentials);
    console.debug("Registration successful:", data);
    return data;
    // TODO set user and tokens. 
  } catch (error) {
    throw error;
  }
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
    throw new Error("No refresh troken available");
  }
  // Call the API to refresh tokens
  // Move API path to constants object
  const data = await post<TokenPair>("users/login/refresh/", { refresh: refreshToken });
  await saveTokens(data.access, data.refresh);
  return data;
}

/**
 * Retrieve the current user's StampCards. By default it retrieves 
 * all StampCards that are not in a terminal state.
 */

