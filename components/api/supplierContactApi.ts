'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierContactsUrl,
  getSupplierContactByIdUrl,
  createSupplierContactUrl,
  updateSupplierContactUrl,
  deleteSupplierContactUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierContactDto } from '@/lib/types/supplierContact';

export const supplierContactAPI = async (payload?: SupplierContactDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierContactsUrl,
      getByIdUrl: payload?.id ? getSupplierContactByIdUrl(payload.id) : getAllSupplierContactsUrl,
      addUrl: createSupplierContactUrl,
      updateUrl: payload?.id ? updateSupplierContactUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierContactUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Supplier Contact API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-contacts');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierContactAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
