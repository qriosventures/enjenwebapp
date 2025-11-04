import { vehicleAPI } from "@/components/api/vehicleApi";
import VehicleRegistrationOnboarding from "@/components/logistics/vehicle-registration-onboarding/VehicleRegistrationOnboarding";
import React from "react";

const vehicleRegistrationPage = async () => {
  const vehicleRegistrationResponse = await vehicleAPI();
  const vehicleRegistration = vehicleRegistrationResponse?.data?.result || [];
  

  return (
    <>
      <VehicleRegistrationOnboarding vehicleListData={vehicleRegistration} />
    </>
  );
};

export default vehicleRegistrationPage;
