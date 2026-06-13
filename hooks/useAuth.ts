'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMe, login, logout, register } from '@/lib/api/auth';
import { queryKeys } from '@/lib/query/keys';
import type { LoginInput, RegisterInput } from '@/lib/schemas/auth';

export function useMe() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: getMe,
    retry: false,
    staleTime: 300_000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginInput) => login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput) =>
      register({ fullName: data.fullName, email: data.email, password: data.password }),
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
