'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierEvaluationsUrl,
  getSupplierEvaluationByIdUrl,
  createSupplierEvaluationUrl,
  updateSupplierEvaluationUrl,
  deleteSupplierEvaluationUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierEvaluationDto } from '@/lib/types/supplierEvaluation';

export const supplierEvaluationAPI = async (payload?: SupplierEvaluationDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierEvaluationsUrl,
      getByIdUrl: payload?.id ? getSupplierEvaluationByIdUrl(payload.id) : getAllSupplierEvaluationsUrl,
      addUrl: createSupplierEvaluationUrl,
      updateUrl: payload?.id ? updateSupplierEvaluationUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierEvaluationUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Supplier Evaluation API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-evaluations');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierEvaluationAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
