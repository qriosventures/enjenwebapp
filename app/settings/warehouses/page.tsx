'use server';

import { cityAPI } from "@/components/api/cityApi";
import { countryAPI } from "@/components/api/countryApi";
import { stateAPI } from "@/components/api/stateApi";
import { warehouseAPI } from "@/components/api/warehouseApi";
import WarehouseSettings from "@/components/settings/warehouses/WarehouseSettings";


const WarehousePage = async () => {
    const [countryResponse, stateResponse,cityResponse,warehouseResponse] = await Promise.allSettled([
        countryAPI(),
        stateAPI(),
        cityAPI(),   
        warehouseAPI()    
    ])
    
    const country = countryResponse?.status === 'fulfilled' ? countryResponse?.value?.data?.result || [] : [];
    const state = stateResponse?.status === 'fulfilled' ? stateResponse?.value?.data?.result || [] : [];
    const city = cityResponse?.status === 'fulfilled' ? cityResponse?.value?.data?.result || [] : [];
    const warehouse = warehouseResponse?.status === 'fulfilled' ? warehouseResponse?.value?.data?.result || [] : [];
    const dataToSend = {country,state,city,warehouse}

    return (
        <>
            <WarehouseSettings warehouseListData={dataToSend} />
        </>
    );
};

export default WarehousePage;