import { AuthContext } from "@/lib/auth";
import { useEffect, useState, type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: LayoutProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data.accessToken) {
          setAccessToken(data.accessToken);
        }
      })
      .catch((error) => {
        throw new Error("!!! ", error);
      });
  });

  return (
    <>
      <AuthContext value={{ accessToken, setAccessToken }}>
        {children}
      </AuthContext>
    </>
  );
}
