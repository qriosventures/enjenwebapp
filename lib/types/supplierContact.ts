export interface SupplierContactDto {
  id?: number;
  supplierId: number;
  fullName: string;
  position: string | null;
  email: string | null;
  mobile: string;
  isPrimary: boolean;
  notes: string | null;
}