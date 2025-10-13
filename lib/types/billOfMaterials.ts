export interface BillOfMaterialDto {
  id?: number;
  ParentProductId: number;
  version: string;
  quantity: number;
  effectiveDate: Date;
  expiryDate: Date | null;
  notes: string | null;
  isActive: boolean;
}