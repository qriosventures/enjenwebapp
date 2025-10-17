export interface SalesInvoiceDto {
  id?: number;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: number;
  notes: string | null;
  salesOrderId: number;
  customerId: number;
  fiscalYearId: number;
}