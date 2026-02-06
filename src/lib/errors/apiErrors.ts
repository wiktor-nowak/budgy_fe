import axios from "axios";

export function throwErrorWithMessage(error: unknown, message: string) {
  if (axios.isAxiosError(error)) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message ?? message,
    };
  }
  throw error;
}
