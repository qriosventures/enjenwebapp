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
  suppliersData?: SupplierDto[]
}

// Fallback dummy data
const FALLBACK_DATA: SupplierDto[] = [
  {
    id: 1,
    companyName: "Green Energy Co.",
    legalName: "Green Energy Company Private Limited",
    taxId: "ABC45678BNKL",
    primaryContactName: "John Doe",
    email: "info@greenenergy.com",
    phone: "456-789-1234",
    yearsInBusiness: 5,
    annualRevenue: 5000000,
    employeeCount: 50,
    status: 2, // Rejected
    registrationDate: new Date("2020-11-25"),
    lastEvaluationDate: new Date("2024-01-15"),
    averageRating: 4.5,
  },
  {
    id: 2,
    companyName: "Company Pvt Ltd",
    legalName: "Company Private Limited",
    taxId: "ABC45BNJ00",
    primaryContactName: "Jane Smith",
    email: "name@company.com",
    phone: null,
    yearsInBusiness: 3,
    annualRevenue: 3000000,
    employeeCount: 25,
    status: 0, // Pending
    registrationDate: new Date("2050-01-11"),
    lastEvaluationDate: null,
    averageRating: 0,
  },
  {
    id: 3,
    companyName: "Tech Solutions Inc",
    legalName: "Tech Solutions Incorporated",
    taxId: "XYZ12345ABC",
    primaryContactName: "Mike Johnson",
    email: "contact@techsolutions.com",
    phone: "123-456-7890",
    yearsInBusiness: 8,
    annualRevenue: 8500000,
    employeeCount: 120,
    status: 1, // Pending follow-up
    registrationDate: new Date("2050-01-11"),
    lastEvaluationDate: new Date("2024-02-20"),
    averageRating: 4.8,
  },
]

export const DB_STATUS_TO_STRING: Record<StatusEnum, StatusBadgeProps["status"]> = {
  [StatusEnum.Pending]: "Pending",
  [StatusEnum.Approved]: "Approved",
  [StatusEnum.Rejected]: "Rejected",
  [StatusEnum.Approving]: "Approving",
  [StatusEnum.Hold]: "Hold",
}


const ManageSuppliers = ({ suppliersData }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false)
  
  const suppliers = React.useMemo(
    () => suppliersData && suppliersData.length > 0 
      ? suppliersData 
      : FALLBACK_DATA,
    [suppliersData]
  )

  const formatDate = (date: Date | null) => {
    if (!date) return "-"
    try {
      return format(new Date(date), "dd-MM-yyyy")
    } catch {
      return "-"
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
    actions={[]}
    onFlag={handleView}
    />
  )

  return (
    <div className="space-y-4">
      {suppliers.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          
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

export default ManageSuppliers;