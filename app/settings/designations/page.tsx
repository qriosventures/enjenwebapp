'use server'

import { designationAPI } from "@/components/api/designationApi";
import DesignationSettings from "@/components/settings/designations/DesignationSettings";

const DesignationsPage = async () => {
    const designationResponse = await designationAPI();
    const designations = designationResponse?.data?.result || [];
    return (
        <>
        <DesignationSettings designationsListData={designations} />
        </>
    );
};

export default DesignationsPage;
