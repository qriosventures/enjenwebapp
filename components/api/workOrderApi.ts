'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllWorkOrdersUrl,
  getWorkOrderByIdUrl,
  createWorkOrderUrl,
  updateWorkOrderUrl,
  deleteWorkOrderUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { WorkOrderDto } from '@/lib/types/workOrder';

export const workOrderAPI = async (payload?: WorkOrderDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllWorkOrdersUrl,
      getByIdUrl: payload?.id ? getWorkOrderByIdUrl(payload.id) : getAllWorkOrdersUrl,
      addUrl: createWorkOrderUrl,
      updateUrl: payload?.id ? updateWorkOrderUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteWorkOrderUrl(payload.id) : '',
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
      throw new Error(error?.message || 'WorkOrder API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/work-orders');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in workOrderAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
