'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllItemTypesUrl,
  getItemTypeByIdUrl,
  createItemTypeUrl,
  updateItemTypeUrl,
  deleteItemTypeUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ItemTypeDto } from '@/lib/types/itemType';

export const itemTypeAPI = async (payload?: ItemTypeDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllItemTypesUrl,
      getByIdUrl: payload?.id ? getItemTypeByIdUrl(payload.id) : getAllItemTypesUrl,
      addUrl: createItemTypeUrl,
      updateUrl: payload?.id ? updateItemTypeUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteItemTypeUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Item Type API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/item-types');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in itemTypeAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
