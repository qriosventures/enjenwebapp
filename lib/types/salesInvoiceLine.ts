export interface SalesInvoiceLineDto {
  id?: number;
  itemId: number;
  salesInvoiceId: number;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  unitMeasureId: number;
  taxCode: string | null;
  taxRate: number;
  lineTotal: number;
  lineTax: number;
}