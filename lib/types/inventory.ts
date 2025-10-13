export interface InventoryDto {
  id?: number;
  itemId: number;
  warehouseId: number;
  quantityOnHand: number;
  quantityReserved: number;
  quantityOnOrder: number;
  reorderPoint: number;
  maximumStock: number;
  binLocationId: number;
  lastCountDate: Date | null;
  nextCountDate: Date | null;
}