'use server';

import { revalidatePath } from "next/cache";
import {
  createCategoryUrl,
  deleteCategoryUrl,
  getAllCategoriesUrl,
  getCategoryByIdUrl,
  getEndpointsByMethod,
  header,
  updateCategoryUrl,
} from "@/lib/utils/endpoint";

export const categoryAPI = async (payload?: any, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllCategoriesUrl,
      getByIdUrl: payload?.id
        ? getCategoryByIdUrl(payload.id)
        : getAllCategoriesUrl,
      addUrl: createCategoryUrl,
      updateUrl: payload?.id ? updateCategoryUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteCategoryUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Category API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/categories");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Category API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
