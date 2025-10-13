export interface MrpExceptionResolutionDto {
  id?: number;
  exceptionId: number;
  actionTaken: number;
  adjustedQuantity: number | null;
  resolutionDate: Date;
  resolvedBy: string | null;
  notes: string | null;
}