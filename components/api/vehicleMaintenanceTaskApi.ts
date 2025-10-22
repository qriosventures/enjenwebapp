'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllVehicleMaintenanceTasksUrl,
  getVehicleMaintenanceTaskByIdUrl,
  createVehicleMaintenanceTaskUrl,
  updateVehicleMaintenanceTaskUrl,
  deleteVehicleMaintenanceTaskUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { VehicleMaintenanceTaskDto } from '@/lib/types/vehicleMaintenanceTask';

export const vehicleMaintenanceTaskAPI = async (
  payload?: VehicleMaintenanceTaskDto,
  method?: string
) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllVehicleMaintenanceTasksUrl,
      getByIdUrl: payload?.id
        ? getVehicleMaintenanceTaskByIdUrl(payload.id)
        : getAllVehicleMaintenanceTasksUrl,
      addUrl: createVehicleMaintenanceTaskUrl,
      updateUrl: payload?.id ? updateVehicleMaintenanceTaskUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteVehicleMaintenanceTaskUrl(payload.id) : '',
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
      throw new Error(error?.message || 'VehicleMaintenanceTask API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/vehicle-maintenance-tasks');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in vehicleMaintenanceTaskAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
