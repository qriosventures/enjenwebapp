export interface SalesOrderLineDto {
  id?: number;
  itemId: number;
  salesOrderId: number;
  orderedQuantity: number;
  unitPrice: number;
  fulfilledQuantity: number;
  backOrderedQuantity: number;
  discountPercent: number;
  unitMeasureId: number;
  description: string | null;
  requestedShipDate: Date | null;
  isGift: boolean;
  giftMessage: string | null;
}