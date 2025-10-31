'use server';

import { warehouseAPI } from "@/components/api/warehouseApi";
import { warehouseZoneAPI } from "@/components/api/warehouseZoneApi";
import WarehouseZoneSettings from "@/components/settings/warehouse-zones/WarehouseZoneSettings";


const WarehouseZonePage = async () => {
    const [warehouseResponse, warehouseZonesResponse] = await Promise.allSettled([  
        warehouseAPI(),
        warehouseZoneAPI()    
    ])
    
    const warehouse = warehouseResponse?.status === 'fulfilled' ? warehouseResponse?.value?.data?.result || [] : [];
    const warehouseZones = warehouseZonesResponse?.status === 'fulfilled' ? warehouseZonesResponse?.value?.data?.result || [] : [];
    const dataToSend = {warehouse,warehouseZones}

    return (
        <>
            <WarehouseZoneSettings warehouseZoneListData={dataToSend} />
        </>
    );
};

export default WarehouseZonePage;