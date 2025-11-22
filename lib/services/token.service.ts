
import * as SecureStore from "expo-secure-store";

const ACCESS_KEY = "jwt_access_token";
const REFRESH_KEY = "jwt_refresh_token";

/**
 * Save access and refresh tokens to secure storage.
 * @param access 
 * @param refresh 
 */
export async function saveTokens(access: string, refresh: string) {
  console.debug("=== Saving tokens:", access, refresh);
  await SecureStore.setItemAsync(ACCESS_KEY, access);
  await SecureStore.setItemAsync(REFRESH_KEY, refresh);
}

/**
 * Retrieve access token from secure storage.
 * @returns 
 */
export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(ACCESS_KEY);
}

/**
 * Retrieve refresh token from secure storage.
 * @return
 */
export async function getRefreshToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(REFRESH_KEY);
}

/**
 * Delete JWT tokens from secure storage.
 */
export async function deleteTokens() {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}