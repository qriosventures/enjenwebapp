'use server'
import { scrapReasonAPI } from "@/components/api/scrapReasonApi";
import ScrapReasonSettings from "@/components/settings/scrap-reasons/ScrapReasonSettings";

const ScrapReasonsPage = async () => {
    const scrapReasonsResponse = await scrapReasonAPI();
    const scrapReasons = scrapReasonsResponse?.data?.result || [];
    return (
        <>
            <ScrapReasonSettings ScrapReasonListData={scrapReasons} />
        </>
    );
};

export default ScrapReasonsPage;
