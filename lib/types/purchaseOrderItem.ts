export interface PurchaseOrderItemDto {
  id?: number;
  purchaseOrderId: number;
  itemId: number;
  description: string;
  orderedQuantity: number;
  unitMeasureId: number;
  unitPrice: number;
  costCenter: string | null;
  receivedQuantity: number;
  expectedDeliveryDate: Date | null;
}