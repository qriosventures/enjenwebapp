'use server';

import { revalidatePath } from "next/cache";
import {
  getAllCustomersUrl,
  getCustomerByIdUrl,
  createCustomerUrl,
  updateCustomerUrl,
  deleteCustomerUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";

export const customerAPI = async (payload?: any, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCustomersUrl,
      getByIdUrl: payload?.id ? getCustomerByIdUrl(payload.id) : getAllCustomersUrl,
      addUrl: createCustomerUrl,
      updateUrl: payload?.id ? updateCustomerUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCustomerUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Customer API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/customers");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Customer API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
