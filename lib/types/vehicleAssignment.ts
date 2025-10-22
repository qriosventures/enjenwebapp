export interface VehicleAssignmentDto {
  [x: string]: any;
  id?: number;
  vehicleId: number;
  driverId: number;
  assignmentDate: Date;
  returnDate: Date | null;
  startingOdometer: number | null;
  endingOdometer: number | null;
  purpose: string | null;
  status: number;
  notes: string | null;
}