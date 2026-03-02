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
  getAccountsWithCategories,
} from "@/lib/api/accounts";
import type { UpdateAccountData } from "@/schemas/accounts";

export type Category = {
  id: string;
  name: string;
};

export type AccountWithCategories = {
  id: string;
  name: string;
  categories: Category[];
};

const ONE_ACCOUNT_QUERY_KEY = "account";
const ACCOUNTS_QUERY_KEY = "accounts";

export const useAccounts = () => {
  return useQuery({
    queryKey: [ACCOUNTS_QUERY_KEY],
    queryFn: async () => {
      const response = await getUserAccounts();
      return response.data.response;
    },
  });
};

export const useAccountsWithCategories = () => {
  return useQuery<AccountWithCategories[]>({
    queryKey: [ACCOUNTS_QUERY_KEY, "withCategories"],
    queryFn: async () => {
      const response = await getAccountsWithCategories();
      return response.data.response;
    },
  });
};

export const useMainAccount = () => {
  return useQuery({
    queryKey: [ONE_ACCOUNT_QUERY_KEY, "main"],
    queryFn: async () => {
      const response = await getMainAccount();
      return response.data.response;
    },
  });
};

export const useAccountsCount = () => {
  return useQuery({
    queryKey: [ACCOUNTS_QUERY_KEY, "count"],
    queryFn: async () => {
      const response = await getAccountsCount();
      return response.data;
    },
  });
};

export const useAccount = (id: string | undefined) => {
  return useQuery({
    queryKey: [ONE_ACCOUNT_QUERY_KEY, id],
    queryFn: async () => {
      const response = await getAccount(id as string);
      return response.data.response;
    },
    enabled: !!id,
  });
};

export const useAllAccounts = () => {
  return useQuery({
    queryKey: [ACCOUNTS_QUERY_KEY, "all"],
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
      queryClient.invalidateQueries({
        queryKey: [ACCOUNTS_QUERY_KEY],
        exact: false,
      });
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
        queryKey: [ONE_ACCOUNT_QUERY_KEY, input.accountId],
      });
      queryClient.invalidateQueries({
        queryKey: [ACCOUNTS_QUERY_KEY],
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
        queryKey: [ONE_ACCOUNT_QUERY_KEY, id],
      });
      queryClient.invalidateQueries({
        queryKey: [ACCOUNTS_QUERY_KEY],
      });
    },
  });
};
