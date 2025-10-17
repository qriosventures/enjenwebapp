// app/procurement/purchase-requisition/listing/PurchaseRequisitionContent.tsx
"use server"

import { purchaseRequisitionAPI } from "@/components/api/purchaseRequisitionApi"
import PurchaseRequisitionTable from "./PurchaseRequisitionTable"

export default async function PurchaseRequisitionContent() {
  const purchaseRequisitionsResponse = await purchaseRequisitionAPI()
  const purchaseRequisitions = purchaseRequisitionsResponse?.data || []

  return <PurchaseRequisitionTable data={purchaseRequisitions} />
}
