export interface EmployeeDto {
  id?: number;
  employeeId: string;
  name: string;
  departmentId: number;
  designationId: number;
  hireDate: Date;
  isActive: boolean;
  skills: string | null;
  profileImageUrl: string | null;
}