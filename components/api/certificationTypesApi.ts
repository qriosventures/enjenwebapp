'use server';

import { revalidatePath } from "next/cache";
import {
  createCertificationTypeUrl,
  deleteCertificationTypeUrl,
  getAllCertificationTypesUrl,
  getCertificationTypeByIdUrl,
  getEndpointsByMethod,
  header,
  updateCertificationTypeUrl,
} from "@/lib/utils/endpoint";
import { CertificationTypesDto } from "@/lib/types/certificationTypes";

export const certificationTypesAPI = async (payload?: CertificationTypesDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCertificationTypesUrl,
      getByIdUrl: payload?.id
        ? getCertificationTypeByIdUrl(payload.id)
        : getAllCertificationTypesUrl,
      addUrl: createCertificationTypeUrl,
      updateUrl: payload?.id ? updateCertificationTypeUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCertificationTypeUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Certification Type API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/certification-types");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Certification Type API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
