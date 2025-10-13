'use server';

import { revalidatePath } from "next/cache";
import {
  createBomRoutingUrl,
  deleteBomRoutingUrl,
  getAllBomRoutingsUrl,
  getBomRoutingByIdUrl,
  getEndpointsByMethod,
  header,
  updateBomRoutingUrl,
} from "@/lib/utils/endpoint";
import { BomRoutingDto } from "@/lib/types/bomRouting";

export const bomRoutingAPI = async (payload?: BomRoutingDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllBomRoutingsUrl,
      getByIdUrl: payload?.id
        ? getBomRoutingByIdUrl(payload.id)
        : getAllBomRoutingsUrl,
      addUrl: createBomRoutingUrl,
      updateUrl: payload?.id ? updateBomRoutingUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteBomRoutingUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch BOM Routing API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/bom-routing");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in BOM Routing API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
