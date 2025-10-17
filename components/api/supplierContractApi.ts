'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierContractsUrl,
  getSupplierContractByIdUrl,
  createSupplierContractUrl,
  updateSupplierContractUrl,
  deleteSupplierContractUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierContractDto } from '@/lib/types/supplierContract';

export const supplierContractAPI = async (payload?: SupplierContractDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierContractsUrl,
      getByIdUrl: payload?.id ? getSupplierContractByIdUrl(payload.id) : getAllSupplierContractsUrl,
      addUrl: createSupplierContractUrl,
      updateUrl: payload?.id ? updateSupplierContractUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteSupplierContractUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Supplier Contract API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-contracts');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierContractAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
