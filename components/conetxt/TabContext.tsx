// 1. Updated TabContext (Dynamic tabs)
// ==========================================
// components/context/TabContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type TabContextType = {
  tabs: Record<string, string>; 
  setActiveTab: (section: string, tabKey: string) => void;
  getActiveTab: (section: string) => string | undefined;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<Record<string, string>>({});

  const setActiveTab = (section: string, tabKey: string) => {
    setTabs((prev) => ({ ...prev, [section]: tabKey }));
  };

  const getActiveTab = (section: string) => {
    return tabs[section];
  };

  return (
    <TabContext.Provider value={{ tabs, setActiveTab, getActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("useTabContext must be used inside TabProvider");
  return ctx;
}