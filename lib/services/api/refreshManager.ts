
import { deleteTokens, getRefreshToken, saveTokens } from '../token.service';
import { refreshTokens, TokenPair } from '../auth.service';  
import { paths, post } from './api';
import { appendIsInitial } from 'expo-router/build/fork/getStateFromPath-forks';


type QueuedRequest = {
  endpoint: string,
  options: RequestInit,
  resolve: (value: Response | PromiseLike<Response>) => void;
  reject: (reason?: any) => void;
}

export class RefreshManager {

  private refreshPromise: Promise<string | null> | null = null;
  private queue: QueuedRequest[] = []

  async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshPromise) {
      this.refreshPromise = (async () => {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) return null;

        
        const data = await post<TokenPair>(paths.authentication.refreshToken, { refresh: refreshToken});

        const res = await fetch(`${BASE_URL}/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!data.ok) {
          await clearTokens();
          return null;
        }

        // const data = await res.json();
        const newAccessToken = data.access;
        await saveTokens(newAccessToken);
        return newAccessToken;
      })();

      this.refreshPromise
        .then((newToken) => {
          if (newToken) {
            // Replay queued requests
            this.queue.forEach(({ endpoint, options, resolve, reject }) => {
              const headers = {
                ...(options.headers || {}),
                Authorization: `Bearer ${newToken}`,
              };
              fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
                .then(resolve)
                .catch(reject);
            });
          } else {
            // Reject all queued requests if refresh failed
            this.queue.forEach(({ reject }) =>
              reject(new Error("Refresh failed"))
            );
          }
          this.queue = [];
        })
        .finally(() => {
          this.refreshPromise = null;
        });
    }
    return this.refreshPromise;
  }

}

// Singleton instance
export const refreshManager = new RefreshManager();