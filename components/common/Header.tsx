// components/layout/Header.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Warehouse,
  BarChart3,
  FileText,
  Truck,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Menu,
  BookOpen,
  ArrowDownToDot,
  ReceiptText,
  NotebookText,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTabContext } from "@/components/conetxt/TabContext";
import SettingsDrawer from "../settings/common/SettingsDrawer";
import { settingsItems } from "../settings/common/setting-items";

interface NavItem {
  title: string;
  path?: string;
  children?: NavItem[];
  icon?: React.ReactNode;
  useTabs?: boolean;
  tabKeys?: string[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", path: "/", icon: <Home size={20} />,tabKeys: ["Dashboard", "Reports", "Settings"],useTabs: true},
  {
    title: "Procurement",
    path: "/Procurement",
    icon: <ArrowDownToDot size={16} />,
    children: [
      {
        title: "Supplier Registration & Onboarding",
        path: "/procurement/supplier-registration-onboarding",
        icon: <i className="bi bi-tag me-2"></i>,
        useTabs: true,
        tabKeys: ["Overview", "Registration", "Approvals", "Manage Suppliers"],
      },
      {
        title: "Purchase Requisition",
        path: "/procurement/purchase-requisition",
        icon: <i className="bi bi-globe me-2"></i>,
        useTabs: true,
        tabKeys: ["Listing", "Create", "Approvals"],
      },
      {
        title: "Purchase Order Management",
        path: "/Purchase-order-management",
        icon: <i className="bi bi-person-lines-fill me-2"></i>,
      },
      {
        title: "Supplier Performance Tracking",
        icon: <i className="bi bi-globe me-2"></i>,
        tabKeys: ["Dashboard", "Reports", "Settings"],
        useTabs: true,
      },
    ],
  },
  { title: "Warehouse", path: "/warehouse", icon: <Warehouse size={20} /> },
  { title: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
  { title: "Orders", path: "/orders", icon: <ReceiptText size={20} /> },
  { title: "Logistics", path: "/logistics", icon: <Truck size={20} /> },
  { title: "Documents", path: "/documents", icon: <NotebookText size={20} /> },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { setActiveTab, getActiveTab } = useTabContext();

  const [activeTop, setActiveTop] = useState<string | null>(null);
  const [activeSecond, setActiveSecond] = useState<{
    topIndex: number;
    childIndex: number;
  } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveTop(null);
        setActiveSecond(null);
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTop(null);
        setActiveSecond(null);
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    setActiveTop(null);
    setActiveSecond(null);
  }, [pathname]);

  const handleTopToggle = (index: number) => {
    const key = `top-${index}`;
    setActiveTop((prev) => (prev === key ? null : key));
    setActiveSecond(null);
  };

  const handleSecondClick = (
    topIndex: number,
    childIndex: number,
    item: NavItem
  ) => {
    if (item.children?.length) {
      setActiveSecond({ topIndex, childIndex });
    } else if (item.path) {
      setActiveTop(null);
      setActiveSecond(null);
      if (item.useTabs) {
        const firstTab = item.tabKeys?.[0] || "Tab1";
        setActiveTab(item.path, firstTab);
      }
    }
  };

  const isActive = (path?: string) => (path ? pathname === path : false);

const getPersistentSection = () => {
  const currentPath = pathname || "";
  let matchedSection: any = null;
  let deepestMatchLength = 0;

  for (let topIndex = 0; topIndex < navItems.length; topIndex++) {
    const top = navItems[topIndex];

    if (top.path && currentPath.startsWith(top.path)) {
      if (top.path.length > deepestMatchLength) {
        matchedSection = {
          topIndex,
          childIndex: null,
          secondItem: top,
          topItem: top,
          hasThirdLevel: !!top.useTabs,
        };
        deepestMatchLength = top.path.length;
      }
    }

    if (top.children?.length) {
      for (let childIndex = 0; childIndex < top.children.length; childIndex++) {
        const child = top.children[childIndex];
        if (child.path && currentPath.startsWith(child.path)) {
          if (child.path.length > deepestMatchLength) {
            matchedSection = {
              topIndex,
              childIndex,
              secondItem: child,
              topItem: top,
              hasThirdLevel: !!child.useTabs,
            };
            deepestMatchLength = child.path.length;
          }
        }

        if (child.children?.length) {
          for (const sub of child.children) {
            if (sub.path && currentPath.startsWith(sub.path)) {
              if (sub.path.length > deepestMatchLength) {
                matchedSection = {
                  topIndex,
                  childIndex,
                  secondItem: child,
                  topItem: top,
                  hasThirdLevel: !!child.useTabs,
                };
                deepestMatchLength = sub.path.length;
              }
            }
          }
        }
      }
    }
  }

  return matchedSection;
};


