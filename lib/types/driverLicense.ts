export interface DriverLicenseDto {
  id?: number;
  driverId: number;
  licenseNumber: string;
  licenseClass: string;
  issuingAuthority: string;
  issueDate: Date;
  expiryDate: Date;
  isValid: boolean;
  restrictions: string | null;
  endorsements: string | null;
  notes: string | null;
}