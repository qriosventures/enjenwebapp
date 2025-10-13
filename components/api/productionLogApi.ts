'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllProductionLogsUrl,
  getProductionLogByIdUrl,
  createProductionLogUrl,
  updateProductionLogUrl,
  deleteProductionLogUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ProductionLogDto } from '@/lib/types/productionLog';

export const productionLogAPI = async (payload?: ProductionLogDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllProductionLogsUrl,
      getByIdUrl: payload?.id ? getProductionLogByIdUrl(payload.id) : getAllProductionLogsUrl,
      addUrl: createProductionLogUrl,
      updateUrl: payload?.id ? updateProductionLogUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteProductionLogUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Production Log API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/production-logs');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in productionLogAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
