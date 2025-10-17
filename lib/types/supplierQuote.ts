export interface SupplierQuoteDto {
  id?: number;
  supplierQuoteNo: string;
  quoteDate: Date;
  rfqSupplierId: number;
  validUntil: Date;
  currency: string | null;
  shippingCost: number | null;
  taxAmount: number | null;
  discountAmount: number | null;
  termsAndConditions: string | null;
  status: number;
}