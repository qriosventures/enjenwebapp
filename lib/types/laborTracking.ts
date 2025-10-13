export interface LaborTrackingDto {
  id?: number;
  employeeId: number;
  workOrderId: number;
  operationId: number | null;
  startTime: Date;
  endTime: Date | null;
  breakMinutes: number;
  laborType: string | null;
  unitsProduced: number;
  notes: string | null;
}