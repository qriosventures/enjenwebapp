'use server'

import { documentTypeAPI } from "@/components/api/documentTypeApi";
import DocumentTypeSettings from "@/components/settings/document-types/DocumentTypeSettings";

const DocumentTypesPage = async () => {
    const documentTypesResponse = await documentTypeAPI();
    const documentTypes = documentTypesResponse?.data?.result || [];
    return (
        <>
        <DocumentTypeSettings documentTypesListData={documentTypes} />
        </>
    );
};

export default DocumentTypesPage;
