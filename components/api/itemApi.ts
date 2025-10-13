'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllItemsUrl,
  getItemByIdUrl,
  createItemUrl,
  updateItemUrl,
  deleteItemUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ItemDto } from '@/lib/types/item';

export const itemAPI = async (payload?: ItemDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllItemsUrl,
      getByIdUrl: payload?.id ? getItemByIdUrl(payload.id) : getAllItemsUrl,
      addUrl: createItemUrl,
      updateUrl: payload?.id ? updateItemUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteItemUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Item API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/items');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in itemAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
