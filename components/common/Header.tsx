"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Download,
  Warehouse,
  BarChart3,
  FileText,
  Truck,
  ClipboardList,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Menu,
  X,
  CircleUser,
  LogOut,
} from "lucide-react";

interface NavItem {
  title: string;
  path?: string;
  children?: NavItem[];
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { title: "Dashboard", path: "/", icon: <Home size={16}/>},
  { title: "Downloads", path: "/downloads", icon: <Download size={16} />, children: [
        {
          title: "Brands",
          icon: <i className="bi bi-tag me-2"></i>,
          children: [
            {
              title: "Add New Brand",
              path: "/brands/add",
              icon: <i className="bi bi-plus-circle me-2"></i>,
            },
            {
              title: "Brand Categories",
              path: "/brands/categories",
              icon: <i className="bi bi-grid me-2"></i>,
            }
          ]
        },
        {
          title: "States",
          icon: <i className="bi bi-globe me-2"></i>,
          children: [
            {
              title: "State Details",
              path: "/states/details",
              icon: <i className="bi bi-info-circle me-2"></i>,
            }
          ]
        },
        {
          title: "Designations",
          path: "/designations",
          icon: <i className="bi bi-person-lines-fill me-2"></i>,
        }
      ]},
  { title: "Warehouse", path: "/warehouse", icon: <Warehouse size={16} /> },
  { title: "Reports", path: "/reports", icon: <BarChart3 size={16} /> },
  { title: "Orders", path: "/orders", icon: <ClipboardList size={16} /> },
  { title: "Logistics", path: "/logistics", icon: <Truck size={16} /> },
  { title: "Documents", path: "/documents", icon: <FileText size={16} /> },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement | null>(null);

  // state
  const [activeTop, setActiveTop] = useState<string | null>(null); // "top-0", ...
  const [activeSecond, setActiveSecond] = useState<{
    topIndex: number;
    childIndex: number;
  } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Click outside to close menus
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

  // If route changes, clear open menus (and optionally highlight active)
  useEffect(() => {
    setActiveTop(null);
    setActiveSecond(null);
  }, [pathname]);

  const handleTopClick = (index: number, item: NavItem) => {
    const key = `top-${index}`;
    if (item.path) {
      // clicking a link will navigate; keep highlight via isActive
      setActiveTop(null);
      setActiveSecond(null);
    } else {
      setActiveTop((prev) => (prev === key ? null : key));
      setActiveSecond(null);
    }
  };

  const handleSecondClick = (
    topIndex: number,
    childIndex: number,
    item: NavItem
  ) => {
    if (item.path) {
      setActiveTop(null);
      setActiveSecond(null);
    } else if (item.children) {
      setActiveSecond({ topIndex, childIndex });
    }
  };

  const isActive = (path?: string) => (path ? pathname === path : false);

