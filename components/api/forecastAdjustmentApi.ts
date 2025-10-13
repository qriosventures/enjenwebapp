'use server';

import { revalidatePath } from "next/cache";
import {
  getAllForecastAdjustmentsUrl,
  getForecastAdjustmentByIdUrl,
  createForecastAdjustmentUrl,
  updateForecastAdjustmentUrl,
  deleteForecastAdjustmentUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { ForecastAdjustmentDto } from "@/lib/types/forecastAdjustment";

export const forecastAdjustmentAPI = async (payload?: ForecastAdjustmentDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllForecastAdjustmentsUrl,
      getByIdUrl: payload?.id ? getForecastAdjustmentByIdUrl(payload.id) : getAllForecastAdjustmentsUrl,
      addUrl: createForecastAdjustmentUrl,
      updateUrl: payload?.id ? updateForecastAdjustmentUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteForecastAdjustmentUrl(payload.id) : "",
    });

    const actualMethod =
      normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Forecast Adjustment API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/forecast-adjustment");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Forecast Adjustment API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
