'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllMrpExceptionsUrl,
  getMrpExceptionByIdUrl,
  createMrpExceptionUrl,
  updateMrpExceptionUrl,
  deleteMrpExceptionUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { MrpExceptionDto } from '@/lib/types/mrpException';

export const mrpExceptionAPI = async (payload?: MrpExceptionDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllMrpExceptionsUrl,
      getByIdUrl: payload?.id ? getMrpExceptionByIdUrl(payload.id) : getAllMrpExceptionsUrl,
      addUrl: createMrpExceptionUrl,
      updateUrl: payload?.id ? updateMrpExceptionUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteMrpExceptionUrl(payload.id) : '',
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
      throw new Error(error?.message || 'MRP Exception API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/mrp-exception');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in mrpExceptionAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
