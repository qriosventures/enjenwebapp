'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierInvoicesUrl,
  getSupplierInvoiceByIdUrl,
  createSupplierInvoiceUrl,
  updateSupplierInvoiceUrl,
  deleteSupplierInvoiceUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierInvoiceDto } from '@/lib/types/supplierInvoice';

export const supplierInvoiceAPI = async (payload?: SupplierInvoiceDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierInvoicesUrl,
      getByIdUrl: payload?.id ? getSupplierInvoiceByIdUrl(payload.id) : getAllSupplierInvoicesUrl,
      addUrl: createSupplierInvoiceUrl,
      updateUrl: payload?.id ? updateSupplierInvoiceUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierInvoiceUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Supplier Invoice API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-invoices');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierInvoiceAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
