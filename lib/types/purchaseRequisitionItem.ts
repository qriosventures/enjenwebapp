export interface PurchaseRequisitionItemDto {
  id?: number;
  requisitionId: number;
  categoryId: number;
  itemId: number;
  description: string;
  quantity: number;
  unitMeasureId: number;
  neededByDate: Date | null;
}