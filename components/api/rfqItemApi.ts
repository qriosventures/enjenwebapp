'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllRfqItemsUrl,
  getRfqItemByIdUrl,
  createRfqItemUrl,
  updateRfqItemUrl,
  deleteRfqItemUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { RfqItemDto } from '@/lib/types/rfqItem';

export const rfqItemAPI = async (payload?: RfqItemDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllRfqItemsUrl,
      getByIdUrl: payload?.id ? getRfqItemByIdUrl(payload.id) : getAllRfqItemsUrl,
      addUrl: createRfqItemUrl,
      updateUrl: payload?.id ? updateRfqItemUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteRfqItemUrl(payload.id) : '',
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
      throw new Error(error?.message || 'RFQ Item API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/rfq-items');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in rfqItemAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
