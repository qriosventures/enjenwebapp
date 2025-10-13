'use server';

import { revalidatePath } from "next/cache";
import {
  getAllCompanyBankAccountsUrl,
  getCompanyBankAccountByIdUrl,
  createCompanyBankAccountUrl,
  updateCompanyBankAccountUrl,
  deleteCompanyBankAccountUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { CompanyBankAccountDto } from "@/lib/types/companyBankAccount";

export const companyBankAccountAPI = async (payload?: CompanyBankAccountDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCompanyBankAccountsUrl,
      getByIdUrl: payload?.id
        ? getCompanyBankAccountByIdUrl(payload.id)
        : getAllCompanyBankAccountsUrl,
      addUrl: createCompanyBankAccountUrl,
      updateUrl: payload?.id ? updateCompanyBankAccountUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCompanyBankAccountUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Company Bank Account API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/company-bank-accounts");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Company Bank Account API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
