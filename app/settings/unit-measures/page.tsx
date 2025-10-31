'use server'
import UnitMeasureSettings from "@/components/settings/unitMeasure/UnitMeasureSettings";
import { unitMeasureAPI } from "@/components/api/unitMeasureApi";

const UnitMeasurePage = async () => {
  const unitMeasureResponse = await unitMeasureAPI();
  const unitMeasure = unitMeasureResponse?.data?.result || [];
  return (
    <>
      <UnitMeasureSettings unitMeasureListData={unitMeasure} />
    </>
  );
};

export default UnitMeasurePage;
