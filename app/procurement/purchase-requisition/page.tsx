"use client";

import DynamicTabPage from "@/components/common/DynamicTabPage";
import { purchaseRequisitionAPI } from "@/components/api/purchaseRequisitionApi";
import PurchaseRequisitionTable from "@/components/procurement/purchase-requisition/PurchaseRequisitionTable";
import { Button } from "@/components/ui/button";

export default function PurchaseRequisitionPage() {
  return (
    <DynamicTabPage
      sectionPath="/procurement/purchase-requisition"
      title="Requisition Details"
      headerButton={
        <Button
          className="border cursor-pointer text-sm font-medium border-[#F5F6F1] bg-[#F5F6F1] text-[#6C7059] hover:text-[#6C7059] hover:!font-semibold px-3 py-1 transition-all rounded-none"
          variant="ghost"
        >
          View History
        </Button>
      }
      tabsConfig={[
        {
          key: "Listing",
          title: "Requisition Details",
          fetchData: purchaseRequisitionAPI,
          content: (data) => <PurchaseRequisitionTable data={data} />,
        },
        {
          key: "Create",
          title: "Requisition Creation",
          content: () => (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Create Purchase Requisition
              </h2>
              <p className="text-gray-600">Create form goes here</p>
            </div>
          ),
        },
        {
          key: "Approvals",
          title: "Requisition Details",
          content: () => (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Approvals</h2>
              <p className="text-gray-600">Approvals table goes here</p>
            </div>
          ),
        },
      ]}
    />
  );
}
