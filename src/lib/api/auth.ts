import type {
  LoginFormFields,
  RegisterFormFields,
  ValidateEmailFormFields,
} from "@/schemas/auth";
import { authClient } from "../services/api";

export async function refresh() {
  return await authClient.post("/auth/refresh");
}

export async function login(loginData: LoginFormFields) {
  return await authClient.post("/auth/login", loginData);
}

export async function logout() {
  return await authClient.post("/auth/logout");
}

export async function register(
  registerData: Omit<RegisterFormFields, "confirmPassword">,
) {
  return await authClient.post("/users", registerData);
}

export async function verifyEmail(data: ValidateEmailFormFields) {
  return await authClient.post("/auth/verify-email", data);
}
