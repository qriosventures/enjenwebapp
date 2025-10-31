'use server'
import BrandSettings from "@/components/settings/brands/BrandSettings";
import { brandsAPI } from "@/components/api/brands";

const BrandsPage = async () => {
  const brandsResponse = await brandsAPI(); 
  const brands = brandsResponse?.data?.result || []; 
  return (
    <>
      <BrandSettings brandsListData={brands} />
    </>
  );
};

export default BrandsPage;
