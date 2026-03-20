import { useQuery } from "@tanstack/react-query";
import {
  getAccountBalances,
  getAccountsMonthlyCashflow,
  getAccountsMonthlyClosingBalances,
  getLatestMainAccountCategoryBreakdown,
  getMonthlySummaries,
  getMonthlySummary,
} from "../api/summary";
import type {
  AccountBalanceSummary,
  CategoryBreakdown,
  MonthlyCashflowSummary,
  MonthlyClosingBalanceSummary,
  MonthlySummary,
} from "../types/summary";

const SUMMARY_QUERY_KEY = "summary";

export function useMonthlySummaries(params?: {
  accountId?: string;
  year?: number;
  month?: number;
  limit?: number;
}) {
  return useQuery<MonthlySummary[]>({
    queryKey: [SUMMARY_QUERY_KEY, "monthly", params ?? {}],
    queryFn: async () => {
      const response = await getMonthlySummaries(params);
      return response.data.response;
    },
  });
}

export function useMonthlySummary(id: string) {
  return useQuery<MonthlySummary>({
    queryKey: [SUMMARY_QUERY_KEY, "monthly", id],
    queryFn: async () => {
      const response = await getMonthlySummary(id);
      return response.data.response;
    },
    enabled: !!id,
  });
}

export function useLatestMainAccountCategoryBreakdown() {
  return useQuery<CategoryBreakdown>({
    queryKey: [SUMMARY_QUERY_KEY, "main-account", "latest-category-breakdown"],
    queryFn: async () => {
      const response = await getLatestMainAccountCategoryBreakdown();
      return response.data.response;
    },
  });
}

export function useAccountBalances(limit = 5) {
  return useQuery<AccountBalanceSummary[]>({
    queryKey: [SUMMARY_QUERY_KEY, "accounts", "balances", limit],
    queryFn: async () => {
      const response = await getAccountBalances(limit);
      return response.data.response;
    },
  });
}

export function useAccountsMonthlyCashflow(limit?: number) {
  return useQuery<MonthlyCashflowSummary[]>({
    queryKey: [SUMMARY_QUERY_KEY, "accounts", "monthly-cashflow", limit ?? null],
    queryFn: async () => {
      const response = await getAccountsMonthlyCashflow(limit);
      return response.data.response;
    },
  });
}

export function useAccountsMonthlyClosingBalances(limit?: number) {
  return useQuery<MonthlyClosingBalanceSummary[]>({
    queryKey: [
      SUMMARY_QUERY_KEY,
      "accounts",
      "monthly-closing-balances",
      limit ?? null,
    ],
    queryFn: async () => {
      const response = await getAccountsMonthlyClosingBalances(limit);
      return response.data.response;
    },
  });
}
