'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllLaborTrackingsUrl,
  getLaborTrackingByIdUrl,
  createLaborTrackingUrl,
  updateLaborTrackingUrl,
  deleteLaborTrackingUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { LaborTrackingDto } from '@/lib/types/laborTracking';

export const laborTrackingAPI = async (payload?: LaborTrackingDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllLaborTrackingsUrl,
      getByIdUrl: payload?.id ? getLaborTrackingByIdUrl(payload.id) : getAllLaborTrackingsUrl,
      addUrl: createLaborTrackingUrl,
      updateUrl: payload?.id ? updateLaborTrackingUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteLaborTrackingUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Labor Tracking API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/labor-tracking');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in laborTrackingAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
