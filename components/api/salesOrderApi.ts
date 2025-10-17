'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSalesOrdersUrl,
  getSalesOrderByIdUrl,
  createSalesOrderUrl,
  updateSalesOrderUrl,
  deleteSalesOrderUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SalesOrderDto } from '@/lib/types/salesOrder';

export const salesOrderAPI = async (payload?: SalesOrderDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSalesOrdersUrl,
      getByIdUrl: payload?.id ? getSalesOrderByIdUrl(payload.id) : getAllSalesOrdersUrl,
      addUrl: createSalesOrderUrl,
      updateUrl: payload?.id ? updateSalesOrderUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSalesOrderUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Sales Order API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/sales-orders');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in salesOrderAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
