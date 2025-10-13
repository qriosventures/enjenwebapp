'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDepartmentsUrl,
  getDepartmentByIdUrl,
  createDepartmentUrl,
  updateDepartmentUrl,
  deleteDepartmentUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DepartmentDto } from "@/lib/types/department";

export const departmentAPI = async (payload?: DepartmentDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDepartmentsUrl,
      getByIdUrl: payload?.id
        ? getDepartmentByIdUrl(payload.id)
        : getAllDepartmentsUrl,
      addUrl: createDepartmentUrl,
      updateUrl: payload?.id ? updateDepartmentUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDepartmentUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Department API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/departments");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Department API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
