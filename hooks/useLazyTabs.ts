"use client";

import { useTabContext } from "@/components/conetxt/TabContext";
import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";

export interface TabDefinition {
  key: string;
  fetchData?: () => Promise<any> | any;
  initialData?: any;
}

export function useLazyTabs(tabDefs: TabDefinition[]) {
  const { getActiveTab } = useTabContext();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const initialTabsState = Object.fromEntries(
    tabDefs.map((tab) => [
      tab.key,
      {
        data: tab.initialData ?? null,
        loading: false,
        loaded: !!tab.initialData,
      },
    ])
  );

  const [tabs, setTabs] = useState(initialTabsState);

  const fetchTabData = async (key: string, fetchFn?: () => Promise<any>) => {
    if (!fetchFn) return; 
    setTabs((prev) => ({
      ...prev,
      [key]: { ...prev[key], loading: true },
    }));

    try {
      const result = await fetchFn();
      setTabs((prev) => ({
        ...prev,
        [key]: {
          data: result?.data?.result || [],
          loading: false,
          loaded: true,
        },
      }));
    } catch (err) {
      console.error(`Failed to load tab "${key}":`, err);
      setTabs((prev) => ({
        ...prev,
        [key]: { ...prev[key], loading: false },
      }));
    }
  };

  const activeTab = getActiveTab(pathname);

  useEffect(() => {
    const active = tabDefs.find((t) => t.key === activeTab);

    if (active && active.fetchData) {
      startTransition(() => fetchTabData(active.key, active.fetchData));
    }
  }, [activeTab]);

  return { tabs, isPending };
}
