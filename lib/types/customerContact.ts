export interface CustomerContactDto {
  id?: number;
  customerId: number;
  fullName: string;
  position: string | null;
  email: string | null;
  mobile: string;
  isPrimary: boolean;
  notes: string |null;
}