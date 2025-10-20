const API_USERS = "http://localhost:3003/api/users";
const API_AUTH = "http://localhost:3003/api/auth";

export interface User {
  id: string;
  username: string;
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
