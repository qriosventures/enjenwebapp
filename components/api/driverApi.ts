'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDriversUrl,
  getDriverByIdUrl,
  createDriverUrl,
  updateDriverUrl,
  deleteDriverUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";

export const driverAPI = async (payload?: any, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDriversUrl,
      getByIdUrl: payload?.id
        ? getDriverByIdUrl(payload.id)
        : getAllDriversUrl,
      addUrl: createDriverUrl,
      updateUrl: payload?.id ? updateDriverUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDriverUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Driver API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/drivers");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Driver API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
