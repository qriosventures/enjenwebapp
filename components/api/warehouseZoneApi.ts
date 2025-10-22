'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllWarehouseZonesUrl,
  getWarehouseZoneByIdUrl,
  createWarehouseZoneUrl,
  updateWarehouseZoneUrl,
  deleteWarehouseZoneUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { WarehouseZoneDto } from '@/lib/types/warehouseZone';

export const warehouseZoneAPI = async (payload?: WarehouseZoneDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllWarehouseZonesUrl,
      getByIdUrl: payload?.id ? getWarehouseZoneByIdUrl(payload.id) : getAllWarehouseZonesUrl,
      addUrl: createWarehouseZoneUrl,
      updateUrl: payload?.id ? updateWarehouseZoneUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteWarehouseZoneUrl(payload.id) : '',
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
      throw new Error(error?.message || 'WarehouseZone API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/warehouse-zones');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in warehouseZoneAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
