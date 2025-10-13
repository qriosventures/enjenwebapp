'use server';

import { revalidatePath } from "next/cache";
import {
  getAllCustomerAddressesUrl,
  getCustomerAddressByIdUrl,
  createCustomerAddressUrl,
  updateCustomerAddressUrl,
  deleteCustomerAddressUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { CustomerAddressDto } from "@/lib/types/customerAddress";

export const customerAddressAPI = async (payload?: CustomerAddressDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCustomerAddressesUrl,
      getByIdUrl: payload?.id
        ? getCustomerAddressByIdUrl(payload.id)
        : getAllCustomerAddressesUrl,
      addUrl: createCustomerAddressUrl,
      updateUrl: payload?.id ? updateCustomerAddressUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCustomerAddressUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Customer Address API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/customers/addresses");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Customer Address API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
