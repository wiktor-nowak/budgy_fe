import axios from "axios";
import { refresh } from "../api/auth";
import { tokenStore } from "../api/tokenStore";

let refreshPromise: Promise<string | null> | null = null;

export async function tryRestoreSession(): Promise<string | null> {
  return await getFreshToken();
}

export async function getFreshToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = refresh()
      .then((res) => {
        const token = res.data.accessToken;
        tokenStore.set(token);
        return token;
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          tokenStore.clear();
          return null;
        }
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}
