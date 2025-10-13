'use server';

import { revalidatePath } from "next/cache";
import {
  getAllInsuranceRecordsUrl,
  getInsuranceRecordByIdUrl,
  createInsuranceRecordUrl,
  updateInsuranceRecordUrl,
  deleteInsuranceRecordUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { InsuranceRecordDto } from "@/lib/types/insuranceRecord";

export const insuranceRecordAPI = async (payload?: InsuranceRecordDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllInsuranceRecordsUrl,
      getByIdUrl: payload?.id
        ? getInsuranceRecordByIdUrl(payload.id)
        : getAllInsuranceRecordsUrl,
      addUrl: createInsuranceRecordUrl,
      updateUrl: payload?.id
        ? updateInsuranceRecordUrl(payload.id)
        : "",
      deleteUrl: payload?.id
        ? deleteInsuranceRecordUrl(payload.id)
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
      throw new Error(errorData.error || "Failed to fetch Insurance Record API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/insurance-records");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Insurance Record API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
