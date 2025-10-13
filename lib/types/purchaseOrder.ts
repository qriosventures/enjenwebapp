export interface PurchaseOrderDto {
  id?: number;
  poNumber: string;
  supplierId: number;
  issueDate: Date;
  expectedDeliveryDate: Date;
  paymentTermId: number;
  shippingMethod: string | null;
  shippingAddressId: number;
  billingAddressId: number;
  terms: string | null;
  approvedBy: string | null;
  approvalDate: Date | null;
  specialInstructions: string | null;
  status: number;
  fiscalYearId: number;
}