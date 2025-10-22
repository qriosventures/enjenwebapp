"use client";

import PurchaseRequisitionTable from "@/components/procurement/purchase-requisition/PurchaseRequisitionTable";
import { purchaseRequisitionAPI } from "@/components/api/purchaseRequisitionApi";
import DynamicTabPage from "@/components/common/DynamicTabPage";
import DynamicStepperForm from "@/components/common/stepper/DynamicStepperForm";

 export const steps = [
    { label: 'Account Info' },
    { label: 'Profile Details' },
    { label: 'Upload Documents' },
    { label: 'Review & Submit' }
  ];
 export const stepContent = [
    <div key="step-1">Step 1: Enter Account Info</div>,
    <div key="step-2">Step 2: Profile Details</div>,
    <div key="step-3">Step 3: Upload Documents</div>,
    <div key="step-4">Step 4: Review Everything</div>
  ];


export default function SupplierRegistrationOnBoardingPage() {
  return (
    <DynamicTabPage
      sectionPath="/procurement/supplier-registration-onboarding"
      title="Supplier Registration Details"
      tabsConfig={[
        {
          key: "Overview",
          fetchData: purchaseRequisitionAPI,
          content: (data) => <PurchaseRequisitionTable data={data} />,
        },
        {
          key: "Registration",
          title: "Supplier Registration Form",
          content: () => (
            <>
            <DynamicStepperForm steps={steps} stepContent={stepContent}/>
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Create Purchase Requisition
              </h2>
              <p className="text-gray-600">Create form goes here</p>
            </div>
            </>
          ),
        },
        {
          key: "Approvals",
          title: "Pending Approval List",
          content: () => (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Approvals</h2>
              <p className="text-gray-600">Approvals table goes here</p>
            </div>
          ),
        },
        {
          key: "Manage Suppliers",
          title: "Suppliers",
          content: () => (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Manage Suppliers</h2>
              <p className="text-gray-600">
                Supplier management content goes here
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}
