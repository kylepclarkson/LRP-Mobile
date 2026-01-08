import { objectToCamel, objectToSnake } from "ts-case-convert";
import { deleteTokens, getAccessToken } from "../../services/token.service";
import { refreshManager } from "./refreshManager";

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
      // Convert JSON keys from camel case to snake case. 
      const snakeBody = objectToSnake(options.body);
      body = JSON.stringify(snakeBody);
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
      const snakePayload = await response.json();
      // convert payload JSON keys from snake case to camel case. 
      payload = objectToCamel(snakePayload);
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
export const patch = <T>(path: string, body: any) => request<T>(path, { method: "PATCH", body });

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
    stampDefinitions: (business_id: string, params?: string) => {
      let path = `businesses/${business_id}/stamp-definitions`;
      if (params) {
        path += `?${params}`;
      }
      return path;
    },
    businessRoles: `businesses/roles/`
  },
  rewards: {
    stampTokens: `stamps/stamp-cards/`,
    stampRecordAssign: (id: string) => `stamps/stamp-cards/${id}/assign/`,
    stampRecords: `stamps/stamp-records/`
  },
  stamps: {
    stampCardList: (queryString?: string) => queryString ? `stamps/stamp-cards?${queryString}` : `stamps/stamp-cards/`,
    stampRecordUpdateState: (id: string) => `stamps/stamp-records/${id}/`,
    stampRecordClaim: (id: string) => `stamps/stamp-records/${id}/claim/`
  },
  ws: {
    // TODO Define this better. The getBaseUrl function likely needs to only return the uri and not the protocol. 
    claimStampRecord: (id: string) => `wss://antone-logomachic-marcia.ngrok-free.dev/ws/stamps/${id}/claim`
  }
}
