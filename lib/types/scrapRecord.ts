export interface ScrapRecordDto {
  id?: number;
  WorkOrderId: number;
  ItemId: number;
  Quantity: number;
  ScrapDate: Date;
  ScrapReasonId: number;
  ReportedBy: string | null;
  ScrapReason: number;
  Notes: string | null;
}