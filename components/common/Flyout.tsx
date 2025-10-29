"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface FlyoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children?: React.ReactNode; 
  closeLabel?: string;
   widthClass?: string;
}

const Flyout = ({ open, onOpenChange, title = "Details", children, closeLabel = "Close",widthClass = "w-[450px] sm:w-[550px]" }: FlyoutProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={`${widthClass} bg-[#F5F6F1] p-6 overflow-y-auto border-l`}
      >
        <SheetHeader className="flex items-center justify-between mb-6">
          <SheetTitle className="text-lg font-semibold">{title}</SheetTitle>
          <Button
            variant="default"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer badge-flat"
          >
            {closeLabel}
          </Button>
        </SheetHeader>

        <div className="space-y-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default Flyout;
