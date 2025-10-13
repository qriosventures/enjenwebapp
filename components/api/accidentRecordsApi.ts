'use server';

import { revalidatePath } from "next/cache";
import {
    createAccidentRecordUrl,
    deleteAccidentRecordUrl,
    getAccidentRecordByIdUrl,
    getAllAccidentRecordsUrl,
  getEndpointsByMethod,
  header,
  updateAccidentRecordUrl,
} from "@/lib/utils/endpoint";

export const accidentRecordAPI = async (payload?: any, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllAccidentRecordsUrl,
      getByIdUrl: payload?.id ? getAccidentRecordByIdUrl(payload.id) : getAllAccidentRecordsUrl,
      addUrl: createAccidentRecordUrl,
      updateUrl: payload?.id ? updateAccidentRecordUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteAccidentRecordUrl(payload.id) : '',
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Accident Record API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/accident-records");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Accident Record API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
