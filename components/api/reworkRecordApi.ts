'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllReworkRecordsUrl,
  getReworkRecordByIdUrl,
  createReworkRecordUrl,
  updateReworkRecordUrl,
  deleteReworkRecordUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ReworkRecordDto } from '@/lib/types/reworkRecord';

export const reworkRecordAPI = async (payload?: ReworkRecordDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllReworkRecordsUrl,
      getByIdUrl: payload?.id ? getReworkRecordByIdUrl(payload.id) : getAllReworkRecordsUrl,
      addUrl: createReworkRecordUrl,
      updateUrl: payload?.id ? updateReworkRecordUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteReworkRecordUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Rework Record API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/rework-records');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in reworkRecordAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
