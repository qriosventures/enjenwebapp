export interface RoadTaxRecordDto {
  id?: number;
  vehicleId: number;
  taxNumber: string;
  stateId: number;
  paymentDate: Date;
  expiryDate: Date;
  amountPaid: number;
  paymentMethod: number;
  receiptNumber: string | null;
  paymentAuthority: string | null;
  isPaid: boolean;
  notes: string | null;
}