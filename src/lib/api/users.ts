const API_USERS = "http://localhost:3003/api/users";
const API_AUTH = "http://localhost:3003/api/auth";

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  surname?: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(API_USERS);

  if (!response.ok) {
    throw new Error("Could not fetch users!");
  }

  const data = await response.json();
  return data.response;
};

export const getMe = async (): Promise<User> => {
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
};

export const updateUser = async (id: string, data: Partial<User>) => {
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
};

export const changePassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
) => {
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
};
