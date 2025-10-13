'use server';

import { revalidatePath } from "next/cache";
import {
  getAllDeliveryEvidencesUrl,
  getDeliveryEvidenceByIdUrl,
  createDeliveryEvidenceUrl,
  updateDeliveryEvidenceUrl,
  deleteDeliveryEvidenceUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { DeliveryEvidenceDto } from "@/lib/types/deliveryEvidence";

export const deliveryEvidenceAPI = async (payload?: DeliveryEvidenceDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllDeliveryEvidencesUrl,
      getByIdUrl: payload?.id
        ? getDeliveryEvidenceByIdUrl(payload.id)
        : getAllDeliveryEvidencesUrl,
      addUrl: createDeliveryEvidenceUrl,
      updateUrl: payload?.id ? updateDeliveryEvidenceUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteDeliveryEvidenceUrl(payload.id) : "",
    });

    const response = await fetch(endPoint, {
      method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch DeliveryEvidence API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/delivery-evidences");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in DeliveryEvidence API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
