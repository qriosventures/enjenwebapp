'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierInvoiceLinesUrl,
  getSupplierInvoiceLineByIdUrl,
  createSupplierInvoiceLineUrl,
  updateSupplierInvoiceLineUrl,
  deleteSupplierInvoiceLineUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierInvoiceLineDto } from '@/lib/types/supplierInvoiceLine';

export const supplierInvoiceLineAPI = async (payload?: SupplierInvoiceLineDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierInvoiceLinesUrl,
      getByIdUrl: payload?.id ? getSupplierInvoiceLineByIdUrl(payload.id) : getAllSupplierInvoiceLinesUrl,
      addUrl: createSupplierInvoiceLineUrl,
      updateUrl: payload?.id ? updateSupplierInvoiceLineUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierInvoiceLineUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Supplier Invoice Line API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-invoice-lines');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierInvoiceLineAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
