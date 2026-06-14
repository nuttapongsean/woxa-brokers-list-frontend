'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, register } from '@/lib/api/auth';
import { tokenStorage } from '@/lib/api/tokenStorage';
import { queryKeys } from '@/lib/query/keys';
import type { LoginInput, RegisterInput } from '@/lib/schemas/auth';

// Reads user from tokenStorage — no network call needed (no /auth/me endpoint)
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => tokenStorage.getUser(),
    staleTime: Infinity,
    retry: false,
  });
}

export const useMe = useCurrentUser;

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginInput) => login(data),
    onSuccess: (tokens) => {
      queryClient.setQueryData(queryKeys.auth.me(), tokens.user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterInput) =>
      register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        agreeToTerms: data.agreeToTerms,
      }),
    onSuccess: (tokens) => {
      queryClient.setQueryData(queryKeys.auth.me(), tokens.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
