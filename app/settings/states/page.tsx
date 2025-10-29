"use server";
import StatesSettings from "@/components/settings/states/StatesSettings";
import { stateAPI } from "@/components/api/stateApi";

const StatePage = async () => {
  const stateResponse = await stateAPI();
  const state = stateResponse?.data?.result || [];
  return (
    <>
      <StatesSettings stateListData={state} />
    </>
  );
};

export default StatePage;
