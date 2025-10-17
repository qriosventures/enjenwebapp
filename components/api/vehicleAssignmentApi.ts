'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllVehicleAssignmentsUrl,
  getVehicleAssignmentByIdUrl,
  createVehicleAssignmentUrl,
  updateVehicleAssignmentUrl,
  deleteVehicleAssignmentUrl,
  getAssignmentsByVehicleUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { VehicleAssignmentDto } from '@/lib/types/vehicleAssignment';

export const vehicleAssignmentAPI = async (payload?: VehicleAssignmentDto, method?: string, vehicleId?: number) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID', 'GET_BY_VEHICLE'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllVehicleAssignmentsUrl,
      getByIdUrl: payload?.id ? getVehicleAssignmentByIdUrl(payload.id) : getAllVehicleAssignmentsUrl,
      getByVehicleUrl: vehicleId ? getAssignmentsByVehicleUrl(vehicleId) : getAllVehicleAssignmentsUrl,
      addUrl: createVehicleAssignmentUrl,
      updateUrl: payload?.id ? updateVehicleAssignmentUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteVehicleAssignmentUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Vehicle Assignment API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/vehicle-assignments');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in vehicleAssignmentAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
