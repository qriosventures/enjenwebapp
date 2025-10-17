'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllRoadTaxRecordsUrl,
  getRoadTaxRecordByIdUrl,
  createRoadTaxRecordUrl,
  updateRoadTaxRecordUrl,
  deleteRoadTaxRecordUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { RoadTaxRecordDto } from '@/lib/types/roadTaxRecord';

export const roadTaxRecordAPI = async (payload?: RoadTaxRecordDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllRoadTaxRecordsUrl,
      getByIdUrl: payload?.id ? getRoadTaxRecordByIdUrl(payload.id) : getAllRoadTaxRecordsUrl,
      addUrl: createRoadTaxRecordUrl,
      updateUrl: payload?.id ? updateRoadTaxRecordUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteRoadTaxRecordUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Road Tax Record API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/road-tax-records');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in roadTaxRecordAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
