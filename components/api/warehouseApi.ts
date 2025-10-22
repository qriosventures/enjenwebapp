'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllWarehousesUrl,
  getWarehouseByIdUrl,
  createWarehouseUrl,
  updateWarehouseUrl,
  deleteWarehouseUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { WarehouseDto } from '@/lib/types/warehouse';

export const warehouseAPI = async (payload?: WarehouseDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllWarehousesUrl,
      getByIdUrl: payload?.id ? getWarehouseByIdUrl(payload.id) : getAllWarehousesUrl,
      addUrl: createWarehouseUrl,
      updateUrl: payload?.id ? updateWarehouseUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteWarehouseUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Warehouse API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/warehouses');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in warehouseAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
