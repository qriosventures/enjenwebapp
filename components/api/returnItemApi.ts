'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllReturnItemsUrl,
  getReturnItemByIdUrl,
  createReturnItemUrl,
  updateReturnItemUrl,
  deleteReturnItemUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ReturnItemDto } from '@/lib/types/returnItem';

export const returnItemAPI = async (payload?: ReturnItemDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllReturnItemsUrl,
      getByIdUrl: payload?.id ? getReturnItemByIdUrl(payload.id) : getAllReturnItemsUrl,
      addUrl: createReturnItemUrl,
      updateUrl: payload?.id ? updateReturnItemUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteReturnItemUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Return Item API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/return-items');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in returnItemAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
