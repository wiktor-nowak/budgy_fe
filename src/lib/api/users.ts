import { apiClient } from "../services/api";

const API_AUTH = "http://localhost:3003/auth";
const API_USERS = "http://localhost:3003/users";
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  surname?: string;
}

export async function getAllUsers() {
  return await apiClient.get("/accounts/all");
}

export async function getMe(): Promise<User> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_AUTH}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch current user profile!");
  }

  const data = await response.json();
  return data.response;
}

export async function updateUser(id: string, data: Partial<User>) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_USERS}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user data!");
  }
  const responseData = await response.json();
  console.log(responseData.message);
}

export async function changePassword(
  id: string,
  oldPassword: string,
  newPassword: string,
) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_USERS}/${id}/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!response.ok) {
    throw new Error("Failed to change password!");
  }
  const responseData = await response.json();
  console.log(responseData.message);
}
