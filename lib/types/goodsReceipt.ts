export interface GoodsReceiptDto {
  id?: number;
  receiptNumber: string;
  purchaseOrderId: number;
  receiptDate: Date;
  receivedBy: string | null;
  carrierId: number;
  billOfLading: string | null;
  status: number;
}