// hooks/useUsers.ts
import { getAccessToken } from "@/lib/api/auth";
import { tokenStore } from "@/lib/api/tokenStore";
import { useQuery } from "@tanstack/react-query";

async function handleAccessToken() {
  const response = await getAccessToken();
  const token = response?.data.accessToken;
  tokenStore.set(token);
  return token;
}

export function useAccessToken() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: handleAccessToken,
    staleTime: Infinity,
    retry: false,
  });
}
