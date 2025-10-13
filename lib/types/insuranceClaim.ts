export interface InsuranceClaimDto {
  id?: number;
  insuranceRecordId: number;
  claimNumber: string;
  claimDate: Date;
  claimAmount: number;
  approvedAmount: number | null;
  claimReason: string;
  status: string;
  settlementDate: Date | null;
  notes: string | null;
}