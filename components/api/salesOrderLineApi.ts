'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSalesOrderLinesUrl,
  getSalesOrderLineByIdUrl,
  createSalesOrderLineUrl,
  updateSalesOrderLineUrl,
  deleteSalesOrderLineUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SalesOrderLineDto } from '@/lib/types/salesOrderLine';

export const salesOrderLineAPI = async (payload?: SalesOrderLineDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSalesOrderLinesUrl,
      getByIdUrl: payload?.id ? getSalesOrderLineByIdUrl(payload.id) : getAllSalesOrderLinesUrl,
      addUrl: createSalesOrderLineUrl,
      updateUrl: payload?.id ? updateSalesOrderLineUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSalesOrderLineUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Sales Order Line API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/sales-order-lines');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in salesOrderLineAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
