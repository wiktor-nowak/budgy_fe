import type { ACCOUNT_TYPES_UNION } from "@/lib/types";

const API_EXPENSES = "http://localhost:3003/api/expenses";

export interface ExpenseData {
  id: string;
  amount: number;
  createdAt: string;
  shared: boolean;
  description?: string;
  account: { type: ACCOUNT_TYPES_UNION };
  category: { name: string };
  accountId: string;
  categoryId: string;
}

export interface ExpenseUpdateData {
  amount?: number;
  accountId?: string;
  categoryId?: string;
  description?: string;
}

export const getExpenses = async (): Promise<ExpenseData[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_EXPENSES, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch expenses!");
  }

  const data = await response.json();
  return data.response;
};

export const addExpense = async (
  expenseData: Omit<ExpenseUpdateData, "id">
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_EXPENSES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add expense");
  }

  const data = await response.json();
  return data.response;
};

export const updateExpense = async (
  id: string,
  expenseData: ExpenseUpdateData
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_EXPENSES}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update expense");
  }

  const data = await response.json();
  return data.response;
};
