export interface DemandForecastDto {
  id?: number;
  itemId: number;
  forecastDate: Date;
  periodStart: Date;
  periodEnd: Date;
  forecastQuantity: number;
  actualQuantity: number;
  type: number;
  forecastModel: string |null;
  confidenceLevel: number;
  notes: string | null;
}