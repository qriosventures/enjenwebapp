'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSalesInvoiceLinesUrl,
  getSalesInvoiceLineByIdUrl,
  createSalesInvoiceLineUrl,
  updateSalesInvoiceLineUrl,
  deleteSalesInvoiceLineUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SalesInvoiceLineDto } from '@/lib/types/salesInvoiceLine';

export const salesInvoiceLineAPI = async (payload?: SalesInvoiceLineDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSalesInvoiceLinesUrl,
      getByIdUrl: payload?.id ? getSalesInvoiceLineByIdUrl(payload.id) : getAllSalesInvoiceLinesUrl,
      addUrl: createSalesInvoiceLineUrl,
      updateUrl: payload?.id ? updateSalesInvoiceLineUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSalesInvoiceLineUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Sales Invoice Line API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/sales-invoice-lines');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in salesInvoiceLineAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
