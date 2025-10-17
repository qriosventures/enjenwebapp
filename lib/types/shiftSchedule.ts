export interface ShiftScheduleDto {
  id?: number;
  productionLineId: number;
  shiftId: number;
  effectiveDate: Date;
  endDate: Date | null;
  teamLeader: string;
}