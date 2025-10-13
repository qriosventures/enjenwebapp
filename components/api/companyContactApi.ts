'use server';

import { revalidatePath } from "next/cache";
import {
  getAllCompanyContactsUrl,
  getCompanyContactByIdUrl,
  createCompanyContactUrl,
  updateCompanyContactUrl,
  deleteCompanyContactUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { CompanyContactDto } from "@/lib/types/companyContact";

export const companyContactAPI = async (payload?: CompanyContactDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCompanyContactsUrl,
      getByIdUrl: payload?.id
        ? getCompanyContactByIdUrl(payload.id)
        : getAllCompanyContactsUrl,
      addUrl: createCompanyContactUrl,
      updateUrl: payload?.id ? updateCompanyContactUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCompanyContactUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Company Contact API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/company-contacts");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Company Contact API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
