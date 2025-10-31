"use server";

import StatesSettings from "@/components/settings/states/StatesSettings";
import { stateAPI } from "@/components/api/stateApi";
import { countryAPI } from "@/components/api/countryApi";

const StatePage = async () => {
  const [stateResponse, countryResponse] = await Promise.allSettled([
    stateAPI(),
    countryAPI(),
  ]);

  const states =
    stateResponse.status === "fulfilled"
      ? stateResponse.value.data?.result || []
      : [];

  const countries =
    countryResponse.status === "fulfilled"
      ? countryResponse.value.data?.result || []
      : [];

  const data = {
    states,
    countries,
  };
  return (
    <>
      <StatesSettings stateListData={data}  />
    </>
  );
};
export default StatePage;
