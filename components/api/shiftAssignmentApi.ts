'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllShiftAssignmentsUrl,
  getShiftAssignmentByIdUrl,
  createShiftAssignmentUrl,
  updateShiftAssignmentUrl,
  deleteShiftAssignmentUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { ShiftAssignmentDto } from '@/lib/types/shiftAssignment';

export const shiftAssignmentAPI = async (payload?: ShiftAssignmentDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllShiftAssignmentsUrl,
      getByIdUrl: payload?.id ? getShiftAssignmentByIdUrl(payload.id) : getAllShiftAssignmentsUrl,
      addUrl: createShiftAssignmentUrl,
      updateUrl: payload?.id ? updateShiftAssignmentUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteShiftAssignmentUrl(payload.id) : '',
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
      throw new Error(error?.message || 'Shift Assignment API request failed');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/shift-assignments');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in shiftAssignmentAPI:', error);
    return { status: 500, error: error.message || 'Unknown error' };
  }
};
