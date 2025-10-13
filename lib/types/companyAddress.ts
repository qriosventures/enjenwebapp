export interface CompanyAddressDto {
  id?: number;
  streetAddress: string;
  cityId: number;
  stateId: number;
  postalCode: string;
  countryId: number;
  isPrimary: boolean;
  companyId: number;
  addressType: number;
}