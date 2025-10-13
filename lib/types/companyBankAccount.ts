export interface CompanyBankAccountDto {
  id?: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifsc: string | null;
  swiftBic: string | null;
  branchCode: string | null;
  branchName: string | null;
  isPrimary: boolean;
  companyId: number;
}