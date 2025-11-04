"use server";

import React from "react";
import CitiesSettings from "@/components/settings/cities/CitiesSettings";
import { cityAPI } from "@/components/api/cityApi";
import { countryAPI } from "@/components/api/countryApi";
import { stateAPI } from "@/components/api/stateApi";
const cityPage = async () => {
  const [cityResponse, stateResponse, countryResponse] =
    await Promise.allSettled([cityAPI(), stateAPI(), countryAPI()]);

  const cities =
    cityResponse?.status === "fulfilled"
      ? cityResponse.value.data?.result || []
      : [];
  const states =
    stateResponse?.status === "fulfilled"
      ? stateResponse.value.data?.result || []
      : [];
  const countries =
    countryResponse?.status === "fulfilled"
      ? countryResponse.value.data?.result || []
      : [];

  const data = {
    cities,
    states,
    countries,
  };
  return (
    <>
      <CitiesSettings cityListData={data} />
    </>
  );
};
export default cityPage;
