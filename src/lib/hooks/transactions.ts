import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getUserTransactions,
  updateTransaction,
} from "../api/transactions";
import type { CreateTransactionFormType } from "@/schemas/transactions";

export type Transaction = {
  accountId: string;
  accountName: string;
  categoryId: string;
  category: string;
  id: string;
  amount: number;
  transactionDate: Date;
  description: string | null;
};

// export const transactionKeys = {
//   all: ["transactions"] as const,
//   detail: (id: string) => ["transactions", id] as const,
// };

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await getUserTransactions();
      return response.data.response;
    },
  });
};

export const useSingleTransaction = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<Transaction>({
    queryKey: ["singleTransaction", id],
    queryFn: async () => {
      const transaction = await getTransaction(id);
      return transaction.data.response;
    },
    initialData: () => {
      const transactions = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);
      return transactions?.find((t) => t.id === id);
    },
    enabled: !!id,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: false,
      });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: false,
      });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      txId,
    }: {
      data: CreateTransactionFormType;
      txId: string;
    }) => updateTransaction(data, txId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
        exact: false,
      });
    },
  });
};
