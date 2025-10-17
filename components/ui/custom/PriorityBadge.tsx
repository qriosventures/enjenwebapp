'use client'
import React from "react"
import { Badge } from "@/components/ui/badge"

interface PriorityBadgeProps {
  priority: "High" | "Low"
}
export const PriorityBadge = ({ priority }:PriorityBadgeProps) => {
  const variant = priority === "High" ? "destructive" : "secondary"
  const colorClass = `badge-flat w-20 text-sm
              ${priority === "High"
                ? "bg-[#FF6868] text-white !font-[600] hover:bg-red-600 border-[#FF6868]"
                : "bg-[#D2F0E4] text-[#308362] hover:bg-green-200 border-green-200"}
            `
    return <Badge variant={variant} className={colorClass}>{priority}</Badge>
}


