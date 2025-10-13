export interface MrpRecordDto {
  id?: number;
  productId: number;
  calculationDate: Date;
  startDate: Date;
  endDate: Date;
  grossRequirement: number;
  scheduledReceipt: number;
  projectedOnHand: number;
  netRequirement: number;
  plannedOrderReceipt: number;
  plannedOrderRelease: number;
  sourceReferenceId: number | null;
  exceptionId: number | null;
  sourceType: number;
}