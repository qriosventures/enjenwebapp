'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierQuotesUrl,
  getSupplierQuoteByIdUrl,
  createSupplierQuoteUrl,
  updateSupplierQuoteUrl,
  deleteSupplierQuoteUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierQuoteDto } from '@/lib/types/supplierQuote';

export const supplierQuoteAPI = async (payload?: SupplierQuoteDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierQuotesUrl,
      getByIdUrl: payload?.id ? getSupplierQuoteByIdUrl(payload.id) : getAllSupplierQuotesUrl,
      addUrl: createSupplierQuoteUrl,
      updateUrl: payload?.id ? updateSupplierQuoteUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierQuoteUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Supplier Quote API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-quotes');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierQuoteAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
