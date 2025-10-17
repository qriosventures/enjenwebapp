'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllVehicleMakesUrl,
  getVehicleMakeByIdUrl,
  createVehicleMakeUrl,
  updateVehicleMakeUrl,
  deleteVehicleMakeUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { VehicleMakeDto } from '@/lib/types/vehicleMake';

export const vehicleMakeAPI = async (payload?: VehicleMakeDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllVehicleMakesUrl,
      getByIdUrl: payload?.id ? getVehicleMakeByIdUrl(payload.id) : getAllVehicleMakesUrl,
      addUrl: createVehicleMakeUrl,
      updateUrl: payload?.id ? updateVehicleMakeUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteVehicleMakeUrl(payload.id) : '',
    });

    const actualMethod =
      normalizedMethod === 'GET_BY_ID' ? 'GET' : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'VehicleMake API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/vehicle-makes');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in vehicleMakeAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
