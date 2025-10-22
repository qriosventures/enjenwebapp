'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllScrapRecordsUrl,
  getScrapRecordByIdUrl,
  createScrapRecordUrl,
  updateScrapRecordUrl,
  deleteScrapRecordUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ScrapRecordDto } from '@/lib/types/scrapRecord';

export const scrapRecordAPI = async (payload?: ScrapRecordDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllScrapRecordsUrl,
      getByIdUrl: payload?.id ? getScrapRecordByIdUrl(payload.id) : getAllScrapRecordsUrl,
      addUrl: createScrapRecordUrl,
      updateUrl: payload?.id ? updateScrapRecordUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteScrapRecordUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Scrap Record API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/scrap-records');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in scrapRecordAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
