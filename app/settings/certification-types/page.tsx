'use server'

import { certificationTypesAPI } from "@/components/api/certificationTypesApi";
import CertificationTypesSettings from "@/components/settings/certification-types/CertificationTypesSettings";


const CertificationTypesPage = async () => {
    const certificationTypesResponse = await certificationTypesAPI();
    const certificationTypes = certificationTypesResponse?.data?.result || [];
    return (
        <>
            <CertificationTypesSettings certificationTypesListData={certificationTypes} />
        </>
    );
};

export default CertificationTypesPage;
