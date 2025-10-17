export interface ReturnRequestDto {
  id?: number;
  rmaNumber: string;
  salesInvoiceId: number;
  requestDate: Date;
  reason: number;
  status: number;
  notes: string | null;
}