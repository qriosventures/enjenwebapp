'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllItemSuppliersUrl,
  getItemSupplierByIdUrl,
  createItemSupplierUrl,
  updateItemSupplierUrl,
  deleteItemSupplierUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ItemSupplierDto } from '@/lib/types/itemSupplier';

export const itemSupplierAPI = async (payload?: ItemSupplierDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllItemSuppliersUrl,
      getByIdUrl: payload?.id ? getItemSupplierByIdUrl(payload.id) : getAllItemSuppliersUrl,
      addUrl: createItemSupplierUrl,
      updateUrl: payload?.id ? updateItemSupplierUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteItemSupplierUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Item Supplier API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/item-suppliers');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in itemSupplierAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
