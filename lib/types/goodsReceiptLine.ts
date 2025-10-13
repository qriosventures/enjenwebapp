export interface GoodsReceiptLineDto {
  id?: number;
  goodsReceiptId: number;
  purchaseOrderItemId: number;
  quantityReceived: number;
  actualUnitPrice: number | null;
  lotNumber: string;
  expiryDate: Date | null;
  condition: Number;
  notes: string | null;
}