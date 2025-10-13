export interface EquipmentMaintenancePlanDto {
  id?: number;
  equipmentId: number;
  frequency: number;
  frequencyValue: number
  estimatedDurationHours: number;
  procedure: string | null;
  isActive: boolean;
}