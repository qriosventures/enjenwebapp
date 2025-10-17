export interface PurchaseRequisition {
  requisitionId: string
  date: string
  requester: string
  neededBy: string
  approver: string
  approverPriority: "High" | "Low"
  status: "Pending" | "Approved" | "Hold" | "Approving"
}

export interface PurchaseRequisitionResponse {
  data: PurchaseRequisition[]
  total: number
  page: number
  pageSize: number
}