import { toast } from "sonner";

export function toastErrorWithMessage(error: unknown, message: string) {
  toast.error(
    error instanceof Object && "message" in error
      ? String(error.message)
      : message,
  );
}
