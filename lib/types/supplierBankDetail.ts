export interface SupplierBankDetailDto {
  id?: number;
  supplierId: number|any;
  bankName: string;
  accountNumber: string;
  accountType: string;
  routingNumber: string | null;
  accountHolderName: string;
  ifscCode: string | null;
  iban: string | null;
  swiftCode: string | null;
  isPrimary: boolean;
}