'use server'
import { operationAPI } from "@/components/api/operationApi";
import OperationSettings from "@/components/settings/operations/OperationSettings";

const OperationsPage = async () => {
    const operationsResponse = await operationAPI();
    const operations = operationsResponse?.data?.result || [];
    return (
        <>
            <OperationSettings operationListData={operations} />
        </>
    );
};

export default OperationsPage;
