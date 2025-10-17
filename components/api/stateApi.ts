'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllStatesUrl,
  getStateByIdUrl,
  getStatesByCountryUrl,
  createStateUrl,
  updateStateUrl,
  deleteStateUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { StateDto } from '@/lib/types/state';

export const stateAPI = async (payload?: StateDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();

    // Custom GET for states by country
    const isGetByCountry = normalizedMethod === 'GET_BY_COUNTRY';
    const isGet = ['GET', 'GET_BY_ID', 'GET_BY_COUNTRY'].includes(normalizedMethod);

    const endPoint = isGetByCountry
      ? getStatesByCountryUrl(payload?.countryId ?? 0)
      : getEndpointsByMethod(normalizedMethod, {
          getUrl: getAllStatesUrl,
          getByIdUrl: payload?.id ? getStateByIdUrl(payload.id) : getAllStatesUrl,
          addUrl: createStateUrl,
          updateUrl: payload?.id ? updateStateUrl(payload.id) : '',
          deleteUrl: payload?.id ? deleteStateUrl(payload.id) : '',
        });

    const actualMethod =
      normalizedMethod === 'GET_BY_ID' || normalizedMethod === 'GET_BY_COUNTRY'
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
      throw new Error(error?.message || 'State API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/states');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in stateAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
