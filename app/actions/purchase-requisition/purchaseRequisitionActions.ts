'use server';

import { purchaseRequisitionAPI } from "@/components/api/purchaseRequisitionApi";

const getPurchaseRequisitions = async() => {
  const res = await purchaseRequisitionAPI();
  const data = res?.data || [];

  return data;
}

export default getPurchaseRequisitions;