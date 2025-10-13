'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllPurchaseOrderItemsUrl,
  getPurchaseOrderItemByIdUrl,
  createPurchaseOrderItemUrl,
  updatePurchaseOrderItemUrl,
  deletePurchaseOrderItemUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { PurchaseOrderItemDto } from '@/lib/types/purchaseOrderItem';

export const purchaseOrderItemAPI = async (payload?: PurchaseOrderItemDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllPurchaseOrderItemsUrl,
      getByIdUrl: payload?.id ? getPurchaseOrderItemByIdUrl(payload.id) : getAllPurchaseOrderItemsUrl,
      addUrl: createPurchaseOrderItemUrl,
      updateUrl: payload?.id ? updatePurchaseOrderItemUrl(payload.id) : '',
      deleteUrl: payload?.id ? deletePurchaseOrderItemUrl(payload.id) : '',
    });

    const actualMethod = normalizedMethod === 'GET_BY_ID' ? 'GET' : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'Purchase Order Item API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/purchase-order-items');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in purchaseOrderItemAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
