export interface QualityCheckDto {
  id?: number;
  referenceNumber: string;
  workOrderId: number;
  itemId: number | null;
  checkType: number;
  checkDate: Date;
  checkedBy: string;
  status: number;
  sampleSize: number;
  defectCount: number;
  defectPercentage: number;
  notes: string | null;
}