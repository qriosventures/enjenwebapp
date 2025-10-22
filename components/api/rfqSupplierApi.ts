'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllRfqSuppliersUrl,
  getRfqSupplierByIdUrl,
  createRfqSupplierUrl,
  updateRfqSupplierUrl,
  deleteRfqSupplierUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { RfqSupplierDto } from '@/lib/types/rfqSupplier';

export const rfqSupplierAPI = async (payload?: RfqSupplierDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllRfqSuppliersUrl,
      getByIdUrl: payload?.id ? getRfqSupplierByIdUrl(payload.id) : getAllRfqSuppliersUrl,
      addUrl: createRfqSupplierUrl,
      updateUrl: payload?.id ? updateRfqSupplierUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteRfqSupplierUrl(payload.id) : '',
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
      throw new Error(error?.message || 'RFQ Supplier API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/rfq-suppliers');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in rfqSupplierAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
