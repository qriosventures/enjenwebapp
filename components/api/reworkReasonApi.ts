'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllReworkReasonsUrl,
  getReworkReasonByIdUrl,
  createReworkReasonUrl,
  updateReworkReasonUrl,
  deleteReworkReasonUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ReworkReasonDto } from '@/lib/types/reworkReason';

export const reworkReasonAPI = async (payload?: ReworkReasonDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllReworkReasonsUrl,
      getByIdUrl: payload?.id ? getReworkReasonByIdUrl(payload.id) : getAllReworkReasonsUrl,
      addUrl: createReworkReasonUrl,
      updateUrl: payload?.id ? updateReworkReasonUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteReworkReasonUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Rework Reason API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/rework-reasons');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in reworkReasonAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
