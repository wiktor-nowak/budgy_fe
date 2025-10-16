import type { ACCOUNT_TYPES_UNION } from "@/lib/types";

const API_ACCOUNTS = "http://localhost:3003/api/accounts";

export interface Account {
  id: number;
  name: string;
  type: ACCOUNT_TYPES_UNION;
  balance: number;
  description: string;
}

export const getAccounts = async (): Promise<Account[]> => {
  const response = await fetch(API_ACCOUNTS);

  if (!response.ok) {
    throw new Error("Response not okay!");
  }

  const accountsReceived = await response.json();
  return accountsReceived.response;
};

export const getAccount = async (id: number): Promise<Account> => {
  const response = await fetch(`${API_ACCOUNTS}/${id}`);

  if (!response.ok) {
    throw new Error("Response not okay!");
  }

  const accountReceived = await response.json();
  return accountReceived.response;
};

export const updateAccount = async (id: number, data: Partial<Account>) => {
  const response = await fetch(`${API_ACCOUNTS}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update data!");
  }
  const responseData = await response.json();
  console.log(responseData.message);
};

export const deleteAccount = async (id: number) => {
  const response = await fetch(`${API_ACCOUNTS}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove data!");
  }
  const data = await response.json();
  console.log(data.message);
};
