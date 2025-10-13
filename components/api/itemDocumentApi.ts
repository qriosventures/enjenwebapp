'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllItemDocumentsUrl,
  getItemDocumentByIdUrl,
  createItemDocumentUrl,
  updateItemDocumentUrl,
  deleteItemDocumentUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ItemDocumentDto } from '@/lib/types/itemDocument';

export const itemDocumentAPI = async (payload?: ItemDocumentDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllItemDocumentsUrl,
      getByIdUrl: payload?.id ? getItemDocumentByIdUrl(payload.id) : getAllItemDocumentsUrl,
      addUrl: createItemDocumentUrl,
      updateUrl: payload?.id ? updateItemDocumentUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteItemDocumentUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Item Document API failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/item-documents');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in itemDocumentAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
