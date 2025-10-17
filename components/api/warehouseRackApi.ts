'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllWarehouseRacksUrl,
  getWarehouseRackByIdUrl,
  createWarehouseRackUrl,
  updateWarehouseRackUrl,
  deleteWarehouseRackUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { WarehouseRackDto } from '@/lib/types/warehouseRack';

export const warehouseRackAPI = async (payload?: WarehouseRackDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllWarehouseRacksUrl,
      getByIdUrl: payload?.id ? getWarehouseRackByIdUrl(payload.id) : getAllWarehouseRacksUrl,
      addUrl: createWarehouseRackUrl,
      updateUrl: payload?.id ? updateWarehouseRackUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteWarehouseRackUrl(payload.id) : '',
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
      throw new Error(error?.message || 'WarehouseRack API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/warehouse-racks');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in warehouseRackAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
