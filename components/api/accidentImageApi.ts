'use server';

import { revalidatePath } from "next/cache";
import {
  getAllAccidentImagesUrl,
  getAccidentImageByIdUrl,
  createAccidentImageUrl,
  updateAccidentImageUrl,
  deleteAccidentImageUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { AccidentImageDto } from "@/lib/types/accidentImage";



export const accidentImageAPI = async (payload?: AccidentImageDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllAccidentImagesUrl,
      getByIdUrl: payload?.id ? getAccidentImageByIdUrl(payload.id) : getAllAccidentImagesUrl,
      addUrl: createAccidentImageUrl,
      updateUrl: payload?.id ? updateAccidentImageUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteAccidentImageUrl(payload.id) : '',
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch AccidentImage API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/accident-images");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in AccidentImage API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
