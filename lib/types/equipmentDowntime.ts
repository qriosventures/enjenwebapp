export interface EquipmentDowntimeDto {
  id?: number;
  equipmentId: number;
  startTime: Date;
  endTime: Date | null;
  reason: number;
  description: string | null;
  duration: string | null;
  reportedBy: string | null;
}