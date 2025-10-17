'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllVehicleInspectionsUrl,
  getVehicleInspectionByIdUrl,
  getInspectionsByVehicleUrl,
  createVehicleInspectionUrl,
  updateVehicleInspectionUrl,
  deleteVehicleInspectionUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { VehicleInspectionDto } from '@/lib/types/vehicleInspection';

export const vehicleInspectionAPI = async (
  payload?: VehicleInspectionDto,
  method?: string,
  vehicleId?: number
) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID', 'GET_BY_VEHICLE'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllVehicleInspectionsUrl,
      getByIdUrl: payload?.id
        ? getVehicleInspectionByIdUrl(payload.id)
        : getAllVehicleInspectionsUrl,
      getByVehicleUrl: vehicleId
        ? getInspectionsByVehicleUrl(vehicleId)
        : getAllVehicleInspectionsUrl,
      addUrl: createVehicleInspectionUrl,
      updateUrl: payload?.id ? updateVehicleInspectionUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteVehicleInspectionUrl(payload.id) : '',
    });

    const actualMethod =
      normalizedMethod === 'GET_BY_ID' || normalizedMethod === 'GET_BY_VEHICLE'
        ? 'GET'
        : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'Vehicle Inspection API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/vehicle-inspections');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in vehicleInspectionAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
