'use server';

import { revalidatePath } from "next/cache";
import { createBillOfMaterialUrl, deleteBillOfMaterialUrl, getAllBillOfMaterialsUrl, getBillOfMaterialByIdUrl, getEndpointsByMethod, header, updateBillOfMaterialUrl } from "@/lib/utils/endpoint";
import { BillOfMaterialDto } from "@/lib/types/billOfMaterials";


export const billOfMaterialAPI = async (payload?: BillOfMaterialDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";
    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllBillOfMaterialsUrl,
      getByIdUrl: payload?.id ? getBillOfMaterialByIdUrl(payload.id) : getAllBillOfMaterialsUrl,
      addUrl: createBillOfMaterialUrl,
      updateUrl: payload?.id ? updateBillOfMaterialUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteBillOfMaterialUrl(payload.id) : '',
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Bill Of Material API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/bill-of-materials");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Bill Of Material API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
