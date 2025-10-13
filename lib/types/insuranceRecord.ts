export interface InsuranceRecordDto {
  id?: number;
  vehicleId: number;
  policyNumber: string;
  insuranceProvider: string;
  insuranceType: string;
  startDate: Date;
  expiryDate: Date;
  premiumAmount: number;
  declaredValue: number | null;
  nominee: string | null;
  agentDetails: string | null;
  paymentMode: number;
  isActive: boolean;
  notes: string | null;
}