export interface SupplierAddressDto {
  id?: number;
  supplierId: number;
  address: string;
  cityId: number;
  stateId: number;
  zipCode: string | null;
  countryId: number;
  addressType: number;
}