'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDriverViolationsUrl,
  getViolationsByDriverUrl,
  getDriverViolationByIdUrl,
  createDriverViolationUrl,
  updateDriverViolationUrl,
  deleteDriverViolationUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DriverViolationDto } from "@/lib/types/driverViolation";

export const driverViolationAPI = async (payload?: DriverViolationDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID", "GET_BY_DRIVER"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDriverViolationsUrl,
      getByIdUrl: payload?.id
        ? getDriverViolationByIdUrl(payload.id)
        : getAllDriverViolationsUrl,
      getByDriverUrl: payload?.driverId
        ? getViolationsByDriverUrl(payload.driverId)
        : getAllDriverViolationsUrl,
      addUrl: createDriverViolationUrl,
      updateUrl: payload?.id ? updateDriverViolationUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDriverViolationUrl(payload.id) : "",
    });

    const actualMethod =
      normalizedMethod === "GET_BY_ID" || normalizedMethod === "GET_BY_DRIVER"
        ? "GET"
        : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Driver Violation API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/driver-violations");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Driver Violation API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
