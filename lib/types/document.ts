export interface DocumentDto {
  id?: number;
  entityType: string;
  entityId: number;
  documentTypeId: number | null;
  fileName: string;
  filePath: string;
  uploadDate: Date;
  expiryDate: Date | null;
}