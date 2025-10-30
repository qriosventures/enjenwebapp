'use server';

import { revalidatePath } from 'next/cache';
import {
  getAllEmployeesUrl,
  getEmployeeByIdUrl,
  createEmployeeUrl,
  updateEmployeeUrl,
  deleteEmployeeUrl,
  getEndpointsByMethod,
  header,
} from '@/lib/utils/endpoint';
import { EmployeeDto } from '@/lib/types/employee';

export const employeeAPI = async (payload?: EmployeeDto, method?: string) => {
  try {
    const normalizedMethod = (method ?? 'GET').toUpperCase();
    const isGet = ['GET', 'GET_BY_ID'].includes(normalizedMethod);

    const endPoint = getEndpointsByMethod(normalizedMethod, {
      getUrl: getAllEmployeesUrl,
      getByIdUrl: payload?.id ? getEmployeeByIdUrl(payload.id) : getAllEmployeesUrl,
      addUrl: createEmployeeUrl,
      updateUrl: payload?.id ? updateEmployeeUrl(payload.id) : '',
      deleteUrl: payload?.id ? deleteEmployeeUrl(payload.id) : '',
    });

    const actualMethod = normalizedMethod === 'GET_BY_ID' ? 'GET' : normalizedMethod;

    const response = await fetch(endPoint, {
      method: actualMethod,
      headers: header,
      ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch Employee API');
    }

    const data = await response.json();

    if (!isGet) revalidatePath('/settings/employees');

    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in Employee API:', error);
    return { status: 500, error: error.message || 'An unknown error occurred' };
  }
};
