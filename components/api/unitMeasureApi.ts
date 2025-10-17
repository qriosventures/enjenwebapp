'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllUnitMeasuresUrl,
  getUnitMeasureByIdUrl,
  createUnitMeasureUrl,
  updateUnitMeasureUrl,
  deleteUnitMeasureUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { UnitMeasureDto } from '@/lib/types/unitMeasure';

export const unitMeasureAPI = async (payload?: UnitMeasureDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllUnitMeasuresUrl,
      getByIdUrl: payload?.id ? getUnitMeasureByIdUrl(payload.id) : getAllUnitMeasuresUrl,
      addUrl: createUnitMeasureUrl,
      updateUrl: payload?.id ? updateUnitMeasureUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteUnitMeasureUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Unit Measure API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/unit-measures');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in unitMeasureAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
