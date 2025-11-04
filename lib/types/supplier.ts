export interface SupplierDto {
  id?: number;
  companyName: string;
  legalName: string;
  taxId: string;
  primaryContactName: string;
  email: string;
  phone: string | null;
  yearsInBusiness: number | any;
  annualRevenue: number | any;
  employeeCount: number | any;
  status: number;
  registrationDate: Date | any;
  lastEvaluationDate: Date | null;
  averageRating: number;
  dbId?: number
}