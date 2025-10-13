'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllPurchaseRequisitionItemsUrl,
  getPurchaseRequisitionItemByIdUrl,
  createPurchaseRequisitionItemUrl,
  updatePurchaseRequisitionItemUrl,
  deletePurchaseRequisitionItemUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { PurchaseRequisitionItemDto } from '@/lib/types/purchaseRequisitionItem';

export const purchaseRequisitionItemAPI = async (payload?: PurchaseRequisitionItemDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllPurchaseRequisitionItemsUrl,
      getByIdUrl: payload?.id ? getPurchaseRequisitionItemByIdUrl(payload.id) : getAllPurchaseRequisitionItemsUrl,
      addUrl: createPurchaseRequisitionItemUrl,
      updateUrl: payload?.id ? updatePurchaseRequisitionItemUrl(payload.id) : '',
      deleteUrl: payload?.id ? deletePurchaseRequisitionItemUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Purchase Requisition Item API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/purchase-requisition-items');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in purchaseRequisitionItemAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
