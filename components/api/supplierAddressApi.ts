'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierAddressesUrl,
  getSupplierAddressByIdUrl,
  getAddressesBySupplierUrl,
  createSupplierAddressUrl,
  updateSupplierAddressUrl,
  deleteSupplierAddressUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierAddressDto } from '@/lib/types/supplierAddress';

export const supplierAddressAPI = async (payload?: SupplierAddressDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();

    const isGetBySupplier = normalizedMethod === 'GET_BY_SUPPLIER';
    const isGet = ['GET', 'GET_BY_ID', 'GET_BY_SUPPLIER'].includes(normalizedMethod);

    const endPoint = isGetBySupplier
      ? getAddressesBySupplierUrl(payload?.supplierId ?? 0)
      : getEndpointsByMethod(normalizedMethod, {
          getUrl: getAllSupplierAddressesUrl,
          getByIdUrl: payload?.id ? getSupplierAddressByIdUrl(payload.id) : getAllSupplierAddressesUrl,
          addUrl: createSupplierAddressUrl,
          updateUrl: payload?.id ? updateSupplierAddressUrl(payload.id) : '',
          deleteUrl: payload?.id ? deleteSupplierAddressUrl(payload.id) : '',
        });

    const actualMethod =
      normalizedMethod === 'GET_BY_ID' || normalizedMethod === 'GET_BY_SUPPLIER'
        ? 'GET'
        : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'Supplier Address API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-addresses');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierAddressAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
