"use client";
import { AGGridProvider } from "./AgGridProvider";
import { TabProviderWrapper } from "./TabProviderWrapper";
import { ToastProvider } from "./ToastProvider";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <AGGridProvider>
        <TabProviderWrapper>{children}</TabProviderWrapper>
      </AGGridProvider>
    </ToastProvider>
  );
};

export default ThemeProvider;
