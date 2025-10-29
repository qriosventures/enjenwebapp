'use server';

import { carriersAPI } from "@/components/api/carriersApi";
import CarrierSettings from "@/components/settings/carriers/CarrierSettings";


const CarrierPage = async () => {
    const carrierResponse = await carriersAPI();
    const carrier = carrierResponse?.data?.result || [];
    console.log(carrierResponse,"Carrier data received:", carrierResponse?.data?.result)
    return (
        <>
            <CarrierSettings carrierListData={carrier} />
        </>
    );
};

export default CarrierPage;