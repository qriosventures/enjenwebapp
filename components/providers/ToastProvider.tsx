// components/common/ToastProvider.tsx
"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    {children}
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
          top: 80,
        }}
      toastOptions={{
          style: {
              padding: "5px 16px",
              fontWeight: "semi-bold",
              color: "#fff",
            },
            success: {
                style: { background: "#1b1c1e", color: "#98FF4F" },
            },
            error: {
                style: { background: "#ef4444", color: "#fff" },
            },
            loading: {
                style: { background: "#1e293b", color: "#fff" },
            },
        }}
        />
        </>
  );
};
