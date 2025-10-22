'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllVehicleMaintenanceRecordsUrl,
  getVehicleMaintenanceRecordByIdUrl,
  createVehicleMaintenanceRecordUrl,
  updateVehicleMaintenanceRecordUrl,
  deleteVehicleMaintenanceRecordUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { VehicleMaintenanceRecordDto } from '@/lib/types/vehicleMaintenanceRecord';

export const vehicleMaintenanceRecordAPI = async (
  payload?: VehicleMaintenanceRecordDto,
  method?: string
) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllVehicleMaintenanceRecordsUrl,
      getByIdUrl: payload?.id
        ? getVehicleMaintenanceRecordByIdUrl(payload.id)
        : getAllVehicleMaintenanceRecordsUrl,
      addUrl: createVehicleMaintenanceRecordUrl,
      updateUrl: payload?.id ? updateVehicleMaintenanceRecordUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteVehicleMaintenanceRecordUrl(payload.id) : '',
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
      throw new Error(error?.message || 'VehicleMaintenanceRecord API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/vehicle-maintenance-records');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in vehicleMaintenanceRecordAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
