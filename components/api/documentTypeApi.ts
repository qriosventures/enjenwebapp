'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDocumentTypesUrl,
  getDocumentTypeByIdUrl,
  createDocumentTypeUrl,
  updateDocumentTypeUrl,
  deleteDocumentTypeUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DocumentTypeDto } from "@/lib/types/documentType";

export const documentTypeAPI = async (payload?: DocumentTypeDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDocumentTypesUrl,
      getByIdUrl: payload?.id
        ? getDocumentTypeByIdUrl(payload.id)
        : getAllDocumentTypesUrl,
      addUrl: createDocumentTypeUrl,
      updateUrl: payload?.id ? updateDocumentTypeUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDocumentTypeUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store", 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch DocumentType API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/document-types");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in DocumentType API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
