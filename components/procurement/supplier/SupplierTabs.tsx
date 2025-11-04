'use client';

import PurchaseRequisitionTable from "@/components/procurement/purchase-requisition/PurchaseRequisitionTable";
import DynamicTabPage from "@/components/common/DynamicTabPage";
import SupplierRegistrationOnBoardingPage from "@/components/procurement/supplier/SupplierRegistrationOnBoardingPage";
import SupplierApproval from "@/components/procurement/supplier/SupplierApproval";
import React from "react";
import ManageSuppliers from "./ManageSuppliers";

interface Props {
    dataToChild?: any
}
const SupplierTabs = ({dataToChild}:Props) => {

  const dataToChildren = React.useMemo(()=> dataToChild ? dataToChild : [],[dataToChild])
    
  return (
    <DynamicTabPage
      sectionPath="/procurement/supplier-registration-onboarding"
      title="Supplier Registration Details"
      tabsConfig={[
        {
          key: "Overview",
          content: () => <PurchaseRequisitionTable data={dataToChildren?.purchaseReqData} />,
        },
        {
          key: "Registration",
          title: "Supplier Registration Form",
          content: () => (
            <>
            <SupplierRegistrationOnBoardingPage/>
            </>
          ),
        },
        {
          key: "Approvals",
          title: "Pending Approval List",
          content: () => (
            <SupplierApproval supplierApprovalData={dataToChildren?.supplierApprovalData}/>
          ),
        },
        {
          key: "Manage Suppliers",
          title: "Suppliers",
          content: () => (
           <ManageSuppliers suppliersData={dataToChildren?.suppliersData}/>
          ),
        },
      ]}
    />
  );
}

export default SupplierTabs;