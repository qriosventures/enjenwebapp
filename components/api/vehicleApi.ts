'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllVehiclesUrl,
  getVehicleByIdUrl,
  createVehicleUrl,
  updateVehicleUrl,
  deleteVehicleUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { VehicleDto } from '@/lib/types/vehicle';

export const vehicleAPI = async (payload?: VehicleDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllVehiclesUrl,
      getByIdUrl: payload?.id ? getVehicleByIdUrl(payload.id) : getAllVehiclesUrl,
      addUrl: createVehicleUrl,
      updateUrl: payload?.id ? updateVehicleUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteVehicleUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Vehicle API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/vehicles');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in vehicleAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
