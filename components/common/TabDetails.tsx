"use client"

import React, { useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface TabConfig {
  key: string
  label: string
  content: ReactNode
  disabled?: boolean
  badge?: string | number
}

interface DynamicTabsProps {
  tabs: TabConfig[]
  defaultTab?: string
  className?: string
  tabClassName?: string
  contentClassName?: string
  onTabChange?: (tabKey: string) => void
}

export function DynamicTabs({
  tabs,
  defaultTab,
  className,
  tabClassName,
  contentClassName,
  onTabChange,
}: DynamicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key)

  const handleTabChange = (tabKey: string) => {
    const tab = tabs.find(t => t.key === tabKey)
    if (tab?.disabled) return
    
    setActiveTab(tabKey)
    onTabChange?.(tabKey)
  }

  const activeTabContent = tabs.find(tab => tab.key === activeTab)?.content

  return (
    <div className={cn("w-full", className)}>
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              disabled={tab.disabled}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors relative",
                activeTab === tab.key
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                tab.disabled && "opacity-50 cursor-not-allowed",
                tabClassName
              )}
              aria-current={activeTab === tab.key ? "page" : undefined}
            >
              {tab.label}
              {tab.badge && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className={cn("bg-white", contentClassName)}>
        {activeTabContent}
      </div>
    </div>
  )
}

export function ExampleSupplierDetailTabs() {
  const tabs: TabConfig[] = [
    {
      key: "details",
      label: "Details",
      content: (
        <div className="p-6">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                Established
              </p>
              <p className="text-base font-normal">20-01-1990</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                Tax ID
              </p>
              <p className="text-base font-normal">TTUYT8768987997</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                No. of Employees
              </p>
              <p className="text-base font-normal">5000</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-6">
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                Annual Revenue
              </p>
              <p className="text-base font-normal">500000000</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                ISO Certified
              </p>
              <p className="text-base font-normal">YES</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "compliances",
      label: "Compliances",
      content: (
        <div className="p-6">
          <p className="text-gray-500">Compliances content goes here</p>
        </div>
      ),
    },
    {
      key: "addresses",
      label: "Addresses",
      content: (
        <div className="p-6">
          <p className="text-gray-500">Addresses content goes here</p>
        </div>
      ),
    },
    {
      key: "contacts",
      label: "Contacts",
      content: (
        <div className="p-6">
          <p className="text-gray-500">Contacts content goes here</p>
        </div>
      ),
    },
    {
      key: "documents",
      label: "Documents",
      content: (
        <div className="p-6">
          <p className="text-gray-500">Documents content goes here</p>
        </div>
      ),
    },
  ]

  return (
    <DynamicTabs
      tabs={tabs}
      defaultTab="details"
      onTabChange={(key) => console.log("Tab changed to:", key)}
    />
  )
}