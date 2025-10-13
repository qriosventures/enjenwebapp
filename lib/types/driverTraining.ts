export interface DriverTrainingDto {
  id?: number;
  driverId: number;
  trainingDate: Date;
  trainingType: string;
  description: string | null;
  completionDate: Date;
  expiryDate: Date;
  instructor: string | null;
  status: string;
  certificateNumber: string | null;
  notes: string | null;
}