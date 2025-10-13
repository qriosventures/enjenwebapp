'use server';

import { revalidatePath } from "next/cache";
import {
  createCarrierUrl,
  deleteCarrierUrl,
  getAllCarriersUrl,
  getCarrierByIdUrl,
  getEndpointsByMethod,
  header,
  updateCarrierUrl,
} from "@/lib/utils/endpoint";

export const carriersAPI = async (payload?: any, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCarriersUrl,
      getByIdUrl: payload?.id ? getCarrierByIdUrl(payload.id) : getAllCarriersUrl,
      addUrl: createCarrierUrl,
      updateUrl: payload?.id ? updateCarrierUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCarrierUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Carrier API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/carriers");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Carrier API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
