'use server';

import { revalidatePath } from "next/cache";
import {
  getAllGoodsReceiptLinesUrl,
  getGoodsReceiptLineByIdUrl,
  createGoodsReceiptLineUrl,
  updateGoodsReceiptLineUrl,
  deleteGoodsReceiptLineUrl,
  getEndpointsByMethod,
  header,
} from "@/lib/utils/endpoint";
import { GoodsReceiptLineDto } from "@/lib/types/goodsReceiptLine";

export const goodsReceiptLineAPI = async (payload?: GoodsReceiptLineDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? "GET").toUpperCase();
    const isGet = ["GET", "GET_BY_ID"].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllGoodsReceiptLinesUrl,
      getByIdUrl: payload?.id
        ? getGoodsReceiptLineByIdUrl(payload.id)
        : getAllGoodsReceiptLinesUrl,
      addUrl: createGoodsReceiptLineUrl,
      updateUrl: payload?.id
        ? updateGoodsReceiptLineUrl(payload.id)
        : "",
      deleteUrl: payload?.id
        ? deleteGoodsReceiptLineUrl(payload.id)
        : "",
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
      throw new Error(errorData.error || "Failed to fetch Goods Receipt Line API");
    }

    const data = await response.json();

    if (!isGet) revalidatePath("/goods-receipt-lines");

    return { status: 200, data };
  } catch (error: any) {
    console.error("Error in Goods Receipt Line API:", error);
    return {
      status: 500,
      error: error.message || "An unknown error occurred",
    };
  }
};
