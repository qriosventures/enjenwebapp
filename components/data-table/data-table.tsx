"use client"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-theme-alpine.css"
import {
  ColDef,
  GridReadyEvent,
  GridOptions,
  RowSelectedEvent,
  SelectionChangedEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Settings2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { addSequentialId } from "@/lib/utils/sequenceData"


// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule])

export interface DataTableColumn<TData = any> extends Omit<ColDef<TData>, "field"> {
  field: keyof TData & string
  headerName: string
  width?: number
  cellRenderer?: (params: any) => React.ReactNode
  filter?: boolean | string
  sortable?: boolean
  editable?: boolean
}

export interface BulkAction {
  label: string
  onClick: (selectedRows: any[]) => void
  icon?: React.ReactNode
  variant?: "default" | "destructive"
}

interface DataTableProps<TData = any> {
  data: TData[]
  columns: DataTableColumn<TData>[]
  loading?: boolean
  className?: string
  showCheckboxSelection?:boolean;
  // Search
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  
  // Selection
  rowSelection?: "single" | "multiple"
  onSelectionChange?: (selectedRows: TData[]) => void
  
  // Bulk Actions
  bulkActions?: BulkAction[]
  
  // Pagination
  pagination?: boolean
  paginationPageSize?: number
  paginationPageSizeSelector?: number[]
  
  // Custom actions per row
  rowActions?: (row: TData) => React.ReactNode

  rowActionsColumnLabel?: string;
  
  // AG Grid options
  gridOptions?: GridOptions
  
  height?: string | number
  
  onRowClick?: (row: TData) => void
  resizable?:boolean
  
}

export function DataTable<TData extends Record<string, any>>({
  data,
  columns,
  loading = false,
  className,
  searchable = true,
  searchPlaceholder = "Search...",
  onSearch,
  rowSelection,
  onSelectionChange,
  bulkActions,
  pagination = true,
  paginationPageSize = 20,
  paginationPageSizeSelector = [10, 20, 50, 100],
  rowActions,
  rowActionsColumnLabel='Actions',
  gridOptions,
  // height = "600px",
  showCheckboxSelection=false,
  onRowClick,
  resizable=false
}: DataTableProps<TData>) {
  const gridRef = useRef<AgGridReact>(null)
  const [selectedRows, setSelectedRows] = useState<TData[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

const columnDefs = useMemo<ColDef[]>(() => {
  let cols: ColDef[] = [];

  if (rowSelection) {
    cols.push({
      checkboxSelection: showCheckboxSelection,
      headerCheckboxSelection: rowSelection === "multiple",
      width: 50,
      lockPosition: true,
      suppressMovable: true,
    });
  }

  cols = [
    ...cols,
    ...columns.map((col) => ({
      ...col,
      filter: col.filter ?? true,
      sortable: col.sortable ?? true,
      resizable: false,
    })),
  ];

  if (rowActions) {
    cols.push({
      headerName: rowActionsColumnLabel,
      field: "actions",
      width: 120,
      cellRenderer: (params: any) => rowActions(params.data),
      sortable: false,
      filter: false,
      resizable: resizable,
    });
  }

  return cols;
}, [columns, rowSelection, showCheckboxSelection, rowActions]);



  const defaultGridOptions: GridOptions = {
    animateRows: true,
    rowSelection: rowSelection,
    suppressRowClickSelection: false,
    enableCellTextSelection: false,
    pagination: pagination,
    paginationPageSize: paginationPageSize,
    paginationPageSizeSelector: paginationPageSizeSelector,
    suppressPaginationPanel: true, 
    suppressAutoSize: false,
    headerHeight: 40,
    theme: "legacy",
    ...gridOptions,
  }

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    if (pagination) {
      updatePaginationInfo()
    }
  }, [pagination])

  // Handle selection change
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      const selected = event.api.getSelectedRows()
      setSelectedRows(selected)
      onSelectionChange?.(selected)
    },
    [onSelectionChange]
  )

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value)
      gridRef.current?.api?.setGridOption("quickFilterText", value)
      onSearch?.(value)
    },
    [onSearch]
  )

  // Pagination handlers
  const updatePaginationInfo = useCallback(() => {
    if (gridRef.current?.api) {
      const api = gridRef.current.api
      setCurrentPage(api.paginationGetCurrentPage() + 1)
      setTotalPages(api.paginationGetTotalPages())
    }
  }, [])

  const goToFirstPage = () => {
    gridRef.current?.api?.paginationGoToFirstPage()
    updatePaginationInfo()
  }

  const goToPreviousPage = () => {
    gridRef.current?.api?.paginationGoToPreviousPage()
    updatePaginationInfo()
  }

  const goToNextPage = () => {
    gridRef.current?.api?.paginationGoToNextPage()
    updatePaginationInfo()
  }

  const goToLastPage = () => {
    gridRef.current?.api?.paginationGoToLastPage()
    updatePaginationInfo()
  }

  // Handle row click
  const onRowClicked = useCallback(
    (event: any) => {
      if (onRowClick) {
        onRowClick(event.data)
      }
    },
    [onRowClick]
  )

  const sequencedData = addSequentialId(data, "id");

  return (
    <div className={cn("space-y-4", className)}>
      {(searchable || (bulkActions && selectedRows.length > 0)) && (
        <div className="flex items-center justify-between gap-4">
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 focus-visible:ring-0"
              />
            </div>
          )}

          {bulkActions && selectedRows.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Bulk Actions ({selectedRows.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {bulkActions.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => action.onClick(selectedRows)}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      <div
        className={`${cn(
          "ag-theme-alpine",
          "rounded-md border overflow-auto"
        )} pb-2`}
        // style={{height}}
      >
        <AgGridReact
          ref={gridRef}
          rowData={sequencedData || []}
          columnDefs={columnDefs || []}
          gridOptions={defaultGridOptions}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          onRowClicked={onRowClicked}
          loading={loading}
          domLayout="autoHeight"
          onPaginationChanged={updatePaginationInfo}
          defaultColDef={{
                        sortable: true,
                        resizable: true,
                        filter: true,
                        cellStyle: {display: "flex", alignItems: "center" },
          }}
          
        />
      </div>

      {/* Custom Pagination */}
      {pagination && data.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {(currentPage - 1) * paginationPageSize + 1} to{" "}
            {Math.min(currentPage * paginationPageSize, data.length)} of {data.length}
          </div>
          <div className="flex items-center gap-2">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}