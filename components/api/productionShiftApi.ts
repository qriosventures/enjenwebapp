'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllProductionShiftsUrl,
  getProductionShiftByIdUrl,
  createProductionShiftUrl,
  updateProductionShiftUrl,
  deleteProductionShiftUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ProductionShiftDto } from '@/lib/types/productionShift';

export const productionShiftAPI = async (payload?: ProductionShiftDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllProductionShiftsUrl,
      getByIdUrl: payload?.id ? getProductionShiftByIdUrl(payload.id) : getAllProductionShiftsUrl,
      addUrl: createProductionShiftUrl,
      updateUrl: payload?.id ? updateProductionShiftUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteProductionShiftUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Production Shift API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/production-shifts');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in productionShiftAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
