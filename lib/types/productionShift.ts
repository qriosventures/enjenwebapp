export interface ProductionShiftDto {
  id?: number;
  name: string;
  startTime: number;
  endTime: number;
  notes: string | null;
}