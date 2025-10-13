'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDriverLicensesUrl,
  getLicensesByDriverUrl,
  getDriverLicenseByIdUrl,
  createDriverLicenseUrl,
  updateDriverLicenseUrl,
  deleteDriverLicenseUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DriverLicenseDto } from "@/lib/types/driverLicense";

export const driverLicenseAPI = async (payload?: DriverLicenseDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID", "GET_BY_DRIVER"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDriverLicensesUrl,
      getByIdUrl: payload?.id
        ? getDriverLicenseByIdUrl(payload.id)
        : getAllDriverLicensesUrl,
      getByDriverUrl: payload?.driverId
        ? getLicensesByDriverUrl(payload.driverId)
        : getAllDriverLicensesUrl,
      addUrl: createDriverLicenseUrl,
      updateUrl: payload?.id ? updateDriverLicenseUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDriverLicenseUrl(payload.id) : "",
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
      throw new Error(errorData.error || "Failed to fetch Driver License API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/driver-licenses");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Driver License API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
