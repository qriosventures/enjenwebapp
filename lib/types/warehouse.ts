import { WarehouseType } from "../enums/warehouseType";

export interface WarehouseDto {
  id?: number;
  name: string;
  code: string;
  address: string;
  cityId: number;
  stateId: number;
  zipCode: string | null;
  countryId: number;
  phone: string | null;
  email: string | null;
  contactPerson: string;
  type: WarehouseType;
  latitude: number;
  longitude: number;
  isActive: boolean;
  operationalSince: Date;
  totalArea: number;
  usableCapacity: number;
}