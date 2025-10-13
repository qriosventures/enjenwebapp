export interface CompanyDto {
  id?: number;
  legalName: string;
  gstNumber :string;
  registrationNumber: string;
  phoneNumber: string;
  email: string;
  website: string | null;
  logoUrl: string | null;
  defaultCurrency: string;
  timeZone: string;
  name: string;
}