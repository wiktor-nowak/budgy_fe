const API_URL = "http://localhost:3003/api";

export const refreshAuthToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in localStorage");
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to refresh auth token");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
};