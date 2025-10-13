'use server';

import { revalidatePath } from "next/cache";
import {
  getAllGoodsReceiptsUrl,
  getGoodsReceiptByIdUrl,
  createGoodsReceiptUrl,
  updateGoodsReceiptUrl,
  deleteGoodsReceiptUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { GoodsReceiptDto } from "@/lib/types/goodsReceipt";

export const goodsReceiptAPI = async (payload?: GoodsReceiptDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllGoodsReceiptsUrl,
      getByIdUrl: payload?.id ? getGoodsReceiptByIdUrl(payload.id) : getAllGoodsReceiptsUrl,
      addUrl: createGoodsReceiptUrl,
      updateUrl: payload?.id ? updateGoodsReceiptUrl(payload.id) : "",
      deleteUrl: payload?.id ? deleteGoodsReceiptUrl(payload.id) : "",
    });

    const actualMethod =
      normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch Goods Receipt API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/goods-receipts");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Goods Receipt API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
