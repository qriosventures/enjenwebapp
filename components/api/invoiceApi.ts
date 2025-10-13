'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllInvoicesUrl,
  getInvoiceByIdUrl,
  createInvoiceUrl,
  updateInvoiceUrl,
  deleteInvoiceUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { InvoiceDto } from '@/lib/types/invoice';


export const invoiceAPI = async (payload?: InvoiceDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllInvoicesUrl,
      getByIdUrl: payload?.id ? getInvoiceByIdUrl(payload.id) : getAllInvoicesUrl,
      addUrl: createInvoiceUrl,
      updateUrl: payload?.id ? updateInvoiceUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteInvoiceUrl(payload.id) : '',
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
      const errorData = await response.json();
      throw new Error(errorData.error || 'Invoice API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/invoice');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in invoiceAPI:', error);
    return { status: 500, error: error.message || 'Unknown error occurred' };
  }
};
