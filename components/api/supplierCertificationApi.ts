'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllSupplierCertificationsUrl,
  getSupplierCertificationByIdUrl,
  getCertificationsBySupplierUrl,
  createSupplierCertificationUrl,
  updateSupplierCertificationUrl,
  deleteSupplierCertificationUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { SupplierCertificationDto } from '@/lib/types/supplierCertification';

export const supplierCertificationAPI = async (
  payload?: SupplierCertificationDto | { supplierId?: number },
  method?: string
) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID', 'GET_BY_SUPPLIER'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllSupplierCertificationsUrl,
      getByIdUrl:
        payload && 'id' in payload && payload.id
          ? getSupplierCertificationByIdUrl(payload.id)
          : getAllSupplierCertificationsUrl,
      getBySupplierUrl:
        payload && 'supplierId' in payload && payload.supplierId
          ? getCertificationsBySupplierUrl(payload.supplierId)
          : getAllSupplierCertificationsUrl,
      addUrl: createSupplierCertificationUrl,
      updateUrl:
        payload && 'id' in payload && payload.id ? updateSupplierCertificationUrl(payload.id) : '',
      deleteUrl:
        payload && 'id' in payload && payload.id ? deleteSupplierCertificationUrl(payload.id) : '',
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
      throw new Error(error?.message || 'SupplierCertification API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/supplier-certifications');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in supplierCertificationAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
