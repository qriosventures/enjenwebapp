'use server';

import { revalidatePath } from "next/cache";
import { createBinLocationUrl, deleteBinLocationUrl, getAllBinLocationsUrl, getBinLocationByIdUrl, getEndpointsByMethod, header, updateBinLocationUrl } from "@/lib/utils/endpoint";
import { BinLocationDto } from "@/lib/types/binLocation";


export const binLocationAPI = async (payload?: BinLocationDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllBinLocationsUrl,
      getByIdUrl: payload?.id ? getBinLocationByIdUrl(payload.id) : getAllBinLocationsUrl,
      addUrl: createBinLocationUrl,
      updateUrl: payload?.id ? updateBinLocationUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteBinLocationUrl(payload.id) : '',
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Bin Location API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/bin-locations");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Bin Location API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
