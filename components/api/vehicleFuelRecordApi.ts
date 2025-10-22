'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllVehicleFuelRecordsUrl,
  getVehicleFuelRecordByIdUrl,
  createVehicleFuelRecordUrl,
  updateVehicleFuelRecordUrl,
  deleteVehicleFuelRecordUrl,
  getFuelRecordsByVehicleUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { VehicleFuelRecordDto } from '@/lib/types/vehicleFuelRecord';

export const vehicleFuelRecordAPI = async (
  payload?: VehicleFuelRecordDto,
  method?: string,
  vehicleId?: number
) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID', 'GET_BY_VEHICLE'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllVehicleFuelRecordsUrl,
      getByIdUrl: payload?.id
        ? getVehicleFuelRecordByIdUrl(payload.id)
        : getAllVehicleFuelRecordsUrl,
      getByVehicleUrl: vehicleId
        ? getFuelRecordsByVehicleUrl(vehicleId)
        : getAllVehicleFuelRecordsUrl,
      addUrl: createVehicleFuelRecordUrl,
      updateUrl: payload?.id ? updateVehicleFuelRecordUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteVehicleFuelRecordUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Vehicle Fuel Record API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/vehicle-fuel-records');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in vehicleFuelRecordAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
