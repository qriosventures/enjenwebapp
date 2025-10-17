export interface WorkOrderMaterialDto {
  id?: number;
  workOrderId: number;
  itemId: number;
  requiredQuantity: number;
  issuedQuantity: number;
  isBackFlushed: boolean;
  issuedDate: Date | null;
  issuedBy: string | null;
}