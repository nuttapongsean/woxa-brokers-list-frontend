import { apiClient } from './client';
import { config } from '@/lib/config';
import { mockAuth } from '@/lib/mock/handlers';
import {
  AuthResponseSchema,
  type LoginInput,
  type RegisterInput,
  type AuthResponse,
} from '../schemas/auth';

export async function login(data: LoginInput): Promise<AuthResponse> {
  if (config.useMock) return mockAuth.login(data);

  const response = await apiClient.post('/auth/login', data);
  return AuthResponseSchema.parse(response.data);
}

export async function register(data: Omit<RegisterInput, 'confirmPassword'>): Promise<AuthResponse> {
  if (config.useMock) return mockAuth.register(data);

  const response = await apiClient.post('/auth/register', data);
  return AuthResponseSchema.parse(response.data);
}

export async function logout(): Promise<void> {
  if (config.useMock) return mockAuth.logout();

  await apiClient.post('/auth/logout');
}

export async function getMe(): Promise<AuthResponse> {
  if (config.useMock) return mockAuth.getMe();

  const response = await apiClient.get('/auth/me');
  return AuthResponseSchema.parse(response.data);
}
