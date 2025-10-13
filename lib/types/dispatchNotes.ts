export interface DispatchNoteDto {
  id?: number;
  dispatchNumber: string;
  shipmentId: number;
  dispatchDate: Date;
  vehicleAssignmentId: number | null;
  notes: string | null;
}