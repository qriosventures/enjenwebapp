// components/conetxt/TabProviderWrapper.tsx
"use client";

import { TabProvider } from "../conetxt/TabContext";

export function TabProviderWrapper({ children }: { children: React.ReactNode }) {
  return <TabProvider>{children}</TabProvider>;
}
