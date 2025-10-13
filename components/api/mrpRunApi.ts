'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllMrpRunsUrl,
  getMrpRunByIdUrl,
  createMrpRunUrl,
  updateMrpRunUrl,
  deleteMrpRunUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { MrpRunDto } from '@/lib/types/mrpRun';

export const mrpRunAPI = async (payload?: MrpRunDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllMrpRunsUrl,
      getByIdUrl: payload?.id ? getMrpRunByIdUrl(payload.id) : getAllMrpRunsUrl,
      addUrl: createMrpRunUrl,
      updateUrl: payload?.id ? updateMrpRunUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteMrpRunUrl(payload.id) : '',
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
      throw new Error(error?.message || 'MRP Run API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/mrp-run');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in mrpRunAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
