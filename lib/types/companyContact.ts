export interface CompanyContactDto {
  id?: number;
  name: string;
  designationId: number;
  departmentId: number;
  email:string | null;
  mobile: string;
  isPrimary: boolean;
  companyId: number;
}