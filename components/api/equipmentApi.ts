'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllEquipmentsUrl,
  getEquipmentByIdUrl,
  createEquipmentUrl,
  updateEquipmentUrl,
  deleteEquipmentUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { EquipmentDto } from '@/lib/types/equipment';

export const equipmentAPI = async (payload?: EquipmentDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllEquipmentsUrl,
      getByIdUrl: payload?.id ? getEquipmentByIdUrl(payload.id) : getAllEquipmentsUrl,
      addUrl: createEquipmentUrl,
      updateUrl: payload?.id ? updateEquipmentUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteEquipmentUrl(payload.id) : '',
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
      throw new Error(errorData.error || 'Failed to fetch Equipment API');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/equipment');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in Equipment API:', error);
    return {
      status: 500,
      error: error.message || 'An unknown error occurred',
    };
  }
};
