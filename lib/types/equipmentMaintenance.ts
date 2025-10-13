export interface EquipmentMaintenanceDto {
  id?: number;
  equipmentId: number;
  type: number;
  scheduledDate: Date;
  completedDate: Date | null;
  performedBy: string | null;
  cost: number;
  description: string | null;
  equipmentMaintenancePlanId: number | null;
  status: number;
}