import { z } from "zod";

// TODO Password check is done twice, on frontend and on backend!
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginFormFields = z.infer<typeof loginSchema>;
