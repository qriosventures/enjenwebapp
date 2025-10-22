// components/conetxt/TabProviderWrapper.tsx
"use client";

import { TabProvider } from "./TabContext";

export function TabProviderWrapper({ children }: { children: React.ReactNode }) {
  return <TabProvider>{children}</TabProvider>;
}
