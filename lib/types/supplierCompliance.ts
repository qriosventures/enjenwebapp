export interface SupplierComplianceDto {
  id?: number;
  supplierId: number;
  documentTypeId: number;
  documentName: string;
  issueDate: Date;
  expiryDate: Date;
  filePath: string;
  isValid: boolean;
  notes: string | null;
}