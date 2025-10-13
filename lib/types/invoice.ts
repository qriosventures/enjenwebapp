export interface InvoiceDto {
  id?: number;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: number;
  notes: string | null;
}