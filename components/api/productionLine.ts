'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllProductionLinesUrl,
  getProductionLineByIdUrl,
  createProductionLineUrl,
  updateProductionLineUrl,
  deleteProductionLineUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ProductionLineDto } from '@/lib/types/productionLine';

export const productionLineAPI = async (payload?: ProductionLineDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllProductionLinesUrl,
      getByIdUrl: payload?.id ? getProductionLineByIdUrl(payload.id) : getAllProductionLinesUrl,
      addUrl: createProductionLineUrl,
      updateUrl: payload?.id ? updateProductionLineUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteProductionLineUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Production Line API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/production-lines');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in productionLineAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
