import type {
  LoginFormFields,
  RegisterFormFields,
  ValidateEmailFormFields,
} from "@/schemas/auth";
import { apiClient } from "./apiClient";

export async function refresh() {
  return await apiClient.post("/auth/refresh"); //CZY TO POWINNO BYĆ withCredentials?! NIE BO MAM W AXIOS CLIENT
}

export async function login(loginData: LoginFormFields) {
  return await apiClient.post("/auth/login", loginData);
}

export async function logout() {
  return await apiClient.post("/auth/logout");
}

export async function register(
  registerData: Omit<RegisterFormFields, "confirmPassword">,
) {
  return await apiClient.post("/users", registerData);
}

export async function verifyEmail(data: ValidateEmailFormFields) {
  return await apiClient.post("/auth/verify-email", data);
}
