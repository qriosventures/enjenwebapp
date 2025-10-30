'use server';

import { revalidatePath } from "next/cache";
import {
  getAllCountriesUrl,
  getCountryByIdUrl,
  createCountryUrl,
  updateCountryUrl,
  deleteCountryUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { CountryDto } from "@/lib/types/country";
export const countryAPI = async (payload?: CountryDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCountriesUrl,
      getByIdUrl: payload?.id ? getCountryByIdUrl(payload.id) : getAllCountriesUrl,
      addUrl: createCountryUrl,
      updateUrl: payload?.id ? updateCountryUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCountryUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Country API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/settings/countries");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Country API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
