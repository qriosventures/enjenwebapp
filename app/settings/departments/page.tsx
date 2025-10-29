'use server'

import { departmentAPI } from "@/components/api/departmentApi";
import DepartmentSettings from "@/components/settings/departments/DepartmentSettings";

const DepartmentsPage = async () => {
    const departmentsResponse = await departmentAPI();
    const departments = departmentsResponse?.data?.result || [];
    return (
        <>
            <DepartmentSettings departmentsListData={departments} />
        </>
    );
};

export default DepartmentsPage;
