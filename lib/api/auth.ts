import { apiClient } from './client';
import { config } from '@/lib/config';
import { mockAuth } from '@/lib/mock/handlers';
import { AuthTokensSchema, type LoginInput, type RegisterInput, type AuthTokens } from '../schemas/auth';
import { tokenStorage } from './tokenStorage';
import { authEndpoints } from './endpoints';

async function setSessionCookie() {
  await fetch('/api/auth/session', { method: 'POST' });
}

async function clearSessionCookie() {
  await fetch('/api/auth/session', { method: 'DELETE' });
}

export async function login(data: LoginInput): Promise<AuthTokens> {
  if (config.useMock) {
    const result = await mockAuth.login(data);
    tokenStorage.save(result.accessToken, result.refreshToken, result.user);
    await setSessionCookie();
    return result;
  }

  const response = await apiClient.post(authEndpoints.login, data);
  const tokens = AuthTokensSchema.parse(response.data);
  tokenStorage.save(tokens.accessToken, tokens.refreshToken, tokens.user);
  await setSessionCookie();
  return tokens;
}

export async function register(
  data: Omit<RegisterInput, 'confirmPassword'>
): Promise<AuthTokens> {
  if (config.useMock) {
    const result = await mockAuth.register(data);
    tokenStorage.save(result.accessToken, result.refreshToken, result.user);
    await setSessionCookie();
    return result;
  }

  const response = await apiClient.post(authEndpoints.register, data);
  const tokens = AuthTokensSchema.parse(response.data);
  tokenStorage.save(tokens.accessToken, tokens.refreshToken, tokens.user);
  await setSessionCookie();
  return tokens;
}

export async function logout(): Promise<void> {
  if (config.useMock) {
    tokenStorage.clear();
    await clearSessionCookie();
    return mockAuth.logout();
  }

  try {
    await apiClient.post(authEndpoints.logout);
  } finally {
    tokenStorage.clear();
    await clearSessionCookie();
  }
}
