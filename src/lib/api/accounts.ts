import type { ACCOUNT_TYPES_UNION } from "@/lib/types";
import { apiClient } from "./apiClient";
import { throwErrorWithMessage } from "../errors/apiErrors";

export interface Account {
  id: string;
  name: string;
  type: ACCOUNT_TYPES_UNION;
  balance: number;
  description: string;
  owner?: { username: string };
  coOwners?: { user: { username: string } }[];
}

// export const getAccounts = async (): Promise<Account[]> => {
//   const response = await fetch(API_ACCOUNTS);

//   if (!response.ok) {
//     throw new Error("Response not okay!");
//   }

//   const accountsReceived = await response.json();
//   return accountsReceived.response;
// };

// export const getMainAccount = async (): Promise<string> => {
//   const token = localStorage.getItem("token");
//   const response = await fetch(`${API_ACCOUNTS}/main-account`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Response not okay!");
//   } else {
//     const result = await response.json();
//     return result.response.mainAccountId;
//   }
// };

export async function getMyAccounts() {
  try {
    return await apiClient.get("/my-accounts");
  } catch (error) {
    throwErrorWithMessage(error, "Fetching user accounts failed!");
  }
}

// export const getAccount = async (id: string): Promise<Account> => {
//   const response = await fetch(`${API_ACCOUNTS}/${id}`);

//   if (!response.ok) {
//     throw new Error("Response not okay!");
//   }

//   const accountReceived = await response.json();
//   return accountReceived.response;
// };

// export const updateAccount = async (id: string, data: Partial<Account>) => {
//   const response = await fetch(`${API_ACCOUNTS}/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update data!");
//   }
//   const responseData = await response.json();
//   console.log(responseData.message);
// };

// export const deleteAccount = async (id: string) => {
//   const response = await fetch(`${API_ACCOUNTS}/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to remove data!");
//   }
//   const data = await response.json();
//   console.log(data.message);
// };

// export const addAccount = async (
//   token: string,
//   data: AccountFormFields,
//   isFirstAccount: boolean,
// ) => {
//   const response = await fetch("http://localhost:3003/api/accounts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       ...data,
//       isFirstAccount,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error("Response not okay!: " + response.status);
//   }
// };

// export const getAccountsCount = async (token: string) => {
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_URI}/accounts/count`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     },
//   );
//   console.log(response);
// };
