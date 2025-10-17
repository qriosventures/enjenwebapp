export interface ReworkRecordDto {
  id?: number;
  workOrderId: number;
  itemId: number;
  quantity: number;
  reworkDate: Date;
  reworkReasonId: number;
  additionalCost: number;
  performedBy: string | null;
}