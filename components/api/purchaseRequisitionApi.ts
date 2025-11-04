'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllPurchaseRequisitionsUrl,
  getPurchaseRequisitionByIdUrl,
  createPurchaseRequisitionUrl,
  updatePurchaseRequisitionUrl,
  deletePurchaseRequisitionUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { PurchaseRequisitionDto } from '@/lib/types/purchaseRequisition';

export const purchaseRequisitionAPI = async (payload?: PurchaseRequisitionDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllPurchaseRequisitionsUrl,
      getByIdUrl: payload?.id ? getPurchaseRequisitionByIdUrl(payload.id) : getAllPurchaseRequisitionsUrl,
      addUrl: createPurchaseRequisitionUrl,
      updateUrl: payload?.id ? updatePurchaseRequisitionUrl(payload.id) : '',
      deleteUrl: payload?.id ? deletePurchaseRequisitionUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Purchase Requisition API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/purchase-requisitions');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in purchaseRequisitionAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