  return (
    <div
      ref={headerRef}
      className="w-full bg-[#111317] text-white border-b border-gray-800 z-50"
    >
      <div className="max-w-[1280px] mx-auto px-4 py-2 sm:px-6 lg:px-8 ">
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
                const active = activeTop === key || isActive(item.path);
                return (
                  <div key={key} className="relative">
                    {item.path ? (
                      <Link
                        href={item.path}
                        onClick={() => {
                          setActiveTop(null);
                          setActiveSecond(null);
                        }}
                        className={`group inline-flex items-center gap-2 px-1 py-0.5 rounded-md transition-all duration-200 ${
                          active
                            ? "text-lime-400"
                            : "text-gray-400 hover:text-lime-300"
                        }`}
                        title={item.title}
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-md bg-[#1A1D21] ${
                            active ? "ring-2 ring-lime-400" : ""
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span
                          className={`ml-1 text-sm font-medium text-lime-400 whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out transform
    ${
      active
        ? "max-w-[160px] opacity-100 translate-x-0"
        : "max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[160px] group-hover:opacity-100 group-hover:translate-x-0"
    }
  `}
                        >
                          {item.title}
                        </span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleTopClick(idx, item)}
                        className={`group inline-flex items-center gap-2 px-1 py-0.5 rounded-md transition-all duration-200 ${
                          active
                            ? "text-lime-400"
                            : "text-gray-400 hover:text-lime-300"
                        }`}
                        aria-expanded={active}
                        aria-controls={active ? "submenu-strip" : undefined}
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-md bg-[#1A1D21] ${
                            active ? "ring-2 ring-lime-400" : ""
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span
                          className={`ml-2 text-sm font-medium text-lime-400 whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out transform
                            ${
                              active
                                ? "max-w-[160px] opacity-100 translate-x-0"
                                : "max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[160px] group-hover:opacity-100 group-hover:translate-x-0"
                            }
                        `}
                        >
                          {item.title}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-[#41444A] text-gray-300">
            <button
              aria-label="Search"
              className="flex items-center justify-center w-9 h-9 text-gray-300 hover:text-lime-400 transition cursor-pointer"
            >
                <Search size={16} />
            </button>

            <div className="relative">
              <button
                aria-label="Notifications"
                className="flex items-center justify-center w-9 h-9 text-gray-300 hover:text-lime-400 transition cursor-pointer"
              >
                <Bell size={16} />
              </button>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-lime-400 rounded-full" />
            </div>

            {/* profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-2 pl-2 pr-3 h-9 text-gray-300 hover:text-lime-400 transition border border-transparent cursor-pointer"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
              >
                <CircleUser size={20} />
                <span className="hidden sm:inline-block">
                    {profileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {/* profile dropdown */}
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

            {/* mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="ml-1 lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1A1D21] text-gray-300 hover:text-lime-400 transition"
              aria-label="Open menu"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Submenu strip (2nd level) */}
      {activeTop &&
        (() => {
          const idx = parseInt(activeTop.split("-")[1], 10);
          const activeItem = navItems[idx];
          if (!activeItem?.children) return null;
          return (
            <div
              id="submenu-strip"
              className="bg-[#232427] border-t border-b border-gray-800"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-2 py-2 justify-center">
                  {activeItem.children.map((child, cIdx) => {
                    const activeSecondMatch =
                      activeSecond?.topIndex === idx &&
                      activeSecond?.childIndex === cIdx;
                    return (
                      <div
                        key={cIdx}
                        onClick={() => handleSecondClick(idx, cIdx, child)}
                        className={`flex items-center gap-2 px-3 py-2 rounded text-sm cursor-pointer select-none transition ${
                          activeSecondMatch || isActive(child.path)
                            ? "bg-[#2f363a] text-lime-400"
                            : "text-gray-300 hover:bg-[#2b2f32]"
                        }`}
                      >
                        <span className="text-base">{child.icon}</span>
                        <span>{child.title}</span>
                        {child.children && (
                          <i className="bi bi-chevron-right ml-1 text-xs" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

      {/* Third-level popover (centered) */}
      {activeSecond &&
        (() => {
          const { topIndex, childIndex } = activeSecond;
          const third = navItems[topIndex]?.children?.[childIndex]?.children;
          if (!third || third.length === 0) return null;
          return (
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1 bg-[#2a2f32] border border-gray-800 rounded-md shadow-lg z-40 px-3 py-2 mt-2">
                <div className="flex gap-2">
                  {third.map((t, i) => (
                    <Link
                      key={i}
                      href={t.path || "#"}
                      onClick={() => {
                        setActiveTop(null);
                        setActiveSecond(null);
                      }}
                      className={`px-3 py-1 rounded text-sm ${
                        isActive(t.path)
                          ? "bg-[#3a3f42] text-lime-400"
                          : "text-gray-300 hover:bg-[#33383b]"
                      }`}
                    >
                      <span className="mr-2">{t.icon}</span>
                      {t.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      {/* Mobile off-canvas */}
      <div
        className={`fixed inset-0 z-50 lg:hidden pointer-events-none transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#0f1113] border-l border-gray-800 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-[#1A1D21] flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="text-lg font-semibold">Menu</div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-gray-300"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            {/* Mobile nav (recursive-ish) */}
            <div className="space-y-2">
              {navItems.map((item, idx) => {
                const hasChildren = !!item.children?.length;
                return (
                  <div key={idx} className="border-b border-gray-800 pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.path ?? "#"}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="w-9 h-9 rounded-md bg-[#1A1D21] flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="text-sm text-gray-200">
                          {item.title}
                        </div>
                      </Link>
                      {hasChildren && (
                        <button
                          onClick={() => {
                            // toggle second-level open using activeTop state (mobile specific, reuse activeTop)
                            setActiveTop((prev) =>
                              prev === `top-${idx}` ? null : `top-${idx}`
                            );
                          }}
                          className="p-2 text-gray-300"
                        >
                          <i
                            className={`bi ${
                              activeTop === `top-${idx}`
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {activeTop === `top-${idx}` && item.children && (
                      <div className="pl-4 pt-2 space-y-1">
                        {item.children.map((sub, sIdx) => (
                          <div key={sIdx}>
                            <div className="flex items-center justify-between">
                              <Link
                                href={sub.path ?? "#"}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-gray-300 py-1 block"
                              >
                                {sub.title}
                              </Link>
                              {sub.children && (
                                <button
                                  onClick={() =>
                                    setActiveSecond((prev) =>
                                      prev &&
                                      prev.topIndex === idx &&
                                      prev.childIndex === sIdx
                                        ? null
                                        : { topIndex: idx, childIndex: sIdx }
                                    )
                                  }
                                  className="p-1 text-gray-400"
                                >
                                  <i
                                    className={`bi ${
                                      activeSecond?.topIndex === idx &&
                                      activeSecond.childIndex === sIdx
                                        ? "bi-chevron-up"
                                        : "bi-chevron-down"
                                    }`}
                                  />
                                </button>
                              )}
                            </div>

                            {activeSecond?.topIndex === idx &&
                              activeSecond.childIndex === sIdx &&
                              sub.children && (
                                <div className="pl-4 pt-1 space-y-1">
                                  {sub.children.map((deep, dIdx) => (
                                    <Link
                                      key={dIdx}
                                      href={deep.path ?? "#"}
                                      onClick={() => setMobileOpen(false)}
                                      className="text-sm text-gray-400 block py-1"
                                    >
                                      {deep.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-gray-800 pt-4">
              <Link
                href="/profile"
                className="block text-gray-200 py-2"
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </Link>
              <Link
                href="/logout"
                className="block text-gray-200 py-2"
                onClick={() => setMobileOpen(false)}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
