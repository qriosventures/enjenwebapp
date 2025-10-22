export interface SalesOrderDto {
  id?: number;
  orderNumber: string;
  customerId: number;
  shippingAddressId: number;
  billingAddressId: number;
  customerContactId: number;
  orderDate: Date;
  requestedShipDate: Date | null;
  promisedDate: Date | null;
  salesRepresentativeId: number | null;
  status: number;
  orderSource: string | null;
  subtotal: number;
  taxAmount: number;
  shippingCharge: number;
  discountAmount: number;
  totalAmount: number;
  customerPo: string | null;
  notes: string | null;
  fiscalYearId: number;
}