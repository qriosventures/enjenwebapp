export interface SupplierContractDto {
  id?: number;
  supplierId: number;
  contractNumber: string;
  startDate: Date;
  endDate: Date | null;
  isAutoRenewal: boolean;
  contractType: string | null;
  documentPath: string | null;
  termsAndConditions: string | null;
  status: number;
}