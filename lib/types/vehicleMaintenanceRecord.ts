export interface VehicleMaintenanceRecordDto {
  id?: number;
  vehicleId: number;
  maintenanceDate: Date;
  odometer: number;
  maintenanceType: number;
  description: string | null;
  cost: number;
  serviceProvider: string | null;
  invoiceNumber: string | null;
  nextServiceDate: Date | null;
  nextServiceOdometer: number | null;
  isWarrantyCovered: boolean;
  notes: string | null;
}