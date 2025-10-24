'use server';

import { revalidatePath } from "next/cache";
import { createBrandUrl, deleteBrandUrl, getAllBrandsUrl, getBrandByIdUrl, getEndpointsByMethod, header, updateBrandUrl } from "@/lib/utils/endpoint";
import { BrandDto } from "@/lib/types/brand";

export const brandsAPI = async (payload?: BrandDto, method?: string) => {
  try {
        const normalizedMethod = (method ?? "GET").toUpperCase();
        const isGet = normalizedMethod === "GET" || normalizedMethod === "GET_BY_ID";
        const endPoint = getEndpointsByMethod(normalizedMethod ?? 'GET', {
           getUrl: getAllBrandsUrl,
           getByIdUrl: payload?.id ? getBrandByIdUrl(payload.id) : getAllBrandsUrl,
           addUrl: createBrandUrl,
           updateUrl: payload?.id ? updateBrandUrl(payload?.id) : '',
           deleteUrl: payload?.id ? deleteBrandUrl(payload?.id) : '',
          });
     
         const response = await fetch(endPoint, {
           method: normalizedMethod === "GET_BY_ID" ? "GET" : normalizedMethod,
           headers:  header,
            ...(isGet ? {} : { body: JSON.stringify(payload ?? {}) }),
         });
     

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch  brands API');
    }

    const data = await response.json();
    if (!isGet) revalidatePath('/settings/brands');
    return { status: 200, data };
  } catch (error: any) {
    console.error('Error in brands API:', error);
    return {
      status: 500,
      error: error.message || 'An unknown error occurred',
    };
  }
};

