export type SummaryCategory = {
  categoryId: string;
  categoryName: string;
  totalAmount: number;
  totalSpent: number;
};

export type MonthlySummary = {
  id: string;
  accountId: string;
  accountName: string;
  year: number;
  month: number;
  openingBalance: number;
  totalIncome: number;
  totalExpense: number;
  totalSpent: number;
  closingBalance: number;
  categorySummaries: SummaryCategory[];
};

export type CategoryBreakdown = {
  accountId: string;
  accountName: string;
  year: number;
  month: number;
  categories: SummaryCategory[];
};

export type AccountBalanceSummary = {
  accountId: string;
  accountName: string;
  balance: number;
};

export type MonthlyCashflowSummary = {
  accountId: string;
  accountName: string;
  year: number;
  month: number;
  label: string;
  totalIncome: number;
  totalExpense: number;
  totalSpent: number;
};

export type MonthlyClosingBalanceSummary = {
  accountId: string;
  accountName: string;
  year: number;
  month: number;
  label: string;
  closingBalance: number;
};
