import { apiClient } from "../services/api";

export async function getMonthlySummaries(params?: {
  accountId?: string;
  year?: number;
  month?: number;
  limit?: number;
}) {
  return await apiClient.get("/summary/monthly", {
    params,
  });
}

export async function getMonthlySummary(id: string) {
  return await apiClient.get(`/summary/monthly/${id}`);
}

export async function getLatestMainAccountCategoryBreakdown() {
  return await apiClient.get("/summary/main-account/latest-category-breakdown");
}

export async function getAccountBalances(limit = 5) {
  return await apiClient.get("/summary/accounts/balances", {
    params: { limit },
  });
}

export async function getAccountsMonthlyCashflow(limit?: number) {
  return await apiClient.get("/summary/accounts/monthly-cashflow", {
    params: limit ? { limit } : undefined,
  });
}

export async function getAccountsMonthlyClosingBalances(limit?: number) {
  return await apiClient.get("/summary/accounts/monthly-closing-balances", {
    params: limit ? { limit } : undefined,
  });
}
