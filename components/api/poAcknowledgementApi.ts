'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllPoAcknowledgementsUrl,
  getPoAcknowledgementByIdUrl,
  createPoAcknowledgementUrl,
  updatePoAcknowledgementUrl,
  deletePoAcknowledgementUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { PoAcknowledgementDto } from '@/lib/types/poAcknowledgement';

export const poAcknowledgementAPI = async (payload?: PoAcknowledgementDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllPoAcknowledgementsUrl,
      getByIdUrl: payload?.id ? getPoAcknowledgementByIdUrl(payload.id) : getAllPoAcknowledgementsUrl,
      addUrl: createPoAcknowledgementUrl,
      updateUrl: payload?.id ? updatePoAcknowledgementUrl(payload.id) : '',
      deleteUrl: payload?.id ? deletePoAcknowledgementUrl(payload.id) : '',
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
      throw new Error(error?.message || 'PO Acknowledgement API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/po-acknowledgement');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in poAcknowledgementAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
