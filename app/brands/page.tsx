'use server';

import { brandsAPI } from "@/components/api/brands";

const BrandsPage = async () => {
    const brandsResponse= await brandsAPI();
    console.log("brandsResponse",brandsResponse);
  return (
    <></>
  );
}

export default BrandsPage;