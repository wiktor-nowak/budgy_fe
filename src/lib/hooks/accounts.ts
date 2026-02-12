import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createAccount,
  getMainAccount,
  getUserAccounts,
  getAllAccounts,
  getAccountsCount,
  getAccount,
  updateAccount,
  deleteAccount,
  type UpdateAccountData,
} from "@/lib/api/accounts";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await getUserAccounts();
      return response.data.response;
    },
  });
};

export const useMainAccount = () => {
  return useQuery({
    queryKey: ["account", "main"],
    queryFn: async () => {
      const response = await getMainAccount();
      return response.data;
    },
  });
};

export const useAccountsCount = () => {
  return useQuery({
    queryKey: ["accounts", "count"],
    queryFn: async () => {
      const response = await getAccountsCount();
      return response.data;
    },
  });
};

export const useAccount = (id: string | undefined) => {
  return useQuery({
    queryKey: ["account", id],
    queryFn: async () => {
      const response = await getAccount(id as string);
      return response.data.response;
    },
    enabled: !!id,
  });
};

export const useAllAccounts = () => {
  return useQuery({
    queryKey: ["accounts", "all"],
    queryFn: async () => {
      const response = await getAllAccounts();
      return response.data;
    },
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      accountId,
    }: {
      data: UpdateAccountData;
      accountId: string;
    }) => updateAccount(data, accountId),
    onSuccess: (_, input) => {
      queryClient.invalidateQueries({
        queryKey: ["account", input.accountId],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: ["account", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};
