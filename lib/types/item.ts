export interface ItemDto {
  id?: number;
  sku: string;
  name: string;
  description: string | null;
  manufacturerPartNumber: string | null;
  brandId: number;
  model: string | null;
  version: string | null;
  itemTypeId: number;
  itemType: number;
  categoryId: number;
  ean: string | null;
  unitMeasureId: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  commodityCode: string | null;
  isActive: boolean;
  isSerialized: boolean;
  isLotControlled: boolean;
  isExpirable: boolean;
  shelfLifeDays: number | null;
  materialType: number;
  reorderPoint: number;
}