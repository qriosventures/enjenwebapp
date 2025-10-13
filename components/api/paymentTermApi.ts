'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllPaymentTermsUrl,
  getPaymentTermByIdUrl,
  createPaymentTermUrl,
  updatePaymentTermUrl,
  deletePaymentTermUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { PaymentTermDto } from '@/lib/types/paymentTerm';


export const paymentTermAPI = async (payload?: PaymentTermDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllPaymentTermsUrl,
      getByIdUrl: payload?.id ? getPaymentTermByIdUrl(payload.id) : getAllPaymentTermsUrl,
      addUrl: createPaymentTermUrl,
      updateUrl: payload?.id ? updatePaymentTermUrl(payload.id) : '',
      deleteUrl: payload?.id ? deletePaymentTermUrl(payload.id) : '',
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
      throw new Error(error?.message || 'PaymentTerm API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/payment-term');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in paymentTermAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
