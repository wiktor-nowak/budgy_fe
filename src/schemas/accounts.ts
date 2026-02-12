import { ACCOUNT_TYPES } from "@/lib/constants";
import { z } from "zod";

export const createAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(ACCOUNT_TYPES),
  balance: z
    .number()
    .nonnegative()
    .transform((val) => +val.toFixed(2)),
  description: z.string(),
  setAsMain: z.boolean(),
});

export type CreateAccountFormType = z.input<typeof createAccountSchema>;
