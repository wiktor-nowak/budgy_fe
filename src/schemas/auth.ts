import { z } from "zod";

// TODO Password check is done twice, on frontend and on backend!
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// TODO Password check is done twice, on frontend and on backend!
export const validateEmailSchema = z.object({
  email: z.string().email(),
});

export const registerSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormFields = z.infer<typeof loginSchema>;
export type RegisterFormFields = z.infer<typeof registerSchema>;
export type ValidateEmailFormFields = z.infer<typeof validateEmailSchema>;
