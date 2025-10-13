'use server';

import { revalidatePath } from "next/cache";
import {
  createCityUrl,
  deleteCityUrl,
  getAllCitiesUrl,
  getCitiesByStateUrl,
  getCityByIdUrl,
  getEndpointsByMethod,
  header,
  updateCityUrl,
} from "@/lib/utils/endpoint";
import { CityDto } from "@/lib/types/city";

export const cityAPI = async (payload?: CityDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet =
      normalizedMethod === "GET" ||
      normalizedMethod === "GET_BY_ID" ||
      normalizedMethod === "GET_BY_STATE";

    const endPoint =
      normalizedMethod === "GET_BY_STATE"
        ?  getCitiesByStateUrl(payload?.stateId)
        : getEndpointsByMethod(normalizedMethod, {
            getUrl: getAllCitiesUrl,
            getByIdUrl: payload?.id ? getCityByIdUrl(payload.id) : getAllCitiesUrl,
            addUrl: createCityUrl,
            updateUrl: payload?.id ? updateCityUrl(payload.id) : "",
            deleteUrl: payload?.id ? deleteCityUrl(payload.id) : "",
          });

    const response = await fetch(endPoint, {
      method:
        normalizedMethod === "GET_BY_ID" || normalizedMethod === "GET_BY_STATE"
          ? "GET"
          : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch City API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/cities");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in City API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
