export interface PurchaseRequisitionDto {
  id?: number;
  requisitionNumber: string;
  requestedBy: string;
  requestDate: Date;
  requiredDate: Date | null;
  justification: string | null;
  priority: number;
  status: number;
  departmentId: number | null;
  projectCode: string | null;
}