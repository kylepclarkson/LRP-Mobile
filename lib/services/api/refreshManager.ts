
import { TokenPair } from '../auth.service';
import { deleteTokens, getRefreshToken, saveTokens } from '../token.service';
import { ApiError, paths, post, request } from './api';

/**
 * A queued request represents an API call that failed with a 401
 * and is waiting for a new access token before retrying. 
 */
type QueuedRequest<T> = {
  path: string,
  options: RequestInit,
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export class RefreshManager {

  // The currently running refresh promise, if any. 
  private refreshPromise: Promise<string | null> | null = null;
  // Queue of requests waiting for a new token. 
  private queue: QueuedRequest<any>[] = []

  /**
   * Refresh the access token using the refresh token.
   * If a refresh is already in progress, return the in-progress promise. 
   */
  async refreshAccessToken(): Promise<string | null> {
    if (!this.refreshPromise) {
      // Start new refresh call
      this.refreshPromise = (async () => {
        const refreshToken = await getRefreshToken();
        if (!refreshToken)
          return null;
        let data: TokenPair;
        try {
          data = await post<TokenPair>(paths.authentication.refreshToken, { refresh: refreshToken });
        } catch (error) {
          if (error instanceof ApiError) {
            console.debug(`ApiError when refreshing access token status=${error.status}`)
          }
          await deleteTokens();
          return null;
        }
        // Parse new access token from response
        await saveTokens(data.access, data.refresh);
        return data.access;
      })();
      // Once refresh is complete, replay queued requests or reject them. 
      this.refreshPromise
        .then((newToken) => {
          if (newToken) {
            // Replay all queued requests w/ new token
            this.queue.forEach(({ path, options, resolve, reject }) => {
              request(path, options).then(resolve).catch(reject)
            })
          } else {
            // Refresh failed, reject all queued requests
            this.queue.forEach(({ reject }) => {
              reject(new Error("Access token refresh failed"));
            });
          }
          this.queue = [];
        })
        .finally(() => {
          this.refreshPromise = null
        });
    }
    // Return the current refresh promise
    return this.refreshPromise;
  }

  /**
   * Enqueue a request that failed due to a 401. 
   * Adding it to the queue will replay it once refreshAccessToken resolves. 
   * @param path 
   * @param options 
   * @returns 
   */
  enqueueRequest<T>(path: string, options: RequestInit): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ path, options, resolve, reject });
    });
  }

}

// Singleton instance
export const refreshManager = new RefreshManager();