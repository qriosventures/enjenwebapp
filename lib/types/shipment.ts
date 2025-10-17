export interface ShipmentDto {
  id?: number;
  shipmentNumber: string;
  salesOrderId: number;
  shipDate: Date;
  carrierId: number;
  shippingMethod: string;
  trackingNumber: string | null;
  shippingCost: number;
  status: number;
  notes: string | null;
}