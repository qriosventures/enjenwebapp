export interface WorkOrderDto {
  id?: number;
  workOrderNumber: string;
  itemId: number;
  billOfMaterialId: number | null;
  quantity: number;
  startDate: Date;
  dueDate: Date;
  priority: number;
  status: number;
  productionLineId: number | null;
  specialInstructions: string | null;
}