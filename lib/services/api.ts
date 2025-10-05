import { getAccessToken } from "./token.service";


export interface ApiError extends Error {
  status?: number;
  data?: any;
}

/** 
 * Core request method that wraps the fetch API call.
 * As backend is powered by Django REST Framework we expect JSON responses.
 */
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${getBaseUrl()}/${path}`;
  const authToken = await getAccessToken();
  const method = options.method || "GET";

  console.debug(`Performing fetch request: url=${url}, method=${method}`);

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  // handle response
  const payload = response.status !== 204 ? await response.json() : null;
  if (!response.ok) {
    const message = typeof payload === 'object' && 'detail' in payload
      ? payload.detail
      : JSON.stringify(payload);
    const error = new Error(message) as ApiError;
    error.status = response.status;
    error.data = payload;
    throw error;
  }
  return payload as T;
}

function getBaseUrl() {
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in environment variables.");
  }
  return baseUrl;
}

// Wrapper methods for common HTTP verbs
export const get = <T>(path: string) => request<T>(path, { method: "GET" });
export const post = <T>(path: string, body: any) => request<T>(path, { method: "POST", body });

// Utility function for checking error type
export function isApiError(error: any): error is ApiError {
  return error instanceof Error && 'data' in error && typeof (error as ApiError).status === 'number';
}
