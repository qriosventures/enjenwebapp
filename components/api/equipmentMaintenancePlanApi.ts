'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllEquipmentMaintenancePlansUrl,
  getEquipmentMaintenancePlanByIdUrl,
  createEquipmentMaintenancePlanUrl,
  updateEquipmentMaintenancePlanUrl,
  deleteEquipmentMaintenancePlanUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { EquipmentMaintenancePlanDto } from '@/lib/types/equipmentMaintenancePlan';

export const equipmentMaintenancePlanAPI = async (payload?: EquipmentMaintenancePlanDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllEquipmentMaintenancePlansUrl,
      getByIdUrl: payload?.id
        ? getEquipmentMaintenancePlanByIdUrl(payload.id)
        : getAllEquipmentMaintenancePlansUrl,
      addUrl: createEquipmentMaintenancePlanUrl,
      updateUrl: payload?.id
        ? updateEquipmentMaintenancePlanUrl(payload.id)
        : '',
      deleteUrl: payload?.id
        ? deleteEquipmentMaintenancePlanUrl(payload.id)
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
      throw new Error(errorData.error || 'Failed to fetch Equipment Maintenance Plan API');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/equipment-maintenance-plan');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in Equipment Maintenance Plan API:', error);
    return {
      status: 500,
      error: error.message || 'An unknown error occurred',
    };
  }
};
