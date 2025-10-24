"use client";

import toast from "react-hot-toast";

export type APIResponse = {
  status?: number;
  data?: {
    isSuccess?: boolean;
    message?: string;
  };
};

type ToastPromiseMessages = {
  loading?: string;
  success?: string | ((data: any) => string);
  error?: string | ((err: any) => string);
};

const toastStyle = (bgColor = "#1e293b") => ({
  borderRadius: "8px",
  padding: "12px 16px",
  fontWeight: "bold",
  color: "#fff",
  background: bgColor,
});

export const showToastMessage = {
  loading: (msg = "Please wait...", id?: string) => toast.loading(msg, { id, style: toastStyle("#1e293b") }),

  success: (msg = "Success", id?: string) => toast.success(msg, { id, style: toastStyle("#22c55e") }),

  error: (msg = "Something went wrong", id?: string) => toast.error(msg, { id, style: toastStyle("#ef4444") }),

  response: (response: APIResponse, customSuccess?: string, customError?: string) => {
    if (response?.data?.isSuccess === false) {
      toast.error(customError || response.data.message || "Operation failed", { style: toastStyle("#ef4444") });
    } else {
      toast.success(customSuccess || response.data?.message || "Success", { style: toastStyle("#22c55e") });
    }
  },

  // Handle promise-based async actions
  promise: async (promise: Promise<any>, messages?: ToastPromiseMessages) => {
    return toast.promise(
      promise as any,
      {
        loading: messages?.loading || "Processing...",
        success: (data: any) =>
          typeof messages?.success === "function"
            ? messages.success(data)
            : messages?.success || data?.data?.message || "Success",
        error: (err: any) =>
          typeof messages?.error === "function"
            ? messages.error(err)
            : messages?.error || err?.data?.message || "Failed",
        style: toastStyle("#1e293b"),
      }
    );
  },
};
