'use server';

import { revalidatePath } from "next/cache";
import {
  getAllFiscalYearsUrl,
  getFiscalYearByIdUrl,
  createFiscalYearUrl,
  updateFiscalYearUrl,
  deleteFiscalYearUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { FiscalYearDto } from "@/lib/types/fiscalYear";

export const fiscalYearAPI = async (payload?: FiscalYearDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllFiscalYearsUrl,
      getByIdUrl: payload?.id ? getFiscalYearByIdUrl(payload.id) : getAllFiscalYearsUrl,
      addUrl: createFiscalYearUrl,
      updateUrl: payload?.id ? updateFiscalYearUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteFiscalYearUrl(payload.id) : "",
    });

    const actualMethod = normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Fiscal Year API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/fiscal-year");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Fiscal Year API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
