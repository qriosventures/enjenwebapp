'use server';

import { revalidatePath } from "next/cache";
import {
  createCompanyAddressUrl,
  deleteCompanyAddressUrl,
  getAllCompanyAddressesUrl,
  getCompanyAddressByIdUrl,
  getEndpointsByMethod,
  header,
  updateCompanyAddressUrl,
} from "@/lib/utils/endpoint";
import { CompanyAddressDto } from "@/lib/types/companyAddress";

export const companyAddressAPI = async (payload?: CompanyAddressDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCompanyAddressesUrl,
      getByIdUrl: payload?.id
        ? getCompanyAddressByIdUrl(payload.id)
        : getAllCompanyAddressesUrl,
      addUrl: createCompanyAddressUrl,
      updateUrl: payload?.id ? updateCompanyAddressUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCompanyAddressUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Company Address API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/company-addresses");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Company Address API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
