'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllInventoriesUrl,
  getInventoryByIdUrl,
  createInventoryUrl,
  updateInventoryUrl,
  deleteInventoryUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { InventoryDto } from '@/lib/types/inventory';


export const inventoryAPI = async (payload?: InventoryDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllInventoriesUrl,
      getByIdUrl: payload?.id
        ? getInventoryByIdUrl(payload.id)
        : getAllInventoriesUrl,
      addUrl: createInventoryUrl,
      updateUrl: payload?.id ? updateInventoryUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteInventoryUrl(payload.id) : '',
    });

    const actualMethod =
      normalizedMethod === 'GET_BY_ID' ? 'GET' : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: 'no-store', 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Inventory API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/inventory');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in inventoryAPI:', error);
    return { status: 500, error: error.message || 'Unknown error occurred' };
  }
};
