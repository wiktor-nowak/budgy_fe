import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../api/transactions";

export const useTransactions = () => {};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useUpdateTransaction = () => {};
export const useDeleteTransaction = () => {};