  const persistentSection = getPersistentSection();

  const isTopLevelActive = (idx: number) => {
    if (activeTop === `top-${idx}`) return true;
    if (persistentSection && persistentSection.topIndex === idx) return true;
    const item = navItems[idx];
    return item.path ? pathname === item.path : false;
  };

  const shouldShowSecondLevel =
    activeTop ||
    (persistentSection &&
      !persistentSection.hasThirdLevel &&
      !persistentSection.secondItem?.useTabs);

  const shouldShowThirdLevel =
    activeSecond ||
    (persistentSection &&
      (persistentSection?.hasThirdLevel ||
        persistentSection?.secondItem?.useTabs));

  const handleTabClick = (
    e: React.MouseEvent,
    tabKey: string,
    sectionPath: string
  ) => {
    e.preventDefault();
    setActiveTab(sectionPath, tabKey);
  };

  return (
    <div ref={headerRef} className="w-full bg-[#1B1C1E] text-white z-50">
      <div className="px-6 sm:px-8 lg:px-12 xl:px-16 py-1">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center justify-center p-2 rounded-md bg-[#1A1D21]"
            >
              <Image
                src="/images/logo.png"
                alt="Enjen"
                width={35}
                height={35}
              />
            </Link>

            <nav className="flex items-center gap-2 ml-4">
              {navItems.map((item, idx) => {
                const key = `top-${idx}`;
                const active = isTopLevelActive(idx);
                const hasChildren = !!item.children?.length;

                return (
                  <div key={key} className="relative">
                    <div
                      className={`group inline-flex items-center gap-1 px-1 py-0.5 rounded-md transition-all duration-200 ${
                        active
                          ? "text-[#98FF4F]"
                          : "text-gray-400 hover:text-[#98FF4F]"
                      }`}
                    >
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => handleTopToggle(idx)}
                          className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md ${
                            active ? "bg-[#292B2D] transition font-medium" : ""
                          }`}
                        >
                          <div>{item.icon}</div>
                          <span
                            className={`ml-1 text-sm font-medium text-[#98FF4F] whitespace-nowrap overflow-hidden transition-all duration-300 transform
                              ${
                                active
                                  ? "max-w-[160px] opacity-100 translate-x-0"
                                  : "max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[160px] group-hover:opacity-100 group-hover:translate-x-0"
                              }`}
                          >
                            {item.title}
                          </span>
                          <ChevronDown
                            size={14}
                            className={`ml-1 transition-transform ${
                              activeTop === key ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.path || "#"}
                          onClick={() => {
                            setActiveTop(null);
                            setActiveSecond(null);
                          }}
                          className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md ${
                            active ? "bg-[#292B2D] transition font-medium" : ""
                          }`}
                        >
                          <div>{item.icon}</div>
                          <span
                            className={`ml-1 text-sm font-medium text-[#98FF4F] whitespace-nowrap overflow-hidden transition-all duration-300 transform
                              ${
                                active
                                  ? "max-w-[160px] opacity-100 translate-x-0"
                                  : "max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[160px] group-hover:opacity-100 group-hover:translate-x-0"
                              }`}
                          >
                            {item.title}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className={`group flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md text-gray-400 hover:text-[#98FF4F] transition-all duration-200 hover:bg-[#292B2D]`}
                >
                  <Settings size={20} />
                  <span className="ml-1 text-sm font-medium text-[#98FF4F] whitespace-nowrap overflow-hidden transition-all duration-300 transform max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[160px] group-hover:opacity-100 group-hover:translate-x-0">
                    Settings
                  </span>
                </button>
              </div>
            </nav>
            <SettingsDrawer
              open={settingsOpen}
              onClose={() => setSettingsOpen(false)}
              items={settingsItems}
            />
          </div>

          <div className="flex items-center gap-1 rounded-full bg-[#2A2D31] text-[#777C87] p-1">
            <button className="flex items-center justify-center w-9 h-9 hover:text-[#98FF4F] transition">
              <Search size={20} strokeWidth={2.2} />
            </button>
            <div className="relative">
              <button className="flex items-center justify-center w-9 h-9 hover:text-[#98FF4F] transition cursor-pointer">
                <BookOpen size={20} strokeWidth={2.2} />
              </button>
            </div>

            <div className="relative">
              <button className="flex items-center justify-center w-9 h-9 hover:text-[#98FF4F] transition cursor-pointer">
                <Bell size={20} strokeWidth={2.2} />
              </button>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#98FF4F] rounded-full" />
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-1 pl-2 pr-1 h-10 hover:text-[#98FF4F] transition bg-[#41444A] rounded-full cursor-pointer"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {profileOpen ? (
                  <ChevronUp size={16} strokeWidth={2.2} />
                ) : (
                  <ChevronDown size={16} strokeWidth={2.2} />
                )}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#111317] border border-gray-800 rounded-md shadow-lg py-2 z-40">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm text-gray-200 hover:bg-gray-800"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/logout"
                    className="block px-3 py-2 text-sm text-gray-200 hover:bg-gray-800"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="ml-1 lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1A1D21] hover:text-[#98FF4F] transition"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {shouldShowSecondLevel &&
        (() => {
          const section = activeTop
            ? {
                idx: parseInt(activeTop.split("-")[1], 10),
                activeItem: navItems[parseInt(activeTop.split("-")[1], 10)],
              }
            : persistentSection
            ? {
                idx: persistentSection.topIndex,
                activeItem: navItems[persistentSection.topIndex],
              }
            : null;
          if (!section?.activeItem?.children) return null;
          return (
            <div className="bg-[#2A2D31] border-t border-gray-700">
              <div className="px-6 sm:px-8 lg:px-12 xl:px-16">
                <div className="flex items-center justify-center py-3 relative gap-4">
                  <div className="flex justify-center gap-2">
                    {section.activeItem.children?.map((child, cIdx) => {
                      const activeSecondMatch =
                        (activeSecond?.topIndex === section.idx &&
                          activeSecond?.childIndex === cIdx) ||
                        (persistentSection?.topIndex === section.idx &&
                          persistentSection?.childIndex === cIdx);
                      const hasGrandChildren = !!child.children?.length;

                      if (hasGrandChildren) {
                        return (
                          <div
                            key={cIdx}
                            onClick={() =>
                              handleSecondClick(section.idx, cIdx, child)
                            }
                            className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition text-sm ${
                              activeSecondMatch
                                ? "bg-[#3a3d41] text-white font-medium"
                                : "text-gray-300 hover:bg-[#3a3d41] hover:text-white"
                            }`}
                          >
                            <span>{child.title}</span>
                            <ChevronRight size={12} className="ml-1" />
                          </div>
                        );
                      } else if (child.path) {
                        const isChildActive = pathname.startsWith(child.path);
                        return (
                          <Link
                            key={cIdx}
                            href={child.path}
                            onClick={() =>
                              handleSecondClick(section.idx, cIdx, child)
                            }
                            className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm transition ${
                              isChildActive
                                ? "bg-gradient-to-br from-[#2D7F27] to-[#54AD12] text-white rounded-lg shadow-sm"
                                : "bg-[#2B2D30] text-gray-300 hover:bg-[#3a3d41] hover:text-white"
                            }`}
                          >
                            <span>{child.title}</span>
                          </Link>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      {shouldShowThirdLevel &&
        (() => {
          const section = activeSecond
            ? navItems[activeSecond.topIndex]?.children?.[
                activeSecond.childIndex
              ]
            : persistentSection?.secondItem;
          if (!section) return null;

          const useTabs = section.useTabs;
          const tabsToRender =
            useTabs && section.tabKeys
              ? section.tabKeys
              : section.children?.map((c) => c.title) || [];

          if (tabsToRender.length === 0) return null;

          return (
            <div className="bg-[#F5F6F1] py-2">
              <div className="px-6 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-[#F5F6F1]/20">
                <div className="flex items-center justify-center py-2">
                  <div className="flex justify-center">
                    <div className="flex gap-3 bg-[#1B1C1E] px-3 py-1 rounded-md">
                      {useTabs
                        ? tabsToRender.map((tabKey) => {
                            const active =
                              getActiveTab(section.path || "") === tabKey;
                            return (
                              <button
                                key={tabKey}
                                onClick={(e) =>
                                  handleTabClick(e, tabKey, section.path || "")
                                }
                                className={`px-5 py-2 rounded-md text-sm font-medium transition-all m-1 ${
                                  active
                                    ? "bg-gradient-to-br from-[#2D7F27] to-[#54AD12] text-white rounded-lg"
                                    : "text-gray-300 hover:bg-[#3a3d41] hover:text-white"
                                }`}
                              >
                                {tabKey}
                              </button>
                            );
                          })
                        : section?.children?.map((sub, sIdx) => {
                            const active =
                              sub.path && pathname.startsWith(sub.path);
                            return (
                              <Link
                                key={sIdx}
                                href={sub.path || "#"}
                                className={`px-5 py-2 rounded-md text-sm font-medium transition-all m-1 ${
                                  active
                                    ? "bg-gradient-to-br from-[#2D7F27] to-[#54AD12] text-white rounded-lg"
                                    : "text-gray-300 hover:bg-[#3a3d41] hover:text-white"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default Header;
