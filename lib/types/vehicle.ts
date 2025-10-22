import { FuelType } from "../enums/fuelType";
import { TransmissionType } from "../enums/transmissionType";
import { VehicleStatus } from "../enums/vehicleStatus";
import { VehicleType } from "../enums/vehicleType";

export interface VehicleDto {
  id: number;
  licensePlate: string;
  vin: string;
  vehicleMakeId: number;
  model: string;
  year: number;
  color: string | null;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  fuelType: FuelType;
  fuelEfficiency: number;
  odometer: number;
  transmissionType: TransmissionType;
  vehicleType: VehicleType;
  vehicleStatus: VehicleStatus;
  engineSize: number;
  lastServiceDate: Date | null;
  registrationExpiry: Date | null;
  insuranceExpiry: Date | null;
  nextRtoDueDate: Date | null;
  nextRoadTaxDueDate: Date | null;
  nextPucDueDate: Date | null;
  notes: string | null;
}