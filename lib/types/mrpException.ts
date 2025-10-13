export interface MrpExceptionDto {
  id?: number;
  mrpRunId: number;
  productId: number;
  quantityImpact: number;
  exceptionDate: Date;
  description: string | null;
  suggestedAction: string | null;
  isResolved: boolean;
  resolutionDate: Date | null;
  resolvedBy: string | null;
}