'use server';

import { revalidatePath } from "next/cache";
import {
  getAllCustomerContactsUrl,
  getCustomerContactByIdUrl,
  createCustomerContactUrl,
  updateCustomerContactUrl,
  deleteCustomerContactUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { CustomerContactDto } from "@/lib/types/customerContact";

export const customerContactAPI = async (payload?: CustomerContactDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCustomerContactsUrl,
      getByIdUrl: payload?.id
        ? getCustomerContactByIdUrl(payload.id)
        : getAllCustomerContactsUrl,
      addUrl: createCustomerContactUrl,
      updateUrl: payload?.id ? updateCustomerContactUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCustomerContactUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Customer Contact API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/customers/contacts");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Customer Contact API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
