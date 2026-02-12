import { logout, login, register, verifyEmail, refresh } from "@/lib/api/auth";
import { tokenStore } from "@/lib/api/tokenStore";
import { queryClient } from "@/lib/query/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      tokenStore.set(response.data.accessToken);
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: register,
  });
};

async function handleAccessToken() {
  const response = await refresh();
  tokenStore.set(response?.data.accessToken);
  return response?.data.accessToken;
}

export function useAccessToken() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: handleAccessToken,
    staleTime: Infinity,
    retry: false,
  });
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      tokenStore.clear();
      queryClient.clear();
    },
  });
};
