export interface SupplierInvoiceLineDto {
  id?: number;
  itemId: number;
  supplierInvoiceId: number;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  unitMeasureId: number;
  taxCode: string | null;
  taxRate: number;
  lineTotal: number;
  receiptNumber: string | null;
}