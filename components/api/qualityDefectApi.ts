'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllQualityDefectsUrl,
  getQualityDefectByIdUrl,
  createQualityDefectUrl,
  updateQualityDefectUrl,
  deleteQualityDefectUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { QualityDefectDto } from '@/lib/types/qualityDefect';

export const qualityDefectAPI = async (payload?: QualityDefectDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllQualityDefectsUrl,
      getByIdUrl: payload?.id ? getQualityDefectByIdUrl(payload.id) : getAllQualityDefectsUrl,
      addUrl: createQualityDefectUrl,
      updateUrl: payload?.id ? updateQualityDefectUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteQualityDefectUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Quality Defect API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/quality-defects');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in qualityDefectAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
