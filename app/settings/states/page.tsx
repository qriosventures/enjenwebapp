"use server";

import StatesSettings from "@/components/settings/states/StatesSettings";
import { stateAPI } from "@/components/api/stateApi";
import { countryAPI } from "@/components/api/countryApi";

const StatePage = async () => {
  try {
    const stateResponse = await stateAPI();
    const states = stateResponse?.data?.result || [];
    const countryResponse = await countryAPI();
    const countries = countryResponse?.data?.result || [];

    return (
      <>
        <StatesSettings stateListData={states} countryListData={countries} />
      </>
    );
  } catch (error) {
    console.error("Error fetching state or country data:", error);
    return <p>Failed to load data</p>;
  }
};

export default StatePage;
