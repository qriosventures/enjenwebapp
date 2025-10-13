'use server';

import { revalidatePath } from "next/cache";
import {
  getAllCompaniesUrl,
  getCompanyByIdUrl,
  createCompanyUrl,
  updateCompanyUrl,
  deleteCompanyUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { CompanyDto } from "@/lib/types/company";

export const companyAPI = async (payload?: CompanyDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCompaniesUrl,
      getByIdUrl: payload?.id
        ? getCompanyByIdUrl(payload.id)
        : getAllCompaniesUrl,
      addUrl: createCompanyUrl,
      updateUrl: payload?.id ? updateCompanyUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCompanyUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Company API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/companies");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Company API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
