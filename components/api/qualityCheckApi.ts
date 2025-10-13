'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllQualityChecksUrl,
  getQualityCheckByIdUrl,
  createQualityCheckUrl,
  updateQualityCheckUrl,
  deleteQualityCheckUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { QualityCheckDto } from '@/lib/types/qualityCheck';

export const qualityCheckAPI = async (payload?: QualityCheckDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllQualityChecksUrl,
      getByIdUrl: payload?.id ? getQualityCheckByIdUrl(payload.id) : getAllQualityChecksUrl,
      addUrl: createQualityCheckUrl,
      updateUrl: payload?.id ? updateQualityCheckUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteQualityCheckUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Quality Check API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/quality-checks');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in qualityCheckAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
