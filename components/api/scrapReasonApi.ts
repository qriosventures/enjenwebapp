'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllScrapReasonsUrl,
  getScrapReasonByIdUrl,
  createScrapReasonUrl,
  updateScrapReasonUrl,
  deleteScrapReasonUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ScrapReasonDto } from '@/lib/types/scrapReason';

export const scrapReasonAPI = async (payload?: ScrapReasonDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllScrapReasonsUrl,
      getByIdUrl: payload?.id ? getScrapReasonByIdUrl(payload.id) : getAllScrapReasonsUrl,
      addUrl: createScrapReasonUrl,
      updateUrl: payload?.id ? updateScrapReasonUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteScrapReasonUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Scrap Reason API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/scrap-reasons');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in scrapReasonAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
