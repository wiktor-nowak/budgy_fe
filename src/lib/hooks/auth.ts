import { login, logout, register, verifyEmail } from "@/lib/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "../api/tokenStore";
import { getAccessStatus, type AccessStatus } from "../api/users";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: register,
  });
};

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      tokenStore.set(res.data.accessToken);
    },
  });
}

// async function fetchSession() {
//   try {
//     const response = await refresh();
//     const token = response?.data?.accessToken ?? null;
//     console.log(token);
//     console.log(response);
//     return token;
//   } catch {
//     return null;
//   }
// }

// export function useAuth() {
//   return useQuery({
//     queryKey: ["auth"],
//     queryFn: handleAccessToken,
//     staleTime: Infinity,
//     gcTime: Infinity,
//     retry: false,
//   });
// }

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      tokenStore.clear();
      queryClient.clear();
    },
  });
}

export function useAccessStatus(enabled = true) {
  return useQuery<AccessStatus>({
    queryKey: ["auth", "access-status"],
    queryFn: async () => {
      const response = await getAccessStatus();
      return response.data.response;
    },
    enabled,
    retry: false,
  });
}
