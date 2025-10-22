export interface SupplierInvoiceDto {
  id?: number;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: number;
  notes: string | null;
  purchaseOrderId: number;
  supplierId: number;
  fiscalYearId: number;
}