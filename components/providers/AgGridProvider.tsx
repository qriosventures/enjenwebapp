"use client"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

export function AGGridProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}