"use client";
import { useEffect, ReactNode } from "react";
import { useTabContext } from "@/components/conetxt/TabContext";
import { useLazyTabs, TabDefinition } from "@/hooks/useLazyTabs";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumbs from "@/components/common/Breadcrumbs";

interface TabConfig extends TabDefinition {
  content?: (data: any) => ReactNode; 
  title?: string;
}

interface DynamicTabPageProps {
  sectionPath: string;
  title?: string;
  tabsConfig: TabConfig[];
  headerButton?: ReactNode;
  from?:string
}

const DynamicTabPage = ({ sectionPath, title, tabsConfig,headerButton,from }: DynamicTabPageProps) => {
  const { setActiveTab, getActiveTab } = useTabContext();

  useEffect(() => {
    if (!getActiveTab(sectionPath)) {
      setActiveTab(sectionPath, tabsConfig[0].key);
    }
  }, [sectionPath, tabsConfig]);

  const { tabs, isPending } = useLazyTabs(tabsConfig);
  const activeTab = getActiveTab(sectionPath) || tabsConfig[0].key;

  const activeTabState = tabs[activeTab];

  return (
    <div className="mx-auto space-y-6">
     {!from ? (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {tabsConfig.find((tab) => tab.key === activeTab)?.title || title}
            </h1>
            <Breadcrumbs />
          </div>
          {headerButton && <>{headerButton}</>}
        </div>
      ) : null}
      {activeTabState?.loading || isPending ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <div className="transition-all duration-300 ease-in-out">
          {tabsConfig.map((tab) => {
            if (tab.key !== activeTab) return null;

            if (tab.content) {
              return <div key={tab.key}>{tab.content(activeTabState?.data || [])}</div>;
            }

            return <div key={tab.key}>No content</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default DynamicTabPage;