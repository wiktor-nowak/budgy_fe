import { ACCOUNT_TYPES } from "@/lib/constants";
import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(ACCOUNT_TYPES),
  description: z.string(),
  setAsMain: z.boolean(),
});

export type CreateAccountFormType = z.infer<typeof createAccountSchema>;
export type AccountType = CreateAccountFormType & { balance: number };
export type UpdateAccountData = Omit<CreateAccountFormType, "type">;
