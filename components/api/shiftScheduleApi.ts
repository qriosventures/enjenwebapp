'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllShiftSchedulesUrl,
  getShiftScheduleByIdUrl,
  createShiftScheduleUrl,
  updateShiftScheduleUrl,
  deleteShiftScheduleUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ShiftScheduleDto } from '@/lib/types/shiftSchedule';

export const shiftScheduleAPI = async (payload?: ShiftScheduleDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllShiftSchedulesUrl,
      getByIdUrl: payload?.id ? getShiftScheduleByIdUrl(payload.id) : getAllShiftSchedulesUrl,
      addUrl: createShiftScheduleUrl,
      updateUrl: payload?.id ? updateShiftScheduleUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteShiftScheduleUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Shift Schedule API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/shift-schedules');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in shiftScheduleAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
