'use server'

import { defectTypeAPI } from "@/components/api/defectTypeApi";
import DefectTypesSettings from "@/components/settings/defect-types/DefectTypesSettings";

const DefectTypesPage = async () => {
    const defectsTypeResponse = await defectTypeAPI();
    const defectsData = defectsTypeResponse?.data?.result || [];
    return (
        <>
            <DefectTypesSettings defectsListData={defectsData} />
        </>
    );
};

export default DefectTypesPage;
