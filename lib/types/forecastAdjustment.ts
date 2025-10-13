export interface ForecastAdjustmentDto {
  id?: number;
  forecastId: number;
  adjustmentQuantity: number;
  adjustmentType: string;
  reason: string | null;
  adjustedBy: string;
  adjustmentDate: Date;
}