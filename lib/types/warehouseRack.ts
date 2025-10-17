export interface WarehouseRackDto {
  id?: number;
  zoneId: number;
  code: string;
  levels: number;
  bays: number;
  maxWeight: number;
  dimensions: string | null;
}