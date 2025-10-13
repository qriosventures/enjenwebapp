export interface PoAcknowledgementDto {
  id?: number;
  purchaseOrderId: number;
  acknowledgementDate: Date;
  status: number;
  notes: string | null;
  acknowledgementReference: string | null;
}