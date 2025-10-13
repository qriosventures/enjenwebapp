'use server';

import { revalidatePath } from "next/cache";
import {
  createBomComponentUrl,
  deleteBomComponentUrl,
  getAllBomComponentsUrl,
  getBomComponentByIdUrl,
  getEndpointsByMethod,
  header,
  updateBomComponentUrl,
} from "@/lib/utils/endpoint";

export const bomComponentAPI = async (payload?: any, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllBomComponentsUrl,
      getByIdUrl: payload?.id
        ? getBomComponentByIdUrl(payload.id)
        : getAllBomComponentsUrl,
      addUrl: createBomComponentUrl,
      updateUrl: payload?.id ? updateBomComponentUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteBomComponentUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch BOM Component API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/bom-components");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in BOM Component API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
