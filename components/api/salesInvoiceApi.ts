'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSalesInvoicesUrl,
  getSalesInvoiceByIdUrl,
  createSalesInvoiceUrl,
  updateSalesInvoiceUrl,
  deleteSalesInvoiceUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SalesInvoiceDto } from '@/lib/types/salesInvoice';

export const salesInvoiceAPI = async (payload?: SalesInvoiceDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSalesInvoicesUrl,
      getByIdUrl: payload?.id ? getSalesInvoiceByIdUrl(payload.id) : getAllSalesInvoicesUrl,
      addUrl: createSalesInvoiceUrl,
      updateUrl: payload?.id ? updateSalesInvoiceUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSalesInvoiceUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Sales Invoice API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/sales-invoices');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in salesInvoiceAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
