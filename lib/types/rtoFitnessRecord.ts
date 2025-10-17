export interface RtoFitnessRecordDto {
  id?: number;
  vehicleId: number;
  certificateNumber: string;
  inspectionDate: Date;
  expiryDate: Date;
  inspectionCenter: string;
  inspectorName: string | null;
  result: number;
  remarks: string | null;
  feePaid: number;
  receiptNumber: string | null;
  isActive: boolean;
  notes: string | null;
}