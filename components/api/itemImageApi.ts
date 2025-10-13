'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllItemImagesUrl,
  getItemImageByIdUrl,
  createItemImageUrl,
  updateItemImageUrl,
  deleteItemImageUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ItemImageDto } from '@/lib/types/itemImage';

export const itemImageAPI = async (payload?: ItemImageDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllItemImagesUrl,
      getByIdUrl: payload?.id ? getItemImageByIdUrl(payload.id) : getAllItemImagesUrl,
      addUrl: createItemImageUrl,
      updateUrl: payload?.id ? updateItemImageUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteItemImageUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Item Image API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/item-images');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in itemImageAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
