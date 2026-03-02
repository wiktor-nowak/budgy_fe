import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTransaction, getUserTransactions } from "../api/transactions";

export type Transaction = {
  accountId: string;
  accountName: string;
  category: string;
  id: string;
  amount: number;
  transactionDate: Date;
  description: string | null;
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await getUserTransactions();
      console.log(response);
      return response.data.response;
    },
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

export const useUpdateTransaction = () => {};
export const useDeleteTransaction = () => {};
