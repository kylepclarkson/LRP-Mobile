import { getToken } from "./token.service";



/** 
 * Core request method that wraps the fetch API call.
 */
async function request(path: string, options: RequestInit = {}) {
  const url = `${getBaseUrl()}/${path}`;
  const authToken = await getToken();

  const method = options.method || "GET";

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    // TOD track this error
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  return response.json();
}

function getBaseUrl() {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in environment variables.");
  }
  return baseUrl;
}

// Wrapper methods for common HTTP verbs
export const get = (path: string) => request(path, { method: "GET" });
export const post = (path: string, body: any) => request(path, { method: "POST", body });
