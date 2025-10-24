  "use client"

  import { Eye, Edit, Trash2 } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
  import React from "react"

  type ActionType = "view" | "edit" | "delete"

  interface RowActionsProps<T> {
    row: T
    actions?: ActionType[]
    onView?: (row: T) => void
    onEdit?: (row: T) => void
    onDelete?: (row: T) => void
    size?: "sm" | "default" | "icon"
    className?: string
  }

  export function RowActions<T>({
    row,
    actions = ["view", "edit", "delete"],
    onView,
    onEdit,
    onDelete,
    size = "sm",
    className = "",
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
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
    )
  }
