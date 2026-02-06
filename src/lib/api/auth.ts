import type { LoginFormFields, RegisterFormFields } from "@/schemas/auth";
import { apiClient } from "./apiClient";
import { throwErrorWithMessage } from "../errors/apiErrors";

export async function refresh() {
  try {
    return await apiClient.post("/auth/refresh"); //CZY TO POWINNO BYĆ withCredentials?! NIE BO MAM W AXIOS CLIENT
  } catch (error) {
    throwErrorWithMessage(error, "Refresh failed!");
  }
}

export async function login(loginData: LoginFormFields) {
  try {
    return await apiClient.post("/auth/login", loginData);
  } catch (error) {
    throwErrorWithMessage(error, "Login failed!");
  }
}

export async function logout() {
  try {
    return await apiClient.post("/auth/logout");
  } catch (error) {
    throwErrorWithMessage(error, "There is no such route!");
  }
}

export async function register(
  registerData: Omit<RegisterFormFields, "confirmPassword">,
) {
  try {
    return await apiClient.post("/users", registerData);
  } catch (error) {
    throwErrorWithMessage(error, "Registration failed!");
  }
}
