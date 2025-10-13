export interface RequestForQuotationDto {
  id?: number;
  rfqNumber: string;
  issueDate: Date;
  dueDate: Date;
  paymentTermId: number;
  status: number;
  specialInstructions: string | null;
  preparedBy: string | null;
}