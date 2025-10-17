export interface ShipmentLineDto {
  id?: number;
  salesOrderLineId: number;
  shipmentId: number;
  shippedQuantity: Number;
}