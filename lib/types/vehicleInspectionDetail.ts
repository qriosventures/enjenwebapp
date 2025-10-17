export interface VehicleInspectionDetailDto {
  id?: number;
  vehicleInspectionId: number;
  checkItem: string;
  status: string;
  notes: string | null;
}