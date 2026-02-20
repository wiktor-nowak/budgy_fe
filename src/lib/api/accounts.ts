import type {
  CreateAccountFormType,
  UpdateAccountData,
} from "@/schemas/accounts";
import { apiClient } from "./apiClient";

// type CreateAccountData = CreateAccountFormFields & { userId: string }; // If that would be possible to create accounts as an ADMIN - currently it is not.

export async function getUserAccounts() {
  return await apiClient.get("/accounts");
}

export async function getMainAccount() {
  return await apiClient.get("/accounts/main");
}

export async function getAllAccounts() {
  return await apiClient.get("/accounts/all");
}

export async function getAccountsWithCategories() {
  return await apiClient.get("/accounts/with-categories");
}

export async function getAccountsCount() {
  return await apiClient.get("/accounts/count");
}

export async function getAccount(id: string) {
  return await apiClient.get(`/accounts/${id}`);
}

export async function createAccount(createAccountData: CreateAccountFormType) {
  return await apiClient.post("/accounts", createAccountData);
}

export async function updateAccount(
  updateAccountData: UpdateAccountData,
  accountId: string,
) {
  return await apiClient.patch(`/accounts/${accountId}`, updateAccountData);
}

export async function deleteAccount(id: string) {
  return await apiClient.delete(`/accounts/${id}`);
}
