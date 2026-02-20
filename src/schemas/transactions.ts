import { z } from "zod";

export const createTransactionSchema = z.object({
  accountId: z.string(),
  categoryId: z.string(),
  amount: z.coerce
    .number("Please enter a number")
    .refine((n) => n !== 0, "Amount cannot be zero"),
  description: z.string(),
  transactionDate: z.date(),
});

export type CreateTransactionFormType = z.input<typeof createTransactionSchema>;
export type UpdateTransactionType = CreateTransactionFormType & { id: string };
