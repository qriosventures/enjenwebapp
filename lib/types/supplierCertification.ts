export interface SupplierCertificationDto {
  id?: number;
  supplierId: number;
  certificationTypeId: number;
  certificationNumber: string;
  issueDate: Date;
  expiryDate: Date;
  certificateFilePath: string | null;
}