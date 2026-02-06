import axios from "axios";
import { tokenStore } from "./tokenStore";
import { queryClient } from "@/lib/query/queryClient";

const API_URL = import.meta.env.VITE_BACKEND_URI;

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

//request interceptors
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStore.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptors
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      tokenStore.clear();
      queryClient.removeQueries({ queryKey: ["auth"] });
    }
    return Promise.reject(error);
  },
);
