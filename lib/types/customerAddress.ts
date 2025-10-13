export interface CustomerAddressDto {
  id?: number;
  customerId: number;
  address: string;
  cityId: number;
  stateId: number;
  postalCode: string;
  countryId: number;
  isPrimary: boolean;
  addressType: number;
}