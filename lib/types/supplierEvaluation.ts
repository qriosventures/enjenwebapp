export interface SupplierEvaluationDto {
  id?: number;
  supplierId: number;
  evaluationDate: Date;
  qualityRating: number;
  deliveryRating: number;
  pricingRating: number;
  serviceRating: number;
  communicationRating: number;
  overallScore: number;
  strengths: string | null;
  improvementAreas: string | null;
  evaluatedBy: string | null;
}