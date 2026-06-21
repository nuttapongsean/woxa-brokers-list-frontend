import axios, { type InternalAxiosRequestConfig } from 'axios';
import { config } from '@/lib/config';
import { tokenStorage } from './tokenStorage';
import { authEndpoints } from './endpoints';
import { httpHeaders, headerValues } from './headers';

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Separate instance for /auth/refresh — no interceptors to avoid infinite loop
export const refreshClient = axios.create({
  baseURL: config.apiUrl,
  timeout: config.api.timeout,
  headers: { [httpHeaders.contentType]: headerValues.json },
});

export const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: config.api.timeout,
  headers: { [httpHeaders.contentType]: headerValues.json },
});

// Attach Bearer token + request ID on every request
apiClient.interceptors.request.use((cfg) => {
  cfg.headers[httpHeaders.requestId] = crypto.randomUUID();
  const token = tokenStorage.getAccessToken();
  if (token) cfg.headers[httpHeaders.authorization] = headerValues.bearer(token);
  return cfg;
});

// Queue of requests waiting for token refresh to complete
type QueueItem = { resolve: (token: string) => void; reject: (err: unknown) => void };
let isRefreshing = false;
const queue: QueueItem[] = [];

function drainQueue(err: unknown, token: string | null): void {
  queue.splice(0).forEach((item) => (err ? item.reject(err) : item.resolve(token!)));
}

function redirectToLogin(): void {
  if (typeof window !== 'undefined') window.location.href = '/en/login';
}

// On 401: attempt token refresh once, then retry the original request
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as RetryableConfig;

    const isAuthRoute = [authEndpoints.login, authEndpoints.register].includes(original.url as never);
    if (!axios.isAxiosError(error) || error.response?.status !== 401 || original._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    const rt = tokenStorage.getRefreshToken();
    if (!rt) {
      redirectToLogin();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => queue.push({ resolve, reject })).then(
        (token) => {
          original.headers[httpHeaders.authorization] = headerValues.bearer(token);
          return apiClient(original);
        }
      );
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const { data } = await refreshClient.post<{ accessToken: string }>(authEndpoints.refresh, {
        refreshToken: rt,
      });
      tokenStorage.updateAccessToken(data.accessToken);
      drainQueue(null, data.accessToken);
      original.headers['Authorization'] = `Bearer ${data.accessToken}`;
      return apiClient(original);
    } catch (refreshError) {
      drainQueue(refreshError, null);
      tokenStorage.clear();
      await fetch('/api/auth/session', { method: 'DELETE' });
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
