'use server';

import { revalidatePath } from "next/cache";
import {
  getAllInsuranceClaimsUrl,
  getInsuranceClaimByIdUrl,
  createInsuranceClaimUrl,
  updateInsuranceClaimUrl,
  deleteInsuranceClaimUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { InsuranceClaimDto } from "@/lib/types/insuranceClaim";

export const insuranceClaimAPI = async (payload?: InsuranceClaimDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllInsuranceClaimsUrl,
      getByIdUrl: payload?.id
        ? getInsuranceClaimByIdUrl(payload.id)
        : getAllInsuranceClaimsUrl,
      addUrl: createInsuranceClaimUrl,
      updateUrl: payload?.id
        ? updateInsuranceClaimUrl(payload.id)
        : "",
      deleteUrl: payload?.id
        ? deleteInsuranceClaimUrl(payload.id)
        : "",
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
      throw new Error(errorData.error || "Failed to fetch Insurance Claim API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/insurance-claims");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Insurance Claim API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
