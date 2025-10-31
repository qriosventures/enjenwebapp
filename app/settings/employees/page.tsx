'use server';

import { departmentAPI } from "@/components/api/departmentApi";
import { designationAPI } from "@/components/api/designationApi";
import { employeeAPI } from "@/components/api/employeeApi";
import EmployeeSettings from "@/components/settings/employees/EmployeeSettings";


const EmployeePage = async () => {

    const [departmentsResponse, designationsResponse,employeeResponse] = await Promise.allSettled([
        departmentAPI(),
        designationAPI(),   
        employeeAPI()    
    ])

    const departments = departmentsResponse?.status === 'fulfilled' ? departmentsResponse?.value?.data?.result || [] : [];
    const designations = designationsResponse?.status === 'fulfilled' ? designationsResponse?.value?.data?.result || [] : [];
    const employee = employeeResponse?.status === 'fulfilled' ? employeeResponse?.value?.data?.result || [] : [];
    const dataToSend = {
        departments,
        designations,
        employee
    }

    return (
        <>
            <EmployeeSettings employeeListData={dataToSend} />
        </>
    );
};

export default EmployeePage;