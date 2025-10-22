export interface VehicleMaintenanceTaskDto {
  id?: number;
  maintenanceRecordId: number;
  taskDate: Date;
  taskName: string;
  description: string | null;
  maintenanceTaskStatus: number;
  laborCost: number | null;
  partsCost: number | null;
  technician: string | null;
}