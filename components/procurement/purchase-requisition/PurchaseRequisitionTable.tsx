"use client"

import React from "react"
import { DataTable, DataTableColumn } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { PriorityBadge } from "@/components/ui/custom/PriorityBadge"

interface PurchaseRequisition {
  requisitionId: string
  date: string
  requester: string
  neededBy: string
  approver: string
  approverPriority: "High" | "Low"
  status: "Pending" | "Approved" | "Hold" | "Approving"
}

interface PurchaseRequisitionTableProps {
  data: PurchaseRequisition[]
}

export default function PurchaseRequisitionTable({ 
  data 
}: PurchaseRequisitionTableProps) {
  const tableData: PurchaseRequisition[] = data.length > 0 ? data : [
    {
      requisitionId: "REQ-097-672",
      date: "21/03/2023",
      requester: "Sunil Agarwal",
      neededBy: "11/01/2025",
      approver: "Rajashore Mishra",
      approverPriority: "High",
      status: "Pending",
    },
    {
      requisitionId: "REQ-976-310",
      date: "3/07/2023",
      requester: "Sunil Agarwal",
      neededBy: "19/02/2025",
      approver: "Rajashore Mishra",
      approverPriority: "Low",
      status: "Hold",
    },
    {
      requisitionId: "REQ-006-297",
      date: "27/09/2024",
      requester: "Sunil Agarwal",
      neededBy: "24/05/2025",
      approver: "Rajashore Mishra",
      approverPriority: "High",
      status: "Approving",
    },
    {
      requisitionId: "REQ-123-456",
      date: "15/01/2024",
      requester: "Amit Kumar",
      neededBy: "28/03/2025",
      approver: "Priya Sharma",
      approverPriority: "Low",
      status: "Approved",
    },
    {
      requisitionId: "REQ-789-012",
      date: "08/02/2024",
      requester: "Rahul Singh",
      neededBy: "15/04/2025",
      approver: "Neha Patel",
      approverPriority: "High",
      status: "Pending",
    },
        {
      requisitionId: "REQ-789-012",
      date: "08/02/2024",
      requester: "Rahul Singh",
      neededBy: "15/04/2025",
      approver: "Neha Patel",
      approverPriority: "High",
      status: "Pending",
    },
  ]

  const columns: DataTableColumn<PurchaseRequisition>[] = [
    {
      field: "requisitionId",
      headerName: "Requisition ID",
      pinned: "left",
      sortable: true,
    },
    {
      field: "date",
      headerName: "Date",
      sortable: true,
    },
    {
      field: "requester",
      headerName: "Requester",
      sortable: true,

    },
    {
      field: "neededBy",
      headerName: "Needed By",
      sortable: true,

    },
    {
      field: "approver",
      headerName: "Approver",
      sortable: true,

    },
    {
      field: "approverPriority",
      headerName: "Approver",
      sortable: true,
      cellRenderer: (params) => {
        const priority = params.value as "High" | "Low"
        return (
        <PriorityBadge priority={priority} />
        )
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      cellRenderer: (params) => {
        const status = params.value as PurchaseRequisition["status"]       
        const statusConfig = {
          Pending: "text-[#A17D2C] border-[#F7E0AB]",
          Approved: "text-blue-700 border-blue-200",
          Approving: "text-[#308362] border-[#308362]",
          Hold: "text-[#E42236] border-[#FF6868]",
        }
        
        return (
          <Badge
            variant="secondary"
            className={`${statusConfig[status]} badge-flat w-20 text-sm bg-[#fff]`}
          >
            {status}
          </Badge>
        )
      },
    },
  ]


  const rowActions = (row: PurchaseRequisition) => (
    <Button
      size="sm"
      variant="ghost"
      className="text-[#3380CD] hover:text-blue-600 hover:bg-blue-50 border border-[#E6E6E6] badge-flat"  
      onClick={() => handleViewDetails(row)}
    >
      <Eye className="h-4 w-4" size={12} />
    </Button>
  )

  const handleViewDetails = (row: PurchaseRequisition) => {
    console.log("View details for:", row)
    // Navigate to details page or open modal
    // router.push(`/purchase-requisition/${row.requisitionId}`)
  }

  return (
    <DataTable
      data={tableData}
      columns={columns}
      rowActions={rowActions}
      searchPlaceholder="Search requisitions..."
      height="auto"
      searchable={false}
      paginationPageSize={20}
      gridOptions={{
        getRowStyle: () => ({ marginTop: "10px"}),
        getRowHeight: () => 50,
        defaultColDef: {
          cellStyle: { display: "flex", alignItems: "center", paddingBottom: "10px"},
        }
      }}
      bulkActions={[
        {
          label: "Approve Selected",
          onClick: (rows) => console.log("Approve", rows),
        },
        {
          label: "Reject Selected",
          onClick: (rows) => console.log("Reject", rows),
          variant: "destructive",
        },
      ]}
    />
  )
}