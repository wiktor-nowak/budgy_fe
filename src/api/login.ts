import type { LoginFormFields } from "@/schemas/login";

const AUTHENTICATION_ROUTE = "http://localhost:3003/api/authentication";

export const login = async (formData: LoginFormFields) => {
  const response = await fetch(AUTHENTICATION_ROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return await response.json();
};
