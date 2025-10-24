"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SettingsItem {
  href?: string;
  label: string;
  icon: React.JSX.Element;
  className?: string;
  tag?: "global" | "regional";
  children?: SettingsItem[];
}

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
  items: SettingsItem[];
}

const TreeItem = ({
  item,
  onClose,
  level = 0,
}: {
  item: SettingsItem;
  onClose: () => void;
  level?: number;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const content = (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md py-2 px-3 hover:bg-accent hover:text-accent-foreground transition-colors text-sm",
        level === 0 ? "font-medium text-foreground" : "text-muted-foreground",
        item.className
      )}
      style={{ paddingLeft: `${level * 16 + 12}px` }}
    >
      {hasChildren ? (
        <button
          onClick={toggle}
          className="p-0.5 hover:bg-muted rounded transition-colors"
        >
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      ) : (
        <div className="w-4" />
      )}

      <span className="shrink-0">{item.icon}</span>
      <span>{item.label}</span>

      {item?.tag && (
        <Badge
          variant={item.tag === "global" ? "default" : "secondary"}
          className={cn(
            "text-[10px] px-2 py-0.5 ml-2 capitalize",
            item.tag === "global"
              ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
              : "bg-green-100 text-green-700 hover:bg-green-100"
          )}
        >
          {item.tag}
        </Badge>
      )}
    </div>
  );

  return (
    <div className="mb-0.5">
      {item.href ? (
        <Link href={item.href} onClick={onClose} className="block">
          {content}
        </Link>
      ) : (
        <div
          onClick={hasChildren ? toggle : undefined}
          className="cursor-pointer"
        >
          {content}
        </div>
      )}

      {hasChildren && expanded && (
        <div className="space-y-0.5">
          {item.children!.map((child, i) => (
            <TreeItem
              key={i}
              item={child}
              onClose={onClose}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsDrawer = ({ open, onClose, items }: SettingsDrawerProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filterItems = (items: SettingsItem[], term: string): SettingsItem[] => {
    if (!term) return items;
    return items
      .map((item) => {
        const matches = item.label.toLowerCase().includes(term.toLowerCase());
        const filteredChildren = item.children
          ? filterItems(item.children, term)
          : [];
        if (matches || filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return null;
      })
      .filter(Boolean) as SettingsItem[];
  };

  const filteredItems = filterItems(items, searchTerm);

  return (
    <Sheet open={open} onOpenChange={(state) => !state && onClose()}>
      <SheetContent side="right" className="w-[400px] sm:w-[450px] p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>System Settings</SheetTitle>
        </SheetHeader>

        <div className="px-6 py-3 border-b">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 py-2 focus:ring-0 focus:outline-none focus:shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-160px)] px-4 py-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <TreeItem key={i} item={item} onClose={onClose} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">No settings found</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDrawer;
