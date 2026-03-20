import { z } from "zod";

export const createTransactionSchema = z.object({
  accountId: z.string("Field required."),
  categoryId: z.string("Field required."),
  amount: z.coerce
    .number("Transaction amount is required.")
    .min(0, "Amount must be positive")
    .refine(
      (val) => Math.round(val * 100) === val * 100,
      "Maximum 2 decimal places allowed.",
    ),
  description: z.string(),
  transactionDate: z.date(),
});

export type CreateTransactionFormType = z.input<typeof createTransactionSchema>;
export type CreateTransactionRequestType = Omit<
  CreateTransactionFormType,
  "transactionDate"
> & {
  transactionDate: string;
};
export type UpdateTransactionType = CreateTransactionRequestType & { id: string };
