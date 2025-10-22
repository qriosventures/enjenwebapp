'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllVehicleInspectionDetailsUrl,
  getVehicleInspectionDetailByIdUrl,
  createVehicleInspectionDetailUrl,
  updateVehicleInspectionDetailUrl,
  deleteVehicleInspectionDetailUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { VehicleInspectionDetailDto } from '@/lib/types/vehicleInspectionDetail';

export const vehicleInspectionDetailAPI = async (
  payload?: VehicleInspectionDetailDto,
  method?: string
) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllVehicleInspectionDetailsUrl,
      getByIdUrl: payload?.id
        ? getVehicleInspectionDetailByIdUrl(payload.id)
        : getAllVehicleInspectionDetailsUrl,
      addUrl: createVehicleInspectionDetailUrl,
      updateUrl: payload?.id ? updateVehicleInspectionDetailUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteVehicleInspectionDetailUrl(payload.id) : '',
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
      throw new Error(error?.message || 'VehicleInspectionDetail API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/vehicle-inspection-details');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in vehicleInspectionDetailAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
