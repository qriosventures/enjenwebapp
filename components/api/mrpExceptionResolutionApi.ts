'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllMrpExceptionResolutionsUrl,
  getMrpExceptionResolutionByIdUrl,
  createMrpExceptionResolutionUrl,
  updateMrpExceptionResolutionUrl,
  deleteMrpExceptionResolutionUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { MrpExceptionResolutionDto } from '@/lib/types/mrpExceptionResolution';

export const mrpExceptionResolutionAPI = async (payload?: MrpExceptionResolutionDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllMrpExceptionResolutionsUrl,
      getByIdUrl: payload?.id ? getMrpExceptionResolutionByIdUrl(payload.id) : getAllMrpExceptionResolutionsUrl,
      addUrl: createMrpExceptionResolutionUrl,
      updateUrl: payload?.id ? updateMrpExceptionResolutionUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteMrpExceptionResolutionUrl(payload.id) : '',
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
      throw new Error(error?.message || 'MRP Exception Resolution API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/mrp-exception-resolution');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in mrpExceptionResolutionAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
