  "use client"

  import { Eye, Edit, Trash2, Flag, ThumbsUp, CircleX } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
  import React from "react"

  export type ActionType = "view" | "edit" | "delete" | "flag" | "reject" | "approve"

  interface RowActionsProps<T> {
    row: T
    actions?: ActionType[]
    onView?: (row: T) => void
    onEdit?: (row: T) => void
    onDelete?: (row: T) => void
    onFlag?:(row: T) => void
    onApprove?:(row: T) => void
    onReject?:(row: T) => void
    size?: "sm" | "default" | "icon"
    className?: string
    disabled?:boolean
  }

  export function RowActions<T>({
    row,
    actions = ["view", "edit", "delete"],
    onView,
    onEdit,
    onDelete,
    onFlag,
    onApprove,
    onReject,
    size = "sm",
    className = "",
    disabled
  }: RowActionsProps<T>) {
    const baseClass =
      "text-[#3380CD] hover:text-blue-600 hover:bg-blue-50 border border-[#E6E6E6] badge-flat cursor-pointer"

    return (
      <div className="flex items-center gap-2">
        <TooltipProvider>
          {actions.includes("view") && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={size}
                  variant="ghost"
                  className={`${baseClass} ${className}`}
                  onClick={() => onView?.(row)}
                  disabled={disabled}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View</TooltipContent>
            </Tooltip>
          )}

          {actions.includes("edit") && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={size}
                  variant="ghost"
                  className={`${baseClass} ${className}`}
                  onClick={() => onEdit?.(row)}
                  disabled={disabled}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          )}

          {actions.includes("delete") && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={size}
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 border border-[#F5C2C0] cursor-pointer"
                  onClick={() => onDelete?.(row)}
                  disabled={disabled}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          )}

          {
            actions?.includes("flag") && (
              <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={size}
                  variant="ghost"
                  className={`${baseClass} ${className}`}
                  onClick={() => onFlag?.(row)}
                  disabled={disabled}
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Flag</TooltipContent>
            </Tooltip>
            )}

          {
            actions?.includes("approve") && (
              <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={size}
                  variant="ghost"
                  className={`${baseClass} ${className} text-green-500 hover:text-[#3e8840] hover:bg-[#DFF8E0]`}
                  onClick={() => onApprove?.(row)}
                  disabled={disabled}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Approve</TooltipContent>
            </Tooltip>
            )}

                      {
            actions?.includes("reject") && (
              <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={size}
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 border border-[#F5C2C0] cursor-pointer badge-flat"
                  onClick={() => onReject?.(row)}
                  disabled={disabled}
                >
                  <CircleX className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reject</TooltipContent>
            </Tooltip>
            )}
        </TooltipProvider>
      </div>
    )
  }
