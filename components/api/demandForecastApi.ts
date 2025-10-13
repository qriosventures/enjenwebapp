'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDemandForecastsUrl,
  getDemandForecastByIdUrl,
  createDemandForecastUrl,
  updateDemandForecastUrl,
  deleteDemandForecastUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DemandForecastDto } from "@/lib/types/demandForecast";

export const demandForecastAPI = async (payload?: DemandForecastDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDemandForecastsUrl,
      getByIdUrl: payload?.id
        ? getDemandForecastByIdUrl(payload.id)
        : getAllDemandForecastsUrl,
      addUrl: createDemandForecastUrl,
      updateUrl: payload?.id ? updateDemandForecastUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDemandForecastUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch DemandForecast API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/demand-forecasts");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in DemandForecast API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
