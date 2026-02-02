import type { LoginFormFields, RegisterFormFields } from "@/schemas/auth";

const API_URL = import.meta.env.VITE_BACKEND_URI;

// export const refreshAuthToken = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("No token found in localStorage");
//   }

//   const response = await fetch(`${API_URL}/auth/refresh`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to refresh auth token");
//   }

//   const data = await response.json();
//   localStorage.setItem("token", data.token);
// };

export const login = async (formData: LoginFormFields) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  return await response.json();
};

export const register = async (formData: RegisterFormFields) => {
  const result = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }),
  });

  return result;
};
