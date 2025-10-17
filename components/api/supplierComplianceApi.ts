'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierCompliancesUrl,
  getSupplierComplianceByIdUrl,
  createSupplierComplianceUrl,
  updateSupplierComplianceUrl,
  deleteSupplierComplianceUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierComplianceDto } from '@/lib/types/supplierCompliance';

export const supplierComplianceAPI = async (payload?: SupplierComplianceDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierCompliancesUrl,
      getByIdUrl: payload?.id ? getSupplierComplianceByIdUrl(payload.id) : getAllSupplierCompliancesUrl,
      addUrl: createSupplierComplianceUrl,
      updateUrl: payload?.id ? updateSupplierComplianceUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierComplianceUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Supplier Compliance API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-compliances');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierComplianceAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
