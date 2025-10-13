'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDesignationsUrl,
  getDesignationByIdUrl,
  createDesignationUrl,
  updateDesignationUrl,
  deleteDesignationUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DesignationDto } from "@/lib/types/designation";

export const designationAPI = async (payload?: DesignationDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDesignationsUrl,
      getByIdUrl: payload?.id
        ? getDesignationByIdUrl(payload.id)
        : getAllDesignationsUrl,
      addUrl: createDesignationUrl,
      updateUrl: payload?.id ? updateDesignationUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDesignationUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Designation API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/designations");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Designation API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
