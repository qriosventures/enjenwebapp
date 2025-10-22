export interface RfqSupplierDto {
  id?: number;
  requestForQuotationId: number;
  supplierId: number;
  sentDate: Date | null;
  responseDate: Date | null;
  isResponded: boolean;
}