export interface VehicleFuelRecordDto {
  id?: number;
  vehicleId: number;
  fuelDate: Date;
  odometer: number;
  fuelVolume: number;
  fuelCost: number;
  fuelStation: string | null;
  stationLocation: string | null;
  receiptNumber: string | null;
  paymentMethod: number;
  notes: string | null;
}