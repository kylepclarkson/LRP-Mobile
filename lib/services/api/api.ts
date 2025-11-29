import { deleteTokens, getAccessToken } from "../token.service";
import { refreshManager } from "./refreshManager";


// export interface ApiError extends Error {
//   status?: number;
//   data?: any;
// }

export class ApiError extends Error {
  status: number;
  data: any;
  constructor(message: string, status: number, data: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

/** 
 * Core request method that wraps the fetch API call.
 * As backend is powered by Django REST Framework we expect JSON responses.
 */
export async function request<T>(
  path: string,
  options: RequestInit & { body?: any } = {}
): Promise<T> {
  const url = `${getBaseUrl()}/${path}`;
  const authToken = await getAccessToken();
  const method = options.method || "GET";

  console.debug(`Performing fetch request: url=${url}, method=${method}`);

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    // Body is expected to be an object type. 
    if (
      typeof options.body === "object" &&
      !(options.body instanceof FormData) &&
      !(options.body instanceof Blob)
    ) {
      body = JSON.stringify(options.body);
    } else {
      body = options.body;
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
      ...options.headers,
    },
    body
  })

  // Parse Payload as either JSON or text. 
  const resContentType = response.headers.get("Content-Type");
  let payload: any = null;
  if (response.status !== 204) {
    if (resContentType?.includes("application/json")) {
      payload = await response.json();
    } else {
      payload = await response.text();
    }
  }

  // Handle errors
  if (!response.ok) {
    // 401 - attempt access token refresh.
    if (response.status === 401) {
      const newToken = await refreshManager.refreshAccessToken();
      if (newToken) {
        // Retry request having stored new access token. 
        return refreshManager.enqueueRequest<T>(path, options);
      } else {
        await deleteTokens();
      }
      // Normalize error message
    }
    const message =
      payload && typeof payload === "object" && "detail" in payload
        ? payload.detail
        : (payload && typeof payload === "string")
          ? payload
          : response.statusText
    throw new ApiError(message, response.status, payload);
  }
  return payload as T;
}

/**
 * Returns the base URL for the current environment. 
 */
export function getBaseUrl() {
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in environment variables.");
  }
  return baseUrl;
}

// Wrapper methods for common HTTP verbs
export const get = <T>(path: string) => request<T>(path, { method: "GET" });
export const post = <T>(path: string, body: any) => request<T>(path, { method: "POST", body });
export const patch = <T>(path: string, body: any) => request<T>(path, { method: "PATCH", body});

// Utility function for checking error type
export function isApiError(error: any): error is ApiError {
  return error instanceof Error && 'data' in error && typeof (error as ApiError).status === 'number';
}

/**
 * Exports relative paths. The base path is provided by the env settings
 * and is added to the provided URL when performing the request. 
 */
export const paths = {
  authentication: {
    login: `users/login/`,
    signOut: `users/signout/`,
    register: `users/register/`,
    user: 'users/',
    user_details: `users/user_details/`,
    refreshToken: 'users/login/refresh/'
  },
  businesses: {
    stampDefinitions: (business_id:string) => `businesses/${business_id}/stamp-definitions/`,
  },
  rewards: {
    stampTokens: `rewards/stamp-cards/`,
    stampRecordAssign: (id:string) => `rewards/stamp-cards/${id}/assign/`, 
    stampRecords: `rewards/stamp-records/`
  }
}
