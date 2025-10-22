'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllReturnRequestsUrl,
  getReturnRequestByIdUrl,
  createReturnRequestUrl,
  updateReturnRequestUrl,
  deleteReturnRequestUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ReturnRequestDto } from '@/lib/types/returnRequest';

export const returnRequestAPI = async (payload?: ReturnRequestDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllReturnRequestsUrl,
      getByIdUrl: payload?.id ? getReturnRequestByIdUrl(payload.id) : getAllReturnRequestsUrl,
      addUrl: createReturnRequestUrl,
      updateUrl: payload?.id ? updateReturnRequestUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteReturnRequestUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Return Request API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/return-requests');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in returnRequestAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
