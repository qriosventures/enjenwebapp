'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDefectTypesUrl,
  getDefectTypeByIdUrl,
  createDefectTypeUrl,
  updateDefectTypeUrl,
  deleteDefectTypeUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DefectTypeDto } from "@/lib/types/defectType";

export const defectTypeAPI = async (payload?: DefectTypeDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDefectTypesUrl,
      getByIdUrl: payload?.id
        ? getDefectTypeByIdUrl(payload.id)
        : getAllDefectTypesUrl,
      addUrl: createDefectTypeUrl,
      updateUrl: payload?.id ? updateDefectTypeUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDefectTypeUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch DefectType API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/defects/types");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in DefectType API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
