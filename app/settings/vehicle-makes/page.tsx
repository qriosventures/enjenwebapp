'use server';

import VehicalMakesSettings from "../../../components/settings/vehicle-makes/VehicleMakesSettings";
import { vehicleMakeAPI } from "@/components/api/vehicleMakeApi";
vehicleMakeAPI;
const vehiclePage = async () => {
  const vehicleResponse = await vehicleMakeAPI();
  const vehicle = vehicleResponse?.data?.result || [];
  return (
    <>
      <VehicalMakesSettings vehicleListData={vehicle} />
    </>
  );
};

export default vehiclePage;
