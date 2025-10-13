'use server';

import { revalidatePath } from "next/cache";
import { createAssignmentTripUrl, deleteAssignmentTripUrl, getAllAssignmentTripsUrl, getAssignmentTripByIdUrl, getEndpointsByMethod, header, updateAssignmentTripUrl } from "@/lib/utils/endpoint";

export const assignmentTripsAPI = async (payload?: any, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";
    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllAssignmentTripsUrl,
      getByIdUrl: payload?.id ? getAssignmentTripByIdUrl(payload.id) : getAllAssignmentTripsUrl,
      addUrl: createAssignmentTripUrl,
      updateUrl: payload?.id ? updateAssignmentTripUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteAssignmentTripUrl(payload.id) : '',
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Assignment Trip API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/assignment-trips");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Assignment Trip API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
