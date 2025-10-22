'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllTripPointsUrl,
  getTripPointByIdUrl,
  createTripPointUrl,
  updateTripPointUrl,
  deleteTripPointUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { TripPointDto } from '@/lib/types/tripPoint';

export const tripPointAPI = async (payload?: TripPointDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllTripPointsUrl,
      getByIdUrl: payload?.id ? getTripPointByIdUrl(payload.id) : getAllTripPointsUrl,
      addUrl: createTripPointUrl,
      updateUrl: payload?.id ? updateTripPointUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteTripPointUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Trip Point API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/trip-points');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in tripPointAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
