import type { AuthUser } from '@/lib/schemas/auth';

const REFRESH_KEY = 'woxa_rt';
const USER_KEY = 'woxa_user';

// Access token lives in memory — cleared on page refresh, safer against XSS
let _accessToken: string | null = null;

function lsGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
}

function lsSet(key: string, value: string): void {
  if (typeof window !== 'undefined') localStorage.setItem(key, value);
}

function lsDel(key: string): void {
  if (typeof window !== 'undefined') localStorage.removeItem(key);
}

export const SESSION_COOKIE = 'woxa_session';

export const tokenStorage = {
  getAccessToken: (): string | null => _accessToken,

  getRefreshToken: (): string | null => lsGet(REFRESH_KEY),

  getUser: (): AuthUser | null => {
    const raw = lsGet(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },

  save(accessToken: string, refreshToken: string, user: AuthUser): void {
    _accessToken = accessToken;
    lsSet(REFRESH_KEY, refreshToken);
    lsSet(USER_KEY, JSON.stringify(user));
    if (typeof document !== 'undefined') {
      document.cookie = `${SESSION_COOKIE}=1; path=/; SameSite=Lax`;
    }
  },

  updateAccessToken(accessToken: string): void {
    _accessToken = accessToken;
  },

  clear(): void {
    _accessToken = null;
    lsDel(REFRESH_KEY);
    lsDel(USER_KEY);
    if (typeof document !== 'undefined') {
      document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
    }
  },
};
