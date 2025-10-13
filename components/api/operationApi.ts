'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllOperationsUrl,
  getOperationByIdUrl,
  createOperationUrl,
  updateOperationUrl,
  deleteOperationUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { OperationDto } from '@/lib/types/operation';

export const operationAPI = async (payload?: OperationDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllOperationsUrl,
      getByIdUrl: payload?.id ? getOperationByIdUrl(payload.id) : getAllOperationsUrl,
      addUrl: createOperationUrl,
      updateUrl: payload?.id ? updateOperationUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteOperationUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Operation API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/operation');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in operationAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
