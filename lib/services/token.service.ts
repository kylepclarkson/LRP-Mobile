
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "jwt_token";

/**
 * Save user's JWT token to secure storage.
 * @param token 
 */
export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token); 
}

/**
 * Read user's JWT token from secure storage.
 * @returns 
 */
export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

/**
 * Delete user's JWT token from secure storage.
 */
export async function deleteToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}