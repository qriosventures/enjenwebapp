'use client'
import React from "react"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "Pending" | "Approved" | "Hold" | "Approving" | "Rejected" 
}

export const statusConfig = {
          Pending: "text-[#A17D2C] border-[#F7E0AB]",
          Approved: "text-blue-700 border-blue-200",
          Approving: "text-[#308362] border-[#308362]",
          Hold: "text-[#E42236] border-[#FF6868]",
          Rejected: "text-white border-[#FF6868]",
        }

export const statusFillConfig = {
          Pending: "bg-[#D2F0E4] text-[#308362] hover:bg-green-200 border-green-200",
          Approved: "text-blue-700 border-blue-200",
          Approving: "text-[#308362] border-[#308362]",
          Hold: "text-[#E42236] border-[#FF6868]",
          Rejected: "bg-[#FF6868] text-white !font-[600] hover:bg-red-600 border-[#FF6868]",
}
        
export const StatusBadge = ({ status }:StatusBadgeProps) => {
  const variant = "secondary"
  const colorClass = `${statusConfig[status]} badge-flat w-20 text-sm bg-[#fff]`
    return <Badge variant={variant} className={colorClass}>{status}</Badge>
}

export const StatusBadgeFill = ({status}:StatusBadgeProps) => { 
  const variant = status === "Rejected" ? "destructive" : "secondary"
  const colorClass = `${statusFillConfig[status]} badge-flat w-20 text-sm`
    return <Badge variant={variant} className={colorClass}>{status}</Badge>
}

