// components/ui/CustomButton.tsx
"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "destructive" | "secondary";
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  icon,
  className = "",
  variant = "default",
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={`flex items-center justify-center gap-1 px-4 py-2 font-semibold rounded transition-colors duration-300 
                  bg-[#1E1F21] text-white border border-[#1E1F21] hover:bg-[#1E1F21] hover:text-[#98FF4F]
                  ${className}`}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Button>
  );
};

export default CustomButton;
