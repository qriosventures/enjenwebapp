'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDriverTrainingsUrl,
  getTrainingsByDriverUrl,
  getDriverTrainingByIdUrl,
  createDriverTrainingUrl,
  updateDriverTrainingUrl,
  deleteDriverTrainingUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DriverTrainingDto } from "@/lib/types/driverTraining";

export const driverTrainingAPI = async (payload?: DriverTrainingDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID", "GET_BY_DRIVER"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDriverTrainingsUrl,
      getByIdUrl: payload?.id
        ? getDriverTrainingByIdUrl(payload.id)
        : getAllDriverTrainingsUrl,
      getByDriverUrl: payload?.driverId
        ? getTrainingsByDriverUrl(payload.driverId)
        : getAllDriverTrainingsUrl,
      addUrl: createDriverTrainingUrl,
      updateUrl: payload?.id ? updateDriverTrainingUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDriverTrainingUrl(payload.id) : "",
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
      throw new Error(errorData.error || "Failed to fetch Driver Training API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/driver-trainings");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Driver Training API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
