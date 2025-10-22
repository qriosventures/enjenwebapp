'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllRfqRequisitionsUrl,
  getRfqRequisitionByIdUrl,
  createRfqRequisitionUrl,
  updateRfqRequisitionUrl,
  deleteRfqRequisitionUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { RfqRequisitionDto } from '@/lib/types/rfqRequisition';

export const rfqRequisitionAPI = async (payload?: RfqRequisitionDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllRfqRequisitionsUrl,
      getByIdUrl: payload?.id ? getRfqRequisitionByIdUrl(payload.id) : getAllRfqRequisitionsUrl,
      addUrl: createRfqRequisitionUrl,
      updateUrl: payload?.id ? updateRfqRequisitionUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteRfqRequisitionUrl(payload.id) : '',
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
      throw new Error(error?.message || 'RFQ Requisition API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/rfq-requisitions');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in rfqRequisitionAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
