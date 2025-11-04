"use server";

import { purchaseRequisitionAPI } from "@/components/api/purchaseRequisitionApi";
import { supplierAPI } from "@/components/api/supplierApi";
import SupplierTabs from "@/components/procurement/supplier/SupplierTabs";


export default async function SupplierPage () {

    const [purchaseReqRes, supplierRes] = await Promise.allSettled([
      purchaseRequisitionAPI(),
      supplierAPI(),
    ])
    console.log(purchaseReqRes)

  const purchaseReqData = purchaseReqRes?.status === 'fulfilled' ? purchaseReqRes?.value?.data?.result || [] : [];
  const supplierApprovalData = supplierRes?.status === 'fulfilled' ? supplierRes?.value?.data?.result || [] : [];
  const dataToSend = {
    purchaseReqData,
    supplierApprovalData
  }
console.log("dataToSend>>>>>>>>>>>>>>>",dataToSend)
  return (
    <SupplierTabs dataToChild={dataToSend}/>
  );
}
