'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllRtoFitnessRecordsUrl,
  getRtoFitnessRecordByIdUrl,
  createRtoFitnessRecordUrl,
  updateRtoFitnessRecordUrl,
  deleteRtoFitnessRecordUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { RtoFitnessRecordDto } from '@/lib/types/rtoFitnessRecord';

export const rtoFitnessRecordAPI = async (payload?: RtoFitnessRecordDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllRtoFitnessRecordsUrl,
      getByIdUrl: payload?.id ? getRtoFitnessRecordByIdUrl(payload.id) : getAllRtoFitnessRecordsUrl,
      addUrl: createRtoFitnessRecordUrl,
      updateUrl: payload?.id ? updateRtoFitnessRecordUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteRtoFitnessRecordUrl(payload.id) : '',
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
      throw new Error(error?.message || 'RTO Fitness Record API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/rto-fitness-records');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in rtoFitnessRecordAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
