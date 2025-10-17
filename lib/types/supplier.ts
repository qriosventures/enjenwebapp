export interface SupplierDto {
  id?: number;
  companyName: string;
  legalName: string;
  taxId: string;
  primaryContactName: string;
  email: string;
  phone: string | null;
  yearsInBusiness: number | null;
  annualRevenue: number | null;
  employeeCount: number | null;
  status: number;
  registrationDate: Date | null;
  lastEvaluationDate: Date | null;
  averageRating: number;
}