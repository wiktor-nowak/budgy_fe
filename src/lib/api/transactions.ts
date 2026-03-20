import type { CreateTransactionRequestType } from "@/schemas/transactions";
import { apiClient } from "../services/api";

export async function getUserTransactions() {
  return await apiClient.get("/transactions");
}

export async function createTransaction(
  createTransactionData: CreateTransactionRequestType,
) {
  return await apiClient.post("/transactions", createTransactionData);
}

export async function getTransaction(txId: string) {
  return await apiClient.get(`/transactions/${txId}`);
}

export async function deleteTransaction(txId: string) {
  return await apiClient.delete(`/transactions/${txId}`);
}

export const updateTransaction = async (
  updateData: CreateTransactionRequestType,
  txId: string,
) => {
  return await apiClient.put(`/transactions/${txId}`, updateData);
};

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
