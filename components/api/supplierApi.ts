'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSuppliersUrl,
  getSupplierByIdUrl,
  createSupplierUrl,
  updateSupplierUrl,
  deleteSupplierUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierDto } from '@/lib/types/supplier';

export const supplierAPI = async (payload?: SupplierDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSuppliersUrl,
      getByIdUrl: payload?.id ? getSupplierByIdUrl(payload.id) : getAllSuppliersUrl,
      addUrl: createSupplierUrl,
      updateUrl: payload?.id ? updateSupplierUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Supplier API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/procurement/supplier-registration-onboarding');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
