'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllShipmentsUrl,
  getShipmentByIdUrl,
  createShipmentUrl,
  updateShipmentUrl,
  deleteShipmentUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ShipmentDto } from '@/lib/types/shipment';

export const shipmentAPI = async (payload?: ShipmentDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllShipmentsUrl,
      getByIdUrl: payload?.id ? getShipmentByIdUrl(payload.id) : getAllShipmentsUrl,
      addUrl: createShipmentUrl,
      updateUrl: payload?.id ? updateShipmentUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteShipmentUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Shipment API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/shipments');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in shipmentAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
