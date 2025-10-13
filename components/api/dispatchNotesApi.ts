'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDispatchNotesUrl,
  getDispatchNoteByIdUrl,
  createDispatchNoteUrl,
  updateDispatchNoteUrl,
  deleteDispatchNoteUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DispatchNoteDto } from "@/lib/types/dispatchNotes";

export const dispatchNotesAPI = async (payload?: DispatchNoteDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDispatchNotesUrl,
      getByIdUrl: payload?.id
        ? getDispatchNoteByIdUrl(payload.id)
        : getAllDispatchNotesUrl,
      addUrl: createDispatchNoteUrl,
      updateUrl: payload?.id ? updateDispatchNoteUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDispatchNoteUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch DispatchNote API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/dispatch-notes");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in DispatchNote API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
