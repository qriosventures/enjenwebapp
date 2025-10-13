export interface DriverViolationDto {
  id?: number;
  driverId: number;
  violationDate: Date;
  violationType: number;
  description: string;
  location: string;
  fineAmount: number | null;
  paid: boolean;
  status: string;
  notes: string | null;
}