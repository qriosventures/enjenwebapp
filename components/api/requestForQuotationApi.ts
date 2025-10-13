'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllRequestForQuotationsUrl,
  getRequestForQuotationByIdUrl,
  createRequestForQuotationUrl,
  updateRequestForQuotationUrl,
  deleteRequestForQuotationUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { RequestForQuotationDto } from '@/lib/types/requestForQuotation';

export const requestForQuotationAPI = async (payload?: RequestForQuotationDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllRequestForQuotationsUrl,
      getByIdUrl: payload?.id ? getRequestForQuotationByIdUrl(payload.id) : getAllRequestForQuotationsUrl,
      addUrl: createRequestForQuotationUrl,
      updateUrl: payload?.id ? updateRequestForQuotationUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteRequestForQuotationUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Request For Quotation API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/request-for-quotations');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in requestForQuotationAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
