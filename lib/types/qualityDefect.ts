export interface QualityDefectDto {
  id?: number;
  qualityCheckId: number;
  defectTypeId: number;
  quantity: number;
  description: string | null;
  severity: number;
}