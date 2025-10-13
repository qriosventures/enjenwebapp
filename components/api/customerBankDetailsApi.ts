'use server';

import { revalidatePath } from "next/cache";
import {
  getAllCustomerBankDetailsUrl,
  getCustomerBankDetailByIdUrl,
  createCustomerBankDetailUrl,
  updateCustomerBankDetailUrl,
  deleteCustomerBankDetailUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { CustomerBankDetailDto } from "@/lib/types/customerBankDetail";

export const customerBankDetailAPI = async (payload?: CustomerBankDetailDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCustomerBankDetailsUrl,
      getByIdUrl: payload?.id
        ? getCustomerBankDetailByIdUrl(payload.id)
        : getAllCustomerBankDetailsUrl,
      addUrl: createCustomerBankDetailUrl,
      updateUrl: payload?.id ? updateCustomerBankDetailUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCustomerBankDetailUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Customer Bank Detail API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/customers/bank-details");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Customer Bank Detail API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
