'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllEquipmentMaintenancesUrl,
  getEquipmentMaintenanceByIdUrl,
  createEquipmentMaintenanceUrl,
  updateEquipmentMaintenanceUrl,
  deleteEquipmentMaintenanceUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { EquipmentMaintenanceDto } from '@/lib/types/equipmentMaintenance';

export const equipmentMaintenanceAPI = async (payload?: EquipmentMaintenanceDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllEquipmentMaintenancesUrl,
      getByIdUrl: payload?.id
        ? getEquipmentMaintenanceByIdUrl(payload.id)
        : getAllEquipmentMaintenancesUrl,
      addUrl: createEquipmentMaintenanceUrl,
      updateUrl: payload?.id
        ? updateEquipmentMaintenanceUrl(payload.id)
        : '',
      deleteUrl: payload?.id
        ? deleteEquipmentMaintenanceUrl(payload.id)
        : '',
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
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch Equipment Maintenance API');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/equipment-maintenance');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in Equipment Maintenance API:', error);
    return {
      status: 500,
      error: error.message || 'An unknown error occurred',
    };
  }
};
