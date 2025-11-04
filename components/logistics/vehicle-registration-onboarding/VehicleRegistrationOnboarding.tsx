import Breadcrumbs from "@/components/common/Breadcrumbs";
import { VehicleStatus } from "@/lib/enums/vehicleStatus";
import React from "react";

type VehicleType = {
  id: number;
  status: VehicleStatus;
  dbId?: number;
};

type Props = {
  vehicleListData: VehicleType[];
};

const VehicleRegistrationOnboarding = ({vehicleListData = []}: Props) => {
  return (
    <>
      <Breadcrumbs />
    </>
  );
};

export default VehicleRegistrationOnboarding;
