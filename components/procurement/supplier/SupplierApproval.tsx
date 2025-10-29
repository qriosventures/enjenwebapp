"use client"

import React, { useState } from "react"
import { DataTable, DataTableColumn } from "@/components/data-table/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Check, X, UserCircle } from "lucide-react"
import { SupplierDto } from "@/lib/types/supplier"
import { supplierAPI } from "@/components/api/supplierApi"
import { showToastMessage } from "@/components/common/ToastMessage"
import { format } from "date-fns"
import { StatusBadgeFill, StatusBadgeProps } from "@/components/ui/custom/StatusBadge"
import { StatusEnum } from "@/lib/enums/statusEnum"
import { RowActions } from "@/components/ui/custom/RowActions"

type Props = {
  supplierApprovalData?: SupplierDto[]
}

export const DB_STATUS_TO_STRING: Record<StatusEnum, StatusBadgeProps["status"]> = {
  [StatusEnum.Pending]: "Pending",
  [StatusEnum.Approved]: "Approved",
  [StatusEnum.Rejected]: "Rejected",
  [StatusEnum.Approving]: "Approving",
  [StatusEnum.Hold]: "Hold",
}


const SupplierApproval = ({ supplierApprovalData }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false)
  
  const suppliers = React.useMemo(
    () => supplierApprovalData && supplierApprovalData.length > 0 
      ? supplierApprovalData 
      : [],
    [supplierApprovalData]
  )

  console.log(suppliers,"supplierssuppliers>>>>>>>>>>>")

  const formatDate = (date: Date | null) => {
    if (!date) return "-"
    try {
      return format(new Date(date), "dd-MM-yyyy")
    } catch {
      return "-"
    }
  }

  const handleApprove = async (supplier: SupplierDto) => {
    try {
      setIsUpdating(true)
      const payload = { ...supplier, status: 1 }
      
      await showToastMessage.promise(
        supplierAPI(payload, "PUT"),
        {
          loading: "Approving supplier...",
          success: (res: any) => res?.data?.message || "Supplier approved successfully",
          error: (err: any) => err?.data?.message || "Failed to approve supplier",
        }
      )
    } catch (error) {
      console.error("Error approving supplier:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleReject = async (supplier: SupplierDto) => {
    try {
      setIsUpdating(true)
      const payload = { ...supplier, status: 2 }
      
      await showToastMessage.promise(
        supplierAPI(payload, "PUT"),
        {
          loading: "Rejecting supplier...",
          success: (res: any) => res?.data?.message || "Supplier rejected successfully",
          error: (err: any) => err?.data?.message || "Failed to reject supplier",
        }
      )
    } catch (error) {
      console.error("Error rejecting supplier:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleView = (supplier: SupplierDto) => {
    // Navigate to detail page or open modal
    console.log("View supplier:", supplier)
  }

  const columns: DataTableColumn<SupplierDto>[] = [
    {
      field: "companyName",
      headerName: "Supplier Name",
      filter: true,
    },
    {
      field: "registrationDate",
      headerName: "Reg. Date",
      valueFormatter: (params: any) => formatDate(params.value),
      filter: true,
    },
    {
      field: "taxId",
      headerName: "Tax ID",
      filter: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      valueFormatter: (params: any) => params.value || "-",
      filter: true,
    },
    {
      field: "email",
      headerName: "Email",
      filter: true,
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params: any) => {
        const dbValue = params.value as StatusEnum
        const status = DB_STATUS_TO_STRING[dbValue]
        return (
          <StatusBadgeFill status={status}/>
        )
      },
      filter: true,
    },
  ]

  const rowActions = (row: SupplierDto) => (
    <RowActions
    row={row}
    actions={["flag","approve","reject"]}
    onApprove={handleApprove}
    onFlag={handleView}
    onReject={handleReject}
    disabled={isUpdating}
    />
  )

  return (
    <div className="space-y-4">
      {suppliers.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No suppliers pending approval
        </div>
      ) : (
        <DataTable
          data={suppliers}
          columns={columns}
          rowActions={rowActions}
          rowActionsColumnLabel="Actions"
          className=" bg-[#F5F6F1] px-6 py-4 rounded-md"
          searchPlaceholder="Search suppliers..."
          searchable={false}
          pagination={false}
          paginationPageSize={10}
          showCheckboxSelection={false}
          gridOptions={{
            getRowStyle: () => ({ marginTop: "4px", borderBottom: "none" }),
            getRowHeight: () => 48,
            defaultColDef: {
              cellStyle: {
                display: "flex",
                alignItems: "center",
                paddingBottom: "6px",
              },
            },
          }}
        />
      )}
    </div>
  )
}

export default SupplierApproval