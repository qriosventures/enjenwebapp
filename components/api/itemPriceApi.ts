'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllItemPricesUrl,
  getItemPriceByIdUrl,
  createItemPriceUrl,
  updateItemPriceUrl,
  deleteItemPriceUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ItemPriceDto } from '@/lib/types/itemPrice';

export const itemPriceAPI = async (payload?: ItemPriceDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllItemPricesUrl,
      getByIdUrl: payload?.id ? getItemPriceByIdUrl(payload.id) : getAllItemPricesUrl,
      addUrl: createItemPriceUrl,
      updateUrl: payload?.id ? updateItemPriceUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteItemPriceUrl(payload.id) : '',
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
      const error = await response.json();
      throw new Error(error?.message || 'Item Price API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/item-prices');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in itemPriceAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
