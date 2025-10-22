export interface WarehouseZoneDto {
  id?: number;
  warehouseId: number;
  name: string;
  code: string;
  type: number;
  description: string | null;
  sequence: number;
  isPickingZone: boolean;
  isStorageZone: boolean;
  isReceivingZone: boolean;
}