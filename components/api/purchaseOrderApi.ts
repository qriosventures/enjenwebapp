'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllPurchaseOrdersUrl,
  getPurchaseOrderByIdUrl,
  createPurchaseOrderUrl,
  updatePurchaseOrderUrl,
  deletePurchaseOrderUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { PurchaseOrderDto } from '@/lib/types/purchaseOrder';

export const purchaseOrderAPI = async (payload?: PurchaseOrderDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllPurchaseOrdersUrl,
      getByIdUrl: payload?.id ? getPurchaseOrderByIdUrl(payload.id) : getAllPurchaseOrdersUrl,
      addUrl: createPurchaseOrderUrl,
      updateUrl: payload?.id ? updatePurchaseOrderUrl(payload.id) : '',
      deleteUrl: payload?.id ? deletePurchaseOrderUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Purchase Order API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/purchase-orders');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in purchaseOrderAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
