'use server'
import CountrySettings from "@/components/settings/country/CountrySettings";
import { countryAPI } from "@/components/api/countryApi";

const CountryPage = async () => {
    const countryResponse = await countryAPI();
    const country = countryResponse?.data?.result || [];
    return (
        <>
            <CountrySettings countryListData={country} />
        </>
    );
};

export default CountryPage;
