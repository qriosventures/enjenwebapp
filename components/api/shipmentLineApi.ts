'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllShipmentLinesUrl,
  getShipmentLineByIdUrl,
  createShipmentLineUrl,
  updateShipmentLineUrl,
  deleteShipmentLineUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ShipmentLineDto } from '@/lib/types/shipmentLine';

export const shipmentLineAPI = async (payload?: ShipmentLineDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllShipmentLinesUrl,
      getByIdUrl: payload?.id ? getShipmentLineByIdUrl(payload.id) : getAllShipmentLinesUrl,
      addUrl: createShipmentLineUrl,
      updateUrl: payload?.id ? updateShipmentLineUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteShipmentLineUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Shipment Line API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/shipment-lines');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in shipmentLineAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
