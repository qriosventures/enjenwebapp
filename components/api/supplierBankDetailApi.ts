'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierBankDetailsUrl,
  getSupplierBankDetailByIdUrl,
  getBankDetailsBySupplierUrl,
  createSupplierBankDetailUrl,
  updateSupplierBankDetailUrl,
  deleteSupplierBankDetailUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierBankDetailDto } from '@/lib/types/supplierBankDetail';

export const supplierBankDetailAPI = async (payload?: SupplierBankDetailDto | { supplierId?: number;id?:number }, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID', 'GET_BY_SUPPLIER'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierBankDetailsUrl,
      getByIdUrl: payload?.id ? getSupplierBankDetailByIdUrl(payload.id) : getAllSupplierBankDetailsUrl,
      getBySupplierUrl: payload?.supplierId
        ? getBankDetailsBySupplierUrl(payload.supplierId)
        : getAllSupplierBankDetailsUrl,
      addUrl: createSupplierBankDetailUrl,
      updateUrl: payload?.id ? updateSupplierBankDetailUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierBankDetailUrl(payload.id) : '',
    });

    const actualMethod =
      normalizedMethod === 'GET_BY_ID' || normalizedMethod === 'GET_BY_SUPPLIER' ? 'GET' : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'SupplierBankDetail API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-bank-details');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierBankDetailAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
