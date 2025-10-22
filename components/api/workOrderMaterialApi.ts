'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllWorkOrderMaterialsUrl,
  getWorkOrderMaterialByIdUrl,
  createWorkOrderMaterialUrl,
  updateWorkOrderMaterialUrl,
  deleteWorkOrderMaterialUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { WorkOrderMaterialDto } from '@/lib/types/workOrderMaterial';

export const workOrderMaterialAPI = async (payload?: WorkOrderMaterialDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllWorkOrderMaterialsUrl,
      getByIdUrl: payload?.id ? getWorkOrderMaterialByIdUrl(payload.id) : getAllWorkOrderMaterialsUrl,
      addUrl: createWorkOrderMaterialUrl,
      updateUrl: payload?.id ? updateWorkOrderMaterialUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteWorkOrderMaterialUrl(payload.id) : '',
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
      throw new Error(error?.message || 'WorkOrderMaterial API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/work-order-materials');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in workOrderMaterialAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
