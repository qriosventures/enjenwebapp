export interface ProductionLogDto {
  id?: number;
  WorkOrderId: number;
  OperationId: number;
  LogDate: Date;
  GoodQuantity: number;
  RejectedQuantity: number;
  RejectionReason: string | null;
  RecordedBy: string | null;
  EquipmentId: number | null;
  ShiftId: number | null;
}