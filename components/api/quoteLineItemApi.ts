'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllQuoteLineItemsUrl,
  getQuoteLineItemByIdUrl,
  createQuoteLineItemUrl,
  updateQuoteLineItemUrl,
  deleteQuoteLineItemUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { QuoteLineItemDto } from '@/lib/types/quoteLineItem';

export const quoteLineItemAPI = async (payload?: QuoteLineItemDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllQuoteLineItemsUrl,
      getByIdUrl: payload?.id ? getQuoteLineItemByIdUrl(payload.id) : getAllQuoteLineItemsUrl,
      addUrl: createQuoteLineItemUrl,
      updateUrl: payload?.id ? updateQuoteLineItemUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteQuoteLineItemUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Quote Line Item API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/quote-line-items');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in quoteLineItemAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
