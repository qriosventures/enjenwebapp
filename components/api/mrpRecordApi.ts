'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllMrpRecordsUrl,
  getMrpRecordByIdUrl,
  createMrpRecordUrl,
  updateMrpRecordUrl,
  deleteMrpRecordUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { MrpRecordDto } from '@/lib/types/mrpRecord';

export const mrpRecordAPI = async (payload?: MrpRecordDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllMrpRecordsUrl,
      getByIdUrl: payload?.id ? getMrpRecordByIdUrl(payload.id) : getAllMrpRecordsUrl,
      addUrl: createMrpRecordUrl,
      updateUrl: payload?.id ? updateMrpRecordUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteMrpRecordUrl(payload.id) : '',
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
      throw new Error(error?.message || 'MRP Record API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/mrp-record');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in mrpRecordAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
