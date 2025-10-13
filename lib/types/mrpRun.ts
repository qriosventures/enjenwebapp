export interface MrpRunDto {
  id?: number;
  runDateTime: Date;
  runBy: string;
  startDate: Date;
  endDate: Date;
  status: number;
  itemsProcessed: number;
  exceptionsGenerated: number;
  notes: string | null;
}