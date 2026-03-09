// import type { ACCOUNT_TYPES } from "../types";

import type { CreateTransactionFormType } from "@/schemas/transactions";
import { apiClient } from "../services/api";

export async function getUserTransactions() {
  return await apiClient.get("/transactions");
}

export async function createTransaction(
  createTransactionData: CreateTransactionFormType,
) {
  return await apiClient.post("/transactions", createTransactionData);
}

// export const getExpenses = async (): Promise<ExpenseData[]> => {
//   const token = localStorage.getItem("token");
//   const response = await fetch(API_EXPENSES, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Could not fetch expenses!");
//   }

//   const data = await response.json();
//   return data.response;
// };

// export const addExpense = async (
//   expenseData: Omit<ExpenseUpdateData, "id">,
// ) => {
//   const token = localStorage.getItem("token");
//   const response = await fetch(API_EXPENSES, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(expenseData),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error || "Failed to add expense");
//   }

//   const data = await response.json();
//   return data.response;
// };

// export const updateExpense = async (
//   id: string,
//   expenseData: ExpenseUpdateData,
// ) => {
//   const token = localStorage.getItem("token");
//   const response = await fetch(`${API_EXPENSES}/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(expenseData),
//   });

//   const data = await response.json();
//   return data.response;
// };

// export const deleteExpense = async (id: string) => {
//   const token = localStorage.getItem("token");
//   const response = await fetch(`${API_EXPENSES}/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error || "Failed to delete expense");
//   }
// };

// export const getExpenseMonths = async (): Promise<
//   { year: number; month: number }[]
// > => {
//   const token = localStorage.getItem("token");
//   const response = await fetch(`${API_EXPENSES}/months`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Could not fetch expense months!");
//   }

//   const data = await response.json();
//   return data.response;
// };

// export const getMonthlySummary = async (
//   year: number,
//   month: number,
// ): Promise<unknown[]> => {
//   const token = localStorage.getItem("token");
//   const response = await fetch(
//     `${API_EXPENSES}/monthly-summary?year=${year}&month=${month}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   if (!response.ok) {
//     throw new Error("Could not fetch monthly summary!");
//   }

//   const data = await response.json();
//   return data.response;
// };
