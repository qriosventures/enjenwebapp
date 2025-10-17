export interface VehicleInspectionDto {
  id?: number;
  vehicleId: number;
  inspectionDate: Date;
  inspectorName: string;
  inspectionType: number;
  odometer: number;
  status: number;
  notes: string | null;
}