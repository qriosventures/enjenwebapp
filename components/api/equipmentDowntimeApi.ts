'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllEquipmentDowntimesUrl,
  getEquipmentDowntimeByIdUrl,
  createEquipmentDowntimeUrl,
  updateEquipmentDowntimeUrl,
  deleteEquipmentDowntimeUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { EquipmentDowntimeDto } from '@/lib/types/equipmentDowntime';

export const equipmentDowntimeAPI = async (payload?: EquipmentDowntimeDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllEquipmentDowntimesUrl,
      getByIdUrl: payload?.id ? getEquipmentDowntimeByIdUrl(payload.id) : getAllEquipmentDowntimesUrl,
      addUrl: createEquipmentDowntimeUrl,
      updateUrl: payload?.id ? updateEquipmentDowntimeUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteEquipmentDowntimeUrl(payload.id) : '',
    });

    const actualMethod = normalizedMethod === 'GET_BY_ID' ? 'GET' : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch Equipment Downtime API');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/equipment-downtime');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in Equipment Downtime API:', error);
    return {
      status: 500,
      error: error.message || 'An unknown error occurred',
    };
  }
};




