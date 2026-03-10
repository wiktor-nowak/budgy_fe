import axios from "axios";
import { tokenStore } from "../api/tokenStore";
import { getFreshToken } from "./authService";

const API_URL = import.meta.env.VITE_BACKEND_URI;

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const authClient = axios.create({
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
    const req = error.config;
    const normalizedError = {
      status: error.response?.status,
      message:
        error.response?.data?.message ?? error.message ?? "Unexpected error",
    };

    if (error.response?.status !== 401 || req._retry) {
      return Promise.reject(normalizedError);
    }

    req._retry = true;

    const token = await getFreshToken();
    if (!token) return Promise.reject(error);

    req.headers.Authorization = `Bearer ${token}`;

    return apiClient(req);
  },
);
